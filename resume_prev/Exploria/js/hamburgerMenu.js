"use strict";

const hamburgerEl = document.querySelector(".hamburger");
const hamburgerDropShadowEl = document.querySelector(".hamburger_drop_shadow");
const crossEl = document.querySelector(".hamburger_cross");
const hamburgerBtnEl = document.querySelector(".hamburger_container");
const navHamburgerEl = document.querySelector(".hamburger_nav_list");
// const navListItemEl = document.querySelector()

const toggelHamburgerMenuVisibility = () => {
    hamburgerEl.classList.toggle("hidden");
    hamburgerEl.classList.toggle('ham_transition')
    hamburgerDropShadowEl.classList.toggle("hidden");

    console.log("hamburger menu got opened or closed");
};

hamburgerBtnEl.addEventListener("click", toggelHamburgerMenuVisibility);

hamburgerDropShadowEl.addEventListener("click", toggelHamburgerMenuVisibility);

crossEl.addEventListener("click", toggelHamburgerMenuVisibility);

navHamburgerEl.addEventListener("click", (e) => {
    // console.log(e.target.classList.contains("list_item"));

    if (e.target.classList.contains("list_item")) return;

    // console.log(e.target.classList.contains("list_item"));
    // console.log("somethinggggggg");

    toggelHamburgerMenuVisibility();
});

// crossEl.addEventListener("click", () => {
//     console.log("before any code");
//     // hamburgerEl.classList.remove("hidden");
//     // hamburgerDropShadowEl.classList.remove("hidden");
//     console.log("after any code");
// });

// document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape") {
//         toggelHamburgerMenuVisibility();
//     }
// });
