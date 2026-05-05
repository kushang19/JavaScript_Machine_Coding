// STATE
let state = {
  items: [],
  loading: false,
  editId: null,        // which comment is being edited
  editText: "",        // current input value
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
      <h3>Comments (${state.items.length})</h3>
      <ul id="list"></ul>
      <p id="status"></p>
    </div>
  `;
}

// RENDER LIST
function renderList() {
  const list = document.getElementById("list");

  list.innerHTML = state.items
    .map((item) => {
      // EDIT MODE
      if (state.editId === item.id) {
        return `
          <li>
            <input 
              id="edit-input" 
              value="${state.editText}" 
            />
            <button data-id="${item.id}" class="save-btn">Save</button>
            <button class="cancel-btn">Cancel</button>
          </li>
        `;
      }

      // VIEW MODE
      return `
        <li data-id="${item.id}" class="comment-item" style="cursor:pointer;">
          ${item.body}
        </li>
      `;
    })
    .join("");
}

// STATUS
function renderStatus() {
  const status = document.getElementById("status");

  if (state.loading) {
    status.innerText = "Loading...";
    return;
  }

  status.innerText = "";
}

// FETCH COMMENTS
async function fetchComments() {
  const url = "https://dummyjson.com/posts/1/comments?limit=3";
  const res = await fetch(url);
  const data = await res.json();
  return data.comments;
}

// INIT LOAD
async function loadComments() {
  setState({ loading: true });

  try {
    const data = await fetchComments();

    setState({
      items: data,
      loading: false,
    });
  } catch (e) {
    setState({ loading: false });
    console.log(e);
  }
}

// EVENTS

// CLICK HANDLING
document.addEventListener("click", function (e) {
  
  // 👉 CLICK COMMENT → ENTER EDIT MODE
  if (e.target.classList.contains("comment-item")) {
    const id = Number(e.target.dataset.id);

    /*
    The find() method in JavaScript looks through an array and returns the first item that meets a specific condition you provide. If no item matches, it returns undefined. It skips any empty space in the array and doesn’t alter the original array.
    */
    const item = state.items.find((i) => i.id === id);

    setState({
      editId: id,
      editText: item.body,
    });
  }

  // 👉 SAVE
  if (e.target.classList.contains("save-btn")) {
    const id = Number(e.target.dataset.id);

    const updated = state.items.map((item) =>
      item.id === id ? { ...item, body: state.editText } : item
    );

    setState({
      items: updated,
      editId: null,
      editText: "",
    });
  }

  // 👉 CANCEL
  if (e.target.classList.contains("cancel-btn")) {
    setState({
      editId: null,
      editText: "",
    });
  }
});

// INPUT HANDLING
document.addEventListener("input", function (e) {
  if (e.target.id === "edit-input") {
    state.editText = e.target.value;
  }
});

// INIT
render();
renderList();
loadComments();