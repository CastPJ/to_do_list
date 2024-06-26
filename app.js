const form = document.getElementById("form-check");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const deleteItemsBtn = document.getElementById("delete-items");
const clearListBtn = document.getElementById("clear-list");
const customizeBtn = document.getElementById("customize");

let id = 1;

function createItem() {
  const formText = input.value;
  if (formText === "") {
    alert("Please add an item");
  } else {
    addItem(formText, id);
    id += 1;
    input.value = ""; // Clear the input field after adding the item
  }
}

function addItem(textValue, idValue) {
  // Creating checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("value", "");
  checkbox.setAttribute("id", idValue);
  checkbox.classList.add("form-check-input");

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

btn.addEventListener("click", createItem);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the form from being submitted
    createItem();
  }
});
// Changing title
document.addEventListener("DOMContentLoaded", () => {
  const listTitle = document.getElementById("list-title");

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
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        listTitle.textContent = input.value;
        input.replaceWith(listTitle);
      }
    });
  });
});
