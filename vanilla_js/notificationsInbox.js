// STATE
let state = {
  items: [],        // notifications
  unreadCount: 0,
  idCounter: 1      // for unique ids
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
      <h3>Inbox (Unread: ${state.unreadCount})</h3>
      <button id="add-btn">Add Notification</button>
      <ul id="list"></ul>
    </div>
  `;
}

// RENDER LIST
function renderList() {
  const list = document.getElementById("list");

  list.innerHTML = state.items
    .map((item) => `
      <li
        data-id="${item.id}"
        class="item"
        style="cursor:pointer; ${item.read ? "color:gray;" : "font-weight:bold;"}"
      >
        ${item.text} ${item.read ? "(read)" : "(unread)"}
      </li>
    `)
    .join("");
}

// ✅ Add notification
function addNotification() {
  const newItem = {
    id: state.idCounter,
    text: "New Notification " + state.idCounter,
    read: false
  };

  const updatedItems = [newItem, ...state.items]; // ✅ newest first

  setState({
    items: updatedItems,
    unreadCount: state.unreadCount + 1,
    idCounter: state.idCounter + 1
  });
}

// ✅ Toggle read/unread
function toggleRead(id) {
  let unread = 0;

  const updated = state.items.map((item) => {
    if (item.id === id) {
      return { ...item, read: !item.read };
    }
    return item;
  });

  // ✅ recalc unread count
  updated.forEach((item) => {
    if (!item.read) unread++;
  });

  setState({
    items: updated,
    unreadCount: unread
  });
}

// EVENTS

// CLICK HANDLING
document.addEventListener("click", function (e) {

  // Add notification
  if (e.target.id === "add-btn") {
    addNotification();
  }

  // Toggle read/unread
  if (e.target.classList.contains("item")) {
    const id = Number(e.target.dataset.id);
    toggleRead(id);
  }
});

// INIT
render();
renderList();