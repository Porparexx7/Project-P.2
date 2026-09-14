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


    const startBtn =
        document.getElementById("startBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const progressFill =
        document.getElementById("progressFill");

    const progressPercent =
        document.getElementById("progressPercent");

    const questionNumber =
        document.getElementById("questionNumber");

    const questionText =
        document.getElementById("questionText");

    const answersContainer =
        document.getElementById("answers");


    /* =========================================================
       MUSIC
    ========================================================= */

    const bgMusic =
        document.getElementById("bgMusic");

    let musicStarted = false;


    function startMusic() {

        if (!bgMusic) {
            console.log("ไม่พบ bgMusic ใน HTML");
            return;
        }

        if (musicStarted) {
            return;
        }

        bgMusic.volume = 0.35;

        const playPromise =
            bgMusic.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    musicStarted = true;

                    console.log(
                        "เพลงกำลังเล่นแล้วค่ะ"
                    );

                })
                .catch(error => {

                    console.log(
                        "ไม่สามารถเล่นเพลงได้ค่ะ:",
                        error
                    );

                });

        }

    }


    /* =========================================================
       SCREEN SYSTEM
    ========================================================= */

    function showScreen(screen) {

        if (!screen) {
            return;
        }

        Object.values(screens).forEach(item => {

            if (item) {
                item.classList.remove("active");
            }

        });

        screen.classList.add("active");

    }


    /* =========================================================
       QUESTIONS
    ========================================================= */

    const questions = [

        {
            question:
                "ถ้าเค้าชวนเธอไปเที่ยว เธออยากไปที่ไหนคะ?",

            answers: [

                "ทะเลค่ะ",

                "ภูเขาค่ะ",

                "เดินเล่นในเมืองค่ะ",

                "อยู่ด้วยกันที่บ้านค่ะ"

            ]
        },


        {
            question:
                "ถ้าวันหนึ่งเธอเหนื่อยมาก ๆ เธออยากให้เค้าทำอะไรให้คะ?",

            answers: [

                "กอดกันค่ะ",

                "นั่งคุยกันค่ะ",

                "หาอะไรอร่อย ๆ ให้กินค่ะ",

                "อยู่ข้าง ๆ เงียบ ๆ ค่ะ"

            ]
        },


        {
            question:
                "ถ้ามีวันว่างหนึ่งวัน เธออยากใช้มันกับใครคะ?",

            answers: [

                "ครอบครัวค่ะ",

                "เพื่อนค่ะ",

                "คนพิเศษค่ะ",

                "ตัวเองค่ะ"

            ]
        },


        {
            question:
                "ระหว่างสองช่วงเวลานี้ เธอชอบช่วงไหนมากกว่าคะ?",

            answers: [

                "ตอนกลางวันค่ะ",

                "ตอนกลางคืนค่ะ",

                "ช่วงพระอาทิตย์ตกค่ะ",

                "เวลาไหนก็ได้ ถ้ามีคนที่ชอบอยู่ด้วยค่ะ"

            ]
        },


        {
            question:
                "ถ้ามีใครสักคนอยากอยู่ข้างเธอไปนาน ๆ เธอจะให้โอกาสเขาไหมคะ?",

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
       LOAD QUESTION
    ========================================================= */

    function loadQuestion() {

    const question =
        questions[currentQuestion];

    if (!question) {
        console.error(
            "ไม่พบคำถามลำดับ:",
            currentQuestion
        );
        return;
    }

    selectedAnswer = null;

    /* =========================
       QUESTION NUMBER
    ========================= */

    if (questionNumber) {

        questionNumber.textContent =
            `คำถามที่ ${currentQuestion + 1} / ${questions.length}`;

    }


    /* =========================
       QUESTION TEXT
    ========================= */

    if (questionText) {

        questionText.textContent =
            question.question;

    }


    /* =========================
       CLEAR OLD ANSWERS
    ========================= */

    if (answersContainer) {

        answersContainer.innerHTML = "";

    }


    /* =========================
       CREATE ANSWERS
    ========================= */

    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "answer-btn";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    /*
                     * ลบ selected จากทุกปุ่ม
                     */

                    document
                        .querySelectorAll(
                            "#answers .answer-btn"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "selected"
                            );

                        });


                    /*
                     * เลือกปุ่มนี้
                     */

                    button.classList.add(
                        "selected"
                    );


                    selectedAnswer =
                        index;


                    /*
                     * เปิดปุ่มถัดไป
                     */

                    if (nextBtn) {

                        nextBtn.disabled =
                            false;


                        nextBtn.textContent =
                            currentQuestion ===
                            questions.length - 1

                                ? "ไปต่อกันนะคะ"

                                : "คำถามต่อไป";

                    }

                }
            );


            if (answersContainer) {

                answersContainer.appendChild(
                    button
                );

            }

        }
    );


    /* =========================
       RESET NEXT BUTTON
    ========================= */

    if (nextBtn) {

        nextBtn.disabled =
            true;


        nextBtn.textContent =
            "เลือกคำตอบก่อนนะคะ";

    }


    /* =========================
       PROGRESS
    ========================= */

    const percent =
        (
            (currentQuestion + 1) /
            questions.length
        ) * 100;


    if (progressFill) {

        progressFill.style.width =
            `${percent}%`;

    }


    if (progressPercent) {

        progressPercent.textContent =
            `${Math.round(percent)}%`;

    }

}

    /* =========================================================
       PROGRESS
    ========================================================= */

    function updateProgress() {

        const percent =
            (
                (currentQuestion + 1) /
                questions.length
            ) * 100;


        if (progressFill) {

            progressFill.style.width =
                `${percent}%`;

        }


        if (progressPercent) {

            progressPercent.textContent =
                `${Math.round(percent)}%`;

        }

    }


    /* =========================================================
       START BUTTON
    ========================================================= */

    if (startBtn) {

        startBtn.addEventListener(
            "click",
            () => {

                startMusic();

                currentQuestion = 0;

                selectedAnswer = null;

                loadQuestion();

                showScreen(
                    screens.quiz
                );

            }
        );

    }


    /* =========================================================
       NEXT BUTTON
    ========================================================= */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                if (
                    selectedAnswer === null
                ) {
                    return;
                }


                if (
                    currentQuestion <
                    questions.length - 1
                ) {

                    currentQuestion++;

                    loadQuestion();

                    return;

                }


                /*
                 * ตอบครบ 5 ข้อ
                 */

                startLotusAnimation();

            }
        );

    }


    /* =========================================================
       PARTICLE LOTUS
    ========================================================= */

    function createLotusPoints() {

        const points = [];


        /*
         * ขนาดพื้นที่ดอกบัว
         *
         * 600 x 420
         */

        const cx = 300;

        const cy = 215;


        /* -----------------------------------------------------
           สร้างกลีบ
        ----------------------------------------------------- */

        function addPetal({
            angle = 0,
            width = 100,
            height = 180,
            offsetX = 0,
            offsetY = 0,
            amount = 100,
            curve = 0
        }) {

            for (
                let i = 0;
                i < amount;
                i++
            ) {

                const t =
                    Math.random();


                /*
                 * ความกว้างของกลีบ
                 */

                const widthShape =
                    Math.sin(
                        Math.PI * t
                    );


                let x =
                    (
                        Math.random() -
                        0.5
                    ) *
                    width *
                    widthShape;


                let y =
                    height * t;


                /*
                 * ทำให้กลีบโค้ง
                 */

                x +=
                    curve *
                    Math.sin(
                        Math.PI * t
                    );


                /*
                 * ปลายกลีบเรียว
                 */

                const tip =
                    1 -
                    Math.pow(
                        t,
                        2.5
                    );


                x *=
                    0.4 +
                    tip * 0.6;


                /*
                 * หมุนกลีบ
                 */

                const cos =
                    Math.cos(angle);

                const sin =
                    Math.sin(angle);


                const rotatedX =
                    x * cos -
                    y * sin;

                const rotatedY =
                    x * sin +
                    y * cos;


                points.push({

                    x:
                        cx +
                        rotatedX +
                        offsetX,

                    y:
                        cy -
                        rotatedY +
                        offsetY

                });

            }

        }


        /* -----------------------------------------------------
           กลีบหลังซ้าย
        ----------------------------------------------------- */

        addPetal({

            angle: -0.78,

            width: 150,

            height: 190,

            offsetY: 0,

            amount: 130,

            curve: -18

        });


        /* -----------------------------------------------------
           กลีบหลังขวา
        ----------------------------------------------------- */

        addPetal({

            angle: 0.78,

            width: 150,

            height: 190,

            offsetY: 0,

            amount: 130,

            curve: 18

        });


        /* -----------------------------------------------------
           กลีบชั้นกลางซ้าย
        ----------------------------------------------------- */

        addPetal({

            angle: -0.42,

            width: 170,

            height: 215,

            offsetY: -8,

            amount: 150,

            curve: -15

        });


        /* -----------------------------------------------------
           กลีบชั้นกลางขวา
        ----------------------------------------------------- */

        addPetal({

            angle: 0.42,

            width: 170,

            height: 215,

            offsetY: -8,

            amount: 150,

            curve: 15

        });


        /* -----------------------------------------------------
           กลีบกลาง
        ----------------------------------------------------- */

        addPetal({

            angle: 0,

            width: 145,

            height: 235,

            offsetY: -15,

            amount: 170,

            curve: 0

        });


        /* -----------------------------------------------------
           กลีบหน้าซ้าย
        ----------------------------------------------------- */

        addPetal({

            angle: -1.05,

            width: 185,

            height: 145,

            offsetY: 48,

            amount: 130,

            curve: -25

        });


        /* -----------------------------------------------------
           กลีบหน้าขวา
        ----------------------------------------------------- */

        addPetal({

            angle: 1.05,

            width: 185,

            height: 145,

            offsetY: 48,

            amount: 130,

            curve: 25

        });


        /* -----------------------------------------------------
           กลีบหน้าตรง
        ----------------------------------------------------- */

        addPetal({

            angle: 0,

            width: 210,

            height: 125,

            offsetY: 70,

            amount: 160,

            curve: 0

        });


        /* -----------------------------------------------------
           ฐานดอกบัว
        ----------------------------------------------------- */

        for (
            let i = 0;
            i < 260;
            i++
        ) {

            const t =
                i / 259;


            const x =
                cx -
                175 +
                t * 350;


            const curve =
                Math.sin(
                    Math.PI * t
                );


            const y =
                cy +
                90 -
                curve * 50;


            points.push({

                x:
                    x +
                    (
                        Math.random() -
                        0.5
                    ) * 5,

                y:
                    y +
                    (
                        Math.random() -
                        0.5
                    ) * 7

            });

        }


        return points;

    }


    /* =========================================================
       CREATE LOTUS
    ========================================================= */

    function createLotus() {

        const lotus =
            document.getElementById(
                "lotusKeao"
            );


        if (!lotus) {

            console.log(
                "ไม่พบ #lotusKeao"
            );

            return;

        }


        lotus.innerHTML =
            "";


        /*
         * สัญลักษณ์ Particle
         */

        const symbols = [

            "✦",
            "✧",
            "·",
            "•",
            "♡",
            "✦",
            "✧",
            "·"

        ];


        const points =
            createLotusPoints();


        /*
         * ให้ container มีขนาดแน่นอน
         */

        lotus.style.position =
            "absolute";

        lotus.style.width =
            "600px";

        lotus.style.height =
            "420px";

        lotus.style.left =
            "50%";

        lotus.style.top =
            "50%";

        lotus.style.transform =
            "translate(-50%, -50%)";


        points.forEach(
            (point, index) => {

                const particle =
                    document.createElement(
                        "span"
                    );


                particle.className =
                    "particle";


                /*
                 * ใส่ตัวอักษร
                 */

                particle.textContent =
                    symbols[
                        Math.floor(
                            Math.random() *
                            symbols.length
                        )
                    ];


                /*
                 * เก็บตำแหน่งเป้าหมาย
                 */

                particle.dataset.targetX =
                    point.x;

                particle.dataset.targetY =
                    point.y;


                /*
                 * จุดเริ่มต้น
                 * เริ่มจากกลาง
                 */

                particle.style.left =
                    "300px";

                particle.style.top =
                    "215px";


                particle.style.opacity =
                    "0";


                particle.style.transform =
                    "translate(-50%, -50%) scale(0)";


                /*
                 * ขนาดสุ่ม
                 */

                const size =
                    10 +
                    Math.random() * 9;


                particle.style.fontSize =
                    `${size}px`;


                /*
                 * สี
                 */

                if (
                    Math.random() >
                    0.45
                ) {

                    particle.style.color =
                        "#ffffff";

                } else {

                    particle.style.color =
                        "#ffd0ef";

                }


                /*
                 * Glow
                 */

                particle.style.textShadow =
                    `
                    0 0 6px currentColor,
                    0 0 12px currentColor,
                    0 0 22px rgba(255,120,210,.7)
                    `;


                /*
                 * Transition
                 */

                particle.style.transition =
                    `
                    left 1.8s cubic-bezier(.2,.8,.2,1),
                    top 1.8s cubic-bezier(.2,.8,.2,1),
                    transform 1.8s cubic-bezier(.2,.8,.2,1),
                    opacity 1.2s ease
                    `;


                /*
                 * delay
                 */

                particle.style.transitionDelay =
                    `${Math.random() * 1.2}s`;


                lotus.appendChild(
                    particle
                );


                /*
                 * เริ่ม animation
                 */

                requestAnimationFrame(
                    () => {

                        setTimeout(
                            () => {

                                particle.style.left =
                                    `${point.x}px`;

                                particle.style.top =
                                    `${point.y}px`;

                                particle.style.opacity =
                                    "1";

                                particle.style.transform =
                                    "translate(-50%, -50%) scale(1)";

                            },
                            100 +
                            Math.random() * 900
                        );

                    }
                );

            }
        );

    }


    /* =========================================================
       LOTUS ANIMATION
    ========================================================= */

    function startLotusAnimation() {

        showScreen(
            screens.lotus
        );


        const lotusCharacter =
            document.getElementById(
                "lotusKeaoCharacter"
            );


        const lotus =
            document.getElementById(
                "lotusKeao"
            );


        const message =
            document.getElementById(
                "lotusMessage"
            );


        const herCharacter =
            document.getElementById(
                "lotusHerCharacter"
            );


        /*
         * ซ่อนดอกบัวของเธอ
         */

        if (herCharacter) {

            herCharacter.style.display =
                "none";

        }


        if (
            !lotusCharacter ||
            !lotus
        ) {

            console.log(
                "ไม่พบ lotus element"
            );

            return;

        }


        /*
         * จัดให้อยู่ตรงกลาง
         */

        lotusCharacter.style.position =
            "relative";

        lotusCharacter.style.left =
            "auto";

        lotusCharacter.style.right =
            "auto";

        lotusCharacter.style.top =
            "auto";

        lotusCharacter.style.transform =
            "scale(.75)";

        lotusCharacter.style.cursor =
            "pointer";


        /*
         * สร้างดอกบัว
         */

        createLotus();


        /*
         * ข้อความเริ่มต้น
         */

        if (message) {

            message.textContent =
                "ซ่อนอยู่ในดอกบัวนี้ ✨";

        }


        /*
         * ค่อย ๆ ปรากฏ
         */

        setTimeout(
            () => {

                lotusCharacter.style.transition =
                    `
                    transform 1.8s cubic-bezier(.2,.8,.2,1)
                    `;

                lotusCharacter.style.transform =
                    "scale(.9)";

            },
            400
        );


        /*
         * Particle รวมตัวเสร็จ
         */

        setTimeout(
            () => {

                if (message) {

                    message.textContent =
                        "ลองแตะที่ดอกบัวดูนะคะ";

                }

            },
            2500
        );


        let bloomed =
            false;


        /* -----------------------------------------------------
           BLOOM
        ----------------------------------------------------- */

        function bloomLotus() {

            if (bloomed) {
                return;
            }


            bloomed =
                true;


            /*
             * class
             */

            lotus.classList.add(
                "bloomed"
            );

            lotusCharacter.classList.add(
                "bloomed"
            );


            /*
             * ขยายดอกบัว
             */

            lotusCharacter.style.transition =
                `
                transform 1.5s cubic-bezier(.2,1.4,.4,1)
                `;


            lotusCharacter.style.transform =
                "scale(1.12)";


            /*
             * เปลี่ยนข้อความ
             */

            if (message) {

                message.textContent =
                    "ดอกบัวกำลังบานเพื่อบอกความรู้สึกของเค้านะคะ";

            }


            /*
             * Particle บานออก
             */

            const particles =
                lotus.querySelectorAll(
                    ".particle"
                );


            particles.forEach(
                particle => {

                    const x =
                        parseFloat(
                            particle.dataset.targetX
                        );


                    const y =
                        parseFloat(
                            particle.dataset.targetY
                        );


                    if (
                        Number.isNaN(x) ||
                        Number.isNaN(y)
                    ) {
                        return;
                    }


                    /*
                     * ระยะจากจุดกลาง
                     */

                    const dx =
                        x - 300;

                    const dy =
                        y - 215;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    /*
                     * กลีบด้านนอกกางมากกว่า
                     */

                    let factor;


                    if (distance > 170) {

                        factor =
                            1.14;

                    } else if (
                        distance > 100
                    ) {

                        factor =
                            1.10;

                    } else {

                        factor =
                            1.06;

                    }


                    const newX =
                        300 +
                        dx * factor;


                    const newY =
                        215 +
                        dy * factor;


                    particle.style.transition =
                        `
                        left 1.4s cubic-bezier(.2,1.2,.3,1),
                        top 1.4s cubic-bezier(.2,1.2,.3,1),
                        transform 1.4s cubic-bezier(.2,1.2,.3,1),
                        opacity .8s ease
                        `;


                    particle.style.left =
                        `${newX}px`;


                    particle.style.top =
                        `${newY}px`;


                    particle.style.transform =
                        "translate(-50%, -50%) scale(1.18)";


                    particle.style.textShadow =
                        `
                        0 0 8px currentColor,
                        0 0 18px currentColor,
                        0 0 32px currentColor
                        `;

                }
            );


            /*
             * สร้างประกาย
             */

            setTimeout(
                () => {

                    createLotusSparkles();

                },
                400
            );


            /*
             * ข้อความ
             */

            setTimeout(
                () => {

                    if (message) {

                        message.textContent =
                            "ขอบคุณที่เดินมาถึงตรงนี้กับเค้านะคะ";

                    }

                },
                1700
            );


            /*
             * ไปหน้าความในใจ
             */

            setTimeout(
                () => {

                    showScreen(
                        screens.heart
                    );


                    setupHeartScreen();

                },
                4200
            );

        }


        /*
         * คลิก
         */

        lotusCharacter.onclick =
            bloomLotus;


        /*
         * Touch
         */

        lotusCharacter.ontouchend =
            event => {

                event.preventDefault();

                bloomLotus();

            };

    }


    /* =========================================================
       LOTUS SPARKLES
    ========================================================= */

    function createLotusSparkles() {

        const lotusScreen =
            screens.lotus;


        if (!lotusScreen) {
            return;
        }


        for (
            let i = 0;
            i < 35;
            i++
        ) {

            const sparkle =
                document.createElement(
                    "span"
                );


            sparkle.textContent =
                Math.random() > 0.5
                    ? "✦"
                    : "✧";


            sparkle.style.position =
                "absolute";


            sparkle.style.left =
                `${40 + Math.random() * 20}%`;


            sparkle.style.top =
                `${38 + Math.random() * 30}%`;


            sparkle.style.fontSize =
                `${8 + Math.random() * 12}px`;


            sparkle.style.color =
                "#ffffff";


            sparkle.style.pointerEvents =
                "none";


            sparkle.style.zIndex =
                "20";


            sparkle.style.textShadow =
                `
                0 0 8px #ffffff,
                0 0 18px #ff9edb
                `;


            sparkle.style.animation =
                `
                lotusSparkleFloat
                ${1.5 + Math.random() * 2}s
                ease-out forwards
                `;


            lotusScreen.appendChild(
                sparkle
            );


            setTimeout(
                () => {

                    sparkle.remove();

                },
                4000
            );

        }


        /*
         * สร้าง keyframes แค่ครั้งเดียว
         */

        if (
            !document.getElementById(
                "lotusSparkleStyle"
            )
        ) {

            const style =
                document.createElement(
                    "style"
                );


            style.id =
                "lotusSparkleStyle";


            style.textContent = `

                @keyframes lotusSparkleFloat {

                    0% {
                        opacity: 0;
                        transform:
                            translate(0, 0)
                            scale(.4);
                    }

                    30% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0;
                        transform:
                            translate(
                                calc((var(--x, 0) - 50px)),
                                -80px
                            )
                            scale(1.4);
                    }

                }

            `;


            document.head.appendChild(
                style
            );

        }

    }


    /* =========================================================
       HEART SCREEN
    ========================================================= */

    function setupHeartScreen() {

        const heartText =
            document.getElementById(
                "heartText"
            );


        const heartContinue =
            document.getElementById(
                "heartContinue"
            );


        /*
         * ถ้า HTML ใช้ touchHint
         * ก็รองรับด้วย
         */

        const touchHint =
            document.getElementById(
                "touchHint"
            );


        const continueElement =
            heartContinue ||
            touchHint;


        /*
         * ข้อความความในใจ
         */

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


        /*
         * ข้อความก่อนแตะ
         */

        if (continueElement) {

            continueElement.textContent =
                "อ่านจนจบแล้วนะคะ... แล้วแตะหน้าจอเพื่อไปต่อ";

        }


        /*
         * หา heart page
         */

        const heartPage =
            document.querySelector(
                ".heart-page"
            );


        const target =
            heartPage ||
            screens.heart;


        if (!target) {
            return;
        }


        /*
         * คลิกเพื่อไปต่อ
         */

        let canContinue =
            false;


        function checkScroll() {

            const scrollTop =
                target.scrollTop;


            const clientHeight =
                target.clientHeight;


            const scrollHeight =
                target.scrollHeight;


            const atBottom =
                scrollTop +
                clientHeight >=
                scrollHeight - 30;


            if (atBottom) {

                canContinue =
                    true;


                if (continueElement) {

                    continueElement.textContent =
                        "อ่านจบแล้วนะคะ... แตะตรงไหนก็ได้เพื่อไปต่อ";

                    continueElement.style.opacity =
                        "1";

                }

            }

        }


        target.addEventListener(
            "scroll",
            checkScroll
        );


        target.addEventListener(
            "click",
            event => {

                if (!canContinue) {
                    return;
                }


                /*
                 * ป้องกันคลิกที่ปุ่มอื่น
                 */

                if (
                    event.target.closest(
                        "button"
                    )
                ) {

                    return;

                }


                showProposal();

            }
        );


        setTimeout(
            checkScroll,
            300
        );

    }


    /* =========================================================
       PROPOSAL
    ========================================================= */

    function showProposal() {

        showScreen(
            screens.proposal
        );

    }


    const yesBtn =
        document.getElementById(
            "yesBtn"
        );


    const thinkBtn =
        document.getElementById(
            "thinkBtn"
        );


    if (yesBtn) {

        yesBtn.addEventListener(
            "click",
            () => {

                showSuccess();

            }
        );

    }


    if (thinkBtn) {

        thinkBtn.addEventListener(
            "click",
            () => {

                openThinkPopup();

            }
        );

    }


    /* =========================================================
       THINK POPUP
    ========================================================= */

    const thinkPopup =
        document.getElementById(
            "thinkPopup"
        );


    const popupClose =
        document.getElementById(
            "popupClose"
        ) ||
        document.getElementById(
            "closePopup"
        );


    function openThinkPopup() {

        if (!thinkPopup) {
            return;
        }

        thinkPopup.classList.add(
            "show"
        );

    }


    function closeThinkPopup() {

        if (!thinkPopup) {
            return;
        }

        thinkPopup.classList.remove(
            "show"
        );

    }


    if (popupClose) {

        popupClose.addEventListener(
            "click",
            closeThinkPopup
        );

    }


    if (thinkPopup) {

        thinkPopup.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    thinkPopup
                ) {

                    closeThinkPopup();

                }

            }
        );

    }


    /* =========================================================
       SUCCESS
    ========================================================= */

    function showSuccess() {

        showScreen(
            screens.success
        );


        createSuccessSparkles();

    }


    function createSuccessSparkles() {

        const success =
            screens.success;


        if (!success) {
            return;
        }


        for (
            let i = 0;
            i < 50;
            i++
        ) {

            const sparkle =
                document.createElement(
                    "span"
                );


            sparkle.textContent =
                Math.random() > 0.5
                    ? "✦"
                    : "♡";


            sparkle.style.position =
                "absolute";


            sparkle.style.left =
                `${Math.random() * 100}%`;


            sparkle.style.top =
                `${Math.random() * 100}%`;


            sparkle.style.color =
                "#ffffff";


            sparkle.style.fontSize =
                `${8 + Math.random() * 14}px`;


            sparkle.style.pointerEvents =
                "none";


            sparkle.style.opacity =
                "0";


            sparkle.style.animation =
                `
                successSparkle
                ${1.5 + Math.random() * 2}s
                ease-out
                forwards
                `;


            success.appendChild(
                sparkle
            );


            setTimeout(
                () => {

                    sparkle.remove();

                },
                4000
            );

        }


        if (
            !document.getElementById(
                "successSparkleStyle"
            )
        ) {

            const style =
                document.createElement(
                    "style"
                );


            style.id =
                "successSparkleStyle";


            style.textContent = `

                @keyframes successSparkle {

                    0% {
                        opacity: 0;
                        transform:
                            scale(.2)
                            rotate(0deg);
                    }

                    40% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0;
                        transform:
                            scale(1.5)
                            rotate(180deg);
                    }

                }

            `;


            document.head.appendChild(
                style
            );

        }

    }


    /* =========================================================
       INITIALIZE
    ========================================================= */

    /*
     * ให้หน้าเริ่มต้นเป็นหน้าแรก
     */

    Object.values(screens).forEach(
        screen => {

            if (screen) {

                screen.classList.remove(
                    "active"
                );

            }

        }
    );


    if (screens.start) {

        screens.start.classList.add(
            "active"
        );

    }


    console.log(
        "เว็บไซต์พร้อมใช้งานแล้วค่ะ"
    );

});
