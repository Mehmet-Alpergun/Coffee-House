const menubtn = document.getElementById("menubtn");
const menu = document.getElementById("menuismenulan");
const lan = document.getElementById("yeterlan");

menubtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  lan.classList.toggle("active");
  menubtn.classList.toggle("active");
});

lan.addEventListener("click", () => {
  menu.classList.remove("active");
  lan.classList.remove("active");
  menubtn.classList.remove("active");
});

// script.js
/*
const slides = document.querySelectorAll(".slidercontainer");
const prevBtn = document.querySelector(".soloklar");
const nextBtn = document.querySelector(".sagoklar");
let current = 0;
console.log(slides[1]);

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % slides.length; // Sonraki slayta geç
  showSlide(current);
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length; // Önceki slayta geç
  showSlide(current);
});

// Otomatik geçiş (opsiyonel)
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 2000);
*/

const slides = document.querySelectorAll(".slidercontainer");
const prevBtn = document.querySelector(".soloklar");
const nextBtn = document.querySelector(".sagoklar");
let current = 0;
let intervalId; // otomatik geçiş zamanlayıcısı için değişken

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

// Otomatik geçişi başlat
function startAutoSlide() {
  stopAutoSlide(); // Zaten varsa önce durdur
  intervalId = setInterval(nextSlide, 5000);
}

// Otomatik geçişi durdur
function stopAutoSlide() {
  clearInterval(intervalId);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
});

// Fareyle üzerine gelince durdur
slides.forEach((slide) => {
  slide.addEventListener("mouseenter", stopAutoSlide);
  slide.addEventListener("mouseleave", startAutoSlide);

  // Mobilde dokunma desteği
  slide.addEventListener("touchstart", stopAutoSlide);
  slide.addEventListener("touchend", startAutoSlide);
});

let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 50; // minimum sürükleme mesafesi (piksel)

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance < 0) {
      // Sağdan sola sürükleme → Sonraki slayt
      nextSlide();
    } else {
      // Soldan sağa sürükleme → Önceki slayt
      prevSlide();
    }
  }
}

slides.forEach((slide) => {
  slide.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide(); // otomatik geçişi durdur
  });

  slide.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
    startAutoSlide(); // tekrar başlat
  });
});

startAutoSlide();
