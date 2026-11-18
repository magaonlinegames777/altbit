$('.glassLoader').removeClass('hide');
var checker= 0;
$(document).ready(function() {
    wallerProfile  = 'profile';

  // Your code here
  // Your web app's Firebase configuration



//   checkSessions(IPOS);


});

function useractivityProfile(){
    if (userSignedIn == 0) {
        location.href = '../signin/'
    }
}

function checkSessionsIPOS(){
    if (IPOS != 0) {
        console.log('It is not null');
        console.log('rEPEAT '+IPOS);
        
        
    }else{
        console.log('It is null');
        checker = 0; 
    }
}