$(document).ready(function() {
    
    

    // Initial fetch
    fetchCryptoPrices();

    // Fetch every 1 minute (60,000 milliseconds)
    setInterval(fetchCryptoPrices, 60000);
});



function fetchCryptoPrices() {
        $.ajax({
            url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple,dogecoin,toncoin,tron&vs_currencies=usd&include_24hr_change=true',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                // Debug: Log the full response to inspect any issues
                console.log('API Response:', data);

                // Assign prices and changes with safeguards to prevent undefined errors
                if (data.bitcoin && data.bitcoin.usd !== undefined) {
                    btcvalue = data.bitcoin.usd;
                    btc24hrchange = data.bitcoin.usd_24h_change || 0; // Default to 0 if undefined
                } else {
                    console.warn('BTC data missing');
                    btcvalue = 0;
                    btc24hrchange = 0;
                }

                if (data.ethereum && data.ethereum.usd !== undefined) {
                    ethvalue = data.ethereum.usd;
                    eth24hrchange = data.ethereum.usd_24h_change || 0;
                } else {
                    console.warn('ETH data missing');
                    ethvalue = 0;
                    eth24hrchange = 0;
                }

                if (data.binancecoin && data.binancecoin.usd !== undefined) {
                    bnbvalue = data.binancecoin.usd;
                    bnb24hrchange = data.binancecoin.usd_24h_change || 0;
                } else {
                    console.warn('BNB data missing');
                    bnbvalue = 0;
                    bnb24hrchange = 0;
                }

                if (data.solana && data.solana.usd !== undefined) {
                    solvalue = data.solana.usd;
                    sol24hrchange = data.solana.usd_24h_change || 0;
                } else {
                    console.warn('SOL data missing');
                    solvalue = 0;
                    sol24hrchange = 0;
                }

                if (data.ripple && data.ripple.usd !== undefined) {
                    xrpvalue = data.ripple.usd;
                    xrp24hrchange = data.ripple.usd_24h_change || 0;
                } else {
                    console.warn('XRP data missing');
                    xrpvalue = 0;
                    xrp24hrchange = 0;
                }

                if (data.dogecoin && data.dogecoin.usd !== undefined) {
                    dogevalue = data.dogecoin.usd;
                    doge24hrchange = data.dogecoin.usd_24h_change || 0;
                } else {
                    console.warn('DOGE data missing');
                    dogevalue = 0;
                    doge24hrchange = 0;
                }

                if (data.toncoin && data.toncoin.usd !== undefined) {
                    tonvalue = data.toncoin.usd;
                    ton24hrchange = data.toncoin.usd_24h_change || 0;
                } else {
                    console.warn('TON data missing');
                    tonvalue = 0;
                    ton24hrchange = 0;
                    $('#ton-row').hide();
                }

                if (data.tron && data.tron.usd !== undefined) {
                    trxvalue = data.tron.usd;
                    trx24hrchange = data.tron.usd_24h_change || 0;
                } else {
                    console.warn('TRX data missing');
                    trxvalue = 0;
                    trx24hrchange = 0;
                }

                // Optional: Log to console for verification (only if data is available)
                console.log('BTC:', btcvalue, btc24hrchange + '%');
                console.log('ETH:', ethvalue, eth24hrchange + '%');
                console.log('BNB:', bnbvalue, bnb24hrchange + '%');
                console.log('SOL:', solvalue, sol24hrchange + '%');
                console.log('XRP:', xrpvalue, xrp24hrchange + '%');
                console.log('DOGE:', dogevalue, doge24hrchange + '%');
                console.log('TON:', tonvalue, ton24hrchange + '%');
                console.log('TRX:', trxvalue, trx24hrchange + '%');

                // You can now use these variables elsewhere in your code
                insertCryptoValues(btcvalue,ethvalue,bnbvalue,solvalue,
                    xrpvalue,dogevalue,tonvalue,trxvalue, btc24hrchange,
                    eth24hrchange,bnb24hrchange,sol24hrchange,xrp24hrchange,
                    doge24hrchange,ton24hrchange,trx24hrchange);s
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
                console.error('Status:', status);
                console.error('Response:', xhr.responseText);
            }
        });
}
function fetchCryptoPricess() {
        var btcvalue, ethvalue, bnbvalue, solvalue, xrpvalue, dogevalue, tonvalue, trxvalue;
        var btc24hrchange, eth24hrchange, bnb24hrchange, sol24hrchange, xrp24hrchange, doge24hrchange, ton24hrchange, trx24hrchange;

        $.ajax({
            url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple,dogecoin,toncoin,tron&vs_currencies=usd&include_24hr_change=true',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                // Assign prices
                btcvalue = data.bitcoin.usd;
                ethvalue = data.ethereum.usd;
                bnbvalue = data.binancecoin.usd;
                solvalue = data.solana.usd;
                xrpvalue = data.ripple.usd;
                dogevalue = data.dogecoin.usd;
                tonvalue = data.toncoin.usd;
                trxvalue = data.tron.usd;

                // Assign 24hr changes
                btc24hrchange = data.bitcoin.usd_24h_change;
                eth24hrchange = data.ethereum.usd_24h_change;
                bnb24hrchange = data.binancecoin.usd_24h_change;
                sol24hrchange = data.solana.usd_24h_change;
                xrp24hrchange = data.ripple.usd_24h_change;
                doge24hrchange = data.dogecoin.usd_24h_change;
                ton24hrchange = data.toncoin.usd_24h_change;
                trx24hrchange = data.tron.usd_24h_change;

                insertCryptoValues(btcvalue,ethvalue,bnbvalue,solvalue,
                    xrpvalue,dogevalue,tonvalue,trxvalue, btc24hrchange,
                    eth24hrchange,bnb24hrchange,sol24hrchange,xrp24hrchange,
                    doge24hrchange,ton24hrchange,trx24hrchange);
                // Optional: Log to console for verification
                console.log('BTC:', btcvalue, btc24hrchange + '%');
                console.log('ETH:', ethvalue, eth24hrchange + '%');
                console.log('BNB:', bnbvalue, bnb24hrchange + '%');
                console.log('SOL:', solvalue, sol24hrchange + '%');
                console.log('XRP:', xrpvalue, xrp24hrchange + '%');
                console.log('DOGE:', dogevalue, doge24hrchange + '%');
                console.log('TON:', tonvalue, ton24hrchange + '%');
                console.log('TRX:', trxvalue, trx24hrchange + '%');
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
}

function insertCryptoValues(btc,eth,bnb,sol,xrp,doge,ton,trx, btc_24,
    eth_24,bnb_24,sol_24,xrp_24,doge_24,ton_24,trx_24){

        $('#coinlastprice-btc .coinothrlbl').text('$' + btc);
        $('#coinlastprice-eth .coinothrlbl').text('$' + eth);
        $('#coinlastprice-bnb .coinothrlbl').text('$' + bnb);
        $('#coinlastprice-sol .coinothrlbl').text('$' + sol);
        $('#coinlastprice-xrp .coinothrlbl').text('$' + xrp);
        $('#coinlastprice-doge .coinothrlbl').text('$' + doge);
        $('#coinlastprice-ton .coinothrlbl').text('$' + ton);
        $('#coinlastprice-trx .coinothrlbl').text('$' + trx);



        btc_24 = roundToOneDecimal(btc_24);
        eth_24 = roundToOneDecimal(eth_24);
        bnb_24 = roundToOneDecimal(bnb_24);
        sol_24 = roundToOneDecimal(sol_24);
        xrp_24 = roundToOneDecimal(xrp_24);
        doge_24 = roundToOneDecimal(doge_24);
        ton_24 = roundToOneDecimal(ton_24);
        trx_24 = roundToOneDecimal(trx_24);
        $('#coin24hrchange-btc .coinothrlbl').text(btc_24 + '%');
        $('#coin24hrchange-eth .coinothrlbl').text(eth_24 + '%');
        $('#coin24hrchange-bnb .coinothrlbl').text(bnb_24 + '%');
        $('#coin24hrchange-sol .coinothrlbl').text(sol_24 + '%');
        $('#coin24hrchange-xrp .coinothrlbl').text(xrp_24 + '%');
        $('#coin24hrchange-doge .coinothrlbl').text(doge_24 + '%');
        $('#coin24hrchange-ton .coinothrlbl').text(ton_24 + '%');
        $('#coin24hrchange-trx .coinothrlbl').text(trx_24 + '%');
        

}

function roundToOneDecimal(value) {
  return Math.round(value * 10) / 10;
}