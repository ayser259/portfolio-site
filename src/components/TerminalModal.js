import React, { useState, useEffect, useRef } from 'react';
import './TerminalModal.css';
import siteContent from '../content';
import conversations from '../conversations';

function TerminalModal({ isOpen, onOpen, onIntroComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showChoiceChips, setShowChoiceChips] = useState(false);
  const [fastForwardMode, setFastForwardMode] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);
  const [completedConversations, setCompletedConversations] = useState([]);
  const [currentMode, setCurrentMode] = useState('initial'); // 'initial' or 'conversation'
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sheetState, setSheetState] = useState('default'); // 'max' | 'default' | 'min' (mobile only)
  const dragStartYRef = useRef(null);
  const dragDeltaRef = useRef(0);
  
  const messageIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const typedTextRef = useRef('');
  const terminalContentRef = useRef(null); // scrollable content container
  const typingTimeoutRef = useRef(null);
  const isTypingCompleteRef = useRef(false);
  const hasInitializedRef = useRef(false);
  const hasSignaledIntroCompleteRef = useRef(false);

  useEffect(() => {
    // Track if we're on a mobile-sized viewport
    const updateIsMobile = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth <= 768);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  // After intro completes and choice chips are shown, ensure the sheet is fully expanded
  // on mobile so all chips are reachable via scrolling.
  useEffect(() => {
    if (!isMobile) return;
    if (showChoiceChips) {
      setSheetState('max');
    }
  }, [isMobile, showChoiceChips]);

  useEffect(() => {
    if (!isOpen) {
      // Reset when modal closes
      resetAll();
      return;
    }

    // Only initialize the intro sequence once per open
    if (hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;
    setCurrentMode('initial');
    setCurrentMessages(siteContent.terminal.messages);
    
    // Start typing animation after modal appears
    // Slightly reduced delay so content starts appearing faster
    const startDelay = setTimeout(() => {
      startTyping(siteContent.terminal.messages);
    }, 350);

    return () => {
      clearTimeout(startDelay);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Signal to parent that the intro + "next steps" are ready.
  // We treat "intro complete" as the moment when the choice chips are shown,
  // so the site header appears only after the conversation next steps load.
  useEffect(() => {
    if (
      currentMode === 'initial' &&
      showChoiceChips &&
      !hasSignaledIntroCompleteRef.current &&
      typeof onIntroComplete === 'function'
    ) {
      hasSignaledIntroCompleteRef.current = true;
      onIntroComplete();
    }
  }, [currentMode, showChoiceChips, onIntroComplete]);

  const resetAll = () => {
    messageIndexRef.current = 0;
    charIndexRef.current = 0;
    typedTextRef.current = '';
    setDisplayedText('');
    setIsTypingComplete(false);
    setShowChoiceChips(false);
    setFastForwardMode(false);
    setSelectedChip(null);
    isTypingCompleteRef.current = false;
    hasInitializedRef.current = false;
    hasSignaledIntroCompleteRef.current = false;
    setCurrentMode('initial');
    setCurrentMessages([]);
    setSheetState('default');
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const resetTyping = () => {
    messageIndexRef.current = 0;
    charIndexRef.current = 0;
    typedTextRef.current = '';
    setDisplayedText('');
    setShowCursor(true);
    setIsTypingComplete(false);
    isTypingCompleteRef.current = false;
    setFastForwardMode(false);
    setSelectedChip(null);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    // Auto-scroll terminal as content is typed so latest text stays in view
    if (terminalContentRef.current) {
      const el = terminalContentRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [displayedText]);

  const skipTyping = () => {
    // Fast forward to completion
    setFastForwardMode(true);
    isTypingCompleteRef.current = true;

    const messages = currentMessages.length > 0 ? currentMessages : siteContent.terminal.messages;
    let fullText = '';

    if (currentMode === 'initial') {
      // For the intro, just jump straight to the full message block
      fullText = messages.join('\n');
    } else {
      // For conversations, append the remaining messages to whatever has already been typed
      const baseText = typedTextRef.current || '';
      const remainingMessages = messages.slice(messageIndexRef.current);
      if (remainingMessages.length > 0) {
        const prefix = baseText.endsWith('\n') || baseText === '' ? '' : '\n';
        fullText = baseText + prefix + remainingMessages.join('\n');
      } else {
        fullText = baseText;
      }
    }

    typedTextRef.current = fullText;
    setDisplayedText(fullText);
    messageIndexRef.current = messages.length;
    charIndexRef.current = 0;
    setShowCursor(false);
    setIsTypingComplete(true);
    
    // Clear any pending timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    
    // Show appropriate UI after completion
    if (currentMode === 'initial') {
      // After the intro, show the choice chips; onIntroComplete will be
      // triggered by the showChoiceChips effect so the header appears later.
      setTimeout(() => {
        setShowChoiceChips(true);
      }, 500);
    } else if (currentMode === 'conversation') {
      // After conversation, return to choice chips with a slightly softer delay
      setTimeout(() => {
        returnToChoiceChips();
      }, 600);
    }
  };

  const startTyping = (messages) => {
    resetTyping();
    setCurrentMessages(messages);
    typeMessage(messages);
  };

  const returnToChoiceChips = () => {
    // Don't reset the displayed text - keep all conversations visible
    // Just reset typing state and show chips again
    messageIndexRef.current = 0;
    charIndexRef.current = 0;
    setIsTypingComplete(true); // Mark as complete so skip button doesn't show
    setShowCursor(false);
    isTypingCompleteRef.current = true;
    setFastForwardMode(false);
    setSelectedChip(null);
    setCurrentMode('initial');
    setShowChoiceChips(true);
    
    // Clear any pending timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  const typeMessage = (messages) => {
    // Don't continue if we've already completed
    if (isTypingCompleteRef.current) return;
    
    // Use provided messages or fall back to current messages
    const messagesToType = messages || currentMessages;
    if (!messagesToType || messagesToType.length === 0) return;
    
    if (messageIndexRef.current < messagesToType.length) {
      const currentMessage = messagesToType[messageIndexRef.current];
      
      if (charIndexRef.current < currentMessage.length) {
        // Append character to existing text
        typedTextRef.current += currentMessage[charIndexRef.current];
        setDisplayedText(typedTextRef.current);
        charIndexRef.current++;
        
        // Typing speed - consistent and smooth
        const baseSpeed = fastForwardMode ? 2 : 18;
        typingTimeoutRef.current = setTimeout(() => typeMessage(messagesToType), baseSpeed);
      } else {
        // Message complete, add line break and move to next
        typedTextRef.current += '\n';
        setDisplayedText(typedTextRef.current);
        charIndexRef.current = 0;
        messageIndexRef.current++;
        
        // Pause between messages - slightly shorter to keep flow snappy
        const pauseSpeed = fastForwardMode ? 20 : 90;
        typingTimeoutRef.current = setTimeout(() => typeMessage(messagesToType), pauseSpeed);
      }
    } else {
      // Mark as complete
      isTypingCompleteRef.current = true;
      
      // Remove cursor after completion
      setShowCursor(false);
      setIsTypingComplete(true);
      
      // Handle completion based on mode
      if (currentMode === 'initial') {
        // Show choice chips after initial message; onIntroComplete will be
        // triggered by the showChoiceChips effect so the header appears later.
        setTimeout(() => {
          setShowChoiceChips(true);
        }, 500);
      } else if (currentMode === 'conversation') {
        // Mark conversation as completed
        if (selectedChip) {
          setCompletedConversations((prev) =>
            prev.includes(selectedChip) ? prev : [...prev, selectedChip]
          );
        }
        
        // After conversation completes, return to choice chips
        setTimeout(() => {
          returnToChoiceChips();
        }, 600);
      }
    }
  };

  const allChoiceChips = [
    { id: 'aboutWork', label: 'Tell me more about you', prompt: 'Tell me more about you' },
    { id: 'genai', label: 'What experience do you have with Gen AI?', prompt: 'What experience do you have with Gen AI?' },
    { id: 'growth', label: "What's your experience with driving growth?", prompt: "What's your experience with driving growth?" },
    { id: 'systems', label: "What's your experience with building systems?", prompt: "What's your experience with building systems?" },
    { id: 'projects', label: 'What do you build outside of work?', prompt: 'What do you build outside of work?' },
    { id: 'outsideWork', label: 'Tell me about life outside of work', prompt: 'Tell me about life outside of work' },
    { id: 'viewProjects', label: 'Show me a few projects', prompt: 'Show me a few projects' },
    { id: 'contact', label: 'Contact me', prompt: 'Contact me' }
  ];

  const getChipPrompt = (chipId) => {
    const chip = allChoiceChips.find(c => c.id === chipId);
    return chip?.prompt || chip?.label || chipId;
  };

  const handleChipClick = (chipId) => {
    // Ignore clicks on already completed chips
    if (completedConversations.includes(chipId)) {
      return;
    }
    // Special case: "viewProjects" chip scrolls to projects showcase section
    if (chipId === 'viewProjects') {
      setSelectedChip(chipId);
      // Mark as completed so it doesn't show again
      setCompletedConversations((prev) =>
        prev.includes(chipId) ? prev : [...prev, chipId]
      );
      
      // Scroll to projects showcase section
      setTimeout(() => {
        const projectsSection = document.getElementById('projects-showcase');
        if (projectsSection) {
          projectsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
      return;
    }

    // Special case: "contact" chip scrolls to contact section
    if (chipId === 'contact') {
      setSelectedChip(chipId);
      setCompletedConversations((prev) =>
        prev.includes(chipId) ? prev : [...prev, chipId]
      );

      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
      return;
    }

    // For other chips, load conversation
    if (!conversations[chipId]) {
      console.error(`Conversation not found for chip: ${chipId}`);
      return;
    }

    // Hide choice chips and start conversation
    setShowChoiceChips(false);
    setSelectedChip(chipId);
    setCurrentMode('conversation');
    
    // Get conversation messages
    const conversation = conversations[chipId];
    const conversationMessages = conversation.messages;
    
    // Save current displayed text
    const currentDisplayedText = typedTextRef.current;
    
    // Add a separator and echo the user's "prompt" before conversation starts
    const separator = '\n\n';
    const promptLine = `> ${getChipPrompt(chipId)}`;
    typedTextRef.current = `${currentDisplayedText}${separator}${promptLine}\n`;
    setDisplayedText(typedTextRef.current);
    
    // Reset typing state but keep the text we've added so far
    messageIndexRef.current = 0;
    charIndexRef.current = 0;
    setShowCursor(true);
    setIsTypingComplete(false);
    isTypingCompleteRef.current = false;
    setFastForwardMode(false);
    
    // Clear any pending timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    
    // Set conversation messages
    setCurrentMessages(conversationMessages);
    
    // Start typing the conversation after a brief delay
    setTimeout(() => {
      typeMessage(conversationMessages);
    }, 300);
  };

  // Derive completion state
  const allCompleted = allChoiceChips.every(
    (chip) => completedConversations.includes(chip.id)
  );

  // Bottom sheet style for mobile: allow dragging the modal down
  const modalStyle = {};
  if (isMobile) {
    if (typeof window !== 'undefined') {
      const viewportHeight = window.innerHeight || 0;
      const baseMax = 0; // full screen
      const baseDefault = viewportHeight * 0.25; // below hero card
      const baseMin = viewportHeight * 0.65; // small peek
      // During intro (before choice chips), keep sheet in max state for stability
      const effectiveState = showChoiceChips ? sheetState : 'max';

      const translateY =
        effectiveState === 'max' ? baseMax : effectiveState === 'default' ? baseDefault : baseMin;

      modalStyle.transform = `translateY(${translateY}px)`;
    }
  }

  const handleGripTouchStart = (event) => {
    if (!isMobile) return;
    if (!event.touches || event.touches.length === 0) return;
    const touch = event.touches[0];
    dragStartYRef.current = touch.clientY;
    dragDeltaRef.current = 0;
  };

  const handleGripTouchMove = (event) => {
    if (!isMobile) return;
    if (dragStartYRef.current == null) return;
    if (!event.touches || event.touches.length === 0) return;

    const touch = event.touches[0];
    const deltaY = touch.clientY - dragStartYRef.current;
    dragDeltaRef.current = deltaY;
  };

  const handleGripTouchEnd = () => {
    if (!isMobile) return;
    if (typeof window === 'undefined') {
      return;
    }

    const deltaY = dragDeltaRef.current || 0;
    const threshold = 80; // px swipe threshold (larger so normal scrolls don't change state)

    if (Math.abs(deltaY) < threshold) {
      // Small movement – snap back to current state
      dragStartYRef.current = null;
      dragDeltaRef.current = 0;
      return;
    }

    // Swipe up => move sheet up one state; swipe down => move down one state
    if (deltaY < 0) {
      // Up
      setSheetState((prev) => {
        if (prev === 'min') return 'default';
        if (prev === 'default') return 'max';
        return 'max';
      });
    } else {
      // Down
      setSheetState((prev) => {
        if (prev === 'max') return 'default';
        if (prev === 'default') return 'min';
        return 'min';
      });
    }

    dragStartYRef.current = null;
    dragDeltaRef.current = 0;
  };

  return (
    <div
      className={`terminal-side-modal ${isOpen ? 'slide-in-right' : ''}`}
      style={modalStyle}
    >
      {/* Mobile drag handle / gripper */}
      <div
        className="terminal-grip-area"
        onTouchStart={handleGripTouchStart}
        onTouchMove={handleGripTouchMove}
        onTouchEnd={handleGripTouchEnd}
        onTouchCancel={handleGripTouchEnd}
      >
        <div className="terminal-grip" />
      </div>
      <div className="terminal">
        <div className="terminal-header"></div>
        <div className="terminal-content" ref={terminalContentRef}>
          <div id="typedText" className="typed-text">
            {displayedText}
            {showCursor && <span className="typing-cursor"></span>}
          </div>
          
          {/* Skip button - shown while typing, directly below the current text */}
          {isOpen && !isTypingComplete && (
            <div className="terminal-controls-row">
              <button 
                className="skip-typing-button"
                onClick={skipTyping}
                aria-label="Answer now"
              >
                <img 
                  src="/assets/images/fastforward.png" 
                  alt="Answer now" 
                  className="skip-icon-image"
                />
              </button>
            </div>
          )}
          
          {/* Choice chips - shown after typing completes */}
          {showChoiceChips && !allCompleted && (
            <div className="choice-chips-container">
              <div className="choice-chips-label">
                {completedConversations.length > 0 
                  ? "What would you like to explore next?"
                  : "Tell me more about:"
                }
              </div>
              <div className="choice-chips">
                {allChoiceChips.map((chip) => {
                  const isCompleted = completedConversations.includes(chip.id);
                  return (
                  <button
                    key={chip.id}
                    className={`choice-chip ${selectedChip === chip.id ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
                    onClick={() => {
                      if (!isCompleted) {
                        handleChipClick(chip.id);
                      }
                    }}
                    disabled={isCompleted}
                  >
                    {chip.label}
                  </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Show message when all conversations are completed */}
          {showChoiceChips && allCompleted && (
            <div className="choice-chips-container">
              <div className="choice-chips-label">
                scroll down to view my portfolio
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalModal;

