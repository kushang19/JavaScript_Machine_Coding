// STATE
let state = {
  items: [],
  page: 1,
  limit: 5,
  loading: false,
  hasMore: true,
  highlightIds: new Set(), // track newly added items
};

function setState(newState) {
  state = { ...state, ...newState };
  render();
  renderList();
  renderStatus();
}

// RENDER
function render() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <div style="max-width: 600px; margin: 20px auto; font-family: Arial;">
      <h3>Social Media Comments (${state.items.length}/50)</h3>
      <ul id="item-list" style="list-style: none; padding: 0;"></ul>
      <div id="status"></div>
    </div>
  `;
}

// RENDER LIST
function renderList() {
  const list = document.getElementById("item-list");

  list.innerHTML = state.items
    .map(
      (item) => `
      <li 
        style="
          padding: 10px;
          margin-bottom: 8px;
          border: 1px solid #eee;
          border-radius: 6px;
          background: ${state.highlightIds.has(item.id) ? "#dfa6e4" : "#fff"};
        "
      >
        <p style="margin: 0;"><b>${item.name}</b></p>
        <small>${item.body}</small>
      </li>
    `
    )
    .join("");
}

// STATUS
function renderStatus() {
  const status = document.getElementById("status");

  if (state.loading) {
    status.innerText = "Loading new comments...";
    return;
  }

  if (!state.hasMore) {
    status.innerText = "No more comments.";
    return;
  }

  status.innerText = "New comments every 3 seconds...";
}

// API (using comments endpoint)
async function fetchItems(page, limit) {
  const url = `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`;
  const res = await fetch(url);
  return res.json();
}

// LOAD MORE (every 3 sec)
async function loadMore() {
  if (state.loading || !state.hasMore) return;

  setState({ loading: true });

  try {
    const data = await fetchItems(state.page, state.limit);

    // limit to 50 total
    const newItems = [...data].slice(
      0,
      50 - state.items.length
    );

    /* 
                EXAMPLE for slice, it creates a new array

                data = [A, B, C, D, E, F, G]
                state.items.length = 47
                50 - 47 = 3
                data.slice(0, 3) => [A, B, C]

    */

    // new items go on TOP
    const updatedItems = [...newItems, ...state.items];

    // track highlighted items
    const newIds = new Set(newItems.map((i) => i.id));

    setState({
      items: updatedItems,
      page: state.page + 1,
      loading: false,
      hasMore: updatedItems.length < 50,
      highlightIds: newIds,
    });

  } catch (e) {
    setState({ loading: false });
    console.error(e);
  }
}

// AUTO FETCH EVERY 3 SEC
function startAutoLoad() {
  const interval = setInterval(() => {
    if (!state.hasMore) {
      clearInterval(interval);
      return;
    }
    loadMore();
  }, 3000);
}

// INIT
render();
renderList();
renderStatus();
startAutoLoad();
loadMore(); // initial load