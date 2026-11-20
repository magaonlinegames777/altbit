var IPCODE, IPCITY;
var IPCOUNTRY, IPDEVICE;
var IPOS = 0;
var wallerProfile;


$(document).ready(function() {

  // Your code here
  // Your web app's Firebase configuration


      var firebaseConfig = {
        apiKey: "AIzaSyCERIvNQ3vt0sqljeIHwhYTrwt9PuzA1Mc",
        authDomain: "albit-ec5e3.firebaseapp.com",
        projectId: "albit-ec5e3",
        storageBucket: "albit-ec5e3.firebasestorage.app",
        messagingSenderId: "322529468275",
        appId: "1:322529468275:web:07d80c8cdd9510cf59af06"
    };
      
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();

      hovering();
      initHistory();
      initAssets();
      locatePotential();
      // history();
      checkersecurity();
});

// 2026 captcha
function randomizeCaptcha(){
  console.log('randomize captcha');
  
    var num = getRandomNumber(); // e.g. 4
    if (num == 1) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c23993.png')");
        captchaman = '23993';
    }
    if (num == 2) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c24696.png')");
        captchaman = '24696';
    }
    if (num == 3) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c32836.png')");
        captchaman = '32836';
    }
    if (num == 4) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c39597.png')");
        captchaman = '39597';
    }
    if (num == 5) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c55726.png')");
        captchaman = '55726';
    }
    if (num == 6) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c82383.png')");
        captchaman = '82383';
    }
    if (num == 7) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c82787.png')");
        captchaman = '82787';
    }
    if (num == 8) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c82936.png')");
        captchaman = '82936';
    }
    if (num == 9) {
        $(".captchalbl").css("background-image", "url('../assets/img/captcha/c83944.png')");
        captchaman = '83944';
    }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}
// 2026 SHOW BTC
function showPrices() {
  getCryptoPrices(function () {
    // The prices are ready here
    console.log("BTC is $" + btcvalue);
    // $(".BTC-PRICE").text("$" + btcvalue);
    // $(".ETH-PRICE").text("$" + ethvalue);

    var total = btcvalue * 0.5 + ethvalue * 2;
    console.log("Portfolio value: $" + total);
  });

  // Don't use the values here: the request hasn't finished yet,
  // so btcvalue will still be undefined
}

// Call your function as usual, for example when the page loads or a button is clicked
$(function () {
  showPrices();
});



  function logout(){
    // alert(IPOS);
    $('.glassLoader').removeClass('hide');
    db.collection("sessions").doc(IPOS).delete().then(() => {
        console.log("Document successfully deleted!");
        userIsNotActive();
        location.reload();
        $('.glassLoader').addClass('hide');

    }).catch((error) => {
        console.error("Error removing document: ", error);
        $('.glassLoader').addClass('hide');

    });
  }

//  function checkersecurity(){
//   $.get('https://ipapi.co/json/', function(data) {
//             const ip = data.ip;
//             const city = data.city;
//             const country = data.country_name;

//             // 2. Get Device Info
//             const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
//             const deviceType = isMobile ? 'Mobile' : 'Desktop';
//             const os = navigator.platform;
//             const browser = navigator.userAgent.match(/(Chrome|Safari|Firefox|Edge)/)[0] || 'Unknown';
//             // const screen = `${screen.width}x${screen.height}`;
//             const ops = country + city + os + deviceType +  browser + ip;
//             IPOS = ops;
//             console.log(IPOS);
//             checkIfUserIsActive(IPOS);
            
//         }).fail(function() {
//             console.log('failed to get ip device info');
            
//         });
//  }

function checkersecurity() {
  getIpInfo(function (info) {
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    var deviceType = isMobile ? 'Mobile' : 'Desktop';
    var os = navigator.platform;
    var match = navigator.userAgent.match(/(Edg|CriOS|Chrome|Firefox|Safari)/);
    var browser = match ? match[0] : 'Unknown';

    IPOS = info.country + os + deviceType + browser + info.ip;
    console.log(IPOS);
    //2026 hidden -not hidden
    checkIfUserIsActive(IPOS); 
  });
}

function getIpInfo(callback) {
  // First try ipapi.co
  $.get('https://ipapi.co/json/')
    .done(function (data) {
      if (data.error) {            // ipapi.co can answer with an error message, e.g. rate limited
        console.log('ipapi.co error:', data.reason);
        return tryBackup(callback);
      }
      callback({ ip: data.ip, city: data.city, country: data.country_name });
    })
    .fail(function (xhr, status, err) {
      console.log('ipapi.co failed. Status code:', xhr.status, status, err);
      tryBackup(callback);
    });
}

