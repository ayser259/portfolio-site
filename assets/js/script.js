// Video initialization - edge to edge, dynamically fits viewport
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    if (!video) return;
    
    function updateVideoSize() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Set video to exactly match viewport dimensions
        video.style.width = `${viewportWidth}px`;
        video.style.height = `${viewportHeight}px`;
        video.style.left = '0';
        video.style.top = '0';
        
        // No transform needed - object-fit: cover handles the scaling and cropping
        video.style.transform = 'none';
        video.style.transformOrigin = 'left top';
    }
    
    // Update size when video metadata loads
    video.addEventListener('loadedmetadata', updateVideoSize);
    video.addEventListener('loadeddata', updateVideoSize);
    
    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateVideoSize, 50);
    });
    
    // Initial update
    updateVideoSize();
    
    // Fallback updates
    setTimeout(updateVideoSize, 100);
    setTimeout(updateVideoSize, 500);
    
    // Ensure video plays
    video.play().catch(error => {
        console.log('Video autoplay prevented:', error);
        document.addEventListener('click', () => {
            video.play();
        }, { once: true });
    });
});
