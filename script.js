// Open Modal Function
function openImage(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');

  if (modal && modalImg) {
    modalImg.src = imageSrc;
    modal.style.display = 'flex';
    
    // Set title based on image file
    if (modalTitle) {
      modalTitle.innerText = "နမားဇ်အချိန်ဇယား (" + imageSrc + ")";
    }

    // Reset Zoom State
    resetZoom();
  }
}

// Close Modal Function
function closeImage() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Close Modal when clicking outside image
document.getElementById('modalBody')?.addEventListener('click', function(e) {
  if (e.target.id === 'modalBody' || e.target.id === 'imgWrapper') {
    closeImage();
  }
});

/* Touch Pinch-Zoom & Double-Tap Zoom Implementation */
let scale = 1;
let lastScale = 1;
let startDistance = 0;
const modalImg = document.getElementById('modalImg');

function resetZoom() {
  scale = 1;
  lastScale = 1;
  if (modalImg) {
    modalImg.style.transform = `scale(1)`;
  }
}

// Double tap to zoom in/out
let lastTap = 0;
modalImg?.addEventListener('touchend', function (e) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;
  if (tapLength < 300 && tapLength > 0) {
    if (scale > 1) {
      resetZoom();
    } else {
      scale = 2.5;
      modalImg.style.transform = `scale(${scale})`;
    }
    e.preventDefault();
  }
  lastTap = currentTime;
});

// Pinch Zoom Logic
document.getElementById('modalBody')?.addEventListener('touchstart', function(e) {
  if (e.touches.length === 2) {
    startDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
  }
});

document.getElementById('modalBody')?.addEventListener('touchmove', function(e) {
  if (e.touches.length === 2) {
    const currentDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    
    if (startDistance > 0) {
      let touchScale = currentDistance / startDistance;
      scale = Math.min(Math.max(1, lastScale * touchScale), 4); // Min 1x, Max 4x Zoom
      modalImg.style.transform = `scale(${scale})`;
    }
  }
});

document.getElementById('modalBody')?.addEventListener('touchend', function(e) {
  if (e.touches.length < 2) {
    lastScale = scale;
  }
});
