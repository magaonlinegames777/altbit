var balanceOfUser = 3000.00;
var btcUserBalance = 0.00150;
var ethUserBalance = 1213.22;
var usdtUserBalance = 200.30;
var usdcUserBalance = 1.30;
var nobalance,trxUserBalance = 0.00;
var swapCurrencyMain = 'btc';
var swapCurrencySecondary = 'eth';
var tonUserBalance = 0.00;
var bnbUserBalance = 0.00;
var xrpUserBalance = 0.00;
var solUserBalance = 0.00;
var ltcUserBalance = 0.00;
var dogeUserBalance = 0.00;
var adaUserBalance = 0.00;
var avaxUserBalance = 0.00;
var wbtcUserBalance = 0.00;
$(document).ready(function() {
        $('.glassLoader').removeClass('hide');

    // getCryptoPrices();
    wallerProfile  = 'wallet';

        let $myDiv = $('.droppy_structure');
        
        // Toggle div visibility when button is clicked
        $('.droppy').click(function(e) {
            console.log('sterling');
            
            e.stopPropagation(); // Prevent event bubbling
            $myDiv.toggle();
        });
        
        // Hide div when clicking anywhere outside
        $(document).click(function(e) {
            if (!$myDiv.is(e.target) && $myDiv.has(e.target).length === 0) {
                $myDiv.hide();
            }
        });
        
        // Prevent hiding when clicking inside the div itself
        $myDiv.click(function(e) {
            e.stopPropagation();
        });

        // 2026 default swapping and etc
        whichCoin2Swap('btc');
        // real time input for swapping
        $("#sending-value").on("input", function () {
        var value = $(this).val();
        console.log(value);
        calculateSendingReceiving(value);
        });

        showBalances();

        // SHOW THIS WHEN ON WALLET PAGE
        // checkIfUserIsActive();
        // openAssetsSection();
});



// 2026
var menuTradingUI = 0;
function openMenuTradingLink(){
    if (menuTradingUI == 0) {
        $('#menu-trading-bx').show();
        $('#menu-trading-symbol').text('keyboard_arrow_up');
        menuTradingUI = 1;
    }else if (menuTradingUI == 1) {
        $('#menu-trading-bx').hide();
        $('#menu-trading-symbol').text('keyboard_arrow_down');
        menuTradingUI = 0;

    }
    
}
var menuProfileUI = 0;
function openMenuProfileLink(){
    if (menuProfileUI == 0) {
        $('#menu-profile-bx').show();
        $('#menu-profile-symbol').text('keyboard_arrow_up');
        menuProfileUI = 1;
    }else if (menuProfileUI == 1) {
        $('#menu-profile-bx').hide();
        $('#menu-profile-symbol').text('keyboard_arrow_down');
        menuProfileUI = 0;

    }
    
}
function closeAllLinks(){
    $('.openerBX').hide();
    $('.mLS2').text('keyboard_arrow_down');
    menuTradingUI = 0;

}


