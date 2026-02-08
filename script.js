const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

const closeBtn = document.querySelector(".win-btn.close");
const minimizeBtn = document.querySelector(".win-btn.minimize");
const maximizeBtn = document.querySelector(".win-btn.maximize");
const pixelWindow = document.querySelector(".pixel-window");

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        pixelWindow.classList.add("open");
    }, 50);
});

if(closeBtn) {
    closeBtn.addEventListener("click", () => {
        pixelWindow.classList.remove("open");
        setTimeout(() => {
            letter.style.display = "none";
            envelope.style.display = "block";

            title.textContent = "Will you be my Valentine?";
            catImg.src = "cat_heart.gif";
            pixelWindow.classList.remove("final");
            buttons.style.display = "flex";
            finalText.style.display = "none";
            
            noBtn.style.transform = "translate(0, 0)";
            
            yesScale = 1;
            yesBtn.style.transform = "scale(1)";
            
            if(miniEnvelope) {
                miniEnvelope.style.display = "none";
            }
            
            if(proposalContainer) {
                proposalContainer.style.display = "none";
                const pWindow = proposalContainer.querySelector(".pixel-window");
                if(pWindow) pWindow.classList.remove("open");
            }
        }, 600);
    });
}

if(minimizeBtn) {
    minimizeBtn.addEventListener("click", () => {
        pixelWindow.classList.remove("open");
        setTimeout(() => {
            letter.style.display = "none";
            envelope.style.display = "block";
        }, 600);
    });
}

if(maximizeBtn) {
    maximizeBtn.addEventListener("click", () => {
        if(pixelWindow.classList.contains("maximized")) {
            pixelWindow.style.transform = "scale(1)";
            pixelWindow.classList.remove("maximized");
        } else {
            pixelWindow.style.transform = "scale(1.1)";
            pixelWindow.classList.add("maximized");
        }
    });
}


let noClickCount = 0;
let yesScale = 1;

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    noClickCount++;
    
    title.textContent = "Are you sure?";
    catImg.src = "cat_crying.png";
    
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;
    
    moveNoButton();
});

function moveNoButton() {
    const min = 50;
    const max = 150;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    pixelWindow.classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
    
    if(miniEnvelope) {
        miniEnvelope.style.display = "block";
    }
});

const miniEnvelope = document.getElementById("mini-envelope");
const proposalContainer = document.getElementById("proposal-container");
const closeProposalBtn = document.querySelector(".close-proposal");
const proposalSlide = document.getElementById("proposal-slide");

const slides = ["cat_heart.gif", "cat_dance.gif"];
let currentSlideIndex = 0;

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    if(proposalSlide) {
        proposalSlide.src = slides[currentSlideIndex];
    }
}

let slideInterval = setInterval(nextSlide, 2500);

if(proposalSlide) {
    proposalSlide.parentElement.addEventListener("click", () => {
        nextSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 2500);
    });
}

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('dragstart', event => event.preventDefault());
document.addEventListener('selectstart', event => {
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
    }
});

if(miniEnvelope) {
    miniEnvelope.addEventListener("click", (e) => {
        e.stopPropagation();
        letter.style.display = "none";
        if(proposalContainer) {
            proposalContainer.style.display = "flex";
            
            const proposalWindow = proposalContainer.querySelector(".pixel-window");
            if(proposalWindow) {
                setTimeout(() => {
                    proposalWindow.classList.add("open");
                }, 10);
            }
        }
    });
}

if(closeProposalBtn) {
    closeProposalBtn.addEventListener("click", () => {
        if(proposalContainer) {
            const proposalWindow = proposalContainer.querySelector(".pixel-window");
            if(proposalWindow) {
                proposalWindow.classList.remove("open");
                
                setTimeout(() => {
                    proposalContainer.style.display = "none";
                    
                    letter.style.display = "none";
                    envelope.style.display = "block";

                    pixelWindow.classList.remove("open");
                    title.textContent = "Will you be my Valentine?";
                    catImg.src = "cat_heart.gif";
                    pixelWindow.classList.remove("final");
                    buttons.style.display = "flex";
                    finalText.style.display = "none";
                    
                    noBtn.style.transform = "translate(0, 0)";
                    
                    yesScale = 1;
                    yesBtn.style.transform = "scale(1)";
                    
                    if(miniEnvelope) {
                        miniEnvelope.style.display = "none";
                    }
                }, 600);
            } else {
                proposalContainer.style.display = "none";
                
                letter.style.display = "none";
                envelope.style.display = "block";
                
                pixelWindow.classList.remove("open");
                title.textContent = "Will you be my Valentine?";
                catImg.src = "cat_heart.gif";
                pixelWindow.classList.remove("final");
                buttons.style.display = "flex";
                finalText.style.display = "none";
                noBtn.style.transform = "translate(0, 0)";
                
                if(miniEnvelope) miniEnvelope.style.display = "none";
            }
        }
    });
}
