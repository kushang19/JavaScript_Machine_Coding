// STATE
let state = {
  inputVal: "",
  filtered: [],
  activeIndex: -1,

  countries: [
    "India", "Indonesia", "USA", "UK", "UAE",
    "Canada", "China", "Japan", "Germany",
    "France", "Australia", "Brazil"
  ]
};

// setState
function setState(newState) {
  state = { ...state, ...newState };
  renderList();
}

// RENDER
function render() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <input id="search-input" placeholder="Search country..." />
    <ul id="list"></ul>
  `;
}

// RENDER LIST
function renderList() {
  const list = document.getElementById("list");

  list.innerHTML = state.filtered
    .map((country, index) => {
      const highlighted = highlightText(country, state.inputVal);

      return `
        <li 
          data-index="${index}" 
          style="background:${index === state.activeIndex ? "#ddd" : ""}"
        >
          ${highlighted}
        </li>
      `;
    })
    .join("");
}

// 🔍 FILTER LOGIC
function applyFilter() {
  const q = state.inputVal.toLowerCase();

  const result = state.countries.filter(c =>
    c.toLowerCase().includes(q)
  );

  setState({
    filtered: result,
    activeIndex: -1
  });
}

// ⚡ DEBOUNCE
let timer;
function debounce(fn, delay) {
  clearTimeout(timer);
  timer = setTimeout(fn, delay);
}

// ✨ HIGHLIGHT TEXT
function highlightText(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// EVENTS

// INPUT
document.addEventListener("input", function (e) {
  if (e.target.id === "search-input") {
    const val = e.target.value;

    setState({ inputVal: val });

    debounce(() => {
      applyFilter();
    }, 300);
  }
});

// CLICK SELECT
document.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const index = Number(e.target.dataset.index);
    selectItem(index);
  }
});

// KEYBOARD NAVIGATION
document.addEventListener("keydown", function (e) {
  if (!state.filtered.length) return;

  if (e.key === "ArrowDown") {
    setState({
      activeIndex: Math.min(
        state.activeIndex + 1,
        state.filtered.length - 1
      )
    });
  }

  if (e.key === "ArrowUp") {
    setState({
      activeIndex: Math.max(state.activeIndex - 1, 0)
    });
  }

  if (e.key === "Enter") {
    if (state.activeIndex >= 0) {
      selectItem(state.activeIndex);
    }
  }
});

// SELECT ITEM
function selectItem(index) {
  const selected = state.filtered[index];

  document.getElementById("search-input").value = selected;

  setState({
    inputVal: selected,
    filtered: [],
    activeIndex: -1
  });
}

// INIT
render();
setState({ filtered: [] });