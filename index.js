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

      previousBtn.addEventListener("touchstart", function() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
          currentImageIndex = images.length - 1;
        }
        content.querySelector("img").src = images[currentImageIndex];
      });

      nextBtn.addEventListener("touchstart", function() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
          currentImageIndex = 0;
        }
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