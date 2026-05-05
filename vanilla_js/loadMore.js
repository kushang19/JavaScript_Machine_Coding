let state ={
  items: [],
  limit: 20,
  page: 1,
  loading: false,
  hasMore: true,
}

function setState(newState){
  state = {...state, ...newState}
  render();
  renderList();
  renderStatus();
};

function render(){ 
  const root = document.getElementById("root");
  
  root.innerHTML = `
      <div>
        <h3>Infinite Scroller : ${state.items.length}</h3>
        <ul id="list"></ul>
        <p id="status"></p>
        <button ${!state.hasMore ? "disabled" : ""} id="load-btn">Load More</button>
      </div>
  `
};

function renderList(){
  const list = document.getElementById("list");
  list.innerHTML = state.items.map((item, index) => `
      <li>
        <p>${index + 1}</p>
        <p>${item?.title}</p>
        <p>PSID: ${item?.id}</p>
      </li>
  `).join("")
};

function renderStatus(){
  const status = document.getElementById("status");
  
  if(state.loading){
    status.innerText = "Loading..."
    return
  }
  
  if(!state.hasMore){
    status.innerText = "No More Data To Show"
    return
  }
  
  status.innerText = "Click the below button to load more data"
  
};

async function fetchItems(page, limit){
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

async function loadMore(){
  if(state.loading || !state.hasMore) return 
  setState({loading: true})
  
  try{
    
    const data = await fetchItems(state.page, state.limit);
    
    setState({
      items: [...state.items, ...data],
      page: state.page + 1,
      hasMore: data.length === state.limit,
      loading: false,
    })
    
  }catch(e){
    setState({loading: false});
    console.log("Error: " + e)
  }
};

document.addEventListener("click", function(e){
  if(e.target.id === "load-btn"){
    loadMore();
  }
})

// init 
render();
renderList();
renderStatus();
loadMore();