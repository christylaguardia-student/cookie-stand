// do this on page load
var hours = ["10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var stores = [];
var total = 0;
stores.push(new Store("Pioneer Square", 17, 88, 5.2));
stores.push(new Store("Portland Airport", 6, 24, 1.2));
stores.push(new Store("Washington Square", 11, 38, 1.9));
stores.push(new Store("Sellwood", 20, 48, 3.3));
stores.push(new Store("Pearl District", 3, 24, 2.6));
console.log(stores);
buildTable();

// create generic object
function Store(name, minCust, maxCust, avgCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.simulatedSales = function() {
    var simulationArray = [];
    var simulationTotal = 0;
    for (var i = 0; i < hours.length; i++) {
      var randomCustPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      var simulatedCookieQty = Math.floor(randomCustPerHour * this.avgCookie);
      simulationArray.push(simulatedCookieQty);
      simulationTotal += simulatedCookieQty;
    }
    simulationArray.push(simulationTotal);
    return simulationArray;
  };
  console.log("store object created: " + this.name);
}

function buildTableRow(store) {
  var tableRow = document.createElement("tr");
  // add on click event
  tableRow.addEventListener("click", function(){ preFillEditForm(store); });
  var tableData = document.createElement("td");
  // add store name to row
  tableData.setAttribute("class", "leftColumn");
  tableData.textContent = store.name;
  tableRow.appendChild(tableData);
  // get projected sales data
  var simulationResults = store.simulatedSales();
  total += simulationResults[simulationResults.length - 1]; // get last item
  // add projected sales data to row
  for (var i = 0; i < simulationResults.length; i++) {
    var tableCalcData = document.createElement("td");
    tableCalcData.textContent = simulationResults[i];
    tableRow.appendChild(tableCalcData);
  }
  return tableRow;
}

function buildTable() {
  var table = document.getElementById("simulatedSalesData");
  // add headers
  var tableRow = document.createElement("tr");
  var tableHeader = document.createElement("th");
  tableHeader.textContent = "Store";
  tableRow.appendChild(tableHeader);
  for (var i = 0; i < hours.length; i++) {
    tableHeader = document.createElement("th");
    tableHeader.textContent = hours[i];
    tableRow.appendChild(tableHeader);
    // console.log(hours[i]);
  }
  tableHeader = document.createElement("th");
  tableHeader.textContent = "Day Total";
  tableRow.appendChild(tableHeader);
  table.appendChild(tableRow);
  // console.log ("headers added");

  // add stores
  for (var i = 0; i < stores.length; i++) {
    table.appendChild(buildTableRow(stores[i]));
  }
  buildTotalRow();
}

function buildTotalRow() {
  var table = document.getElementById("simulatedSalesData");
  var tableRow = document.createElement("tr");
  tableRow.setAttribute("id", "totalRow");
  var tableData = document.createElement("td");
  tableData.setAttribute("colspan", hours.length + 1);
  tableData.textContent = "All Stores Total";
  tableRow.appendChild(tableData);
  var tableData2 = document.createElement("td");
  tableData2.textContent = total;
  tableRow.appendChild(tableData2);
  table.appendChild(tableRow);
}

function preFillEditForm(store) {
  // alert("you clicked on " + store.name);
  // fill in the form
  var form = document.forms["editStoreForm"];
  form.elements["editStoreName"].value = store.name;
  form.elements["editStoreMinCust"].value = store.minCust;
  form.elements["editStoreMaxCust"].value = store.maxCust;
  form.elements["editStoreAvgCookie"].value = store.avgCookie;
  // set the button events
  form.elements["deleteStoreButton"].addEventListener("click", function(){ deleteStore(store); });
  // form.elements["editStoreButton"].addEventListener("click", function(){ editStore(store); });
  // form.elements["editStoreButton"].setAttribute("onclick", "editStore()", store);
  // form.elements["editStoreButton"].onclick = editStore(store);
  // form.elements["deleteStoreButton"].onclick = deleteStore(store);
}

function editStore(store) {
  // get user input
  var form = document.forms["editStoreForm"];
  var userStoreName = form.elements["editStoreName"].value;
  var userMinCust = parseInt(form.elements["editStoreMinCust"].value);
  var userMaxCust = parseInt(form.elements["editStoreMaxCust"].value);
  var userAvgCookie = parseInt(form.elements["editStoreAvgCookie"].value);
  // chagne object properties
  store.name = userStoreName;
  store.minCust = userMinCust;
  store.maxCust = userMaxCust;
  store.avgCookie = userAvgCookie;
  // update table
  var table = document.getElementById("simulatedSalesData");
  var oldTotalRow = document.getElementById("totalRow");
  table.removeChild(oldTotalRow);
  table.appendChild(buildTableRow(store));
  buildTotalRow();
}

function deleteStore(store) {
  // remove from the array
  var index = stores.indexOf(store);
  console.log(index);
  if (index > -1) {
    stores.splice(index, 1);
  }
  // remove from the table
  
}

function addNewStore() {
  // get user's input
  var form = document.forms["newStoreForm"];
  var userStoreName = form.elements["newStoreName"];
  var userMinCust = form.elements["newStoreMinCust"];
  var userMaxCust = form.elements["newStoreMaxCust"];
  var userAvgCookie = form.elements["newStoreAvgCookie"];

  // check if form is filled out completely
  if ((userStoreName.checkValidity() === true) && (userMaxCust.checkValidity() === true) && (userMinCust.checkValidity() === true) && (userAvgCookie.checkValidity() === true)) {
    // create new store object
    var newStore = new Store(userStoreName.value, userMinCust.value, userMaxCust.value, userAvgCookie.value);
    stores.push(newStore);
    // remove the old total row
    var table = document.getElementById("simulatedSalesData");
    var oldTotalRow = document.getElementById("totalRow");
    table.removeChild(oldTotalRow);
    // add the store row
    table.appendChild(buildTableRow(newStore));
    // add the new total row
    buildTotalRow();
    console.log("added new store for: " + userStoreName.value);
    // console.log(newStore);
    // clear the form
    form.reset();
  }
}

function recalculate() {
  total = 0;
  // remove all rows
  var table = document.getElementById("simulatedSalesData");
  var rows = table.getElementsByTagName("tr");
  while (rows.length > 0) {
    table.removeChild(rows[0]);
  }
  buildTable();
}
