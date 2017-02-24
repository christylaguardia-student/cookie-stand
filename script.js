// do this on page load
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
      simulationArray.push(hour, simulatedCookieQty);
      // add to total qty
      simulationTotal += simulatedCookieQty;
    }
      // put the total in the array
      simulationArray.push("Total", simulationTotal);
      return simulationArray;
  };
  console.log("store object created: " + this.name);
}

// use to add tags to store data
function buildTableRow(store) {
  var storeRow = "<tr><td class=\"leftColumn\">" + store.name + "</td>";
  storeRow += "<td>" + store.minCust + "</td>";
  storeRow += "<td>" + store.maxCust + "</td>";
  storeRow += "<td>" + store.avgCookie + "</td>";
  var storeResults = store.simulatedSales();
  for (var i = 1; i < storeResults.length; i += 2) {
    storeRow += "<td>" + storeResults[i] + "</td>";
  }
  storeRow += "</tr>";
  // TODO: total = storeResults[18];
  console.log("created table row for: " + store.name);
  return storeRow;
}

function buildTable() {
  // add headers
  var tableData = "<tr><th rowspan=\"2\">Store Name</th>";
  tableData += "<th rowspan=\"2\">Min Cust/Hr</th>";
  tableData += "<th rowspan=\"2\">Max Cust/Hr</th>";
  tableData += "<th rowspan=\"2\">Avg Cookies Sold/Hr</th>";
  tableData += "<th colspan=\"9\">Projected Cookies Sold</th></tr>"
  tableData += "<tr><th>10AM</th><th>11AM</th><th>12PM</th><th>1PM</th><th>2PM</th><th>3PM</th><th>4PM</th><th>5PM</th>";
  tableData += "<th>Total</th></tr>";
  // loop through each store and get data
  for (var i = 0; i < stores.length; i++) {
    var storeRow = buildTableRow(stores[i]);
    tableData += storeRow;
  }
  // TODO: add the total
  // print to page
  document.getElementById("simulatedSalesData").innerHTML = tableData;
  console.log("table built!");
}

function addNewStore() {
  // get user's input
  var form = document.forms["newStoreForm"];
  name = form.elements["newStoreName"].value;
  minCust = form.elements["newStoreMinCust"].value;
  maxCust = form.elements["newStoreMaxCust"].value;
  avgCookie = form.elements["newStoreAvgCookie"].value;
  stores.push(new store(name, minCust, maxCust, avgCookie));
  console.log("added new store: " + name);
  buildTable();
}
