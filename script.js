// do this on page load
var headers = ["Store Name", "Min Cust", "Max Cust", "Avg Cookies Sold", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "Total"];
var stores = [];
stores.push(new store("Pioneer Square", 17, 88, 5.2));
stores.push(new store("Portland Airport", 6, 24, 1.2));
stores.push(new store("Washington Square", 11, 38, 1.9));
stores.push(new store("Sellwood", 20, 48, 3.3));
stores.push(new store("Pearl District", 3, 24, 2.6));
console.log(stores);
buildTable();

// create generic object
function store(name, minCust, maxCust, avgCookie) {
  this.name = name;
  this.minCust = minCust; // per hour
  this.maxCust = maxCust; // per hour
  this.avgCookie = avgCookie; // per hour
  this.simulatedSales = function() {
    var simulationArray = [];
    var simulationTotal = 0;
    // loop through each hour store is open, 10am to 6pm
    for (var i = 10; i < 18; i++) {
      // get hour in 12 hour am/pm format
      var hour = ((i + 11) % 12 + 1);
      if (i < 12) {
        hour += " am";
      } else {
        hour += " pm";
      }
      // get random amount of customers per hour
      var randomCustPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
      // calculate amount of cookies per hour
      var simulatedCookieQty = Math.floor(randomCustPerHour * this.avgCookie);
      // put results in the array
      simulationArray.push([hour, randomCustPerHour, simulatedCookieQty]);
      // add to total qty
      simulationTotal += simulatedCookieQty;
    }
      // put the total in the array
      simulationArray.push(["","",simulationTotal]);
      // console.log("simulated sales array for " + this.name + ":");
      // console.log(simulationArray);
      return simulationArray;
  };
  console.log("store object created: " + this.name);
}

function buildTableRow(store) {
  var newRow = document.createElement("tr");
  // assign an id to the row
  newRow.setAttribute("id", store);
  // add the row to the table
  document.getElementById("simulatedSalesData").appendChild(newRow);
  // lookup type of
  var rowCell1 = document.createElement("td");
  var rowNode1 = document.createTextNode(store.name);
  rowCell1.appendChild(rowNode1);
  document.getElementById("simulatedSalesData").appendChild(rowCell1);

  var rowCell2 = document.createElement("td");
  var rowNode2 = document.createTextNode(store.minCust);
  rowCell2.appendChild(rowNode2);
  document.getElementById("simulatedSalesData").appendChild(rowCell2);

  var rowCell3 = document.createElement("td");
  var rowNode3 = document.createTextNode(store.maxCust);
  rowCell3.appendChild(rowNode3);
  document.getElementById("simulatedSalesData").appendChild(rowCell3);

  var rowCell4 = document.createElement("td");
  var rowNode4 = document.createTextNode(store.avgCookie);
  rowCell4.appendChild(rowNode4);
  document.getElementById("simulatedSalesData").appendChild(rowCell4);

  var simulationResults = store.simulatedSales();
  for (var i = 0; i < simulationResults.length; i++) {
    var rowCell = document.createElement("td");
    var rowNode = document.createTextNode(simulationResults[i][2]);
    rowCell.appendChild(rowNode);
    document.getElementById("simulatedSalesData").appendChild(rowCell);
  }
}

function buildTable() {
  // add headers
  var headerRow = document.createElement("tr");
  for (var i = 0; i < headers.length; i++) {
    var headerCell = document.createElement("th");
    var headerNode = document.createTextNode(headers[i]);
    headerCell.appendChild(headerNode);
    document.getElementById("simulatedSalesData").appendChild(headerCell);
  }
  // loop through each store in the stores array, and and add row to table
  for (var i = 0; i < stores.length; i++) {
    buildTableRow(stores[i]);
  }
  console.log("table built!")
}
