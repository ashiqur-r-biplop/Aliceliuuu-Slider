document.addEventListener("DOMContentLoaded", function () {
  const sliderContent = document.querySelector(".slider-content");
  const slides = Array.from(document.querySelectorAll(".image-card-wrapper"));
  const totalSlides = slides.length;
  let slideWidth = slides[0].offsetWidth;
  let currentSlideIndex = 1; // Start from the first real slide
  let isAnimating = false;
  const autoSlideInterval = 3000;
  let autoSlideTimer;

  // Clone the first and last slides
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);

  // Append the cloned slides
  sliderContent.appendChild(firstClone);
  sliderContent.insertBefore(lastClone, slides[0]);

  function updateSlideWidth() {
    slideWidth = slides[0].offsetWidth;
  }

  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? index * slideWidth : index * (slideWidth + 32);

    sliderContent.style.transform = `translateX(-${offset}px)`;
    sliderContent.style.transition = "transform 0.5s ease-in-out";

    currentSlideIndex = index;

    setTimeout(() => {
      if (index >= totalSlides + 1) {
        sliderContent.style.transition = "none";
        sliderContent.style.transform = `translateX(-${
          isMobile ? slideWidth : slideWidth + 32
        }px)`;
        currentSlideIndex = 1;
      } else if (index <= 0) {
        sliderContent.style.transition = "none";
        sliderContent.style.transform = `translateX(-${
          isMobile ? totalSlides * slideWidth : totalSlides * (slideWidth + 32)
        }px)`;
        currentSlideIndex = totalSlides;
      }

      // Force reflow
      sliderContent.offsetHeight;
      sliderContent.style.transition = "transform 0.5s ease-in-out";
      isAnimating = false;
    }, 500);

    resetAutoSlideTimer();
  }

  function slideLeft() {
    goToSlide(currentSlideIndex - 1);
  }

  function slideRight() {
    goToSlide(currentSlideIndex + 1);
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(slideRight, autoSlideInterval);
  }

  function resetAutoSlideTimer() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  document
    .querySelector(".next-prev-buttons button:first-child")
    .addEventListener("click", slideLeft);
  document
    .querySelector(".next-prev-buttons button:last-child")
    .addEventListener("click", slideRight);

  window.addEventListener("resize", () => {
    updateSlideWidth();
    goToSlide(currentSlideIndex);
  });

  updateSlideWidth();
  goToSlide(currentSlideIndex);
  startAutoSlide();
});
