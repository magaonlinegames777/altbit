
    $(document).ready(function() {

        // 1. Get IP Address
        $.get('https://ipapi.co/json/', function(data) {
            const ip = data.ip;
            const city = data.city;
            const country = data.country_name;

            // 2. Get Device Info
            const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
            const deviceType = isMobile ? 'Mobile' : 'Desktop';
            const os = navigator.platform;
            const browser = navigator.userAgent.match(/(Chrome|Safari|Firefox|Edge)/)[0] || 'Unknown';
            // const screen = `${screen.width}x${screen.height}`;
            const ops = country + city + os + deviceType +  browser + ip;
            var sesLogs = country + os + deviceType +  browser + ip;
            IPOS = sesLogs;
            // console.log(IPOS);
            // alert(IPOS);
            // checkSessions(IPOS);

            var docRef = firebase.firestore().collection("sessions").doc(IPOS);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Sessions data EXISTS:", doc.data());
                  
                    // show profile
                    userSignedIn = 1;
                    userIsActive(); //hides menu logs
                    $('.glassLoader').addClass('hide');

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such sessions!="+ipos);
                    
                    userSignedIn = 0;
                    if (wallerProfile == 'wallet') {
                    // useractivityWallet();
                    }
                    if (wallerProfile == 'profile') {
                    // useractivityProfile();
                    }
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            console.log('Check IPOS: ' + IPOS);
            
            });
            
        }).fail(function() {
            console.log('failed to get ip device info');
            
        });
    });
