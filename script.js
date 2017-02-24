// do this on page load
makeTable();

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
}

// use to add tags to store data
function makeTableRow(store) {
  var storeRow = "<tr><td>" + store.name + "</td>";
  storeRow += "<td>" + store.minCust + "</td>";
  storeRow += "<td>" + store.maxCust + "</td>";
  storeRow += "<td>" + store.avgCookie + "</td>";
  var storeResults = store.simulatedSales();
  for (var i = 1; i < storeResults.length; i += 2) {
    storeRow += "<td>" + storeResults[i] + "</td>";
  }
  storeRow += "</tr>";
  total = storeResults[18];
  return storeRow;
}

function makeTable() {
  // make the store objects
  var store1 = new store("Pioneer Square", 17, 88, 5.2);
  var store2 = new store("Portland Airport", 6, 24, 1.2)
  var store3 = new store("Washington Square", 11, 38, 1.9);
  var store4 = new store("Sellwood", 20, 48, 3.3);
  var store5 = new store("Pearl District", 3, 24, 2.6);
  // get headers
  var tableData = "<tr><th>Store Name</th><th>Min Cust/Hr</th><th>Max Cust/Hr</th><th>Avg Cookies Sold/Hr</th>";
  tableData += "<th>10AM</th><th>11AM</th><th>12PM</th><th>1PM</th><th>2PM</th><th>3PM</th><th>4PM</th><th>5PM</th><th>Total</th></tr>"
  // get store data with table tags
  tableData +=  makeTableRow(store1);
  tableData += makeTableRow(store2);
  tableData += makeTableRow(store3);
  tableData += makeTableRow(store4);
  tableData += makeTableRow(store5);
  // add the total
  // tableData =+ "<tr><td colspan=\"12\">Total</td><td>" + total + "</td></tr>";
  // show table data on the page
  document.getElementById("simulatedSalesData").innerHTML = tableData;
}

function addNewStore() {
  var form = document.forms["newStoreForm"];
  name = form.elements["newStoreName"].value;
  minCust = form.elements["newStoreMinCust"].value;
  maxCust = form.elements["newStoreMaxCust"].value;
  avgCookie = form.elements["newStoreAvgCookie"].value;
  var newStore = new store(name, minCust, maxCust, avgCookie);
}
