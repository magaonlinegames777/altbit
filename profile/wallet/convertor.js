function btcToEth(btcAmount) {
  if (!btcvalue || !ethvalue) return null; // prices not loaded yet
  return (btcAmount * btcvalue) / ethvalue;
}

function btcTo(btcAmount) {
  if (!btcvalue || !ethvalue) return null; // prices not loaded yet
  return (btcAmount * btcvalue) / ethvalue;
}


function convertCoin(amount, from, to) {
  var fromPrice = window[from.toLowerCase() + "value"];
  var toPrice   = window[to.toLowerCase() + "value"];
  if (!fromPrice || !toPrice) return null; // prices not loaded yet, or unknown coin
  return (amount * fromPrice) / toPrice;
}

function getRate(from, to) {
  var fromPrice = window[from.toLowerCase() + "value"];
  var toPrice   = window[to.toLowerCase() + "value"];
  if (!fromPrice || !toPrice) return null; // prices not loaded yet, or unknown coin
  return fromPrice / toPrice;
}