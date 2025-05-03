// Glitch animation already handled in CSS pseudo-elements
document.addEventListener("DOMContentLoaded", () => {
    const glitch = document.querySelector(".glitch");
    setInterval(() => {
        glitch.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
    }, 100);
});
