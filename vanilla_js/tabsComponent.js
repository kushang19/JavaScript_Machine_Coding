// STATE
let state = {
  tabs: ["Overview", "Details", "Reviews"],
  activeIndex: 0,   // default
};

// ✅ load from localStorage (persist)
const savedTab = localStorage.getItem("activeTab");
if (savedTab !== null) {
  state.activeIndex = Number(savedTab);
}

function setState(newState) {
  state = { ...state, ...newState };
  render();
  renderList();
}

// RENDER
function render() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <div>
      <h3>Tabs Component</h3>
      <div id="tabs"></div>
      <div id="panel" style="margin-top:10px;"></div>
    </div>
  `;
}

// RENDER LIST
function renderList() {
  const tabsEl = document.getElementById("tabs");
  const panel = document.getElementById("panel");

  // Tabs UI
  tabsEl.innerHTML = state.tabs
    .map((tab, index) => `
      <button
        data-index="${index}"
        style="margin-right:10px;
               ${state.activeIndex === index ? "font-weight:bold;" : ""}"
      >
        ${tab}
      </button>
    `)
    .join("");

  // Panel UI (only one visible)
  panel.innerHTML = `
    <p><b>${state.tabs[state.activeIndex]}</b> Content</p>
  `;
}

// ✅ Update + persist
function updateTab(index) {
  setState({ activeIndex: index });
  localStorage.setItem("activeTab", index); // ✅ persist
}

// EVENTS (CLICK)
document.addEventListener("click", function (e) {
  const btn = e.target.closest("button");

  if (btn && btn.dataset.index) {
    updateTab(Number(btn.dataset.index));
  }
});

// ✅ KEYBOARD (Left / Right)
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    const next = (state.activeIndex + 1) % state.tabs.length;
    updateTab(next);
  }

  if (e.key === "ArrowLeft") {
    const prev =
      (state.activeIndex - 1 + state.tabs.length) % state.tabs.length;
      /*
        activeIndex - 1 (move left)
        + length (make it non-negative)
        % length (wrap, keep in range)
      */
    updateTab(prev);
  }
});

/*
Right: (i + 1) % n moves forward and wraps from last to first
Left: (i - 1 + n) % n moves backward and wraps from first to last (avoids negative)
*/

// INIT
render();
renderList();
