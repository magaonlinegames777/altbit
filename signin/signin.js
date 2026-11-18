var ctr = '0';
var captchaman;

$(document).ready(function() {

  // Your code here
  // Your web app's Firebase configuration
    randomizeCaptcha();
    setTimeout(() => {
        $('.glassLoader').addClass('hide');
        // alert('Verification complete. Continue to site');
    }, 7777);
});

function restrictedCountries(){

    if (ctr == '0') {
        $('.restricted_lists').removeClass('hide');
        $('.signInRestriction i').addClass('hide');
        $('#restrictsymbol_up').removeClass('hide');

        ctr = '1';
    } else if (ctr == '1') {
        $('.restricted_lists').addClass('hide');
         $('.signInRestriction i').addClass('hide');
        $('#restrictsymbol_down').removeClass('hide');
        ctr = '0';
    }
}


function signin(){
    $('.glassLoader').removeClass('hide');

    var email = $('#signin_email').val().trim().toLowerCase();
    var password = $('#signin_password').val().trim();
    var xref = email + password;
    var captcha = $('#signin_captcha').val().trim();

    if (captcha != '') {
        console.log('This is input captcha = '+ captcha);
        console.log('This is GOD captcha = '+ captchaman);
        
        if (captcha == captchaman) {
            //We proceed with sign in
            if (email != '' & password != '') {
                check(xref);
            
            }else{
                console.log('Password email is empty');
                $('#loginsection .errorMessage p').text(' Please ensure your email and password are valid and not left blank. ');
                clearError();
                $('.glassLoader').addClass('hide');
            }
        } else {
            console.log('Captcha is empty');
            $('#loginsection .errorMessage p').text(' Please complete the CAPTCHA correctly to verify you are not a robot ');
            clearError();
            $('.glassLoader').addClass('hide');
        }

        
    }
}




function check(x){
    
    if (x != 0) {
        var docRef = firebase.firestore().collection("actives").doc(x);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                // show profile
                userSignedIn = 1;
                userIsActive();
                const account_id = doc.data().id;
                getUser(account_id);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such user!");
                userSignedIn = 0;
                // email / password wrong
                $('#loginsection .errorMessage p').text('Invalid email address or password. Please verify your credentials and try again.');
                clearError();
                $('.glassLoader').addClass('hide');

            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            console.log('Check IPOS: ' + x);
        
        });
    }else{
        alert('Failed to check sessions because empty IPOS');
    }
}

function getUser(id){
    var docRef = db.collection("registration").doc(id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            addSessions(doc.data().email);   
            activeUsers(doc.data().email,doc.data().id,doc.data().pc);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

