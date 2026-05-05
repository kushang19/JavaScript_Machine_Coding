
let state = {
    loading: false,
    items: [],
    editId: null,
    editText: "",
};

function setState(newState){
    state = {...state, ...newState};
    render();
    renderList();
};

function render(){
    document.getElementById("root").innerHTML = `
        <div>
            <h2>Comments (${state.items.length})</h2>
            <ul id="list"></ul>
            <p id="status"></p>
        </div>
    `
};

function renderList(){
    document.getElementById("list").innerHTML = state.items.map((item, index) => {

        if(state.editId === item?.id){

            return `
                <li>
                    <input
                        id="edit-input"
                        value="${state.editText}"
                    />
                    <button data-id="${item.id}" class="save-btn">Save</button>
                    <button class="cancel-btn">Cancel</button>
                </li>
            `

        }else{
            return `
                <li id="comment-li-1" data-id="${item.id}">${item.body}</li>
            `
        }

    }).join("")
};

async function fetchComments(){
    const url = "https://dummyjson.com/posts/1/comments?limit=3";
    const res = await fetch(url);
    const data = await res.json();
    return data.comments
};

async function initialLoad(){
    if(state.loading) return 

    setState({loading: true})

    try{

        const data = await fetchComments();

        setState({
            items: data,
            loading:false,
        })
        
    } catch (error) {
        setState({loading: false})
        console.log("ERROR:" + error);
    }
};


document.addEventListener("click", function(e){
    if(e.target.id === "comment-li-1"){
        const id = Number(e.target.dataset.id)

        const item = state.items.find(i => i?.id === id)

        setState({
            editId: id,
            editText: item?.body,
        })
    }

    if(e.target.classList.contains("save-btn")){
        const id = Number(e.target.dataset.id)

        const updatedItems = state.items.map(item => id === item?.id ? {...item, body: state.editText} : item)

        setState({
            items: updatedItems,
            editId: null,
            editText: "",
        })
    }

    if(e.target.classList.contains("cancel-btn")){
        setState({
            editId: null,
            editText: "",
        })
    }

});

document.addEventListener("input", function(e){
    if(e.target.id === "edit-input"){
            state.editText = e.target.value
    }

});


// init 
render();
renderList();
initialLoad();