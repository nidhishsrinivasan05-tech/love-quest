// Love Quest v5
// - Better note UI for Part 1..8
// - Silhouette people in Part 9
// - YES: gift handover + crackers pop + more hearts/gifts float
// - NO: dark theme + remove hearts/gifts + sad emojis + gift hidden

const totalParts = 9;
let part = 1;

// Set your Instagram URL here
const INSTAGRAM_URL = "https://instagram.com/Nidhish_Srinivasan";

const parts = [{
        title: "Part 1",
        subtitle: "A tiny story, told in clicks.",
        text: `I tried to keep my thoughts quiet…\nbut they started spelling your name in my head.\nEvery ordinary second gets softer\nwhenever you exist inside it.`
    },
    {
        title: "Part 2",
        subtitle: "The moment the heart begins to talk.",
        text: `If my day is a page, you’re the warm margin.\nNot loud, not dramatic… just right.\nI don’t chase fireworks.\nI chase the calm I feel with you.`
    },
    {
        title: "Part 3",
        subtitle: "A gentle pull, like gravity with manners.",
        text: `You don’t enter my thoughts, you arrive.\nLike the sky turning pink on purpose.\nEven when I look away, I still feel you near…\nas if my heart kept the receipt.`
    },
    {
        title: "Part 4",
        subtitle: "Courage starts walking forward.",
        text: `I rehearsed a “cool” smile.\nMy heart refused and chose honesty.\nSo here’s the truth, quietly and clearly:\nI like you. A lot.`
    },
    {
        title: "Part 5",
        subtitle: "A gift is not a box, it’s a moment.",
        text: `Some gifts sparkle, some gifts stay.\nYou’re the kind that stays.\nIf I could wrap a feeling,\nI’d wrap this one and hand it to you.`
    },
    {
        title: "Part 6",
        subtitle: "Almost the ending, almost the confession.",
        text: `You make my “maybe” feel like “yes”.\nYou make my silence feel understood.\nAnd somehow… without trying,\nyou make the world feel kinder.`
    },
    {
        title: "Part 7",
        subtitle: "The heart stops pretending.",
        text: `If I had one wish tonight,\nI wouldn’t ask for luck or magic.\nI’d ask for a small forever\nwhere your smile lives near mine.`
    },
    {
        title: "Part 8",
        subtitle: "One step away.",
        text: `There’s a sentence I’ve been saving.\nIt’s not fancy, it’s not loud…\nIt’s just me, choosing you\nwith a brave little heartbeat.`
    },
    {
        title: "Part 9",
        subtitle: "The reveal.",
        text: `If my life is a playlist, you’re the favorite song.\nNot because you’re perfect…\nbut because you make my world feel right.\nSo… should he give the gift and make it official?`
    }
];

const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const loveTextEl = document.getElementById("loveText");
const nextBtn = document.getElementById("nextBtn");
const btnText = document.getElementById("btnText");
const rightPanel = document.getElementById("rightPanel");
const card = document.getElementById("card");

const sparkleField = document.querySelector(".sparkle-field");
const balloonLayer = document.querySelector(".balloon-layer");
const heartLayer = document.querySelector(".heart-layer");
const giftLayer = document.querySelector(".gift-layer");

const igCta = document.getElementById("igCta");
const igLink = document.getElementById("igLink");

let floatingEnabled = true;
let extraCelebrate = false;

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function rand(min, max) { return Math.random() * (max - min) + min; }

function clearFloating() {
    heartLayer.innerHTML = "";
    balloonLayer.innerHTML = "";
    giftLayer.innerHTML = "";
}

function spawnSparkles() {
    const count = 20;
    sparkleField.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const d = document.createElement("div");
        d.className = "float";
        const size = rand(3, 7);
        d.style.width = size + "px";
        d.style.height = size + "px";
        d.style.borderRadius = "99px";
        d.style.background = Math.random() < .55 ? "#ffffff" : "#ff8cab";
        d.style.left = rand(0, 100) + "%";
        d.style.top = rand(0, 100) + "%";
        d.style.opacity = rand(.10, .45);
        d.style.animation = `twinkle ${rand(2.8,5.2)}s ease-in-out ${rand(0,2)}s infinite`;
        sparkleField.appendChild(d);
    }
}

