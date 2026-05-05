// State
let state = {
  inputVal: "",
  sortVal: "",       // ✅ added
  categoryVal: "All",// ✅ added
  allProducts: [     // ✅ keep original list safe
    { id: 1, title: "iPhone", price: 89000, category: "Electronics" },
    { id: 2, title: "Chair", price: 6500, category: "Furniture" },
    { id: 3, title: "Remote Controller Car", price: 5000, category: "Electronics" },
    { id: 4, title: "Pen", price: 50, category: "Stationary" },
    { id: 5, title: "Shirt", price: 1500, category: "Fashion" },
  ],
  products: [] // ✅ will be derived from allProducts
};

function setState(newState) {
  state = { ...state, ...newState };
  renderList();
}

// Render
function render() {
  const root = document.getElementById("root");

  root.innerHTML = `
   <input
    type="text"
    placeholder="search..."
    id="search-input"
    />
    <select id="sort-select">
      <option value="">Sort</option>
      <option value="low">Low</option>
      <option value="high">High</option>
    </select>
    <select id="category-select">
      <option value="All">All</option>
      <option value="Electronics">Electronics</option>
      <option value="Furniture">Furniture</option>
      <option value="Stationary">Stationary</option>
      <option value="Fashion">Fashion</option>
    </select>
    <ul id="product-list"></ul>
  `;
}

function renderList() {
  const list = document.getElementById("product-list");

  list.innerHTML = state.products
    .map(
      (product, index) => `
  <li>
    <span>${index + 1}. ${product.title}</span>
    <span> - Rs ${product.price}</span>
    <p>Category: ${product.category}</p>
  </li>
  `
    )
    .join("");
}

// ✅ one function that applies search + category + sort
function applyFilters() {
  let result = [...state.allProducts];

  // 1) Search filter
  const q = state.inputVal.trim().toLowerCase();
  if (q) {
    result = result.filter((p) => p.title.toLowerCase().includes(q));
  }

  // 2) Category filter
  if (state.categoryVal && state.categoryVal !== "All") {
    result = result.filter((p) => p.category === state.categoryVal);
  }

  // 3) Price sort
  if (state.sortVal === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sortVal === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  setState({ products: result });
}

// Events
document.addEventListener("input", function (e) {
  if (e.target.id === "search-input") {
    setState({ inputVal: e.target.value });
    applyFilters();
  }
});

document.addEventListener("change", function (e) {
  if (e.target.id === "sort-select") {
    setState({ sortVal: e.target.value });
    applyFilters();
  }

  if (e.target.id === "category-select") {
    setState({ categoryVal: e.target.value });
    applyFilters();
  }
});

// init
render();
setState({ products: [...state.allProducts] }); // ✅ initial render list
