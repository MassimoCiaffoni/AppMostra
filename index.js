var highlights = document.querySelectorAll(".highlight");
var lightbox = document.getElementById("lightbox");
var content = document.getElementById("content");
var closeBtn = document.getElementById("close-btn");
var canvas = document.getElementById("museum-map");



canvas.addEventListener("touchend", function(event) {
  event.preventDefault(); // previene lo scrolling della pagina quando si tocca il canvas
});

for (var i = 0; i < highlights.length; i++) {
  highlights[i].addEventListener("touchstart", function() {
    var images = this.getAttribute("data-images").split(",");
    var video = this.getAttribute("data-video");
    currentImageIndex = 0;

    if (video) {
      content.innerHTML = `
        <video autoplay>
          <source src="${video}" type="video/mp4">
        </video>
      `;
    } else if (images.length > 0) {
      content.innerHTML = `
        <img src="${images[currentImageIndex]}" class="lightbox-image">
        <button id="previous" class="previous-button">&lt;</button>
        <button id="next" class="next-button">&gt;</button>
      `;


      var previousBtn = document.getElementById("previous");
      var nextBtn = document.getElementById("next");
      var lightboxImage = document.querySelector('.lightbox-image');
      const doubleTouchDelay = 250;
      let lastTouchStart = 0;
      let isZoomed= false;
      // Store previous touch position
      let currentPosition = {x: 0, y: 0};
      touchOrigin = {x: 0, y: 0};

      // Add touchmove event listener
      lightboxImage.addEventListener('touchmove', (e) => {
        if (isZoomed) {
         // Add a touchmove event listener to the image to move it  // Get the current touch position
            var touchX = e.touches[0].clientX;
            var touchY = e.touches[0].clientY;
            
            // Calculate the distance moved since the last touchmove event
            var deltaX = touchX - touchOrigin.x;
            var deltaY = touchY - touchOrigin.y;
            
            // Set the transform origin to the touch origin
            var originX = touchOrigin.x - lightboxImage.offsetLeft;
            var originY = touchOrigin.y - lightboxImage.offsetTop;
            lightboxImage.style.transformOrigin = originX + 'px ' + originY + 'px';
            const transform = window.getComputedStyle(lightboxImage).getPropertyValue('transform');
            const matrix = transform.match(/^matrix\((.+)\)$/i)[1].split(',').map(parseFloat);
            const scaleX = matrix[0];
            var translateX = deltaX / scaleX;
            var translateY = deltaY / scaleX;
            
            // Update the image's position based on the touch movement
            lightboxImage.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scaleX + ')';

            // Update the touch origin to the current position
            touchOrigin.x = touchX;
            touchOrigin.y = touchY;
            console.log(touchOrigin)
            
            // Update the current position to the new position
            currentPosition.x = touchX;
            currentPosition.y = touchY;
        }
      });


      lightboxImage.addEventListener('touchstart', (e) => {
        const now = Date.now();
        const timeDiff = now - lastTouchStart;
        lastTouchStart = now;
        if (timeDiff < doubleTouchDelay) {
          const touch = e.touches[0];
          const rect = lightboxImage.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;
          touchOrigin.x = e.touches[0].clientX;
          touchOrigin.y = e.touches[0].clientY;
          const transform = window.getComputedStyle(lightboxImage).getPropertyValue('transform');
          console.log(transform)
          const matrix = transform.match(/^matrix\((.+)\)$/i)[1].split(',').map(parseFloat);
          const scaleX = matrix[0];
          const scaleY = matrix[3];
          console.log(scaleX, scaleY);
          const currentScale = scaleX;
          const targetScale = 2.0;
          const scaleDiff = targetScale - scaleX;
          const newScale = `scale(${targetScale})`;
          // Calculate the new transform origin
          const offsetX = (x * scaleDiff) / targetScale;
          const offsetY = (y * scaleDiff) / targetScale;
          const newOrigin = `${x}px ${y}px`;
          if (currentScale==1) {
            console.log(images[currentImageIndex]);
            if (images[currentImageIndex]=='images/registro matricola detenuti-2.jpg'){
              lightboxImage.style.transform = `scale(4) translate(-${offsetX}px, -${offsetY}px)`;
              isZoomed=true;
              lightboxImage.style.transformOrigin=newOrigin;
            }
            else{
              lightboxImage.style.transform = `${newScale} translate(-${offsetX}px, -${offsetY}px)`;
              isZoomed=true;
              lightboxImage.style.transformOrigin=newOrigin;
            }
          }
          else {
            lightboxImage.style.transform = `scale(1)`
            isZoomed=false
          }
        }
      });

      previousBtn.addEventListener("touchstart", function() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
          currentImageIndex = images.length - 1;
        }
        lightboxImage.style.transform = `scale(1)`
        isZoomed= false
        content.querySelector("img").src = images[currentImageIndex];
      });

      nextBtn.addEventListener("touchstart", function() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
          currentImageIndex = 0;
        }
        lightboxImage.style.transform = `scale(1)`
        isZoomed= false
        content.querySelector("img").src = images[currentImageIndex];
      });
    }

    content.addEventListener("touchstart", function(event) {
      event.stopPropagation();
    });

    lightbox.style.display = "flex";
  });

}

closeBtn.addEventListener("touchstart", function() {
  lightbox.style.display = "none";
  content.innerHTML = "";
});