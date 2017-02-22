// create generic object
function store(minCust,maxCust,avgCookieSale) {
  this.minCust = minCust; // per hour
  this.maxCust = maxCust; // per hour
  this.avgCookieSale = avgCookieSale; // per hour
  this.simulatedSales = function() {
    var simulationArray = [];
    // loop through each hour store is open
    for (var i = 0; i < 9; i++) {
      var hour = i;
      // get random amount of customers per hour
      var randomCustPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
      // calculate amount of cookies per hour
      var simulatedCookieQty = Math.floor(randomCustPerHour * this.avgCookieSale);
      // put results in the array
      simulationArray.push([hour, randomCustPerHour, simulatedCookieQty]);
    }
    return simulationArray;
  };
}

// Location	Min / Cust,	Max / Cust,	Avg Cookie / Sale
var pioneerSquareShop = new store(17, 88, 5.2);
var portlandAirportShop = new store(6, 24, 1.2)
var washingtonSquareShop = new store(11, 38, 1.9);
var sellwoodShop = new store(20, 48, 3.3);
var pearlDistrictShop = new store(3, 24, 2.6);
