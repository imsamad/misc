"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // Your code for numSection.js here
    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".logo_container");
    const hackNavbar = document.querySelector(".hack_navbar");
    // const leftFixed = document.querySelector(".left_fixed")

    const callback = (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                navbar.style.position = "fixed";
                navbar.style.paddingTop = "0.3em";
                navbar.style.paddingBottom = "0.3em";
                // navbar.style.padding = "0.3em 3em";

                navbar.classList.add("navbar_blur");

                logo.style.width = "5rem";

                hackNavbar.style.paddingTop = "1.3em";

                // leftFixed.style.top = "3%"
            } else {
                navbar.style.position = "relative";
                navbar.classList.remove("navbar_blur");

                logo.style.width = "7rem";
                hackNavbar.style.paddingTop = "1.5em";
                navbar.style.paddingTop = "0.1em";
                navbar.style.paddingBottom = "0.1em";
                // navbar.style.padding = "0.1em 3em";
            }
        });

        // observer.unobserve(header);
    };

    const options = {
        threshold: 0.14,
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(header);
});

// // Select the header and navbar elements
// const header = document.querySelector(".header");
// const navbar = document.querySelector(".navbar");

// const callback = (entries) => {
//     entries.forEach((entry) => {
//         if (!entry.isIntersecting) {
//             // When header is not intersecting, change navbar position to fixed
//             navbar.style.position = "fixed";
//         } else {
//             // When header is intersecting, change navbar position to relative
//             navbar.style.position = "relative";
//         }
//     });

//     // observer.unobserve(header);
// };

// // Options for the Intersection Observer
// const options = {
//     threshold: 0.1, // Trigger when 90% of the header leaves the viewport
// };

// // Create a new Intersection Observer instance
// const observer = new IntersectionObserver(callback, options);

// // Start observing the header element
// observer.observe(header);
