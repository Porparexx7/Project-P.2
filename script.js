document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTS
    ========================================================= */

    const screens = {
        start: document.getElementById("startScreen"),
        quiz: document.getElementById("quizScreen"),
        lotus: document.getElementById("lotusScreen"),
        heart: document.getElementById("heartScreen"),
        proposal: document.getElementById("proposalScreen"),
        success: document.getElementById("successScreen")
    };

    const startBtn = document.getElementById("startBtn");
    const nextBtn = document.getElementById("nextBtn");
    const progressFill = document.getElementById("progressFill");
    const progressPercent = document.getElementById("progressPercent");
    const questionNumber = document.getElementById("questionNumber");
    const questionText = document.getElementById("questionText");
    const answersContainer = document.getElementById("answers");

    const lotusStage = document.getElementById("lotusStage");
    const lotusParticlesContainer = document.getElementById("lotusParticles");
    const lotusLove = document.getElementById("lotusLove");
    const lotusGlow = document.getElementById("lotusGlow");
    const lotusMessage = document.getElementById("lotusMessage");

    const yesBtn = document.getElementById("yesBtn");
    const thinkBtn = document.getElementById("thinkBtn");
    const thinkPopup = document.getElementById("thinkPopup");
    const popupClose = document.getElementById("closePopup");


    /* =========================================================
       MUSIC
    ========================================================= */

    const bgMusic = document.getElementById("bgMusic");
    let musicStarted = false;

    function startMusic() {
        if (!bgMusic || musicStarted) return;

        bgMusic.volume = 0.35;

        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => { musicStarted = true; })
                .catch(error => {
                    console.log("ไม่สามารถเล่นเพลงได้ค่ะ:", error);
                });
        }
    }


    /* =========================================================
       SCREEN SYSTEM
    ========================================================= */

    function showScreen(screen) {
        if (!screen) return;

        Object.values(screens).forEach(item => {
            if (item) item.classList.remove("active");
        });

        screen.classList.add("active");
    }


    /* =========================================================
       QUIZ QUESTIONS
    ========================================================= */

    const questions = [
        {
            question: "ถ้าเค้าชวนเธอไปเที่ยว เธออยากไปที่ไหนคะ?",
            answers: [
                "ทะเลค่ะ",
                "ภูเขาค่ะ",
                "เดินเล่นในเมืองค่ะ",
                "อยู่ด้วยกันที่บ้านค่ะ"
            ]
        },
        {
            question: "ถ้าวันหนึ่งเธอเหนื่อยมาก ๆ เธออยากให้เค้าทำอะไรให้คะ?",
            answers: [
                "กอดกันค่ะ",
                "นั่งคุยกันค่ะ",
                "หาอะไรอร่อย ๆ ให้กินค่ะ",
                "อยู่ข้าง ๆ เงียบ ๆ ค่ะ"
            ]
        },
        {
            question: "ถ้ามีวันว่างหนึ่งวัน เธออยากใช้มันกับใครคะ?",
            answers: [
                "ครอบครัวค่ะ",
                "เพื่อนค่ะ",
                "คนพิเศษค่ะ",
                "ตัวเองค่ะ"
            ]
        },
        {
            question: "ระหว่างสองช่วงเวลานี้ เธอชอบช่วงไหนมากกว่าคะ?",
            answers: [
                "ตอนกลางวันค่ะ",
                "ตอนกลางคืนค่ะ",
                "ช่วงพระอาทิตย์ตกค่ะ",
                "เวลาไหนก็ได้ ถ้ามีคนที่ชอบอยู่ด้วยค่ะ"
            ]
        },
        {
            question: "ถ้ามีใครสักคนอยากอยู่ข้างเธอไปนาน ๆ เธอจะให้โอกาสเขาไหมคะ?",
            answers: [
                "ให้โอกาสค่ะ",
                "ขอคิดดูก่อนค่ะ",
                "ยังไม่แน่ใจค่ะ",
                "ถ้าเขาจริงใจก็ให้โอกาสค่ะ"
            ]
        }
    ];

    let currentQuestion = 0;
    let selectedAnswer = null;


    /* =========================================================
       PROGRESS BAR
    ========================================================= */

    function updateProgress() {
        const percent = ((currentQuestion + 1) / questions.length) * 100;

        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressPercent) progressPercent.textContent = `${Math.round(percent)}%`;
    }


    /* =========================================================
       LOAD QUESTION
    ========================================================= */

    function loadQuestion() {
        const question = questions[currentQuestion];
        if (!question) return;

        selectedAnswer = null;

        if (questionNumber) {
            questionNumber.textContent = `คำถามที่ ${currentQuestion + 1} / ${questions.length}`;
        }

        if (questionText) {
            questionText.textContent = question.question;
        }

        if (answersContainer) {
            answersContainer.innerHTML = "";
        }

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "answer-btn";
            button.textContent = answer;

            button.addEventListener("click", () => {
                document
                    .querySelectorAll("#answers .answer-btn")
                    .forEach(btn => btn.classList.remove("selected"));

                button.classList.add("selected");
                selectedAnswer = index;

                if (nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.textContent =
                        currentQuestion === questions.length - 1
                            ? "ไปต่อกันนะคะ"
                            : "คำถามต่อไป";
                }
            });

            if (answersContainer) {
                answersContainer.appendChild(button);
            }
        });

        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.textContent = "เลือกคำตอบก่อนนะคะ";
        }

        updateProgress();
    }


    /* =========================================================
       NEXT BUTTON (single listener, attached once)
    ========================================================= */

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (selectedAnswer === null) return;

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
                return;
            }

            showScreen(screens.lotus);
            prepareLotus();
        });
    }


    /* =========================================================
       START BUTTON
    ========================================================= */

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            startMusic();

            currentQuestion = 0;
            selectedAnswer = null;

            loadQuestion();
            showScreen(screens.quiz);
        });
    }


    /* =========================================================
       LOTUS: PARTICLE SHAPE
    ========================================================= */

    function createLotusPoints() {
        const points = [];
        const COUNT = 650;
        const WIDTH = 310;
        const HEIGHT = 270;

        function addPetal(points, cx, cy, rx, ry, startAngle, endAngle, amount, thickness) {
            for (let i = 0; i < amount; i++) {
                const t = i / (amount - 1);
                const angle = startAngle + (endAngle - startAngle) * t;

                const x = cx + Math.cos(angle) * rx;
                const y = cy + Math.sin(angle) * ry;

                for (let j = 0; j < thickness; j++) {
                    const spread = (Math.random() - 0.5) * 2 * (j + 1);

                    points.push({
                        x: x + spread,
                        y: y + spread * 0.45
                    });
                }
            }
        }

        addPetal(points, 0, 18, 72, 135, Math.PI * 1.12, Math.PI * 1.88, 75, 2);
        addPetal(points, 0, 10, 42, 145, Math.PI * 1.17, Math.PI * 1.83, 65, 2);
        addPetal(points, -35, 38, 58, 110, Math.PI * 1.05, Math.PI * 1.62, 60, 2);
        addPetal(points, 35, 38, 58, 110, Math.PI * 1.38, Math.PI * 1.95, 60, 2);
        addPetal(points, -72, 75, 85, 75, Math.PI * 1.08, Math.PI * 1.62, 70, 2);
        addPetal(points, 72, 75, 85, 75, Math.PI * 1.38, Math.PI * 1.92, 70, 2);
        addPetal(points, -80, 112, 100, 48, Math.PI * 1.02, Math.PI * 1.55, 55, 2);
        addPetal(points, 80, 112, 100, 48, Math.PI * 1.45, Math.PI * 1.98, 55, 2);

        for (let i = 0; i < 120; i++) {
            const x = (Math.random() - 0.5) * 245;
            const y = 105 + Math.random() * 45;
            const curve = (x * x) / 1800;

            points.push({ x: x, y: y + curve });
        }

        while (points.length < COUNT) {
            const x = (Math.random() - 0.5) * WIDTH;
            const y = (Math.random() - 0.5) * HEIGHT;

            const normalizedX = Math.abs(x) / 155;
            const normalizedY = (y + 10) / 145;

            if (
                normalizedY > -0.1 &&
                normalizedY < 1.05 &&
                normalizedX < 0.95 - normalizedY * 0.22
            ) {
                points.push({ x, y });
            }
        }

        return points.sort(() => Math.random() - 0.5);
    }


    /* =========================================================
       LOTUS: CREATE PARTICLES
    ========================================================= */

    function createLotus(container) {
        if (!container) return;

        container.innerHTML = "";

        const points = createLotusPoints();
        const symbols = ["✦", "✧", "·", "♡", "✦", "✧"];
        const colors = ["#ffffff", "#ffd6f4", "#ff9edb", "#ff72c8", "#dca8ff"];

        points.forEach((point, index) => {
            const particle = document.createElement("span");

            particle.className = "particle";
            particle.textContent = symbols[index % symbols.length];

            const size = 9 + Math.random() * 9;
            particle.style.fontSize = `${size}px`;
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];

            particle.dataset.x = point.x;
            particle.dataset.y = point.y;

            // สถานะเริ่มต้น: กระจายอยู่รอบนอก มองไม่เห็น
            const startX = (Math.random() - 0.5) * 650;
            const startY = (Math.random() - 0.5) * 500;

            particle.style.left = `calc(50% + ${startX}px)`;
            particle.style.top = `calc(50% + ${startY}px)`;
            particle.style.opacity = "0";
            particle.style.transform = "translate(-50%, -50%) scale(0)";

            container.appendChild(particle);
        });
    }


    /* =========================================================
       LOTUS: PREPARE (particles fly in to form the flower)
    ========================================================= */

    let lotusBloomed = false;

    function prepareLotus() {
        if (!lotusParticlesContainer || !lotusStage) return;

        lotusBloomed = false;
        lotusStage.classList.remove("bloomed");

        if (lotusLove) {
            lotusLove.classList.remove("show");
        }

        if (lotusMessage) {
            lotusMessage.textContent = "แตะที่ดอกบัวเพื่อให้มันบานนะคะ";
        }

        createLotus(lotusParticlesContainer);

        const particles = lotusParticlesContainer.querySelectorAll(".particle");

        particles.forEach((particle, index) => {
            const x = parseFloat(particle.dataset.x);
            const y = parseFloat(particle.dataset.y);

            setTimeout(() => {
                particle.style.left = `calc(50% + ${x}px)`;
                particle.style.top = `calc(50% + ${y}px)`;
                particle.style.opacity = "1";
                particle.style.transform = "translate(-50%, -50%) scale(1)";
            }, 300 + index * 3);
        });

        // เปิดให้แตะเพื่อบานได้ (ครั้งเดียว)
        lotusStage.addEventListener("click", bloomLotus, { once: true });
    }


    /* =========================================================
       LOTUS: BLOOM
    ========================================================= */

    function bloomLotus() {
        if (lotusBloomed || !lotusStage || !lotusParticlesContainer) return;

        lotusBloomed = true;
        lotusStage.classList.add("bloomed");

        if (lotusMessage) {
            lotusMessage.textContent = "ดอกบัวกำลังบานให้เธอเห็นคำตอบนะคะ";
        }

        if (lotusGlow) {
            lotusGlow.style.opacity = "1";
        }

        if (lotusLove) {
            lotusLove.classList.add("show");
        }

        const particles = lotusParticlesContainer.querySelectorAll(".particle");

        particles.forEach((particle, index) => {
            setTimeout(() => {
                const x = parseFloat(particle.dataset.x);
                const y = parseFloat(particle.dataset.y);
                const distance = 1.08 + Math.random() * 0.18;

                particle.style.left = `calc(50% + ${x * distance}px)`;
                particle.style.top = `calc(50% + ${y * distance}px)`;
                particle.style.transform = "translate(-50%, -50%) scale(1.15)";
                particle.style.filter = "brightness(1.8)";
            }, index * 2);
        });

        createLotusBloomSparkles();

        setTimeout(() => {
            setupHeartScreen();
            showScreen(screens.heart);
        }, 2600);
    }


    /* =========================================================
       LOTUS: BLOOM SPARKLES
    ========================================================= */

    function createLotusBloomSparkles() {
        const screen = screens.lotus;
        if (!screen) return;

        for (let i = 0; i < 45; i++) {
            const sparkle = document.createElement("span");

            sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";

            sparkle.style.position = "absolute";
            sparkle.style.left = `${35 + Math.random() * 30}%`;
            sparkle.style.top = `${30 + Math.random() * 40}%`;
            sparkle.style.fontSize = `${8 + Math.random() * 16}px`;
            sparkle.style.color = "#ffd6f4";
            sparkle.style.textShadow = `
                0 0 8px #ff8ed4,
                0 0 20px #ff5db8,
                0 0 35px #d98cff
            `;
            sparkle.style.pointerEvents = "none";
            sparkle.style.zIndex = "50";
            sparkle.style.opacity = "0";

            screen.appendChild(sparkle);

            setTimeout(() => {
                sparkle.style.transition = "all 1.8s ease-out";
                sparkle.style.opacity = "1";
                sparkle.style.transform = `
                    translate(
                        ${(Math.random() - 0.5) * 350}px,
                        ${(Math.random() - 0.5) * 300}px
                    )
                    scale(1.5)
                `;
            }, 100);

            setTimeout(() => {
                sparkle.style.opacity = "0";
            }, 1500);

            setTimeout(() => {
                sparkle.remove();
            }, 3500);
        }
    }


    /* =========================================================
       HEART SCREEN (scroll to the end, then tap to continue)
    ========================================================= */

    let heartScreenReady = false;

    function setupHeartScreen() {
        if (heartScreenReady) return;
        heartScreenReady = true;

        const heartText = document.getElementById("heartText");
        const continueElement = document.getElementById("touchHint");
        const target = screens.heart; // this is the element with overflow-y: auto

        if (heartText) {
            heartText.innerHTML = `
                <p>
                    เค้าไม่รู้ว่าตั้งแต่เมื่อไหร่
                    ที่เธอกลายเป็นคนที่เค้านึกถึงบ่อย ๆ
                    และเป็นคนที่ทำให้วันธรรมดา ๆ
                    ของเค้ารู้สึกพิเศษขึ้นมา
                </p>

                <p>
                    บางครั้งแค่ได้คุยกับเธอ
                    ได้เห็นเธอยิ้ม
                    หรือได้รู้ว่าเธอเป็นยังไง
                    มันก็ทำให้เค้ารู้สึกดีขึ้นมากแล้วค่ะ
                </p>

                <p>
                    เค้าอาจจะไม่ได้พูดออกมาเก่งที่สุด
                    และบางครั้งก็ไม่รู้ว่าจะต้องแสดงความรู้สึกยังไง
                    แต่ความรู้สึกที่เค้ามีให้เธอ
                    มันค่อย ๆ เพิ่มขึ้นทุกวันจริง ๆ ค่ะ
                </p>

                <p>
                    เค้าชอบเวลาที่ได้อยู่ใกล้เธอ
                    ชอบเวลาที่ได้คุยกัน
                    และชอบความรู้สึกที่ว่า
                    อย่างน้อยในหนึ่งวัน
                    เค้ายังมีเธอให้คิดถึงค่ะ
                </p>

                <p>
                    เค้าไม่อยากเร่งให้เธอต้องตอบอะไร
                    และไม่อยากทำให้เธอรู้สึกกดดันนะคะ
                    เค้าแค่อยากซื่อสัตย์กับความรู้สึกของตัวเอง
                    และบอกเธอเอาไว้ตรง ๆ
                </p>

                <p>
                    ว่าเค้าชอบเธอนะคะ
                    ชอบมากขึ้นเรื่อย ๆ
                    จนสุดท้ายเค้าก็อยากรู้ว่า
                    ถ้าเค้าขออยู่ข้าง ๆ เธอ
                    ในสถานะที่มากกว่าเดิม
                    เธอจะเปิดโอกาสให้เค้าไหมค่ะ
                </p>
            `;
        }

        if (continueElement) {
            continueElement.textContent = "อ่านจนจบแล้วนะคะ... แตะตรงไหนก็ได้เพื่อไปต่อ";
            continueElement.style.opacity = "0.55";
        }

        if (!target) return;

        let canContinue = false;

        function checkScroll() {
            const scrollTop = target.scrollTop;
            const clientHeight = target.clientHeight;
            const scrollHeight = target.scrollHeight;

            const atBottom = scrollTop + clientHeight >= scrollHeight - 30;

            if (atBottom && !canContinue) {
                canContinue = true;

                if (continueElement) {
                    continueElement.classList.add("ready");
                    continueElement.style.opacity = "1";
                }
            }
        }

        target.addEventListener("scroll", checkScroll);

        target.addEventListener("click", event => {
            if (!canContinue) return;
            if (event.target.closest("button")) return;

            showProposal();
        });

        setTimeout(checkScroll, 300);
    }


    /* =========================================================
       PROPOSAL
    ========================================================= */

    function showProposal() {
        showScreen(screens.proposal);
    }

    if (yesBtn) {
        yesBtn.addEventListener("click", showSuccess);
    }

    if (thinkBtn) {
        thinkBtn.addEventListener("click", openThinkPopup);
    }


    /* =========================================================
       THINK POPUP
    ========================================================= */

    function openThinkPopup() {
        if (thinkPopup) thinkPopup.classList.add("show");
    }

    function closeThinkPopup() {
        if (thinkPopup) thinkPopup.classList.remove("show");
    }

    if (popupClose) {
        popupClose.addEventListener("click", closeThinkPopup);
    }

    if (thinkPopup) {
        thinkPopup.addEventListener("click", event => {
            if (event.target === thinkPopup) closeThinkPopup();
        });
    }


    /* =========================================================
       SUCCESS
    ========================================================= */

    function showSuccess() {
        showScreen(screens.success);
        createSuccessSparkles();
    }

    function createSuccessSparkles() {
        const success = screens.success;
        if (!success) return;

        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement("span");

            sparkle.textContent = Math.random() > 0.5 ? "✦" : "♡";

            sparkle.style.position = "absolute";
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.color = "#ffffff";
            sparkle.style.fontSize = `${8 + Math.random() * 14}px`;
            sparkle.style.pointerEvents = "none";
            sparkle.style.opacity = "0";
            sparkle.style.animation = `successSparkle ${1.5 + Math.random() * 2}s ease-out forwards`;

            success.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 4000);
        }

        if (!document.getElementById("successSparkleStyle")) {
            const style = document.createElement("style");
            style.id = "successSparkleStyle";
            style.textContent = `
                @keyframes successSparkle {
                    0% { opacity: 0; transform: scale(.2) rotate(0deg); }
                    40% { opacity: 1; }
                    100% { opacity: 0; transform: scale(1.5) rotate(180deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }


    /* =========================================================
       INITIALIZE
    ========================================================= */

    Object.values(screens).forEach(screen => {
        if (screen) screen.classList.remove("active");
    });

    if (screens.start) {
        screens.start.classList.add("active");
    }

    console.log("เว็บไซต์พร้อมใช้งานแล้วค่ะ");
});
