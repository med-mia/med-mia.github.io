const mealIdeas = {
    breakfast: [
        "Maize meal porridge with milk",
        "One slice of brown bread with egg",
        "Plain yoghurt with a small fruit",
        "Beans on toast",
    ],
    lunch: [
        "Bean and vegetable stew with a small starch",
        "Leftover chicken and cabbage",
        "Tinned fish with salad and bread",
        "Lentil soup with a slice of bread",
    ],
    dinner: [
        "Beans, spinach and a small serving of pap",
        "Grilled chicken, vegetables and potato",
        "Egg and tomato stew with rice",
        "Samp and beans with cabbage",
    ],
    snacks: [
        "A fist-sized whole fruit",
        "Plain yoghurt",
        "A small handful of unsalted peanuts",
        "Carrot or cucumber sticks",
    ],
    drinks: [
        "Water",
        "Water with lemon or mint",
        "Unsweetened tea",
        "Milk with a meal",
    ],
};

const tabs = document.querySelectorAll(".tab");
const panel = document.querySelector(".meal-panel");

function showMeal(meal, selectedTab) {
    tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
    });

    panel.setAttribute("aria-labelledby", selectedTab.id);
    panel.innerHTML = `
    <p class="panel-label">${meal === "drinks" ? "Refresh without added sugar" : "Good, filling choices"}</p>
    <ul class="food-list">
      ${mealIdeas[meal].map((idea, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span> ${idea}</li>`).join("")}
    </ul>
  `;
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showMeal(tab.dataset.meal, tab));
    tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const nextIndex =
            event.key === "ArrowRight"
                ? (index + 1) % tabs.length
                : (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        showMeal(tabs[nextIndex].dataset.meal, tabs[nextIndex]);
    });
});

const qrCode = document.querySelector("#qr-code");
const currentUrl = window.location.href;
if (window.location.protocol !== "file:") {
    qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`;
}

document
    .querySelector("#copy-link")
    .addEventListener("click", async (event) => {
        const button = event.currentTarget;
        try {
            await navigator.clipboard.writeText(currentUrl);
            button.textContent = "Link copied";
            setTimeout(() => {
                button.textContent = "Copy page link";
            }, 2000);
        } catch {
            button.textContent = "Copy not available";
        }
    });
