// STATE
let state = {
  isOpen: false,
  name: "",
  email: "",
  errors: {
    name: "",
    email: ""
  }
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
      <button id="open-btn">Open Modal</button>

      ${state.isOpen ? `
        <div id="overlay"
          style="
            position: fixed;
            top:0; left:0; right:0; bottom:0;
            background: rgba(0,0,0,0.5);
          "
        >
          <div
            role="dialog"
            aria-modal="true"
            style="
              background:#fff;
              width:300px;
              margin:100px auto;
              padding:20px;
              position: relative;
            "
          >
            <button id="close-btn" style="position:absolute; right:10px;">X</button>

            <h3>Form</h3>

            <input
              id="name-input"
              placeholder="Name"
              value="${state.name}"
              style="display:block; margin-bottom:5px;"
            />
            <p style="color:red; margin:0;">${state.errors.name}</p>

            <input
              id="email-input"
              placeholder="Email"
              value="${state.email}"
              style="display:block; margin-top:10px;"
            />
            <p style="color:red; margin:0;">${state.errors.email}</p>

            <button id="submit-btn" style="margin-top:10px;">Submit</button>
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

// LIST (not needed but kept for structure consistency)
function renderList() {}

// ✅ VALIDATION
function validate() {
  let errors = { name: "", email: "" };

  if (!state.name.trim()) {
    errors.name = "Name is required";
  }

  if (!state.email.includes("@")) {
    errors.email = "Invalid email";
  }

  return errors;
}

// EVENTS

// CLICK HANDLING
document.addEventListener("click", function (e) {

  // OPEN MODAL
  if (e.target.id === "open-btn") {
    setState({ isOpen: true });
  }

  // CLOSE BUTTON
  if (e.target.id === "close-btn") {
    setState({ isOpen: false });
  }

  // OVERLAY CLICK (close if clicked outside modal)
  if (e.target.id === "overlay") {
    setState({ isOpen: false });
  }

  // SUBMIT
  if (e.target.id === "submit-btn") {
    const errors = validate();

    if (errors.name || errors.email) {
      setState({ errors });
      return;
    }

    alert("✅ Form Submitted!");

    setState({
      isOpen: false,
      name: "",
      email: "",
      errors: { name: "", email: "" }
    });
  }
});

// INPUT HANDLING
document.addEventListener("input", function (e) {
  if (e.target.id === "name-input") {
    state.name = e.target.value;
  }

  if (e.target.id === "email-input") {
    state.email = e.target.value;
  }
});

// ✅ ESC KEY CLOSE
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && state.isOpen) {
    setState({ isOpen: false });
  }
});

// INIT
render();

