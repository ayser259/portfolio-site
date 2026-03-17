import React, { useState, useEffect, useRef } from 'react';
import './TerminalModal.css';
import siteContent from '../content';
import conversations from '../conversations';

function TerminalModal({ isOpen, onIntroComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showChoiceChips, setShowChoiceChips] = useState(false);
  const [fastForwardMode, setFastForwardMode] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);
  const [completedConversations, setCompletedConversations] = useState([]);
  const [clickedChipOrder, setClickedChipOrder] = useState([]); // order chips were clicked (most recent last)
  const [emailCopied, setEmailCopied] = useState(false);
  const [showFlappyBird, setShowFlappyBird] = useState(false);
  const [flappyScore, setFlappyScore] = useState(0);
  const [flappyBestScore, setFlappyBestScore] = useState(0);
  const [flappyGameOver, setFlappyGameOver] = useState(false);
  const [flappyRunId, setFlappyRunId] = useState(0);
  const [currentMode, setCurrentMode] = useState('initial'); // 'initial' or 'conversation'
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sheetState, setSheetState] = useState('default'); // 'max' | 'default' | 'min' (mobile only)
  const dragStartYRef = useRef(null);
  const dragDeltaRef = useRef(0);
  const modalRef = useRef(null);
  const flappyCanvasRef = useRef(null);
  const flappyAnimationRef = useRef(null);
  
  const messageIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const typedTextRef = useRef('');
  const terminalContentRef = useRef(null); // scrollable content container
  const typingTimeoutRef = useRef(null);
  const deferredTimeoutRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const isTypingCompleteRef = useRef(false);
  const hasInitializedRef = useRef(false);
  const hasStartedTypingRef = useRef(false);
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
    
    const modalNode = modalRef.current;
    const startTypingWhenReady = () => {
      if (!isOpen || hasStartedTypingRef.current) return;
      hasStartedTypingRef.current = true;
      startTyping(siteContent.terminal.messages);
    };

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startTypingWhenReady();
      return undefined;
    }

    let fallbackTimeoutId = null;
    const handleTransitionEnd = (event) => {
      if (event.target !== modalNode || event.propertyName !== 'transform') return;
      if (fallbackTimeoutId) {
        clearTimeout(fallbackTimeoutId);
      }
      modalNode.removeEventListener('transitionend', handleTransitionEnd);
      startTypingWhenReady();
    };

    if (modalNode) {
      modalNode.addEventListener('transitionend', handleTransitionEnd);
      fallbackTimeoutId = setTimeout(() => {
        modalNode.removeEventListener('transitionend', handleTransitionEnd);
        startTypingWhenReady();
      }, 900);
    } else {
      fallbackTimeoutId = setTimeout(startTypingWhenReady, 900);
    }

    return () => {
      if (fallbackTimeoutId) {
        clearTimeout(fallbackTimeoutId);
      }
      if (modalNode) {
        modalNode.removeEventListener('transitionend', handleTransitionEnd);
      }
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
    setCompletedConversations([]);
    setClickedChipOrder([]);
    setEmailCopied(false);
    setShowFlappyBird(false);
    setFlappyScore(0);
    setFlappyGameOver(false);
    setFlappyRunId(0);
    isTypingCompleteRef.current = false;
    hasInitializedRef.current = false;
    hasStartedTypingRef.current = false;
    hasSignaledIntroCompleteRef.current = false;
    setCurrentMode('initial');
    setCurrentMessages([]);
    setSheetState('default');
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (deferredTimeoutRef.current) {
      clearTimeout(deferredTimeoutRef.current);
      deferredTimeoutRef.current = null;
    }
    if (scrollFrameRef.current) {
      cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = null;
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
    hasStartedTypingRef.current = true;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    // Scroll after paint so the typing animation doesn't fight layout on every update.
    if (!terminalContentRef.current) return undefined;

    if (scrollFrameRef.current) {
      cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = requestAnimationFrame(() => {
      const el = terminalContentRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
      scrollFrameRef.current = null;
    });

    return () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [displayedText]);

  useEffect(() => {
    if (!showFlappyBird || !terminalContentRef.current) return;

    const scrollToGame = requestAnimationFrame(() => {
      const el = terminalContentRef.current;
      if (el) {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth',
        });
      }
    });

    return () => cancelAnimationFrame(scrollToGame);
  }, [showFlappyBird, flappyRunId]);

  useEffect(() => {
    if (!showFlappyBird) return undefined;

    const canvas = flappyCanvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const width = 320;
    const height = 420;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let animationFrameId = null;
    let isGameOver = false;
    let frameCount = 0;
    let score = 0;

    const bird = {
      x: 76,
      y: height / 2,
      velocityY: 0,
      radius: 12,
    };

    const pipes = [];
    const gravity = 0.15;
    const flapStrength = -3.5;
    const pipeWidth = 52;
    const pipeGap = 144;
    const pipeSpeed = 1.95;
    const pipeSpawnInterval = 200;

    const setGameOver = () => {
      if (isGameOver) return;
      isGameOver = true;
      setFlappyGameOver(true);
      setFlappyBestScore((prev) => Math.max(prev, score));
    };

    const spawnPipe = () => {
      const topHeight = 70 + Math.random() * 160;
      pipes.push({
        x: width + pipeWidth,
        topHeight,
        bottomY: topHeight + pipeGap,
        scored: false,
      });
    };

    const flap = () => {
      if (isGameOver) {
        setFlappyRunId((prev) => prev + 1);
        return;
      }
      bird.velocityY = flapStrength;
    };

    const handleKeyDown = (event) => {
      if (event.code !== 'Space') return;
      event.preventDefault();
      flap();
    };

    const handleCanvasPointer = () => {
      flap();
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#08111f');
      gradient.addColorStop(1, '#03060d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(0, 255, 136, 0.06)';
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.arc(70 * i, 40 + i * 28, 38, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.fillRect(0, height - 28, width, 28);
    };

    const drawBird = () => {
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(Math.max(-0.35, Math.min(0.55, bird.velocityY * 0.05)));

      ctx.fillStyle = '#00ff88';
      ctx.beginPath();
      ctx.arc(0, 0, bird.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#041013';
      ctx.beginPath();
      ctx.arc(4, -3, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(18, -3);
      ctx.lineTo(18, 3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawPipes = () => {
      pipes.forEach((pipe) => {
        ctx.fillStyle = '#00d470';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, height - pipe.bottomY);

        ctx.fillStyle = '#8dffd0';
        ctx.fillRect(pipe.x - 3, pipe.topHeight - 12, pipeWidth + 6, 12);
        ctx.fillRect(pipe.x - 3, pipe.bottomY, pipeWidth + 6, 12);
      });
    };

    const checkCollision = (pipe) => {
      const withinPipeX =
        bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipeWidth;
      const hitsTopPipe = bird.y - bird.radius < pipe.topHeight;
      const hitsBottomPipe = bird.y + bird.radius > pipe.bottomY;
      return withinPipeX && (hitsTopPipe || hitsBottomPipe);
    };

    const drawOverlay = () => {
      if (!isGameOver) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.46)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = '700 24px system-ui';
      ctx.fillText('Game Over', width / 2, height / 2 - 12);
      ctx.font = '500 13px system-ui';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText('Tap or press space to restart', width / 2, height / 2 + 18);
    };

    const loop = () => {
      frameCount += 1;

      if (!isGameOver) {
        if (frameCount % pipeSpawnInterval === 0) {
          spawnPipe();
        }

        bird.velocityY += gravity;
        bird.y += bird.velocityY;

        pipes.forEach((pipe) => {
          pipe.x -= pipeSpeed;

          if (!pipe.scored && pipe.x + pipeWidth < bird.x - bird.radius) {
            pipe.scored = true;
            score += 1;
            setFlappyScore(score);
          }

          if (checkCollision(pipe)) {
            setGameOver();
          }
        });

        while (pipes.length > 0 && pipes[0].x + pipeWidth < -10) {
          pipes.shift();
        }

        if (bird.y + bird.radius > height - 28 || bird.y - bird.radius < 0) {
          setGameOver();
        }
      }

      drawBackground();
      drawPipes();
      drawBird();
      drawOverlay();

      animationFrameId = window.requestAnimationFrame(loop);
      flappyAnimationRef.current = animationFrameId;
    };

    setFlappyScore(0);
    setFlappyGameOver(false);
    spawnPipe();

    canvas.addEventListener('pointerdown', handleCanvasPointer);
    window.addEventListener('keydown', handleKeyDown);
    loop();

    return () => {
      canvas.removeEventListener('pointerdown', handleCanvasPointer);
      window.removeEventListener('keydown', handleKeyDown);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      if (flappyAnimationRef.current) {
        window.cancelAnimationFrame(flappyAnimationRef.current);
        flappyAnimationRef.current = null;
      }
    };
  }, [showFlappyBird, flappyRunId]);

  const scheduleDeferredAction = (action, delay) => {
    if (deferredTimeoutRef.current) {
      clearTimeout(deferredTimeoutRef.current);
    }

    deferredTimeoutRef.current = setTimeout(() => {
      deferredTimeoutRef.current = null;
      action();
    }, delay);
  };

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
      scheduleDeferredAction(() => {
        setShowChoiceChips(true);
      }, 320);
    } else if (currentMode === 'conversation') {
      scheduleDeferredAction(() => {
        returnToChoiceChips();
      }, 420);
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
    if (deferredTimeoutRef.current) {
      clearTimeout(deferredTimeoutRef.current);
      deferredTimeoutRef.current = null;
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
        const chunkSize = fastForwardMode
          ? Math.max(8, currentMessage.length - charIndexRef.current)
          : currentMessage.length > 60
            ? 4
            : currentMessage.length > 24
              ? 3
              : 2;
        const nextIndex = Math.min(currentMessage.length, charIndexRef.current + chunkSize);

        // Append characters in small chunks to reduce render churn.
        typedTextRef.current += currentMessage.slice(charIndexRef.current, nextIndex);
        setDisplayedText(typedTextRef.current);
        charIndexRef.current = nextIndex;
        
        const baseSpeed = fastForwardMode ? 0 : 34;
        typingTimeoutRef.current = setTimeout(() => typeMessage(messagesToType), baseSpeed);
      } else {
        // Message complete, add line break and move to next
        typedTextRef.current += '\n';
        setDisplayedText(typedTextRef.current);
        charIndexRef.current = 0;
        messageIndexRef.current++;
        
        const pauseSpeed = fastForwardMode ? 12 : currentMessage.length === 0 ? 42 : 72;
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
        scheduleDeferredAction(() => {
          setShowChoiceChips(true);
        }, 320);
      } else if (currentMode === 'conversation') {
        // After conversation completes, return to choice chips
        scheduleDeferredAction(() => {
          returnToChoiceChips();
        }, 420);
      }
    }
  };

  const conversationChips = [
    { id: 'aboutWork', label: 'Tell me more about you', prompt: 'Tell me more about you' },
    { id: 'genai', label: 'What experience do you have with Gen AI?', prompt: 'What experience do you have with Gen AI?' },
    { id: 'growth', label: "What's your experience with driving growth?", prompt: "What's your experience with driving growth?" },
    { id: 'systems', label: "What's your experience with building systems?", prompt: "What's your experience with building systems?" },
    { id: 'projects', label: 'What do you build outside of work?', prompt: 'What do you build outside of work?' },
    { id: 'outsideWork', label: 'Tell me about life outside of work', prompt: 'Tell me about life outside of work' },
  ];

  const actionButtons = [
    { id: 'viewProjects', label: 'Show Me Your Projects' },
    { id: 'contact', label: 'Contact Me' },
  ];

  const getChipPrompt = (chipId) => {
    const chip = conversationChips.find(c => c.id === chipId);
    return chip?.prompt || chip?.label || chipId;
  };

  // Sort: unclicked first (original order), then clicked in click order (most recent at bottom)
  const sortedConversationChips = [...conversationChips].sort((a, b) => {
    const aCompleted = completedConversations.includes(a.id) || (selectedChip === a.id && currentMode === 'conversation');
    const bCompleted = completedConversations.includes(b.id) || (selectedChip === b.id && currentMode === 'conversation');
    if (!aCompleted && !bCompleted) {
      return conversationChips.indexOf(a) - conversationChips.indexOf(b);
    }
    if (!aCompleted) return -1;
    if (!bCompleted) return 1;
    return clickedChipOrder.indexOf(a.id) - clickedChipOrder.indexOf(b.id);
  });

  // Parse displayed text into user (sent) and assistant blocks for styling
  const parseMessageBlocks = (text) => {
    if (!text) return [];
    const blocks = [];
    const lines = text.split('\n');
    let currentAssistant = [];

    for (const line of lines) {
      if (line.startsWith('> ')) {
        if (currentAssistant.length) {
          blocks.push({ type: 'assistant', text: currentAssistant.join('\n') });
          currentAssistant = [];
        }
        blocks.push({ type: 'user', text: line.slice(2) });
      } else {
        currentAssistant.push(line);
      }
    }
    if (currentAssistant.length) {
      blocks.push({ type: 'assistant', text: currentAssistant.join('\n') });
    }
    return blocks;
  };

  const messageBlocks = parseMessageBlocks(displayedText);

  const handleChipClick = (chipId) => {
    // Ignore clicks on already completed chips
    if (completedConversations.includes(chipId)) {
      return;
    }
    // Action button: scroll to projects showcase section
    if (chipId === 'viewProjects') {
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

    // Action button: scroll to contact section
    if (chipId === 'contact') {
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

    // Action button: open mini game in the terminal
    if (chipId === 'playFlappyBird') {
      setShowFlappyBird(true);
      setFlappyRunId((prev) => prev + 1);
      return;
    }

    // For other chips, load conversation
    if (!conversations[chipId]) {
      console.error(`Conversation not found for chip: ${chipId}`);
      return;
    }

    // Add to completed immediately so chip stays greyed for session; track click order
    setCompletedConversations((prev) =>
      prev.includes(chipId) ? prev : [...prev, chipId]
    );
    setClickedChipOrder((prev) =>
      prev.includes(chipId) ? prev : [...prev, chipId]
    );
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
    scheduleDeferredAction(() => {
      typeMessage(conversationMessages);
    }, 180);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteContent.contact.email);
      setEmailCopied(true);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  // Derive completion state (conversation chips only, not action buttons)
  const allConversationsCompleted = conversationChips.every(
    (chip) => completedConversations.includes(chip.id)
  );
  const shouldReserveChoiceSpace = currentMode === 'initial' || showChoiceChips;

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
      ref={modalRef}
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
        {/* Scrollable overflow area - typed text and skip button only */}
        <div className="terminal-content" ref={terminalContentRef}>
          <div id="typedText" className="typed-text">
            {messageBlocks.length > 0 ? messageBlocks.map((block, i) => (
              block.type === 'user' ? (
                <div key={i} className="message message-sent">
                  {block.text}
                </div>
              ) : (
                <div key={i} className="message message-assistant">
                  {block.text}
                  {showCursor && i === messageBlocks.length - 1 && <span className="typing-cursor"></span>}
                </div>
              )
            )) : showCursor ? (
              <div className="message message-assistant">
                <span className="typing-cursor"></span>
              </div>
            ) : null}
          </div>

          {showFlappyBird && (
            <div className="flappy-panel">
              <div className="flappy-panel-header">
                <div>
                  <div className="flappy-panel-title">Flappy Bird</div>
                  <div className="flappy-panel-subtitle">
                    {flappyGameOver ? 'Tap the game or press space to restart.' : 'Tap the game or press space to flap.'}
                  </div>
                </div>
                <button
                  type="button"
                  className="flappy-close-button"
                  onClick={() => setShowFlappyBird(false)}
                  aria-label="Close Flappy Bird"
                >
                  Close
                </button>
              </div>

              <div className="flappy-scoreboard">
                <span>Score: {flappyScore}</span>
                <span>Best: {Math.max(flappyBestScore, flappyScore)}</span>
              </div>

              <canvas
                ref={flappyCanvasRef}
                className="flappy-canvas"
                aria-label="Flappy Bird game"
              />
            </div>
          )}
          
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
        </div>
        {/* Pinned choice chips - fixed at bottom, reserved space, never scrolls */}
        <div
          className={`choice-chips-stage ${shouldReserveChoiceSpace ? 'reserved' : ''} ${
            showChoiceChips ? 'visible' : ''
          }`}
          aria-hidden={!showChoiceChips}
        >
          {/* Conversation choice chips - shown after typing completes */}
          {showChoiceChips && !allConversationsCompleted && (
            <div className="choice-chips-container">
              <div className="choice-chips-label">
                {completedConversations.length > 0
                  ? "What would you like to explore next?"
                  : 'Tell me more about:'}
              </div>
              <div className="choice-chips choice-chips-horizontal">
                {sortedConversationChips.map((chip) => {
                  const isCompleted = completedConversations.includes(chip.id);
                  const isGreyedOut = isCompleted || (selectedChip === chip.id && currentMode === 'conversation');
                  return (
                    <button
                      key={chip.id}
                      className={`choice-chip ${selectedChip === chip.id ? 'selected' : ''} ${isGreyedOut ? 'completed' : ''}`}
                      onClick={() => {
                        if (!isGreyedOut) {
                          handleChipClick(chip.id);
                        }
                      }}
                      disabled={isGreyedOut}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Show message when all conversations are completed */}
          {showChoiceChips && allConversationsCompleted && (
            <div className="choice-chips-container completion-cta">
              <div className="choice-chips-label completion-cta-label">
                Oh wow, you are really interested in getting to know me better.
              </div>
              <div className="completion-cta-copy">
                Why not schedule a quick call? Email me to set something up:
              </div>
              <div className="completion-actions-row">
                <button
                  type="button"
                  className="completion-email-button"
                  onClick={handleCopyEmail}
                  aria-label={emailCopied ? 'Email copied' : 'Copy email address'}
                >
                  {emailCopied ? `Copied: ${siteContent.contact.email}` : 'Copy Email Address'}
                </button>
                <button
                  type="button"
                  className="completion-email-button"
                  onClick={() => handleChipClick('playFlappyBird')}
                  aria-label="Play Flappy Bird Instead"
                >
                  Play Flappy Bird Instead
                </button>
              </div>
            </div>
          )}

          {/* Action buttons - always visible, different behavior (scroll) */}
          {showChoiceChips && (
            <div className="action-buttons-group">
              <div className="action-buttons-caption">Quick actions</div>
              <div className="action-buttons-row">
              {actionButtons.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  className="action-button"
                  onClick={() => handleChipClick(btn.id)}
                  aria-label={btn.label}
                >
                  {btn.label}
                </button>
              ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalModal;

