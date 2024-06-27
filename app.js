// DOM ELEMENTS //

const form = document.getElementById("form-check");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const clearListBtn = document.getElementById("clear-list");
const listTitle = document.getElementById("list-title");

// CREATE ITEM //

let id = 1;

document.addEventListener("DOMContentLoaded", () => {
  // CHANGE TITLE //
  loadItemsFromLocalStorage();
  loadTitleFromLocalStorage();

  listTitle.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = listTitle.textContent;
    input.classList.add("form-control");
    input.style.width = "100%";

    listTitle.replaceWith(input);
    input.focus();

    input.addEventListener("blur", () => {
      listTitle.textContent = input.value;
      input.replaceWith(listTitle);
      saveTitleToLocalStorage(input.value);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        listTitle.textContent = input.value;
        input.replaceWith(listTitle);
        saveTitleToLocalStorage(input.value);
      }
    });
  });
});

// Creating item //

function createItem() {
  const formText = input.value;
  if (formText === "") {
    alert("Please add an item");
  } else {
    addItem(formText, id, false); // false means the checkbox is initially not checked
    saveItemToLocalStorage(formText, id, false);
    id += 1;
    input.value = ""; // Clear the input field after adding the item
  }
}

// Add item to list //

function addItem(textValue, idValue, checked) {
  // Creating checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("value", "");
  checkbox.setAttribute("id", `checkbox-${idValue}`);
  checkbox.classList.add("form-check-input");
  checkbox.checked = checked; // Set checkbox state

  // Adding event listener to update local storage when checkbox state changes
  checkbox.addEventListener("change", () => {
    updateCheckedStateInLocalStorage(idValue, checkbox.checked);
  });

  // Creating label for checkbox
  const label = document.createElement("label");
  label.setAttribute("for", `checkbox-${idValue}`);
  label.classList.add("form-check-label");
  label.textContent = textValue;

  // Creating a wrapper div for better structure
  const div = document.createElement("div");
  div.classList.add("form-check");

  // Appending checkbox and label to the wrapper div
  div.appendChild(checkbox);
  div.appendChild(label);

  // Appending the wrapper div to the form
  form.appendChild(div);
}

// Save item to local storage //

function saveItemToLocalStorage(textValue, idValue, checked) {
  const items = JSON.parse(localStorage.getItem("todoItems")) || [];
  items.push({ id: idValue, text: textValue, checked: checked });
  localStorage.setItem("todoItems", JSON.stringify(items));
}

// Load items from local storage //

function loadItemsFromLocalStorage() {
  const items = JSON.parse(localStorage.getItem("todoItems")) || [];
  items.forEach((item) => {
    addItem(item.text, item.id, item.checked);
    id = Math.max(id, item.id + 1);
  });
}

// Save title to local storage //

function saveTitleToLocalStorage(title) {
  localStorage.setItem("listTitle", title);
}

// Load title from local storage //

function loadTitleFromLocalStorage() {
  const savedTitle = localStorage.getItem("listTitle");
  if (savedTitle) {
    listTitle.textContent = savedTitle;
  }
}

// Update checked state in local storage //

function updateCheckedStateInLocalStorage(idValue, checked) {
  const items = JSON.parse(localStorage.getItem("todoItems")) || [];
  const itemIndex = items.findIndex((item) => item.id === idValue);
  if (itemIndex > -1) {
    items[itemIndex].checked = checked;
    localStorage.setItem("todoItems", JSON.stringify(items));
  }
}

// Button & enter on input //

btn.addEventListener("click", createItem);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the form from being submitted
    createItem();
  }
});

// Clear list //

clearListBtn.addEventListener("click", clearList);

function clearList(e) {
  e.preventDefault();
  if (confirm("Are you sure?")) {
    form.innerHTML = "";
    localStorage.removeItem("todoItems");
  }
}
