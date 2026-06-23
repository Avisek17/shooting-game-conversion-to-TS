import { GameController } from "./game/game.js";
// 1. Initialize your game controller instance
const game = new GameController();
// 2. Safely grab the start button from your HTML DOM
const startButton = document.getElementById("startBtn"); // Double check that your HTML button has id="startBtn"
// 3. Attach a clean click listener to boot up the game area
if (startButton) {
    startButton.addEventListener("click", () => {
        game.startGame();
    });
}
else {
    console.error("Could not find the start button element in the DOM. Check your HTML ID!");
}
// ==========================================
// Keep your existing Copyright Modal logic below
// ==========================================
const copyrightBtn = document.getElementById("copyrightBtn");
const copyrightModal = document.getElementById("copyrightModal");
if (copyrightBtn && copyrightModal) {
    copyrightBtn.onclick = () => {
        copyrightModal.style.display = "flex";
    };
    const closeBtn = document.getElementById("closeCopyrightBtn");
    if (closeBtn) {
        closeBtn.onclick = () => {
            copyrightModal.style.display = "none";
        };
    }
    window.onclick = (e) => {
        if (e.target === copyrightModal) {
            copyrightModal.style.display = "none";
        }
    };
}
