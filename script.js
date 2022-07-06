const addTodo = document.querySelector(".btn--1");
const inputText = document.querySelector(".todoText");
const alertDanger = document.querySelector(".alert-danger");
const container = document.querySelector(".bigContainer");
const modal = document.querySelector(".modaly");
const overly = document.querySelector(".overlay");
const deleted = document.querySelector(".deleted");
const cancel = document.querySelector(".btn--close-modal");

class Todo {
  date = new Date().toISOString().slice(0, 10).replace("T", " ");
  id = Date.now();

  constructor(value) {
    this.value = value;
  }
}

class App {
  #todoList = [];
  constructor() {
    addTodo.addEventListener("click", this._newTodo.bind(this));
    this._getLocalStorage();
  }

  _newTodo(e) {
    e.preventDefault();
    const value = inputText.value;
    let toDo;
    if (value) {
      toDo = new Todo(value);
      inputText.value = "";
      this.#todoList.push(toDo);
      this._addnewTodo(toDo);
    } else {
      alertDanger.classList.remove("hidden");
      setTimeout(() => alertDanger.classList.add("hidden"), 3000);
    }
  }

  _addnewTodo(toDo) {
    let html;
    html = `<div class="big">
    <div class="information" data-id="${toDo.id}">
    <p class="text">${toDo.value}</p>
    <p class="date">${toDo.date}</p>

       <svg
      class="delete--1"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-trash3-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
      />
       </svg>
      </div>
    </div>`;

    container.insertAdjacentHTML("afterbegin", html);
    const delet = document.querySelector(".delete--1");

    delet.addEventListener("click", this._deletTodo.bind(this));
    this._setLocalStorage();
  }

  _deletTodo(e) {
    const toDoObj = e.target.closest(".information");
    let idTodo = +toDoObj.dataset.id;
    //  this.#todoList.forEach(todo=>console.log(todo.id))

    const foundIndTodo = this.#todoList.findIndex((todo) => todo.id === idTodo);

    if (toDoObj) {
      modal.classList.remove("hidden");
      overly.classList.remove("hidden");
      deleted.addEventListener("click", (e) => {
        this.#todoList.splice(foundIndTodo, 1);
        let toDOstorage = JSON.parse(localStorage.getItem("todo"));
        toDOstorage.splice(foundIndTodo, 1);
        localStorage.setItem("todo", JSON.stringify(toDOstorage));
        e.preventDefault();
        modal.classList.add("hidden");
        overly.classList.add("hidden");
        toDoObj.style.opacity = "0";
        setTimeout(() => toDoObj.remove(), 1000);
      });

      cancel.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("hidden");
        overly.classList.add("hidden");
      });
    }
  }

  _findIndex(id) {
    console.log(this);
  }

  _setLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.#todoList));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todo"));

    if (!data) return;

    this.#todoList = data;

    this.#todoList.forEach((todo) => this._addnewTodo(todo));
  }

  _reset() {
    localStorage.removeItem("todo");
    location.reload();
  }
}
const appy = new App();

