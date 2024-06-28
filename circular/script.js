document.addEventListener('scroll', () => {
  const circle = document.querySelector('.circle');
  const scrollPosition = window.scrollY;
  const rotationDegree = scrollPosition % 360;
  circle.style.transform = `rotate(${rotationDegree}deg)`;

  const icons = document.querySelectorAll('.icon');
  icons.forEach((icon, index) => {
    const iconDegree = (index * 36 - rotationDegree) % 360;
    if (iconDegree === 60 || iconDegree === -300) {
      icon.style.transform = `rotate(${
        index * 36
      }deg) translate(120px) rotate(${-index * 36}deg) scale(1.2)`;
      icon.style.fontSize = '1.5em';
    } else {
      icon.style.transform = `rotate(${
        index * 36
      }deg) translate(120px) rotate(${-index * 36}deg)`;
      icon.style.fontSize = '1em';
    }
  });
});
