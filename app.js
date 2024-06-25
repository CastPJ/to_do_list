const form = document.getElementById("form-check");

const btn = document.getElementById("btn");
const input = document.getElementById("input");

function createItem() {
  const formText = input.value;
  const id = 1;
  addItem(formText, id);
  id += 1;
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
  label.setAttribute("for", idValue);
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
