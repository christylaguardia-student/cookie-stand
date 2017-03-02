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
  this.minCust = minCust; // per hour
  this.maxCust = maxCust; // per hour
  this.avgCookie = avgCookie; // per hour
  this.simulatedSales = function() {
    // console.log("...doing calculations for " + this.name + "...");
    // console.log("min: " + this.minCust);
    // console.log("max: " + this.maxCust);
    // console.log("avg: " + this.avgCookie);
    var simulationArray = [];
    var simulationTotal = 0;
    for (var i = 0; i < hours.length; i++) {
      var randomCustPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
      // prevent 0 customers and 0 quantities
      if (randomCustPerHour === 0) {
        randomCustPerHour = 1;
      }
      var simulatedCookieQty = Math.floor(randomCustPerHour * this.avgCookie);
      simulationArray.push(simulatedCookieQty);
      simulationTotal += simulatedCookieQty;
      // console.log("random cust: " + randomCustPerHour);
      // console.log("cookie qty: " + simulatedCookieQty);
    }
    simulationArray.push(simulationTotal);
    // console.log("total: " + simulationTotal);
    return simulationArray;
  };
  console.log("store object created: " + this.name);
}

function buildTableRow(store) {
  var tableRow = document.createElement("tr");
  var tableData = document.createElement("td");
  // add store name to row
  tableData.setAttribute("class", "leftColumn");
  tableData.textContent = store.name;
  tableRow.appendChild(tableData);
  // get projected sales data
  var simulationResults = store.simulatedSales();
  total += simulationResults[simulationResults.length - 1]; // get last item
  // console.log("all store total: " + total);
  // add projected sales data to row
  for (var i = 0; i < simulationResults.length; i++) {
    var tableCalcData = document.createElement("td");
    tableCalcData.textContent = simulationResults[i];
    tableRow.appendChild(tableCalcData);
  }
  return tableRow;
}

function editStore(storeName) {
  alert("OMG! it worked for: " + storeName);
}

function removeStore() {
  alert("OMG! it worked!");
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

function addNewStore() {
  // get user's input
  var form = document.forms["newStoreForm"];
  var userStoreName = form.elements["newStoreName"].value;
  var userMinCust = form.elements["newStoreMinCust"].value;
  var userMaxCust = form.elements["newStoreMaxCust"].value;
  var userAvgCookie = form.elements["newStoreAvgCookie"].value;

  // check if form is filled out completely
  if ((userStoreName === "") || (userMinCust === "") || (userMaxCust === "") || (userAvgCookie === "")) {
    console.log("form incomplete");
    if (userStoreName === "") {
      document.getElementById("errorStoreName").style.visibility = "visible";
    } else {
      document.getElementById("errorStoreName").style.visibility = "hidden";
    }
    if (userMinCust === "") {
      document.getElementById("errorMinCust").style.visibility = "visible";
    } else {
      document.getElementById("errorMinCust").style.visibility = "hidden";
    }
    if (userMaxCust === "") {
      document.getElementById("errorMaxCust").style.visibility = "visible";
    } else {
      document.getElementById("errorMaxCust").style.visibility = "hidden";
    }
    if (userAvgCookie === "") {
      document.getElementById("errorAvgCookie").style.visibility = "visible";
    } else {
      document.getElementById("errorAvgCookie").style.visibility = "hidden";
    }
  } else {
    // show x's if already hidden
    document.getElementById("errorStoreName").style.visibility = "hidden";
    document.getElementById("errorMinCust").style.visibility = "hidden";
    document.getElementById("errorMaxCust").style.visibility = "hidden";
    document.getElementById("errorAvgCookie").style.visibility = "hidden";
    // create new store object
    var newStore = new Store(userStoreName, userMinCust, userMaxCust, userAvgCookie);
    stores.push(newStore);
    // remove the old total row
    var table = document.getElementById("simulatedSalesData");
    var oldTotalRow = document.getElementById("totalRow");
    table.removeChild(oldTotalRow);
    // add the store row
    table.appendChild(buildTableRow(newStore));
    // add the new total row
    buildTotalRow();
    console.log("added new store for: " + userStoreName);
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
