    //["<td class=\"leftColumn\">" + this.name + "</td>", "<td>" + this.minCust + "</td>", "<td>" + this.maxCust + "</td>", "<td>" + this.avgCookie + "</td>"];

    // get the open store hour
    // var hour = ((i + 11) % 12 + 1);
    // if (i <= 12) {
    //   hour += " am";
    // } else {
    //   hour += " pm";
    // }



    // simulationArray.push("<td>" + simulatedCookieQty + "</td>");


    // loop through array to make list items
    // for (var i = 0; i < simulationArray.length; i++) {
    //   simulationResults += simulationArray[i];
    // }
    // add total
    // simulationResults += "<td class=\"rightColumn\">" + total + "</td>";
    // return simulationResults
    return simulatedCookieQty;



    // show simulated sales on page
    // document.getElementById("pioneerSquareList").innerHTML = pioneerSquareStore.simulatedSales();
    // document.getElementById("portlandAirportList").innerHTML = portlandAirportStore.simulatedSales();
    // document.getElementById("washingtonSquareList").innerHTML = washingtonSquareStore.simulatedSales();
    // document.getElementById("sellwoodList").innerHTML = sellwoodStore.simulatedSales();
    // document.getElementById("pearlDistrictList").innerHTML = pearlDistrictStore.simulatedSales();





    <!-- <tr>
      <th>Store</th>
      <th>Min Customers/Hour</th>
      <th>Max Customers/Hour</th>
      <th>Avg Cookies/Hour</th>
      <th>10 AM</th>
      <th>11 AM</th>
      <th>12 AM</th>
      <th>1 PM</th>
      <th>2 PM</th>
      <th>3 PM</th>
      <th>4 PM</th>
      <th>5 PM</th>
      <th>Total</th>
    </tr>
    <tr id="tableHeaders"></tr>
    <tr id="pioneerSquareList"></tr>
    <tr id="portlandAirportList"></tr>
    <tr id="washingtonSquareList"></tr>
    <tr id="sellwoodList"></tr>
    <tr id="pearlDistrictList"></tr>
    <tr><td colspan="12">Total</td><td id="simulatedCookieTotal">???</td> -->







    // tableData += makeTableRow(pioneerSquareStore.name, pioneerSquareStore.minCust, pioneerSquareStore.maxCust, pioneerSquareStore.simulatedSales());







    function makeTableRow(storeName, minCust, maxCust, avgCookie, simulationArray) {
      // add tags to properties
      var rowData = "<tr><td>" + storeName + "</td>";
      rowData += "<td>" + minCust + "</td>";
      rowData += "<td>" + maxCust + "</td>";
      rowData += "<td>" + avgCookie + "</td>";
      // loop through array and add tags only to qty
      for (var i = 1; i < 18; i += 2) {
        rowData += "<td>" + simulationArray[i] + "</td>";
      }
      rowData += "/tr>";
      return rowData;
    }
