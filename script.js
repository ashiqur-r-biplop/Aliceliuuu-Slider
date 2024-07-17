document.addEventListener("DOMContentLoaded", function () {
  const sliderContent = document.querySelector(".slider-content");
  const slides = document.querySelectorAll(".image-card-wrapper");

  const totalSlides = slides.length;
  let slideWidth = slides[0].offsetWidth;
  let currentSlideIndex = 0;
  let isAnimating = false; // Flag to prevent rapid multiple clicks

  function updateSlideWidth() {
    slideWidth = slides[0].offsetWidth;
  }

  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    // Loop back to the beginning if at the last set of slides
    if (index >= totalSlides - 3) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = totalSlides - 3;
    } else {
      currentSlideIndex = index;
    }

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      sliderContent.style.transform = `translateX(-${
        currentSlideIndex === 0
          ? currentSlideIndex * slideWidth
          : currentSlideIndex === 1
          ? currentSlideIndex * slideWidth + 12
          : currentSlideIndex === 2
          ? currentSlideIndex * slideWidth + 24
          : currentSlideIndex === 3
          ? currentSlideIndex * slideWidth + 36
          : currentSlideIndex * slideWidth
      }px)`;
    } else {
      sliderContent.style.transform = `translateX(-${
        currentSlideIndex === 0
          ? currentSlideIndex * slideWidth
          : currentSlideIndex === 1
          ? currentSlideIndex * slideWidth + 33
          : currentSlideIndex === 2
          ? currentSlideIndex * slideWidth + 33 * 2
          : currentSlideIndex === 3
          ? currentSlideIndex * slideWidth + 33 * 3
          : currentSlideIndex === 4
          ? currentSlideIndex * slideWidth + 33 * 4
          : currentSlideIndex === 5
          ? currentSlideIndex * slideWidth + 33 * 5
          : currentSlideIndex === 6
          ? currentSlideIndex * slideWidth + 33 * 6
          : currentSlideIndex === 7
          ? currentSlideIndex * slideWidth + 33 * 7
          : currentSlideIndex === 8
          ? currentSlideIndex * slideWidth + 33 * 8
          : currentSlideIndex === 9
          ? currentSlideIndex * slideWidth + 33 * 9
          : currentSlideIndex === 10
          ? currentSlideIndex * slideWidth + 33 * 10
          : currentSlideIndex === 11
          ? currentSlideIndex * slideWidth + 33 * 11
          : currentSlideIndex === 12
          ? currentSlideIndex * slideWidth + 33 * 12
          : currentSlideIndex === 13
          ? currentSlideIndex * slideWidth + 33 * 13
          : currentSlideIndex === 14
          ? currentSlideIndex * slideWidth + 33 * 14
          : currentSlideIndex * slideWidth
      }px)`;
    }

    sliderContent.style.transition = "transform 0.5s ease-in-out";

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function slideLeft() {
    goToSlide(currentSlideIndex - 1);
  }

  function slideRight() {
    goToSlide(currentSlideIndex + 1);
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
});
