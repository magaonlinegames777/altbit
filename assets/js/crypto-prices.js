// Fetches current USD prices from the free CoinGecko API (no API key needed)
// and stores each one in its own global variable: btcvalue, ethvalue, etc.
// Requires jQuery to be loaded on the page.

var btcvalue, ethvalue, usdtvalue, bnbvalue, solvalue, xrpvalue,
    dogevalue, tonvalue, trxvalue, adavalue, avaxvalue, wbtcvalue;

function getCryptoPrices(callback) {
  // CoinGecko id -> name of the variable to fill
  var coins = {
    "bitcoin":          "btcvalue",
    "ethereum":         "ethvalue",
    "tether":           "usdtvalue",
    "binancecoin":      "bnbvalue",
    "solana":           "solvalue",
    "ripple":           "xrpvalue",
    "dogecoin":         "dogevalue",
    "the-open-network": "tonvalue",
    "tron":             "trxvalue",
    "cardano":          "adavalue",
    "avalanche-2":      "avaxvalue",
    "wrapped-bitcoin":  "wbtcvalue",
    "usd-coin":         "usdcvalue"
  };

  $.ajax({
    url: "https://api.coingecko.com/api/v3/simple/price",
    data: { ids: Object.keys(coins).join(","), vs_currencies: "usd" },
    dataType: "json"
  })
  .done(function (data) {
    $.each(coins, function (id, varName) {
      window[varName] = data[id] ? data[id].usd : null;
    });
    if (typeof callback === "function") callback();
  })
  .fail(function (xhr, status, err) {
    console.error("Could not fetch crypto prices:", status, err);
  });
}

// Example: the values are only ready once the request finishes,
// so use them inside the callback.
$(function () {
  getCryptoPrices(function () {
    console.log("BTC:", btcvalue, "ETH:", ethvalue, "SOL:", solvalue);
  });

  // Optional: refresh every 60 seconds
  // setInterval(getCryptoPrices, 60000);
});



function coinAdder(x, y) {
  var price = window[x.toLowerCase() + "value"];
  if (!price) return null;            // price not loaded yet, or unknown coin
  return price + (price * y / 100);
}


function usdToCoin(usdAmount, coin) {
  var price = window[coin.toLowerCase() + "value"];
  if (!price) return null; // price not loaded yet, or unknown coin
  return usdAmount / price;
}
