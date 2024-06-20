/*
<input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                /> 


                <label class="form-check-label" for="flexCheckDefault">
    Default checkbox
  </label>
*/

const ul = document.getElementById("list-wrapper");
// Creating checkbox
const checkbox = document.createElement("input");
checkbox.setAttribute("type", "checkbox");
checkbox.setAttribute("value", "");
checkbox.setAttribute("id", "flexCheckDefault");
checkbox.classList.add("form-check-input");
// Creating label for checkbox
const label = document.createElement("label");
label.setAttribute("for", "flexCheckDefault");
label.classList.add("form-check-label");
label.textContent = "Test content";

ul.appendChild(checkbox);
ul.appendChild(label);
