// do this on page load
var headers = ["Store Name", "Min Cust/Hr", "Max Cust/Hr", "Avg Cookies Sold/Hr", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "Total"];
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
  // create a new row
  var newRow = document.createElement("tr");
  // newRow.setAttribute("id", store.name);
  document.getElementById("simulatedSalesData").appendChild(newRow);

  // add store name
  var cell1 = document.createElement("td");
  cell1.setAttribute("class", "leftColumn");
  var node1 = document.createTextNode(store.name);
  newRow.appendChild(cell1);
  cell1.appendChild(node1);

  // add store min customers
  var cell2 = document.createElement("td");
  var node2 = document.createTextNode(store.minCust);
  newRow.appendChild(cell2);
  cell2.appendChild(node2);

  // add store max customers
  var cell3 = document.createElement("td");
  var node3 = document.createTextNode(store.maxCust);
  newRow.appendChild(cell3);
  cell3.appendChild(node3);

  // add store avg cookies
  var cell4 = document.createElement("td");
  var node4 = document.createTextNode(store.avgCookie);
  newRow.appendChild(cell4);
  cell4.appendChild(node4);

  // get the calculated cookie quantities
  var simulationResults = store.simulatedSales();
  // add simulated sales by looping through each cookie quantity in the array
  for (var i = 0; i < simulationResults.length; i++) { // skip the last item in the array
    var cell = document.createElement("td");
    var node = document.createTextNode(simulationResults[i][2]); // the qty is the 3rd item in the sub-array
    newRow.appendChild(cell);
    cell.appendChild(node);
  }
}

function buildTable() {
  // add header row
  var headerRow = document.createElement("tr");
  document.getElementById("simulatedSalesData").appendChild(headerRow); // add row to table
  // loop through headers array and add cell to header row
  for (var i = 0; i < headers.length; i++) {
    var headerCell = document.createElement("th");
    var headerNode = document.createTextNode(headers[i]);
    headerRow.appendChild(headerCell); // add cell to row
    headerCell.appendChild(headerNode); // add node to cell
    // document.getElementById("simulatedSalesData").appendChild(headerCell);
  }
  console.log ("headers added");
  // loop through each store in the stores array, and and add row to table
  for (var i = 0; i < stores.length; i++) {
    buildTableRow(stores[i]);
  }
  console.log("table built!");
}

function addNewStore() {
  // get user's input
  var form = document.forms["newStoreForm"];
  name = form.elements["newStoreName"].value;
  minCust = form.elements["newStoreMinCust"].value;
  maxCust = form.elements["newStoreMaxCust"].value;
  avgCookie = form.elements["newStoreAvgCookie"].value;
  // create new store object
  var newStore = new store(name, minCust, maxCust, avgCookie);
  // add to the array
  stores.push(newStore);
  // add to the table
  buildTableRow(newStore);
  console.log("added new store: " + name);
  // clear the form
  form.reset();
}

function recalculate() {
  // remove all rows
  var table = document.getElementById("simulatedSalesData");
  var rows = table.getElementsByTagName("tr");
  while (rows.length > 0) {
    table.removeChild(rows[0]);
  }
  // make new table rows
  buildTable();
}
