
var userSignedIn;

$(document).ready(function() {
  // Your code here
  console.log("The DOM is fully loaded!");
  $('.glassLoader').removeClass('hide');
  
  // checkIfUserIsActive()
   
  // if (userSignedIn == 1) {
  //   // alert('1');
  //   $('.menu_logs').addClass('hide');
  // }else if (userSignedIn == 0) {
  //   // alert('0');
  //   $('.menu_logs').removeClass('hide');
    
  //   $('.menu_deposit_btn').addClass('hide');
  //   $('.menu_asset_btn').addClass('hide');
  //   $('.menu_profile_btn').addClass('hide');
    
  // }
});

function checkIfUserIsActive(x){
  $('.glassLoader').removeClass('hide');

  // alert(x);
  var docRef = firebase.firestore().collection("sessions").doc(x);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            // show profile
            userSignedIn = 1;
            userIsActive();
            $('.glassLoader').addClass('hide');

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            $('.glassLoader').addClass('hide');
            userIsNotActive()
            console.log('notactive');
            
            userSignedIn = 0;

        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        $('.glassLoader').addClass('hide');

       
    });
}

function userIsActive(){
  userSignedIn = 1;
  $('.menu_logs').addClass('hide');
}

function userIsNotActive(){
  userSignedIn = 0;

  $('.menu_logs').removeClass('hide');
    
    $('.menu_deposit_btn').addClass('hide');
    $('.menu_asset_btn').addClass('hide');
    $('.menu_profile_btn').addClass('hide');
}