function spawnFloatEmoji(layer, emoji, minSize, maxSize, durationMin, durationMax) {
    const el = document.createElement("div");
    el.className = "float";
    el.textContent = emoji;

    const size = rand(minSize, maxSize);
    el.style.fontSize = size + "px";
    el.style.left = rand(5, 95) + "%";
    el.style.bottom = "-40px";
    el.style.setProperty("--drift", rand(-40, 40) + "px");
    el.style.setProperty("--scale", rand(.9, 1.15));

    const dur = rand(durationMin, durationMax);
    el.style.animation = `floatUp ${dur}s linear 0s 1`;

    layer.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
}

function passiveAnimationLoop() {
    clearTimeout(window.__animTimer);

    if (!floatingEnabled) {
        window.__animTimer = setTimeout(passiveAnimationLoop, 900);
        return;
    }

    const isNo = document.body.classList.contains("mode-no");
    const heartRate = isNo ? 900 : 560;

    // normal drifting
    if (!isNo) {
        if (Math.random() < 0.78) spawnFloatEmoji(heartLayer, Math.random() < 0.5 ? "💗" : "💖", 18, 34, 6.5, 10);
        if (Math.random() < 0.50) spawnFloatEmoji(balloonLayer, Math.random() < 0.5 ? "🎈" : "🎀", 18, 34, 9, 13);
    }

    // extra celebration after YES (hearts + gifts up/down more)
    if (extraCelebrate && !isNo) {
        if (Math.random() < 0.65) spawnFloatEmoji(heartLayer, ["💖", "💗", "✨", "🎊"][Math.floor(rand(0, 4))], 18, 34, 5.3, 8.2);
        if (Math.random() < 0.45) spawnFloatEmoji(giftLayer, ["🎁", "💝"][Math.floor(rand(0, 2))], 18, 34, 6.0, 9.0);
    }

    window.__animTimer = setTimeout(passiveAnimationLoop, clamp(heartRate, 280, 980));
}

function clickBurst() {
    if (!floatingEnabled) return;
    for (let i = 0; i < 6; i++) {
        setTimeout(() => spawnFloatEmoji(heartLayer, Math.random() < .5 ? "💗" : "💖", 18, 34, 4.8, 7.5), i * 60);
    }
}

function applyPart() {
    const p = parts[part - 1];
    titleEl.textContent = p.title;
    subtitleEl.textContent = p.subtitle;
    loveTextEl.textContent = p.text;
    btnText.textContent = part < totalParts ? "Next" : "Unlocked";

    if (part === totalParts) {
        nextBtn.disabled = true;
        rightPanel.hidden = false;
        card.classList.remove("single");
        wireFinalButtons();
    }
}

nextBtn.addEventListener("click", () => {
    if (part >= totalParts) return;
    part++;
    clickBurst();
    applyPart();
});

let finalWired = false;

function wireFinalButtons() {
    if (finalWired) return;
    finalWired = true;

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    // set IG link
    igLink.href = INSTAGRAM_URL;

    yesBtn?.addEventListener("click", () => {
        document.body.classList.remove("mode-no");
        document.body.classList.add("mode-yes");

        // gentle crackers pop
        for (let i = 0; i < 20; i++) {
            setTimeout(() => spawnFloatEmoji(heartLayer, ["💖", "💗", "✨", "🎊"][Math.floor(rand(0, 4))], 18, 34, 5.5, 8.5), i * 55);
        }
        for (let i = 0; i < 14; i++) {
            setTimeout(() => spawnFloatEmoji(giftLayer, ["🎁", "💝"][Math.floor(rand(0, 2))], 18, 34, 6.0, 9.0), i * 85);
        }

        extraCelebrate = true;
        floatingEnabled = true; // keep floating

        // show IG CTA
        igCta.hidden = false;

        // keep loop lively
        passiveAnimationLoop();
    });

    noBtn?.addEventListener("click", () => {
        document.body.classList.remove("mode-yes");
        document.body.classList.add("mode-no");

        // stop hearts/gifts and clear
        extraCelebrate = false;
        floatingEnabled = false;
        clearFloating();

        // small dark burst
        for (let i = 0; i < 10; i++) {
            setTimeout(() => spawnFloatEmoji(balloonLayer, ["🖤", "🥀", "🌑"][Math.floor(rand(0, 3))], 16, 28, 6.5, 10), i * 70);
        }

        // hide IG CTA
        igCta.hidden = true;

        passiveAnimationLoop();
    });
}

// Init
spawnSparkles();
applyPart();
passiveAnimationLoop();