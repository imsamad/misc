"use strict";

const modalEl = document.querySelector(".modal_container");
const modalDropShadowEl = document.querySelector(".modal_drop_shadow");
const xMarkEl = document.querySelector(".cross");
const modalBtnEl = document.querySelector('.modal_btn')
const scheduleBtn = document.querySelector(".schedule_btn");


const toggelModalVisibility = () => {
    modalEl.classList.toggle("hidden");
    modalEl.classList.toggle("xTranslated");
    modalDropShadowEl.classList.toggle("hidden");
    // modalBtnEl.classList.remove('fade')
    // setTimeout(function(){
    //     modalBtnEl.classList.toggle('fade')
    // },2000)
    setTimeout(() => {
        modalBtnEl.classList.add('manual_btn_gradient_hover');
        
        setTimeout(() => {
            modalBtnEl.classList.remove('manual_btn_gradient_hover');
        }, 550);
    }, 800);

    console.log("modal got opened or closed");
};

// const callback = () => {
//     setTimeout(()=>{
//         modalBtnEl.classList.add('fade')
//     },1000)
//     toggelModalVisibility()
// }

scheduleBtn.addEventListener("click", toggelModalVisibility);


modalDropShadowEl.addEventListener("click", toggelModalVisibility);
// modalDropShadowEl.addEventListener(z)
// xMarkEl.addEventListener("click", () => {
//     // modalEl.classList.remove("hidden");
//     // modalDropShadowEl.classList.remove("hidden");

//     console.log("modal cross");
// });

// document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape") {
//         toggelModalVisibility();
//     }
// });
