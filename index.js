var highlights = document.querySelectorAll(".highlight");
var lightbox = document.getElementById("lightbox");
var content = document.getElementById("content");
var closeBtn = document.getElementById("close-btn");
var canvas = document.getElementById("museum-map");


var startTouchX, startTouchY;

canvas.addEventListener("touchstart", function(event) {
  event.preventDefault(); // previene lo scrolling della pagina quando si tocca il canvas
  var touch = event.touches[0]; // ottiene il primo tocco
  startTouchX = touch.clientX; // memorizza la posizione di partenza sull'asse X
  startTouchY = touch.clientY; // memorizza la posizione di partenza sull'asse Y
});

canvas.addEventListener("touchmove", function(event) {
  event.preventDefault(); // previene lo scrolling della pagina quando si tocca il canvas
  var touch = event.touches[0]; // ottiene il primo tocco
  var currentTouchX = touch.clientX; // ottiene la posizione corrente sull'asse X
  var currentTouchY = touch.clientY; // ottiene la posizione corrente sull'asse Y
  var deltaTouchX = currentTouchX - startTouchX; // calcola la differenza sull'asse X
  var deltaTouchY = currentTouchY - startTouchY; // calcola la differenza sull'asse Y
  var delta = -deltaTouchY / 100; // calcola la direzione dello zoom (in o out)
  var zoom = canvas.zoom || 1; // ottiene il valore corrente dello zoom o imposta 1 come valore di default
  zoom += delta; // aggiunge o toglie il valore delta allo zoom corrente
  zoom = Math.min(4, Math.max(0.1, zoom)); // limita il valore dello zoom a un intervallo tra 0.1 e 4
  canvas.style.transform = "scale(" + zoom + ")"; // applica la trasformazione di scala al canvas
  canvas.zoom = zoom; // salva il valore dello zoom corrente nell'elemento canvas
});

canvas.addEventListener("touchend", function(event) {
  event.preventDefault(); // previene lo scrolling della pagina quando si tocca il canvas
});

for (var i = 0; i < highlights.length; i++) {
  highlights[i].addEventListener("pointerdown", function() {
    var images = this.getAttribute("data-images").split(",");
    var video = this.getAttribute("data-video");
    currentImageIndex = 0;

    if (video) {
      content.innerHTML = `
        <video controls>
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

      previousBtn.addEventListener("pointerdown", function() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
          currentImageIndex = images.length - 1;
        }
        content.querySelector("img").src = images[currentImageIndex];
      });

      nextBtn.addEventListener("pointerdown", function() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
          currentImageIndex = 0;
        }
        content.querySelector("img").src = images[currentImageIndex];
      });
    }

    content.addEventListener("pointerdown", function(event) {
      event.stopPropagation();
    });

    lightbox.style.display = "flex";
  });

}

closeBtn.addEventListener("pointerdown", function() {
  lightbox.style.display = "none";
  content.innerHTML = "";
});