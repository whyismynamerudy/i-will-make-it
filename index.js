function updateCountdown() {
    const now = new Date();
    const targetDate = new Date(2025, 6, 19); // July is month 6 (0-indexed)
    
    if (now > targetDate) {
      targetDate.setFullYear(currentYear + 2);
    }
    
    const timeLeft = targetDate - now;
    
    const totalSeconds = Math.floor(timeLeft / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const countdownText = `${hours}h      ${minutes}m      ${seconds}s`;
    
    document.getElementById('countdown').textContent = countdownText;
  }
  
  function loadBackgroundImage() {
    chrome.storage.local.get(['backgroundImage'], function(result) {
      if (result.backgroundImage) {
        document.body.style.backgroundImage = `url(${result.backgroundImage})`;
      }
    });
  }
  
  document.getElementById('bgInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const imageDataUrl = e.target.result;
      document.body.style.backgroundImage = `url(${imageDataUrl})`;
      chrome.storage.local.set({backgroundImage: imageDataUrl});
    }
    
    reader.readAsDataURL(file);
  });
  
  updateCountdown();
  setInterval(updateCountdown, 1000); // Update every second
  loadBackgroundImage();