// State
let state = {
  items: [],
  page: 1,
  limit: 20,
  loading: false,
  hasMore: true,
};

function setState(newState) {
  state = { ...state, ...newState };
  renderList();
  renderStatus();
}

// Render
function render() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <div style="max-width: 600px; margin: 20px auto; font-family: Arial;">
      <h3 style="margin: 0 0 12px;">Infinite Scroller (20 items per load)</h3>

      <ul id="item-list" style="list-style: none; padding: 0; margin: 0;"></ul>

      <div id="status" style="padding: 12px 0; color: #555;"></div>

      <div id="sentinel" style="height: 1px;"></div>
    </div>
  `;
}

function renderList() {
  const list = document.getElementById("item-list");

  list.innerHTML = state.items
    .map(
      (item, index) => `
      <li style="padding: 12px; border: 1px solid #eee; margin-bottom: 10px; border-radius: 8px;">
        <p style="margin: 0 0 6px;"><b>${index + 1}.</b> ${item.title}</p>
        <small style="color: #666;">Post ID: ${item.id}</small>
      </li>
    `
    )
    .join("");
}

function renderStatus() {
  const status = document.getElementById("status");

  if (state.loading) {
    status.innerText = "Loading more items...";
    return;
  }

  if (!state.hasMore) {
    status.innerText = "No more items to load.";
    return;
  }

  status.innerText = "Scroll down to load more...";
}

// API
async function fetchItems(page, limit) {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function loadMore() {
  if (state.loading || !state.hasMore) return;

  setState({ loading: true });

  try {
    const data = await fetchItems(state.page, state.limit);

    setState({
      items: [...state.items, ...data],
      page: state.page + 1,
      loading: false,
      hasMore: data.length === state.limit,
    });
  } catch (err) {
    setState({ loading: false });
    console.error("Load failed:", err);
  }
}

// Events (Infinite scroll trigger)
function initObserver() {
  const sentinel = document.getElementById("sentinel");

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    { root: null, threshold: 0.1 }
  );

  observer.observe(sentinel);
}

// init
render();
renderList();
renderStatus();
initObserver();
loadMore(); // initial 20 load