function tryBackup(callback) {
  // Backup service: geojs.io
  $.get('https://get.geojs.io/v1/ip/geo.json')
    .done(function (data) {
      callback({ ip: data.ip, city: data.city, country: data.country });
    })
    .fail(function (xhr, status, err) {
      console.log('failed to get ip device info. Status code:', xhr.status, status, err);
    });
}
// mines
// FIREBASE DB
function addUser(x, mail){
    $('.glassLoader').removeClass('hide');
    var idd = getRandomString(10);
    var time = firebase.firestore.FieldValue.serverTimestamp();
    var ipman = IPCODE;
    var cityman = IPCITY;
    // Add a new document in collection "registration"
    if (ipman != '') {
      console.log('LocateIP: '+ ipman);
      
      db.collection("registration").doc(idd).set({
        email: mail,
        pc: x,
        timestamp: time, 
        ipl: IPOS,
        city: cityman,
        id: idd
      })
      .then(() => {
          console.log("User registration successfully written!");
          $('.glassLoader').addClass('hide');
          // show account
          // add to active user
          addSessions(mail);
          addSecurity(mail,x,idd);
          activeUsers(mail,idd,x);
      })
      .catch((error) => {
          console.error("Error writing user registration: ", error);
          // FAILED TO PROCESS REQUEST
          $('.glassLoader').addClass('hide');

      });
    }else{
      console.log('IIPMAN IS NOT valid');
      
    }
    
}

function addSecurity(em, x, idd){
      db.collection("security").doc(em).set({
        pc: x,
        ipl: IPOS,
        id: idd
      })
      .then(() => {
          console.log("User registration successfully written!");
          $('.glassLoader').addClass('hide');
          // show account
          // add to active user
          // location.href('../profile');
      })
      .catch((error) => {
          console.error("Error writing user registration: ", error);
          // FAILED TO PROCESS REQUEST
          $('.glassLoader').addClass('hide');

      });
}

function addSessions(mail){
  // alert('Add sessions- '+IPOS);
    $('.glassLoader').addClass('hide');
    var time = firebase.firestore.FieldValue.serverTimestamp();
    db.collection("sessions").doc(IPOS).set({
        email: mail,
        time: time
      })
      .then(() => {
          console.log("sessions registration successfully written!");
       
          // show account
          location.href = '../profile/wallet/';
      })
      .catch((error) => {
          console.error("Error writing sessions: ", error);
          // FAILED TO PROCESS REQUEST
          $('.glassLoader').addClass('hide');

      });
}
function activeUsers(mail, idd, ps ){
  $('.glassLoader').removeClass('hide');

  var activeref = mail + ps;
    var time = firebase.firestore.FieldValue.serverTimestamp();
    db.collection("actives").doc(activeref).set({
        id: idd,
        time: time
      })
      .then(() => {
          console.log("actives registration successfully written!");
          $('.glassLoader').addClass('hide');
          // check sessions
          location.href = '../profile/wallet/';


      })
      .catch((error) => {
          console.error("Error writing actives: ", error);
          // FAILED TO PROCESS REQUEST
          $('.glassLoader').addClass('hide');

      });
}

function checkSessions(ipos){
  $('.glassLoader').removeClass('hide');
  $('.glassLoader').addClass('glasswhite');
  console.log('Check sessions: ' + ipos);

  if (ipos != 0) {
    var docRef = firebase.firestore().collection("sessions").doc(ipos);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Sessions data:", doc.data());
            // alert('Now you either ')
            // show profile
            userSignedIn = 1;
            userIsActive(); //hides menu logs
            $('.glassLoader').addClass('hide');

        } else {
            // doc.data() will be undefined in this case
            console.log("No such sessions!="+ipos);
            
            userSignedIn = 0;
            if (wallerProfile == 'wallet') {
              useractivityWallet();
            }
            if (wallerProfile == 'profile') {
              useractivityProfile();
            }
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
       console.log('Check IPOS: ' + IPOS);
       
    });
  }else{
    // alert('Failed to check sessions because empty IPOS');
  }
  
  
}

function locatePotential(){
  
  $.getJSON("https://api.ipify.org/?format=json", function(e) {
          IPCODE = e.ip;
          // console.log("USER IP: "+IPCODE);

          if (e.ip != "") {
            
            $.get("https://ipinfo.io", function(response) {
                //check ip db
                IPCODE = response.ip;
                IPCITY = response.city + response.country;
              console.log("Country of origin: "+ IPCITY);
             
            }, "jsonp");
          }
    });
}
// end of mines



function openMenu(){

    $('.menu_items').show();
    $('.menuItems_img').show();

    $('#btn_menu').addClass('hide');
    $('#btn_menuclose').removeClass('hide');
    console.log('Show close menu btn');
    $('#btn_close').removeClass('hide');
    
}

function closeMenu(){

    $('.menu_items').hide();
    $('.menuItems_img').hide();

    
    $('#btn_menuclose').addClass('hide');
    $('#btn_menu').removeClass('hide');

    $('#btn_close').addClass('hide');

}


