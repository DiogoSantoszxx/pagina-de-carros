const menuLinks = document.querySelectorAll('a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  smoothScrollTo(0, distanceFromTheTop, 800); // Aumenta a duração para 800ms
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 800; // Define a duração da animação para 800ms

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  function animateScroll() {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - startTime;
    const nextX = easeInOutQuart(timeElapsed, startX, distanceX, duration);
    const nextY = easeInOutQuart(timeElapsed, startY, distanceY, duration);

    if (timeElapsed < duration) {
      window.scroll(nextX, nextY);
      requestAnimationFrame(animateScroll); // Usa requestAnimationFrame para rolagem mais suave
    } else {
      window.scroll(endX, endY); // Garante que termina no ponto exato
    }
  }

  animateScroll();
}

