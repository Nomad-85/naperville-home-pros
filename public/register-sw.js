// Register Service Worker for Naperville Home Pros
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Add to home screen functionality
let deferredPrompt;
const addToHomeBtn = document.getElementById('add-to-home');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show the "Add to Home Screen" button if available
  if (addToHomeBtn) {
    addToHomeBtn.style.display = 'block';
    
    addToHomeBtn.addEventListener('click', () => {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        // Clear the saved prompt since it can't be used again
        deferredPrompt = null;
        
        // Hide the button
        addToHomeBtn.style.display = 'none';
      });
    });
  }
});

// Handle online/offline status changes
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
  const statusElement = document.getElementById('connection-status');
  if (!statusElement) return;
  
  if (navigator.onLine) {
    statusElement.textContent = 'You are back online';
    statusElement.classList.remove('bg-red-100', 'text-red-800');
    statusElement.classList.add('bg-green-100', 'text-green-800');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      statusElement.style.display = 'none';
    }, 3000);
  } else {
    statusElement.textContent = 'You are currently offline. Some features may be limited.';
    statusElement.classList.remove('bg-green-100', 'text-green-800');
    statusElement.classList.add('bg-red-100', 'text-red-800');
    statusElement.style.display = 'block';
  }
}
