// DOM ELEMENTS //

const form = document.getElementById("form-check");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const deleteItemsBtn = document.getElementById("delete-items");
const clearListBtn = document.getElementById("clear-list");
const deleteDoneBtn = document.getElementById("delete-done");
const listTitle = document.getElementById("list-title");

// CREATE ITEM //

let id = 1;
let deleteMode = false;

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

// Add item to list
function addItem(textValue, idValue, checked) {
  // Creating checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("value", "");
  checkbox.setAttribute("id", `checkbox-${idValue}`);
  checkbox.classList.add("form-check-input");
  checkbox.checked = checked; // Set checkbox state

  // Adding event listener to update local storage and toggle strike-through when checkbox state changes
  checkbox.addEventListener("change", () => {
    updateCheckedStateInLocalStorage(idValue, checkbox.checked);
    toggleStrikeThrough(checkbox, label);
  });

  // Creating label for checkbox
  const label = document.createElement("label");
  label.setAttribute("for", `checkbox-${idValue}`);
  label.classList.add("form-check-label");
  label.textContent = textValue;

  // Apply strike-through class if item is checked
  if (checked) {
    label.classList.add("strike-through");
  }

  // Creating a wrapper div
  const div = document.createElement("div");
  div.classList.add("form-check");

  // Creating cross button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<img src="images/X.svg" alt="X" />`;
  deleteButton.classList.add("delete-button");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  deleteButton.classList.add("btn-x");
  deleteButton.style.display = deleteMode ? "inline" : "none";

  // Event listener to delete button
  deleteButton.addEventListener("click", () => {
    deleteItem(idValue);
  });

  // Appending checkbox, delete button, and label to the wrapper div
  div.appendChild(checkbox);
  div.appendChild(deleteButton);
  div.appendChild(label);

  // Appending the wrapper div to the form
  form.appendChild(div);
}

// Toggle strike-through class
function toggleStrikeThrough(checkbox, label) {
  if (checkbox.checked) {
    label.classList.add("strike-through");
  } else {
    label.classList.remove("strike-through");
  }
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

// Delete done //

deleteDoneBtn.addEventListener("click", deleteDone);

function deleteDone(e) {
  e.preventDefault();
  if (confirm("Are you sure?")) {
    const items = JSON.parse(localStorage.getItem("todoItems")) || [];
    const updatedItems = items.filter((item) => !item.checked);

    // Remove checked items from DOM
    items.forEach((item) => {
      if (item.checked) {
        const checkbox = document.getElementById(`checkbox-${item.id}`);
        if (checkbox) {
          form.removeChild(checkbox.parentElement);
        }
      }
    });

    // Update local storage

    localStorage.setItem("todoItems", JSON.stringify(updatedItems));
  }
}

// Delete items & Delete mode

function deleteItem(idValue) {
  const checkbox = document.getElementById(`checkbox-${idValue}`);
  if (checkbox) {
    form.removeChild(checkbox.parentElement);
  }

  const items = JSON.parse(localStorage.getItem("todoItems")) || [];
  const updatedItems = items.filter((item) => item.id !== idValue);
  localStorage.setItem("todoItems", JSON.stringify(updatedItems));
}

deleteItemsBtn.addEventListener("click", toggleDeleteMode);

function toggleDeleteMode(e) {
  e.preventDefault();
  deleteMode = !deleteMode;

  const checkboxex = form.querySelectorAll(".form-check-input");
  const deleteButtons = form.querySelectorAll(".delete-button");
  const labels = form.querySelectorAll(".form-check-label");

  checkboxex.forEach((checkbox) => {
    checkbox.style.display = deleteMode ? "none" : "inline";
  });

  deleteButtons.forEach((button) => {
    button.style.display = deleteMode ? "inline" : "none";
  });

  labels.forEach((label) => {
    if (deleteMode) {
      label.addEventListener("click", editItem);
      label.style.cursor = "pointer";
    } else {
      label.removeEventListener("click", editItem);
      label.style.cursor = "default";
    }
  });
}

// Function to edit item on label click in delete mode
function editItem(event) {
  const label = event.target;
  const id = label.getAttribute("for").replace("checkbox-", "");
  const checkbox = document.getElementById(`checkbox-${id}`);

  // Replace label with input field for editing
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("form-control");
  input.value = label.textContent;

  label.replaceWith(input);
  input.focus();

  // Event listener to save changes on input blur
  input.addEventListener("blur", () => {
    label.textContent = input.value;
    input.replaceWith(label);
    updateItemTextInLocalStorage(id, input.value);
  });

  // Event listener to save changes on enter key press
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      label.textContent = input.value;
      input.replaceWith(label);
      updateItemTextInLocalStorage(id, input.value);
    }
  });
}

// Function to update item text in local storage
function updateItemTextInLocalStorage(id, newText) {
  const items = JSON.parse(localStorage.getItem("todoItems")) || [];
  const itemIndex = items.findIndex((item) => item.id === parseInt(id));
  if (itemIndex !== -1) {
    items[itemIndex].text = newText;
    localStorage.setItem("todoItems", JSON.stringify(items));
  }
}
