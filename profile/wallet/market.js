// row id (without "_market") -> CoinGecko id
var marketCoins = [
  { sym: "btc",   id: "bitcoin" },
  { sym: "eth",   id: "ethereum" },
  { sym: "usdt",  id: "tether" },
  { sym: "bnb",   id: "binancecoin" },
  { sym: "usdc",  id: "usd-coin" },
  { sym: "xrp",   id: "ripple" },
  { sym: "sol",   id: "solana" },
  { sym: "trx",   id: "tron" },
  { sym: "steth", id: "staked-ether" },
  { sym: "doge",  id: "dogecoin" },
  { sym: "hype",  id: "hyperliquid" }
];

function loadMarkets() {
  var ids = marketCoins.map(function (c) { return c.id; }).join(",");

  $.ajax({
    url: "https://api.coingecko.com/api/v3/coins/markets",
    data: {
      vs_currency: "usd",
      ids: ids,
      sparkline: true,
      price_change_percentage: "24h"
    },
    dataType: "json"
  })
  .done(function (data) {
    var byId = {};
    data.forEach(function (d) { byId[d.id] = d; });

    marketCoins.forEach(function (c) {
      var d = byId[c.id];
      var row = $("#" + c.sym + "_market");   // find the existing row
      if (!d || !row.length) return;

      var change = d.price_change_percentage_24h || 0;
      var up = change >= 0;

      row.find(".price").text(formatUsd(d.current_price));
      row.find(".change")
         .text((up ? "+" : "") + change.toFixed(2) + "%")
         .removeClass("change-up change-down")
         .addClass(up ? "change-up" : "change-down");
      row.find(".low").text(formatUsd(d.low_24h));
      row.find(".volume").text(formatVolume(d.total_volume));
      row.find(".chart").html(sparkline(d.sparkline_in_7d.price, up));
    });
    console.log('New ETH');
    getCryptoPrices(function () {


      // ADMIN ADDER
      var raised = coinAdder("ETH", 10);
      console.log("ETH +10% = $" + raised.toFixed(2));
      ethPercentage = raised.toFixed(2);
      $('#eth_market .price').text(ethPercentage);
      // $('#eth_market .price').text(raised.toFixed(2));

      // console.log('Show BTC USD Balances: '+ btcUSDValue + 'v+'+ btcvalue);
          $('#eth_market .price').text(formatUsd(ethPercentage));
          var newLow = ethPercentage - 5;
          $('#eth_market .low').text(formatUsd(newLow));
    });
    

  })
  .fail(function (xhr, status, err) {
    console.log("Failed to load markets:", xhr.status, status, err);
  });



}

// --- helpers (same as before) ---

function formatUsd(n) {
  if (n == null) return "-";
  var digits = n < 1 ? 4 : 2;
  return "$" + n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function formatVolume(n) {
  if (n == null) return "-";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(2) + "K";
  return "$" + n.toFixed(2);
}

function sparkline(prices, up) {
  if (!prices || !prices.length) return "-";
  var w = 90, h = 30, pad = 2;
  var min = Math.min.apply(null, prices);
  var max = Math.max.apply(null, prices);
  var range = (max - min) || 1;
  var step = (w - pad * 2) / (prices.length - 1);

  var points = prices.map(function (p, i) {
    var x = pad + i * step;
    var y = pad + (h - pad * 2) * (1 - (p - min) / range);
    return x.toFixed(1) + "," + y.toFixed(1);
  }).join(" ");

  var color = up ? "#26a65b" : "#e0484d";
  return '<svg class="spark" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
         '<polyline fill="none" stroke="' + color + '" stroke-width="1.5" points="' + points + '"/></svg>';
}

$(function () {
  loadMarkets();
  // setInterval(loadMarkets, 60000);
});


function showBalances(){
  getCryptoPrices(function () {


    // ADMIN ADDER
    var raised = coinAdder("ETH", 10);
    console.log("ETH +10% = $" + raised.toFixed(2));
    ethPercentage = raised.toFixed(2);
    $('#eth_market .price').text(raised.toFixed(2));

    // console.log('Show BTC USD Balances: '+ btcUSDValue + 'v+'+ btcvalue);
  });
    
 
    
}