function hovering(){
    // alert('222');
    
    $('.menu_profile_btn, .menuprofileContents').hover(
        function() {
          // Mouseenter: Show the glass-div
          $('.menuprofileContents').show();
          $('.mhistoryContents').hide();
          $('#menu_history_btn').removeClass('colorOrange');
          $('#menu_history_btn i').removeClass('menu_selected');

          $('.mhistoryContents').hide();
          $('#menu_history_btn').removeClass('colorOrange');
          $('#menu_history_btn i').removeClass('menu_selected');

          $('.menuprofileAssetsContents').hide();
          $('#menu_assets_btn').removeClass('colorOrange');
          $('#menu_assets_btn i').removeClass('menu_selected');
        },
        function() {
          // Mouseleave: Check if mouse is still over either element
          if (!$('.menu_profile_btn').is(':hover') && !$('.menuprofileContents').is(':hover')) {
            $('.menuprofileContents').hide();
          }
        }
    );
}


function history(){
        $('.menuprofileContents').hide();
        let $myHistory = $('.mhistoryContents');
        
        // Toggle div visibility when button is clicked
        $('#menu_history_btn').click(function(e) {
            
          e.stopPropagation(); // Prevent event bubbling
          $myHistory.toggle();
          $('#menu_history_btn').addClass('colorOrange');
          $('#menu_history_btn i').addClass('menu_selected');
        });
        
        // Hide div when clicking anywhere outside
        $(document).click(function(e) {
            if (!$myHistory.is(e.target) 
              && $myHistory.has(e.target).length === 0) {
                
               $('#menu_history_btn').removeClass('colorOrange');
               $('#menu_history_btn i').removeClass('menu_selected');
                $myHistory.hide();
            }
        });
        
        // Prevent hiding when clicking inside the div itself
        $myHistory.click(function(e) {
            e.stopPropagation();
        });
}

// improved history
function initHistory() {
  const $dropdown = $('.mhistoryContents').hide();
  const $btn = $('#menu_history_btn');
  
  const toggle = (show) => {
        $('.menuprofileAssetsContents').hide();
        $('#menu_assets_btn').removeClass('colorOrange');
        $('#menu_assets_btn i').removeClass('menu_selected');

        $dropdown.toggle(show);
        $btn.toggleClass('colorOrange', show);
        $btn.find('i').toggleClass('menu_selected', show);
    };
    
    $btn.on('click', e => { e.stopPropagation(); toggle(!$dropdown.is(':visible')); });
    $(document).on('click', e => {
        if (!$dropdown.is(e.target) && !$btn.is(e.target)) toggle(false);
    });
    $dropdown.on('click', e => e.stopPropagation());
}


// assets
function initAssets() {
    const $dropdown = $('.menuprofileAssetsContents').hide();
    const $btn = $('#menu_assets_btn');
    
    const toggle = (show) => {
        $('.mhistoryContents').hide();
        $('#menu_history_btn').removeClass('colorOrange');
        $('#menu_history_btn i').removeClass('menu_selected');


        $dropdown.toggle(show);
        $btn.toggleClass('colorOrange', show);
        $btn.find('i').toggleClass('menu_selected', show);
    };
    
    $btn.on('click', e => { e.stopPropagation(); toggle(!$dropdown.is(':visible')); });
    $(document).on('click', e => {
        if (!$dropdown.is(e.target) && !$btn.is(e.target)) toggle(false);
    });
    $dropdown.on('click', e => e.stopPropagation());
}


// footer
var tr=0;
var su=0;
var pr=0;
var lg=0;



// 



function openTrading(){
   if (tr == 0) {
      tr = 1;
      
      $('#trading_menus').show();
      $('#ft_trading i').addClass('menu_selected');
      console.log(tr);
    } else if (tr == 1) {
      tr = 0;
      $('#trading_menus').hide();
      $('#ft_trading i').removeClass('menu_selected');

      console.log(tr);

    } 
}

function openSupport(){
   if (su == 0) {
      su = 1;
      
      $('#support_menus').show();
      $('#ft_support i').addClass('menu_selected');
      console.log(su);
    } else if (su == 1) {
      su = 0;
      $('#support_menus').hide();
      $('#ft_support i').removeClass('menu_selected');

      console.log(su);

    } 
}

function openProducts(){
   if (pr == 0) {
      pr = 1;
      
      $('#products_menus').show();
      $('#ft_products i').addClass('menu_selected');
      console.log(pr);
    } else if (pr == 1) {
      pr = 0;
      $('#products_menus').hide();
      $('#ft_products i').removeClass('menu_selected');

      console.log(pr);

    } 
}


function openLegal(){
   if (lg == 0) {
      lg = 1;
      
      $('#legal_menus').show();
      $('#ft_legal i').addClass('menu_selected');
      console.log(lg);
    } else if (lg == 1) {
      lg = 0;
      $('#legal_menus').hide();
      $('#ft_legal i').removeClass('menu_selected');

      console.log(lg);

    } 
}









function clearError(){
    setTimeout(() => {
        $('.errorMessage p').text('');
        
    }, 6667);
}