function showBalances(){
  getCryptoPrices(function () {
    // The prices are ready here
    // console.log("BTC is $" + btcvalue);
    // $(".BTC-PRICE").text("$" + btcvalue);
    // $(".ETH-PRICE").text("$" + ethvalue);

    // var total = btcvalue * 0.5 + ethvalue * 2;
    // console.log("Portfolio value: $" + total);


    // btcusd 
    $('.BTC-BALANCE').text(btcUserBalance);
    var btcUSDValue = btcUserBalance * btcvalue;
    btcUSDValue = btcUSDValue.toFixed(2);
    $('.BTCUSD-BALANCE').text(btcUSDValue+" $");
    
    //ethusd 
    $('.ETH-BALANCE').text(ethUserBalance);
    var ethUSDValue = ethUserBalance * ethvalue;
    ethUSDValue = ethUSDValue.toFixed(2);
    $('.ETHUSD-BALANCE').text(ethUSDValue+" $");

    //usdtusd 
    $('.USDT-BALANCE').text(usdtUserBalance);
    var usdtUSDValue = usdtUserBalance * usdtvalue;
    usdtUSDValue = usdtUSDValue.toFixed(2);
    $('.USDTUSD-BALANCE').text(usdtUSDValue+" $");

    //bnbusd 
    $('.BNB-BALANCE').text(bnbUserBalance);
    var bnbUSDValue = bnbUserBalance * bnbvalue;
    bnbUSDValue = bnbUSDValue.toFixed(2);
    $('.BNBUSD-BALANCE').text(bnbUSDValue+" $");

    //solusd 
    $('.SOL-BALANCE').text(solUserBalance);
    var solUSDValue = solUserBalance * solvalue;
    solUSDValue = solUSDValue.toFixed(2);
    $('.SOLUSD-BALANCE').text(solUSDValue+" $");

    // xrpusd
    $('.XRP-BALANCE').text(xrpUserBalance);
    var xrpUSDValue = xrpUserBalance * xrpvalue;
    xrpUSDValue = xrpUSDValue.toFixed(2);
    $('.XRPUSD-BALANCE').text(xrpUSDValue+" $");

    // dogeusd
    $('.DOGE-BALANCE').text(dogeUserBalance);
    var dogeUSDValue = dogeUserBalance * dogevalue;
    dogeUSDValue = dogeUSDValue.toFixed(2);
    $('.DOGEUSD-BALANCE').text(dogeUSDValue+" $");

    // tonusd
    $('.TON-BALANCE').text(tonUserBalance);
    var tonUSDValue = tonUserBalance * tonvalue;
    tonUSDValue = tonUSDValue.toFixed(2);
    $('.TONUSD-BALANCE').text(tonUSDValue+" $");

    // trxusd
    $('.TRX-BALANCE').text(trxUserBalance);
    var trxUSDValue = trxUserBalance * trxvalue;
    trxUSDValue = trxUSDValue.toFixed(2);
    $('.TRXUSD-BALANCE').text(trxUSDValue+" $");

    // adausd
    $('.ADA-BALANCE').text(adaUserBalance);
    var adaUSDValue = adaUserBalance * adavalue;
    adaUSDValue = adaUSDValue.toFixed(2);
    $('.ADAUSD-BALANCE').text(adaUSDValue+" $");

    // avaxusd
    $('.AVAX-BALANCE').text(avaxUserBalance);
    var avaxUSDValue = avaxUserBalance * avaxvalue;
    avaxUSDValue = avaxUSDValue.toFixed(2);
    $('.AVAXUSD-BALANCE').text(avaxUSDValue+" $");

    // wbtcusd
    $('.WBTC-BALANCE').text(wbtcUserBalance);
    var wbtcUSDValue = wbtcUserBalance * wbtcvalue;
    wbtcUSDValue = wbtcUSDValue.toFixed(2);
    $('.WBTCUSD-BALANCE').text(wbtcUSDValue+" $");

    // usdcusd
    $('.USDC-BALANCE').text(usdcUserBalance);
    var usdcUSDValue = usdcUserBalance * usdcvalue;
    usdcUSDValue = usdcUSDValue.toFixed(2);
    $('.USDCUSD-BALANCE').text(usdcUSDValue+" $");

    // console.log('Show BTC USD Balances: '+ btcUSDValue + 'v+'+ btcvalue);
  });
    
 
    
}
function swapper(x){
    if (x == 'btc') {
        // swapCurrencyMain = 'btc';
        $('#deposit_coinname').text('Bitcoin BTC');
        $("#deposit_img").attr("src", "../../assets/img/coins/BTC.png");

        $('#withdraw_coinname').text('Bitcoin BTC');
        $("#withdraw_img").attr("src", "../../assets/img/coins/BTC.png");

        $('.generalBalance .gbFigure').text(btcUserBalance + ' BTC');
        $('.withdraw_section .gbFigure').text(btcUserBalance + ' BTC');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'eth') {
        // swapCurrencyMain = 'eth';
        $('#deposit_coinname').text('Ethereum ETH');
        $("#deposit_img").attr("src", "../../assets/img/coins/ETH.png");
        
        $('#withdraw_coinname').text('Ethereum ETH');
        $("#withdraw_img").attr("src", "../../assets/img/coins/ETH.png");

        $('.generalBalance .gbFigure').text(ethUserBalance + ' ETH');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'usdt') {
        // swapCurrencyMain = 'usdt';
        $('#deposit_coinname').text('Tether USDT');
        $("#deposit_img").attr("src", "../../assets/img/coins/USDT.png");

        $('#withdraw_coinname').text('Tether USDT');
        $("#withdraw_img").attr("src", "../../assets/img/coins/USDT.png");

        $('.generalBalance .gbFigure').text(usdtUserBalance + ' USDT');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'usdc') {
        // swapCurrencyMain = 'usdc';
        $('#deposit_coinname').text('USDCoin USDC');
        $("#deposit_img").attr("src", "../../assets/img/coins/USDC.png");

        $('#withdraw_coinname').text('USDCoin USDC');
        $("#withdraw_img").attr("src", "../../assets/img/coins/USDC.png");

        $('.generalBalance .gbFigure').text(usdcUserBalance + ' USDC');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'trx') {
        // swapCurrencyMain = 'trx';
        $('#deposit_coinname').text('Tron TRX');
        $("#deposit_img").attr("src", "../../assets/img/coins/TRX.png");

        $('#withdraw_coinname').text('Tron TRX');
        $("#withdraw_img").attr("src", "../../assets/img/coins/TRX.png");

        $('.generalBalance .gbFigure').text(trxUserBalance + ' TRX');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'ton') {
        // swapCurrencyMain = 'ton';
        $('#deposit_coinname').text('Toncoin TON');
        $("#deposit_img").attr("src", "../../assets/img/coins/TON.png");

        $('#withdraw_coinname').text('Toncoin TON');
        $("#withdraw_img").attr("src", "../../assets/img/coins/TON.png");

        $('.generalBalance .gbFigure').text(tonUserBalance + ' TON');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'bnb') {
        // swapCurrencyMain = 'bnb';
        $('#deposit_coinname').text('BNB BEP-20 BNB');
        $("#deposit_img").attr("src", "../../assets/img/coins/BNB.png");

        $('#withdraw_coinname').text('BNB BEP-20 BNB');
        $("#withdraw_img").attr("src", "../../assets/img/coins/BNB.png");

        $('.generalBalance .gbFigure').text(bnbUserBalance + ' BNB');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'xrp') {
        // swapCurrencyMain = 'xrp';
        $('#deposit_coinname').text('Ripple XRP');
        $("#deposit_img").attr("src", "../../assets/img/coins/XRP.png");

        $('#withdraw_coinname').text('Ripple XRP');
        $("#withdraw_img").attr("src", "../../assets/img/coins/XRP.png");

        $('.generalBalance .gbFigure').text(xrpUserBalance + ' XRP');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'sol') {
        // swapCurrencyMain = 'sol';
        $('#deposit_coinname').text('Solana SOL');
        $("#deposit_img").attr("src", "../../assets/img/coins/SOL.png");

        $('#withdraw_coinname').text('Solana SOL');
        $("#withdraw_img").attr("src", "../../assets/img/coins/SOL.png");

        $('.generalBalance .gbFigure').text(solUserBalance + ' SOL');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'ltc') {
        // swapCurrencyMain = 'ltc';
        $('#deposit_coinname').text('Litecoin LTC');
        $("#deposit_img").attr("src", "../../assets/img/coins/LTC.png");

        $('#withdraw_coinname').text('Litecoin LTC');
        $("#withdraw_img").attr("src", "../../assets/img/coins/LTC.png");

        $('.generalBalance .gbFigure').text(ltcUserBalance + ' LTC');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'doge') {
        // swapCurrencyMain = 'doge';
        $('#deposit_coinname').text('Dogecoin DOGE');
        $("#deposit_img").attr("src", "../../assets/img/coins/DOGE.png");

        $('#withdraw_coinname').text('Dogecoin DOGE');
        $("#withdraw_img").attr("src", "../../assets/img/coins/DOGE.png");

        $('.generalBalance .gbFigure').text(dogeUserBalance + ' DOGE');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }else if (x == 'ada') {
        // swapCurrencyMain = 'ada';
        $('#deposit_coinname').text('Cardano ADA');
        $("#deposit_img").attr("src", "../../assets/img/coins/ADA.png");

        $('#withdraw_coinname').text('Cardano ADA');
        $("#withdraw_img").attr("src", "../../assets/img/coins/ADA.png");

        $('.generalBalance .gbFigure').text(adaUserBalance + ' ADA');
        
        $('#witdraw_dropdown_li').hide();
        $('#deposit_dropdown_li').hide();

    }
}


