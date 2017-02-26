<!-- <form name="newStoreForm">
  <fieldset class="data">
    <legend>Add New Store</legend>
    <span>Store Name</span>
    <input type="text" name="newStoreName"><br>
    <span>Minimum Customers Per Hour</span>
    <input type="number" name="newStoreMinCust" min="1" step="1"><br>
    <span>Maximum Customers Per Hour</span>
    <input type="number" name="newStoreMaxCust" min="1" step="1"><br>
    <span>Average Cookies Sold Per Hour</span>
    <input type="number" name="newStoreAvgCookie" min="1" step=".1"><br>
    <br>
    <input class="button" type="button" value="Add New Store" onclick="addNewStore()">
  </fieldset>
</form> -->
<!-- TODO: get the edit store form to to work -->
<!-- <form name="editStoreForm">
  <fieldset class="data">
    <legend>Edit Store Info.</legend>
    <span>Store Name</span>
    <input type="text" name="editStoreName"><br>
    <span>Minimum Customers Per Hour</span>
    <input type="number" name="editStoreMinCust" min="1" step="1"><br>
    <span>Maximum Customers Per Hour</span>
    <input type="number" name="editStoreMaxCust" min="1" step="1"><br>
    <span>Average Cookies Sold Per Hour</span>
    <input type="number" name="editStoreAvgCookie" min="1" step=".1"><br>
    <br>
    <input class="button" type="button" value="Edit Store Info" onclick="editStore()">
  </fieldset>
</form> -->





// function addNewStore() {
//   // get user's input
//   var form = document.forms["newStoreForm"];
//   name = form.elements["newStoreName"].value;
//   minCust = form.elements["newStoreMinCust"].value;
//   maxCust = form.elements["newStoreMaxCust"].value;
//   avgCookie = form.elements["newStoreAvgCookie"].value;
//   // create new store object
//   stores.push(new store(name, minCust, maxCust, avgCookie));
//   console.log("added new store: " + name);
//   // rebuild table with the new store
//   // TODO: probably shoudn't rebuild table, just add the new store
//   buildTable();
// }



// use this function to add the table tags to store data
function buildTableRow(store) {
  // make row for each store
  var storeRow = "<tr><td class=\"leftColumn\">" + store.name + "</td>";
  storeRow += "<td>" + store.minCust + "</td>";
  storeRow += "<td>" + store.maxCust + "</td>";
  storeRow += "<td>" + store.avgCookie + "</td>";
  // calculate simulated cookie sales
  var storeResults = store.simulatedSales();
  console.log("simulated sales for " + store.name + ": " + storeResults);
  // loop through each hour and make cell for each calculated qty
  // for (var i = 2; i < storeResults.length; i += 3) { // the qty is every third item in the array
  for (var i = 0; i < storeResults.length; i++) {
    storeRow += "<td>" + storeResults[i][2] + "</td>";
  }
  storeRow += "</tr>";
  // TODO: total = storeResults[18];
  console.log("created table row for: " + store.name);
  return storeRow;
}




function buildTable() {
  // add headers
  // var tableData = "<tr><th rowspan=\"2\">Store Name</th>";
  // tableData += "<th rowspan=\"2\">Min Cust/Hr</th>";
  // tableData += "<th rowspan=\"2\">Max Cust/Hr</th>";
  // tableData += "<th rowspan=\"2\">Avg Cookies Sold/Hr</th>";
  // tableData += "<th colspan=\"9\">Projected Cookies Sold</th></tr>"
  // tableData += "<tr><th>10AM</th><th>11AM</th><th>12PM</th><th>1PM</th><th>2PM</th><th>3PM</th><th>4PM</th><th>5PM</th>";
  // tableData += "<th>Total</th></tr>";
  // // loop through each store and get data
  // for (var i = 0; i < stores.length; i++) {
  //   var storeRow = buildTableRow(stores[i]);
  //   tableData += storeRow;
  // }
  // // TODO: add the total of all stores
  // // print to page
  // document.getElementById("simulatedSalesData").innerHTML = tableData;
  // console.log("table built!");
}








// // loop through properties in object
// for (var property in store) {
//   if (property !== "simulatedSales") {
//     // make a new cell
//     var newCell = document.createElement("td");
//     var newNode = document.createTextNode(store[property]);
//     // put the property value in the cell
//     newCell.appendChild(newNode);
//     // add the cell to the row
//     document.getElementById(store).appendChild(newCell);
//   } else {
//     // var simulationResults = store[i].simulationResults();
//     // console.log(simulationResults);
//   }
//   // console.log("row built for " + stores.name + " with the id: store" + i);
// }
