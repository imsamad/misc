// Throttle function to limit the rate at which a function can fire
function throttle(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(context, args);
        timeoutId = null;
      }, delay);
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const imgBoxes = document.querySelectorAll('.imgBox');
  let angle = 0;
  const numIcons = imgBoxes.length;
  const angleStep = 360 / numIcons;
  const targetAngle = 0; // Angle where the second icon initially is

  // Initialize the visibility and transformation of icons
  imgBoxes.forEach((imgBox, index) => {
    const img = imgBox.querySelector('img');
    img.style.opacity = '0'; // Start with all images hidden
    imgBox.style.transform = `rotate(${
      angleStep * index
    }deg) translate(0, -150px)`;
  });

  function updateRotation() {
    const scrollY = window.scrollY;
    angle = scrollY + 10; // You can adjust this factor to control the rotation speed
    container.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    // Calculate the current angle of each icon
    imgBoxes.forEach((imgBox, index) => {
      const img = imgBox.querySelector('img');
      const currentAngle = (angle + angleStep * index) % 360;

      // If the current angle is close to the target angle, make the image visible
      if (Math.abs(currentAngle - targetAngle) < angleStep / 2) {
        img.style.opacity = '1';
        // img.style.transform = 'scale(3)';
      } else {
        img.style.opacity = '0';
        // img.style.transform = 'scale()';
      }
    });
  }

  // Throttle the scroll event listener with a delay of 100ms
  const throttledUpdateRotation = updateRotation;
  window.addEventListener('scroll', throttledUpdateRotation);

  // Initial call to set the rotation based on initial scroll position
  updateRotation();
});
