// Portfolio Modal functionality
// Handles the terminal side modal animation and typing effect

// Terminal typing animation
let messageIndex = 0;
let charIndex = 0;
let typedText = '';

function typeMessage() {
    const terminalContent = document.getElementById('typedText');
    const messages = siteContent.terminal.messages;
    
    if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];
        
        if (charIndex < currentMessage.length) {
            typedText += currentMessage[charIndex];
            terminalContent.innerHTML = typedText + '<span class="typing-cursor"></span>';
            charIndex++;
            
            // Varying typing speed for more natural effect
            const typingSpeed = Math.random() * 30 + 20;
            setTimeout(typeMessage, typingSpeed);
        } else {
            // Message complete, add line break and move to next
            typedText += '<br>';
            terminalContent.innerHTML = typedText + '<span class="typing-cursor"></span>';
            charIndex = 0;
            messageIndex++;
            
            // Auto-scroll terminal
            const terminal = document.getElementById('terminalContent');
            terminal.scrollTop = terminal.scrollHeight;
            
            // Pause between messages
            setTimeout(typeMessage, 300);
        }
    } else {
        // Remove cursor after completion
        terminalContent.innerHTML = typedText;
    }
}

// Initialize terminal animation
function initTerminal() {
    const terminal = document.getElementById('terminal');
    const video = document.getElementById('bgVideo');
    
    if (!terminal || !video) return;
    
    // Terminal slides in from right after 5 seconds
    setTimeout(() => {
        terminal.classList.remove('hidden');
        // Trigger slide-in animation and resize video simultaneously
        setTimeout(() => {
            terminal.classList.add('slide-in-right');
            // Resize video when modal opens - call with a small delay to ensure modal class is applied
            setTimeout(() => {
                if (window.forceEdgeToEdge) {
                    window.forceEdgeToEdge();
                }
            }, 50);
        }, 10);
        
        // Start typing animation after terminal appears
        setTimeout(typeMessage, 800);
    }, 5000); // 5 seconds delay
}

// Export for use in main script
if (typeof window !== 'undefined') {
    window.initTerminal = initTerminal;
}