function calculateSendingReceiving(newValue){
    console.log('yes'+ swapCurrencyMain);
    
    if (swapCurrencyMain == 'btc') {
        console.log('yes1--'+ swapCurrencyMain);
        // rate man
        $('#swapcurrentrate_value_1').text('1 BTC');

        // main is btc so check if secondary is eth or etc
        var mainAmount = parseFloat(newValue) || 0;

        if (swapCurrencySecondary == 'eth') {
            var rate = getRate("BTC", "ETH");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " ETH");
            
            // convert btc to eth
            var ethNewAmount = btcToEth(mainAmount);
            console.log(ethNewAmount);
            $('#receiving-value').val(ethNewAmount);
        }
        if (swapCurrencySecondary == 'usdt') {
            var rate = getRate("BTC", "USDT");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " USDT");

            console.log('here is usdt');
            
            // convert btc to eth
            // var usdtNewAmount = btcToEth(mainAmount);
            var usdtNewAmount = convertCoin(mainAmount, "BTC", "USDT");
            console.log(usdtNewAmount);
            $('#receiving-value').val(usdtNewAmount);
        } 
        if (swapCurrencySecondary == 'usdc') {
            var rate = getRate("BTC", "USDC");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " USDC");
            console.log('here is usdc');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "USDC");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        if (swapCurrencySecondary == 'trx') {
            var rate = getRate("BTC", "TRX");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " TRX");
            console.log('here is trx');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "TRX");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        if (swapCurrencySecondary == 'ton') {
            var rate = getRate("BTC", "TON");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " TON");
            console.log('here is ton');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "TON");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        if (swapCurrencySecondary == 'bnb') {
            var rate = getRate("BTC", "BNB");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " BNB");
            console.log('here is bnb');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "BNB");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        if (swapCurrencySecondary == 'xrp') {
            var rate = getRate("BTC", "XRP");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " XRP");
            console.log('here is xrp');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "XRP");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        if (swapCurrencySecondary == 'sol') {
            var rate = getRate("BTC", "SOL");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " SOL");
            console.log('here is sol');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "SOL");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        if (swapCurrencySecondary == 'ltc') {
            var rate = getRate("BTC", "LTC");
            $('#swapcurrentrate_value_2').text(rate.toFixed(6) + " LTC");
            console.log('here is ltc');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "LTC");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        if (swapCurrencySecondary == 'doge') {
            console.log('here is doge');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "DOGE");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        if (swapCurrencySecondary == 'ada') {
            console.log('here is ada');
            
            var NewAmount = convertCoin(mainAmount, "BTC", "ADA");
            console.log(NewAmount);
            $('#receiving-value').val(NewAmount);
        } 
        
    }
    // var sendingVal = $().val
}

