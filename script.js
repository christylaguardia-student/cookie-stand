// create generic object
function store(minCust,maxCust,avgCookieSale) {
  this.minCust = minCust; // per hour
  this.maxCust = maxCust; // per hour
  this.avgCookieSale = avgCookieSale; // per hour
  this.simulatedSales = function() {
    var simulationArray = [];
    var total = 0;
    // loop through each hour store is open
    for (var i = 10; i < 18; i++) {
      // get the open store hour
      var hour = ((i + 11) % 12 + 1);
      if (i <= 12) {
        hour += "am";
      } else {
        hour += "pm";
      }
      // get random amount of customers per hour
      var randomCustPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
      // calculate amount of cookies per hour
      var simulatedCookieQty = Math.floor(randomCustPerHour * this.avgCookieSale);
      // add to total qty
      total += simulatedCookieQty;
      // put results in the array
      simulationArray.push(hour + ": " + simulatedCookieQty);
    }
    // add total to store's array
    simulationArray.push("Total: " + total);
    return simulationArray;
  };
}

// Location	Min / Cust,	Max / Cust,	Avg Cookie / Sale
var pioneerSquareShop = new store(17, 88, 5.2);
var portlandAirportShop = new store(6, 24, 1.2)
var washingtonSquareShop = new store(11, 38, 1.9);
var sellwoodShop = new store(20, 48, 3.3);
var pearlDistrictShop = new store(3, 24, 2.6);
