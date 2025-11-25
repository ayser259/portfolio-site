import React, { useState, useEffect, useRef } from 'react';
import './TerminalModal.css';
import siteContent from '../content';
import conversations from '../conversations';

function TerminalModal({ isOpen, onOpen }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showChoiceChips, setShowChoiceChips] = useState(false);
  const [fastForwardMode, setFastForwardMode] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);
  const [completedConversations, setCompletedConversations] = useState([]);
  const [currentMode, setCurrentMode] = useState('initial'); // 'initial' or 'conversation'
  const [currentMessages, setCurrentMessages] = useState([]);
  
  const messageIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const typedTextRef = useRef('');
  const terminalContentRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const isTypingCompleteRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset when modal closes
      resetAll();
      return;
    }

    // Initialize with initial terminal messages
    if (currentMode === 'initial') {
      setCurrentMessages(siteContent.terminal.messages);
      
      // Start typing animation after modal appears
      const startDelay = setTimeout(() => {
        startTyping(siteContent.terminal.messages);
      }, 800);

      return () => {
        clearTimeout(startDelay);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    }
  }, [isOpen, currentMode]);

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
    setCurrentMode('initial');
    setCurrentMessages([]);
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
    // Auto-scroll terminal as content is typed
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [displayedText]);

  const skipTyping = () => {
    // Fast forward to completion
    setFastForwardMode(true);
    isTypingCompleteRef.current = true;
    const messages = currentMessages.length > 0 ? currentMessages : siteContent.terminal.messages;
    const fullText = messages.join('\n');
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
      setTimeout(() => {
        setShowChoiceChips(true);
      }, 500);
    } else if (currentMode === 'conversation') {
      // After conversation, return to choice chips
      setTimeout(() => {
        returnToChoiceChips();
      }, 1000);
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
        
        // Varying typing speed - much faster in fast forward mode
        const baseSpeed = fastForwardMode ? 5 : Math.random() * 30 + 20;
        typingTimeoutRef.current = setTimeout(() => typeMessage(messagesToType), baseSpeed);
      } else {
        // Message complete, add line break and move to next
        typedTextRef.current += '\n';
        setDisplayedText(typedTextRef.current);
        charIndexRef.current = 0;
        messageIndexRef.current++;
        
        // Pause between messages - shorter in fast forward mode
        const pauseSpeed = fastForwardMode ? 50 : 300;
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
        // Show choice chips after initial message
        setTimeout(() => {
          setShowChoiceChips(true);
        }, 500);
      } else if (currentMode === 'conversation') {
        // Mark conversation as completed
        if (selectedChip && !completedConversations.includes(selectedChip)) {
          setCompletedConversations([...completedConversations, selectedChip]);
        }
        
        // After conversation completes, return to choice chips
        setTimeout(() => {
          returnToChoiceChips();
        }, 1000);
      }
    }
  };

  const handleChipClick = (chipId) => {
    // Special case: "projects" chip scrolls to projects showcase section
    if (chipId === 'projects') {
      setSelectedChip(chipId);
      // Mark as completed so it doesn't show again
      if (!completedConversations.includes(chipId)) {
        setCompletedConversations([...completedConversations, chipId]);
      }
      setShowChoiceChips(false);
      
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
    
    // Add a separator before conversation starts
    const separator = '\n\n';
    typedTextRef.current = currentDisplayedText + separator;
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

  const allChoiceChips = [
    { id: 'yourself', label: 'Yourself' },
    { id: 'systems', label: 'Experience with building systems' },
    { id: 'growth', label: 'Experience with working on growth' },
    { id: 'genai', label: 'Experience with Gen AI' },
    { id: 'projects', label: 'Show all projects' }
  ];

  // Filter out completed conversations
  const availableChoiceChips = allChoiceChips.filter(
    chip => !completedConversations.includes(chip.id)
  );

  return (
    <div className={`terminal-side-modal ${isOpen ? 'slide-in-right' : ''}`}>
      <div className="terminal" id="terminalContent" ref={terminalContentRef}>
        <div className="terminal-header"></div>
        <div className="terminal-content">
          <div id="typedText" className="typed-text">
            {displayedText}
            {showCursor && <span className="typing-cursor"></span>}
          </div>
          
          {/* Skip button - shown while typing */}
          {isOpen && !isTypingComplete && (
            <button 
              className="skip-typing-button"
              onClick={skipTyping}
              aria-label="Skip typing animation"
            >
              <span className="skip-icon">⏩</span>
              <span className="skip-text">Skip</span>
            </button>
          )}
          
          {/* Choice chips - shown after typing completes */}
          {showChoiceChips && availableChoiceChips.length > 0 && (
            <div className="choice-chips-container">
              <div className="choice-chips-label">
                {completedConversations.length > 0 
                  ? "What would you like to explore next?"
                  : "Tell me more about:"
                }
              </div>
              <div className="choice-chips">
                {availableChoiceChips.map((chip) => (
                  <button
                    key={chip.id}
                    className={`choice-chip ${selectedChip === chip.id ? 'selected' : ''}`}
                    onClick={() => handleChipClick(chip.id)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Show message when all conversations are completed */}
          {showChoiceChips && availableChoiceChips.length === 0 && (
            <div className="choice-chips-container">
              <div className="choice-chips-label">
                Thanks for exploring! Feel free to reach out if you'd like to chat more.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalModal;

