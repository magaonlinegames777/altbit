var ctr = '0';
var ctr_referral = '0';
var get_capture = 0;
var captchaman;

$(document).ready(function() {

  // Your code here
  // Your web app's Firebase configuration
    randomizeCaptcha();
});



function promoReferal(){

    if (ctr == '0') {
        $('.promoInputBX').removeClass('hide');
        $('#promosymbol_down').addClass('hide');
        $('#promosymbol_up').removeClass('hide');

        ctr = '1';
    } else if (ctr == '1') {
        $('.promoInputBX').addClass('hide');
         $('#promosymbol_up').addClass('hide');
        $('#promosymbol_down').removeClass('hide');
        ctr = '0';
    }
}

function referralCode(){

    if (ctr_referral == '0') {
        $('.promoReferralInputBX').removeClass('hide');
        $('#referralsymbol_down').addClass('hide');
        $('#referralsymbol_up').removeClass('hide');

        ctr_referral = '1';
    } else if (ctr_referral == '1') {
        $('.promoReferralInputBX').addClass('hide');
         $('#referralsymbol_up').addClass('hide');
        $('#referralsymbol_down').removeClass('hide');
        ctr_referral = '0';
    }
}



// register user
function registerUser(){

const terms = document.getElementById('register_termscondition');
const restrictedCountry = document.getElementById('register_restrictedcountry');
if (terms.checked) {
    console.log('Checkbox is checked 4 terms!');
    if (restrictedCountry.checked) {
        // GO!!
        // get email and password
        registerEmailPassword();
    } else {
        $('.terms_conditions .errorMessage p').text('Our platform cannot serve people in the restricted countries');
        clearError();
    }
}else{
    $('.terms_conditions .errorMessage p').text('Please read, understand, and accept our Terms and Conditions before continuing to use our platform.');
    clearError();
}
}


var email, password;
function registerEmailPassword(){
    email = $('#register_email').val().trim().toLowerCase();
    password = $('#register_password').val();
    var ps = 22;
    var captchdone = 0;

    if (isValidEmail(email)) {
        // good email 
        ps = passwordAuthenticator(password);
        // alert(ps);
        if (ps == 1) {
                       
            // Regex to check for at least one number
            const hasNumber = /\d/.test(password);
            // now check number
            if (hasNumber) {
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                
                var captcha = $('#email_captcha_img').val().trim();
                if (hasSpecialChar) {
                    $('.errorMessage p').text('');
                    $('.errorMessage p').text('');

                    if (captcha != '') {
                        console.log('This is input captcha = '+ captcha);
                        console.log('This is GOD captcha = '+ captchaman);
                        
                        if (captcha == captchaman) {
                            //We proceed with REGISTRATION
                            addUser(password, email);
                            
                        } else {
                            console.log('Captcha is empty');
                            $('#loginsection .errorMessage p').text(' Please complete the CAPTCHA correctly to verify you are not a robot ');
                            clearError();
                            $('.glassLoader').addClass('hide');
                        }

                        
                    }
                } else {
                    console.log('The input does not contain any special characters.');
                    $('.terms_conditions .errorMessage p').text('Ensure your password includes a special character for enhanced security.');
                    clearError();

                }
            } 
            else {
                $('.terms_conditions .errorMessage p').text('Ensure your password includes a mix of a number, and a special character for enhanced security.');
                    clearError();
            }   
       } 
    //    terms and conditions check
       if (ps == 0) {
            $('.terms_conditions .errorMessage p').text('Ensure your password includes a mix of a number, and a special character for enhanced security.');
            clearError();
       }
    }else{
            console.log('!!!bad email');
            $('.errorMessage p').text('Please verify that your email address is accurate and follows a valid format, such as example@domain.com. ');
    }
}

function passwordAuthenticator(x){
    if (x.length > 8) {
        console.log('The password input has more than 8 characters!');
        // registerEmailPassword();
            addUser(password, email);

        return 1;
    } else {
        $('.errorMessage p').text('Please must be more than 8 characters ');
        clearError();
        return 0;

    }
}








function getRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
}

function getCaptcha1(){
    var bgImage = 'url("file:///C:/Users/david/OneDrive/Desktop/7770/READY%20TO%20SHIP/CRYPTOCURRENCY%20TRADING/assets/img/captcha/c82787.png'

    if (bgImage == 'url("file:///C:/Users/david/OneDrive/Desktop/7770/READY%20TO%20SHIP/CRYPTOCURRENCY%20TRADING/assets/img/captcha/c82787.png') {
        return 82787;
    } else if (bgImage == 'url("file:///C:/Users/david/OneDrive/Desktop/7770/READY%20TO%20SHIP/CRYPTOCURRENCY%20TRADING/assets/img/captcha/c23993.png') {
        return 23993;
    } else if (bgImage == 'url("file:///C:/Users/david/OneDrive/Desktop/7770/READY%20TO%20SHIP/CRYPTOCURRENCY%20TRADING/assets/img/captcha/c39597.png') {
        return 39597;
    }else if (bgImage == 'url("file:///C:/Users/david/OneDrive/Desktop/7770/READY%20TO%20SHIP/CRYPTOCURRENCY%20TRADING/assets/img/captcha/c82936.png') {
        return 82936;
    }else if (bgImage == 'url("file:///C:/Users/david/OneDrive/Desktop/7770/READY%20TO%20SHIP/CRYPTOCURRENCY%20TRADING/assets/img/captcha/c83944.png') {
        return 83944;
    }else{
        return 0;
    }
}

