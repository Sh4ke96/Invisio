// GET BASIC ELEMENTS
const newCarButton = document.querySelector(".newCarButton");
const newCarModal = document.querySelector(".newCarModal");
const newCarSubmitBtn = document.querySelector("#newCarSubmitButton");
const recordTable = document.querySelector(".records-table");
const addNewCarCloseButton = document.querySelector("#newCarModal-CloseButton");
let newCarDetails = document.querySelectorAll(".newCarModal input");

// WHEN CLICK BUTTON OPEN MODAL
newCarButton.addEventListener("click", addNewCarButton);
function addNewCarButton() {
  newCarModal.classList.remove("invisible");
  newCarModal.classList.add("visible");
}

// WHEN CLICK BUTTON CLOSE MODAL
addNewCarCloseButton.addEventListener("click", closeCarModal);
function closeCarModal() {
  newCarModal.classList.remove("visible");
  newCarModal.classList.add("invisible");
}

// CLEAR INPUTS FUNCTION
function clearInputs() {
  for (let i = 0; i < newCarDetails.length; i++) {
    newCarDetails[i].value = "";
  }
}

// ADD NEW RECORD IN TABLE
newCarSubmitBtn.addEventListener("click", addRecord);
function addRecord() {
  let carBrandValue = document.querySelector("#carBrand").value;
  let carModelValue = document.querySelector("#carModel").value;
  let yearProductionValue = document.querySelector("#yearProduction").value;
  let anotherRecord = new Record(
    carBrandValue,
    carModelValue,
    yearProductionValue
  );
  closeCarModal();
  clearInputs();
}

// CREATE OBJECT IN CLASS RECORD
class Record {
  constructor(carBrand, carModel, yearProduction) {
    this.carBrand = carBrand;
    this.carModel = carModel;
    this.yearProduction = yearProduction;
    this.addRow();
  }
}

// SET ID FOR EACH TABLE ROW
let idContainer = 0;
Record.prototype.addRow = function () {
  let newLog = document.createElement("tr");
  newLog.setAttribute("id", idContainer);
  newLog.setAttribute("class", "border-bottom");
  idContainer++;
  recordTable.appendChild(newLog);
  // STORE VALUES AND ADD THEM TO EACH TD
  let valueStorage = [this.carBrand, this.carModel, this.yearProduction];
  for (let i = 0; i < 3; i++) {
    let tableData = document.createElement("td");
    newLog.appendChild(tableData);
    tableData.textContent = valueStorage[i];
  }
  // ADD DELETE AND EDIT BUTTONS TO ACTIONS TD
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "btn btn-dark my-2");
  newLog.appendChild(deleteBtn);
  deleteBtn.textContent = "Delete";
  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", "btn btn-dark m-2");
  newLog.appendChild(editBtn);
  editBtn.textContent = "Edit";
  let editThisRow = function (e) {
    let popUpHeading = document.querySelector(".newCarModal h2");
    let thisRow = e.target.parentNode;
    let editStorage = [];
    for (let i = 0; i < 3; i++) {
      editStorage.push(thisRow.childNodes[i].textContent);
    }
    editStorage[1] = editStorage[1].replace(/([A-Z])/, "");
    editStorage[2] = editStorage[2].replace(/([A-Z])/, "");
    for (let i = 0; i < 3; i++) {
      newCarDetails[i].value = editStorage[i];
    }
    popUpHeading.textContent = "Edit Car";
    addNewCarButton();
    // CLONE EDIT BUTTON & CHANGE CLASES FOR BUTTONS
    let oldRecordEditBtn = document.querySelector("#editCarButton");
    let recordEditBtn = oldRecordEditBtn.cloneNode(true);
    oldRecordEditBtn.parentNode.replaceChild(recordEditBtn, oldRecordEditBtn);
    newCarSubmitBtn.classList.remove("d-block");
    newCarSubmitBtn.classList.add("d-none");
    recordEditBtn.classList.remove("d-none");
    recordEditBtn.addEventListener("click", () => {
      let thisRowTds = thisRow.childNodes;
      for (let i = 0; i < 3; i++) {
        thisRowTds[i].textContent = newCarDetails[i].value;
      }
      // CLOSE MODAL, CLEAR INPUTS AND CHANGE CLASES
      closeCarModal();
      newCarSubmitBtn.classList.remove("d-none");
      newCarSubmitBtn.classList.add("d-block");
      recordEditBtn.classList.add("d-none");
      popUpHeading.textContent = "ADD NEW CAR";
      clearInputs();
    });
  };
  deleteBtn.addEventListener("click", () => {
    newLog.remove();
  });
  editBtn.addEventListener("click", editThisRow);
};

// SORT TABLE BY NAME
function sortTableByName(n) {
  table = document.getElementById("table");
  switchcount = 0;
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// SORT TABLE BY NUMBERS
function sortTableByNumber(n) {
  table = document.getElementById("table");
  switchcount = 0;
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// SEARCH FUNCTION FOR CAR MODEL
function searchFunction() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("table");
  const tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
