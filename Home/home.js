function scrollCarousel(buttonElement, direction) {
  const container = buttonElement.closest('.carousel-container');
  const carousel = container.querySelector('.carousel');

  const scrollAmount = direction === "left" ? -300 : 300;

  if (carousel) {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}