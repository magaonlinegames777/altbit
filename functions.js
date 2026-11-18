    const apiUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly';
    const priceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true';

  
    $(document).ready(function() {




    // Initial fetch
    fetchPrice();

    // Update price every 60 seconds
    setInterval(fetchPrice, 60000);


});


// new 
            // Fetch current price and 24h change
function fetchPrice() {
     $.ajax({
         url: priceUrl,
         method: 'GET',
         success: function(data) {
             const price = data.bitcoin.usd;
             const change = data.bitcoin.usd_24h_change;
             $('.btcPrice').text(`$${price.toFixed(2)}`);
             $('.btcChange').text(`24h Change: ${change.toFixed(2)}%`);
             $('.btcChange').removeClass('positive negative');
             $('.btcChange').addClass(change >= 0 ? 'positive' : 'negative');
             $('.error').hide();
         },
         error: function() {
             $('.error').show();
         }
     });
 }

