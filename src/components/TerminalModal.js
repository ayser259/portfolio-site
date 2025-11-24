import React, { useState, useEffect, useRef } from 'react';
import './TerminalModal.css';
import siteContent from '../content';

function TerminalModal({ isOpen, onOpen }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const messageIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const typedTextRef = useRef('');
  const terminalContentRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset when modal closes
      messageIndexRef.current = 0;
      charIndexRef.current = 0;
      typedTextRef.current = '';
      setDisplayedText('');
      return;
    }

    // Start typing animation after modal appears
    const startDelay = setTimeout(() => {
      typeMessage();
    }, 800);

    return () => {
      clearTimeout(startDelay);
    };
  }, [isOpen]);

  useEffect(() => {
    // Auto-scroll terminal as content is typed
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [displayedText]);

  const typeMessage = () => {
    const messages = siteContent.terminal.messages;
    
    if (messageIndexRef.current < messages.length) {
      const currentMessage = messages[messageIndexRef.current];
      
      if (charIndexRef.current < currentMessage.length) {
        typedTextRef.current += currentMessage[charIndexRef.current];
        setDisplayedText(typedTextRef.current);
        charIndexRef.current++;
        
        // Varying typing speed for more natural effect
        const typingSpeed = Math.random() * 30 + 20;
        setTimeout(typeMessage, typingSpeed);
      } else {
        // Message complete, add line break and move to next
        typedTextRef.current += '\n';
        setDisplayedText(typedTextRef.current);
        charIndexRef.current = 0;
        messageIndexRef.current++;
        
        // Pause between messages
        setTimeout(typeMessage, 300);
      }
    } else {
      // Remove cursor after completion
      setShowCursor(false);
    }
  };

  return (
    <div className={`terminal-side-modal ${isOpen ? 'slide-in-right' : ''}`}>
      <div className="terminal" id="terminalContent" ref={terminalContentRef}>
        <div className="terminal-header"></div>
        <div className="terminal-content">
          <div id="typedText" className="typed-text">
            {displayedText}
            {showCursor && <span className="typing-cursor"></span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalModal;

