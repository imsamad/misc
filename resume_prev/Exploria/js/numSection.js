"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // Your code for numSection.js here
    const target = document.querySelector(".achievements_container");
    const counters = document.querySelectorAll(".numbers");
    const speed = 400;

    const callback = (entries, observer) => {
        const [entry] = entries;

        if (!entry.isIntersecting) return;
        console.log("listening");

        counters.forEach((counter) => {
            const animate = () => {
                const value = +counter.dataset.counter;
                const data = +counter.innerText;

                const time = value / speed;
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value;
                }
            };

            animate();
        });

        observer.unobserve(target);
    };

    const options = {
        root: null,
        // threshold: 0.55,
        threshold: 0.7,
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
});

// const target = document.querySelector(".achievements_container");
// const counters = document.querySelectorAll(".numbers");
// const speed = 400;

// const callback = (entries, observer) => {
//     const [entry] = entries;

//     if (!entry.isIntersecting) return;
//     console.log("listening");

//     counters.forEach((counter) => {
//         const animate = () => {
//             const value = +counter.dataset.counter;
//             const data = +counter.innerText;

//             const time = value / speed;
//             if (data < value) {
//                 counter.innerText = Math.ceil(data + time);
//                 setTimeout(animate, 1);
//             } else {
//                 counter.innerText = value;
//             }
//         };

//         animate();
//     });

//     observer.unobserve(target);
// };

// const options = {
//     root: null,
//     // threshold: 0.55,
//     threshold: 0.7,
// };

// const observer = new IntersectionObserver(callback, options);
// observer.observe(target);
