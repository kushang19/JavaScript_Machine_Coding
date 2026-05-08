// STATE
let state = {
  currentUser: "user1",   // simulate logged-in user
  likedUsers: new Set(), // ✅ store users
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
      <h3>Multi User Like</h3>
     
      <div id="container"></div>

      <hr/>

      <button data-user="user1">Switch to User1</button>
      <button data-user="user2">Switch to User2</button>
      <button data-user="user3">Switch to User3</button>
    </div>
  `;
}

// RENDER LIST
function renderList() {
  const container = document.getElementById("container");

  const isLiked = state.likedUsers.has(state.currentUser);

  container.innerHTML = `
    <p>Current User: <b>${state.currentUser}</b></p>

    <button id="like-btn">
      ${isLiked ? "Unlike" : "Like"}
    </button>

    <p>Total Likes: ${state.likedUsers.size}</p>
  `;
}

// ✅ Toggle Logic (multi-user)
function toggleLike() {
  const nextSet = new Set(state.likedUsers);

  nextSet.has(state.currentUser) ? nextSet.delete(state.currentUser) : nextSet.add(state.currentUser);
 
  setState({
    likedUsers: nextSet
  });
}

// EVENTS
document.addEventListener("click", function (e) {

  // Like / Unlike
  if (e.target.id === "like-btn") {
    toggleLike();
  }

  // Switch user (simulate multiple users)
  if (e.target.dataset.user) {
    setState({
      currentUser: e.target.dataset.user
    });
  }
});

// INIT
render();
renderList();
