// create generic object
function store(name, minCust, maxCust, avgCookieSale) {
  this.name = name;
  this.minCust = minCust; // per hour
  this.maxCust = maxCust; // per hour
  this.avgCookieSale = avgCookieSale; // per hour
  this.simulatedSales = function() {
    var simulationResults = "";
    var simulationArray = ["<td class=\"leftColumn\">" + this.name + "</td>"];
    var total = 0;
    // loop through each hour store is open
    for (var i = 10; i < 18; i++) {
      // get the open store hour
      var hour = ((i + 11) % 12 + 1);
      if (i <= 12) {
        hour += " am";
      } else {
        hour += " pm";
      }
      // get random amount of customers per hour
      var randomCustPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
      // calculate amount of cookies per hour
      var simulatedCookieQty = Math.floor(randomCustPerHour * this.avgCookieSale);
      // add to total qty
      total += simulatedCookieQty;
      // put results in the array
      simulationArray.push("<td>" + simulatedCookieQty + "</td>");
    }
    // loop through array to make list items
    for (var i = 0; i < simulationArray.length; i++) {
      simulationResults += simulationArray[i];
    }
    // add total
    simulationResults += "<td class=\"rightColumn\">" + total + "</td>";
    return simulationResults;
  };
}

// make the store objects
var pioneerSquareStore = new store("Pioneer Square", 17, 88, 5.2);
var portlandAirportStore = new store("Portland Airport", 6, 24, 1.2)
var washingtonSquareStore = new store("Washington Square", 11, 38, 1.9);
var sellwoodStore = new store("Sellwood", 20, 48, 3.3);
var pearlDistrictStore = new store("Pearl District", 3, 24, 2.6);

// show simulated sales on page
document.getElementById("pioneerSquareList").innerHTML = pioneerSquareStore.simulatedSales();
document.getElementById("portlandAirportList").innerHTML = portlandAirportStore.simulatedSales();
document.getElementById("washingtonSquareList").innerHTML = washingtonSquareStore.simulatedSales();
document.getElementById("sellwoodList").innerHTML = sellwoodStore.simulatedSales();
document.getElementById("pearlDistrictList").innerHTML = pearlDistrictStore.simulatedSales();
