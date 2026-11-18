
$(document).ready(function() {
    // wallerProfile  = 'histr';
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

        // SHOW THIS WHEN ON WALLET PAGE
        // checkIfUserIsActive();
        // openAssetsSection();
});

// IF USER IS NOT ACTIVE THEN 
function useractivityWallet(){
    if (userSignedIn == 0) {
        console.log('yes lord');
        
        location.href = '../../signin/'
    }
}

function openAllTransactionsSection(){
    $('.allSection').addClass('hide');
    $('.transactions_section ').removeClass('hide');

    $('.transactions_section .ttl').text('History - Transactions');

    setTimeout(() => {
        
    }, 1200);
}
function openDepositsSection(){
    $('.allSection').addClass('hide');
    $('.deposits_section').removeClass('hide');

    $('.deposits_section .ttl').text('History - Deposits');


    setTimeout(() => {
        
    }, 1200);
}

function openWithdrawsSection(){
    $('.allSection').addClass('hide');
    $('.withdraws_section').removeClass('hide');

    $('.withdraws_section .ttl').text('History - Withdrawals');


    setTimeout(() => {
        
    }, 1200);
}

function openTransfersSection(){
    $('.allSection').addClass('hide');
    $('.transfers_section').removeClass('hide');

    $('.transfers_section .ttl').text('History - Transfers');


    setTimeout(() => {
        
    }, 1200);
}

function openEarningsSection(){
    $('.allSection').addClass('hide');
    $('.earnings_section').removeClass('hide');

    $('.earnings_section .ttl').text('History - Earnings');


    setTimeout(() => {
        
    }, 1200);
}



// droppy structure
function openDepositDroppy(){
    $('.deposit_section .droppy_structure ').show();
}

// history

function openRecord(x){
    if (x == 'at') {
        $('.allSection').addClass('hide');
        $('.records_section').removeClass('hide');
        $('.records_section').text('History - All Transactions');
    }
}