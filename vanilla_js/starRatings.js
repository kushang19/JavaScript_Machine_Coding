// STATE
let state = {
  items: [1, 2, 3, 4, 5], // 5 stars
  rating: 0,              // selected rating
  hoverIndex: -1          // for hover effect
};

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
      <h3>Star Rating: ${state.rating}</h3>
      <ul id="list" style="display:flex; gap:10px; list-style:none; padding:0;"></ul>
    </div>
  `;
}

// RENDER LIST
function renderList() {
  const list = document.getElementById("list");

  list.innerHTML = state.items
    .map((item, index) => {
      // decide whether star is filled
      const isFilled =
        state.hoverIndex >= 0
          ? index <= state.hoverIndex
          : index < state.rating;

      return `
        <li
          data-index="${index}"
          class="star"
          style="font-size:30px; cursor:pointer; border: none"
        >
          ${isFilled ? "★" : "☆"}
        </li>
      `;
    })
    .join("");
}

// EVENTS

// CLICK → Fix rating
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("star")) {
    const index = Number(e.target.dataset.index);

    // toggle (re-click to reset)
    const newRating = state.rating === index + 1 ? 0 : index + 1;

    setState({
      rating: newRating
    });
  }
});

// // HOVER → Temporary highlight
// document.addEventListener("mouseover", function (e) {
//   if (e.target.classList.contains("star")) {
//     const index = Number(e.target.dataset.index);

//     setState({
//       hoverIndex: index
//     });
//   }
// });

// // LEAVE → Remove hover
// document.addEventListener("mouseout", function (e) {
//   if (e.target.classList.contains("star")) {
//     setState({
//       hoverIndex: -1
//     });
//   }
// });

// INIT
render();
renderList();