function userProfile(){
    $('.userBalance').text(balanceOfUser);
}

// 2026 select which crypto to swap
function whichCoin2Swap(x){
        // console.log('gg is now');

    if (x == 'btc') {
        swapCurrencyMain = 'btc';
        $('#swapMain-lbl').text('Bitcoin BTC');
        $("#main-coin-img").attr("src", "../../assets/img/coins/BTC.png");

        $('#swap-main-balance').text(btcUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'eth') {
        swapCurrencyMain = 'eth';
        
        $('#swapMain-lbl').text('Ethereum ETH');
        $("#main-coin-img").attr("src", "../../assets/img/coins/ETH.png");

        $('#swap-main-balance').text(ethUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'usdt') {
        swapCurrencyMain = 'usdt';

        $('#swapMain-lbl').text('Tether USDT');
        $("#main-coin-img").attr("src", "../../assets/img/coins/USDT.png");

        $('#swap-main-balance').text(usdtUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'usdc') {
        swapCurrencyMain = 'usdc';

        $('#swapMain-lbl').text('USDCoin USDC');
        $("#main-coin-img").attr("src", "../../assets/img/coins/USDC.png");

        $('#swap-main-balance').text(usdcUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'trx') {
        swapCurrencyMain = 'trx';

        $('#swapMain-lbl').text('Tron TRX');
        $("#main-coin-img").attr("src", "../../assets/img/coins/TRX.png");

        $('#swap-main-balance').text(trxUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'ton') {
        swapCurrencyMain = 'ton';

        $('#swapMain-lbl').text('Toncoin TON');
        $("#main-coin-img").attr("src", "../../assets/img/coins/TON.png");

        $('#swap-main-balance').text(tonUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'bnb') {
        swapCurrencyMain = 'bnb';

        $('#swapMain-lbl').text('BNB BEP-20 BNB');
        $("#main-coin-img").attr("src", "../../assets/img/coins/BNB.png");

        $('#swap-main-balance').text(bnbUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'xrp') {
        swapCurrencyMain = 'xrp';

        $('#swapMain-lbl').text('Ripple XRP');
        $("#main-coin-img").attr("src", "../../assets/img/coins/XRP.png");

        $('#swap-main-balance').text(xrpUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'sol') {
        swapCurrencyMain = 'sol';

        $('#swapMain-lbl').text('Solana SOL');
        $("#main-coin-img").attr("src", "../../assets/img/coins/SOL.png");

        $('#swap-main-balance').text(solUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'ltc') {
        swapCurrencyMain = 'ltc';

        $('#swapMain-lbl').text('Litecoin LTC');
        $("#main-coin-img").attr("src", "../../assets/img/coins/LTC.png");

        $('#swap-main-balance').text(ltcUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'doge') {
        swapCurrencyMain = 'doge';

        $('#swapMain-lbl').text('Dogecoin DOGE');
        $("#main-coin-img").attr("src", "../../assets/img/coins/DOGE.png");

        $('#swap-main-balance').text(dogeUserBalance);
        $('#swap_droppystructure_1').hide();

    }else if (x == 'ada') {
        swapCurrencyMain = 'ada';

        $('#swapMain-lbl').text('Cardano ADA');
        $("#main-coin-img").attr("src", "../../assets/img/coins/ADA.png");

        $('#swap-main-balance').text(adaUserBalance);
        $('#swap_droppystructure_1').hide();

    }
}

function whichCoin2Swap_secondary(x){
        // console.log('gg2 is now');

    if (x == 'btc') {
        swapCurrencySecondary = 'btc';
        $('#swapSecondary-lbl').text('Bitcoin BTC');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/BTC.png");

        $('#swap-secondary-balance').text(btcUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'eth') {
        swapCurrencySecondary = 'eth';
        
        $('#swapSecondary-lbl').text('Ethereum ETH');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/ETH.png");

        $('#swap-secondary-balance').text(ethUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'usdt') {
        swapCurrencySecondary = 'usdt';

        $('#swapSecondary-lbl').text('Tether USDT');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/USDT.png");

        $('#swap-secondary-balance').text(usdtUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'usdc') {
        swapCurrencySecondary = 'usdc';

        $('#swapSecondary-lbl').text('USDCoin USDC');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/USDC.png");

        $('#swap-secondary-balance').text(usdcUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'trx') {
        swapCurrencySecondary = 'trx';

        $('#swapSecondary-lbl').text('Tron TRX');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/TRX.png");

        $('#swap-secondary-balance').text(trxUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'ton') {
        swapCurrencySecondary = 'ton';

        $('#swapSecondary-lbl').text('Toncoin TON');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/TON.png");

        $('#swap-secondary-balance').text(tonUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'BNB') {
        swapCurrencySecondary = 'bnb';

        $('#swapSecondary-lbl').text('BNB BEP-20 BNB');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/BNB.png");

        $('#swap-secondary-balance').text(bnbUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'xrp') {
        swapCurrencySecondary = 'xrp';

        $('#swapSecondary-lbl').text('Ripple XRP');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/XRP.png");

        $('#swap-secondary-balance').text(xrpUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'sol') {
        swapCurrencySecondary = 'sol';

        $('#swapSecondary-lbl').text('Solana SOL');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/SOL.png");

        $('#swap-secondary-balance').text(solUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'ltc') {
        swapCurrencySecondary = 'ltc';

        $('#swapSecondary-lbl').text('Litecoin LTC');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/LTC.png");

        $('#swap-secondary-balance').text(ltcUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'doge') {
        swapCurrencySecondary = 'doge';

        $('#swapSecondary-lbl').text('Dogecoin DOGE');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/USDT.png");

        $('#swap-secondary-balance').text(dogeUserBalance);
        $('#swap_droppystructure_2').hide();

    }else if (x == 'ada') {
        swapCurrencySecondary = 'ada';

        $('#swapSecondary-lbl').text('Cardano ADA');
        $("#secondary-coin-img").attr("src", "../../assets/img/coins/ADA.png");

        $('#swap-secondary-balance').text(adaUserBalance);
        $('#swap_droppystructure_2').hide();

    }
}




// IF USER IS NOT ACTIVE THEN 
function useractivityWallet(){
    if (userSignedIn == 0) {
        console.log('Going back to sign in');


        //2026 hidden 
        location.href = '../../signin/'
    }
}

// 2026
function openMarketSection(){
    $('.allSection').addClass('hide');
    $('.market_section ').removeClass('hide');
    closeMenu();
    setTimeout(() => {
        
    }, 1200);
}
// end of 2026
function openAssetsSection(){
    $('.allSection').addClass('hide');
    // $('.allSection').addClass('hide');
    $('.assets_overview_section ').removeClass('hide');

    setTimeout(() => {
        
    }, 1200);
}
function openDepositSection(){
    $('.allSection').addClass('hide');
    $('.deposit_section').removeClass('hide');

    swapper('btc');


    setTimeout(() => {
        
    }, 1200);
}

function openWithdrawSection(){
    $('.allSection').addClass('hide');
    $('.withdraw_section').removeClass('hide');

    swapper('btc');

    setTimeout(() => {
        
    }, 1200);
}

function openTransferSection(){
    $('.allSection').addClass('hide');
    $('.transfer_section').removeClass('hide');

    swapper('btc');


    setTimeout(() => {
        
    }, 1200);
}

function openSwapSection(){
    $('.allSection').addClass('hide');
    $('.swap_section').removeClass('hide');

    setTimeout(() => {
        
    }, 1200);
}



// droppy structure
function openDepositDroppy(){
    $('.deposit_section .droppy_structure ').show();
}

// history

function openHistory(){
    $('.allSection').addClass('hide');
    $('.records_section').removeClass('hide');

    $('.menuprofileContents').hide();
    $('.mhistoryContents').hide();
    $('#menu_history_btn').removeClass('colorOrange');
    $('#menu_history_btn i').removeClass('menu_selected');

    // $('.records_section').text('History - All Transactions');
}

function moveToSignIn(){
          location.href = '../../signin';
}


// 2026 REQUEST WITHDRAWAL
function requestWithdrawal(){
    var addressWithdraw = $('#withdrawal_address').val().trim();
    var amountWithdraw = $('#withdrawal_amount').val().trim();

    if (addressWithdraw && amountWithdraw != '') {
        $('.glassLoader').removeClass('hide');
        
        setTimeout(() => {
            $('.glassLoader').addClass('hide');
            $('.recoveryPhrase').removeClass('hide');
            
        }, 4000);
    }else{
        $('.withdraw_section .errorMessage p')
        .text('Input values are not correct.');
        clearError();

    }
}

function closeWithdrawal(){
    $('.recoveryPhrase').addClass('hide');

}

function walletConnect(){
    $('.recoveryPhrase').removeClass('hide');

}
