// script.js

document.addEventListener("DOMContentLoaded", () => {
    const glitch = document.querySelector(".glitch");
    setInterval(() => {
        glitch.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
    }, 100);
});
