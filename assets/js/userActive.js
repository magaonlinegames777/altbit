
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

// update securit
function updateIpl(emaillog) {
  db.collection("security").doc(emaillog).update({
    ipl: IPOS
  })
  .then(function () {
    console.log("ipl updated");
  })
  .catch(function (err) {
    console.log("Update failed:", err.code, err.message);
  });
}

function checkIfUserIsActive(x){
  $('.glassLoader').removeClass('hide');

  // alert(x);
  var docRef = firebase.firestore().collection("sessions").doc(x);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data from sess:", doc.data());
            // show profile
            // UPDATE
            // updateIpl(doc.data().email);
            $('.glassLoader').addClass('hide');

            userSignedIn = 1;
            userIsActive();
            moveToWallet();
            $('.glassLoader').addClass('hide');

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!= "+ x);
            userIsNotActive();
            userSignedIn = 0;
            
            moveToSignIn();
            
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
          $('.glassLoader').addClass('hide');
          
          
        });
      }
      
      function userIsActive(){
        userSignedIn = 1;
        $('.menu_logs').addClass('hide');
        // move to wallet
        // location.href = '../profile/wallet/';
        
      }
      
      function userIsNotActive(){
        console.log('notactive');
        userSignedIn = 0;

        $('.menu_logs').removeClass('hide');
    
        $('.menu_deposit_btn').addClass('hide');
        $('.menu_asset_btn').addClass('hide');
        $('.menu_profile_btn').addClass('hide');

        // location.href = '../../signin/'
      }
