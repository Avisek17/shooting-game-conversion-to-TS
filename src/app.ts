import { GameController } from "./game/game.js";

const game = new GameController();

const startButton = document.getElementById("startBtn"); 

if (startButton) {
    startButton.addEventListener("click", () => {
        game.startGame();
    });
} else {
    console.error("Could not find the start button element in the DOM. Check your HTML ID!");
}

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

    window.onclick = (e: MouseEvent) => {
        if (e.target === copyrightModal) {
            copyrightModal.style.display = "none";
        }
    };
}