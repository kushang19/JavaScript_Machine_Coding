let state = {
  items: [],
  limit: 2,
  page: 1,
  total: 20,   // ✅ total items (JSONPlaceholder has 100)
  loading: false,
};

function setState(newState){
  state = {...state, ...newState}
  render();
  renderList();
  renderStatus();
  renderPagination(); // ✅ added
};

// Render
function render(){
  const root = document.getElementById("root");
 
  root.innerHTML = `
      <div>
        <h3>Pagination : Page ${state.page}</h3>
        <div id="pagination"></div> <!-- ✅ pagination UI -->
        <p id="status"></p>
        <ul id="list"></ul>
      </div>
  `
};

// List
function renderList(){
  const list = document.getElementById("list");

  list.innerHTML = state.items.map((item, index) => `
      <li>
        <p>${index + 1}</p>
        <p>${item?.title}</p>
        <p>PSID: ${item?.id}</p>
      </li>
  `).join("");
};

// Status
function renderStatus(){
  const status = document.getElementById("status");
 
  if(state.loading){
    status.innerText = "Loading...";
    return;
  }

  status.innerText = "";
};

// ✅ Pagination UI
function renderPagination(){
  const container = document.getElementById("pagination");

  const totalPages = Math.ceil(state.total / state.limit);

  let pages = "";

  for(let i = 1; i <= totalPages; i++){
    // Condition A: Current page
    if(i === state.page){
      pages += `<b>${i}</b> `;
    }
    // Condition B: Always show important pages / near current page
    else if ( i === 1 || i === totalPages || Math.abs(i - state.page) <= 2){
      pages += `<button data-page="${i}">${i}</button> `;
    }
    // Condition C: Add dots exactly at the boundary
    else if (i === state.page - 3 || i === state.page + 3){
      pages += `... `;
    }
  }

  container.innerHTML = `
    <button id="prev-btn" ${state.page === 1 ? "disabled" : ""}>Prev</button>
    ${pages}
    <button id="next-btn" ${state.page === totalPages ? "disabled" : ""}>Next</button>
  `;
};

// API
async function fetchItems(page, limit){
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// ✅ Load specific page
async function loadPage(page){
  if(state.loading) return;

  setState({loading: true});

  try{
    const data = await fetchItems(page, state.limit);

    setState({
      items: data,        // ✅ replace (not append)
      page: page,
      loading: false,
    });

  }catch(e){
    setState({loading: false});
    console.log("Error:", e);
  }
};

// Events
document.addEventListener("click", function(e){

  if(e.target.id === "prev-btn"){
    loadPage(state.page - 1);
  }

  if(e.target.id === "next-btn"){
    loadPage(state.page + 1);
  }

  if(e.target.dataset.page){
    loadPage(Number(e.target.dataset.page));
  }

});

// init
render();
renderList();
renderStatus();
loadPage(1);  // ✅ initial load
