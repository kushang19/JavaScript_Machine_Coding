let state = {
  activeIndex: null,  // used when allowMultiple = false
  allowMultiple: true, // ✅ toggle this
  openSet: new Set(),  // used when allowMultiple = true
  items:[
    { title: "What is JavaScript?", content: "JavaScript is a scripting language." },
    { title: "What is Closure?", content: "A closure lets a function access variables from outer scope." },
    { title: "What is Event Loop?", content: "The event loop handles async execution." },
  ]
};

function setState(newState){
  state = {...state, ...newState}
  renderList();
};

function render(){
  const root = document.getElementById("root")
  root.innerHTML = `
      <div>
        <h3>Accordion UI</h3>
        <div id="accordion"><div>
      </div>
  `
};

function renderList(){
  const accordion = document.getElementById("accordion");
 
  accordion.innerHTML = state.items.map((item, index) => {
    const isOpen = state.allowMultiple ? state.openSet.has(index) : state.activeIndex === index;
     return `
      <div>
        <button
        id="li-btn"
        data-index="${index}"
        style="width: 100%; text-align: left; cursor: pointer;"
        >${item?.title}</button>
        ${isOpen ? `<p>${item.content}</p>` : ``}
        <hr/>
      </div>
    `
  }

  ).join("")
};

function toggleAccordian(index){
  if(state.allowMultiple){
   
    const nextSet = new Set(state.openSet);
    nextSet.has(index) ? nextSet.delete(index) : nextSet.add(index)
    setState({openSet: nextSet})
   
  }else{
    setState({activeIndex: state.activeIndex === index ? null : index})
  }
}

document.addEventListener("click", function(e){
  if(e.target.tagName === "BUTTON" && e.target.dataset.index){
    const index = Number(e.target.dataset.index)
    toggleAccordian(index);
  }
});

document.addEventListener("keydown", function(e){
  if(e.key === "Enter" || e.key === " "){
    const btn = e.target.closest("#li-btn");
    if(!btn) return 
    const index = Number(btn.target.dataset.index)
    toggleAccordian(index);
  }
});

// init
render();
renderList();

