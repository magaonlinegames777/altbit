
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
            IPOS = ops;
            console.log(IPOS);
            checkSessions(IPOS);
            
        }).fail(function() {
            console.log('failed to get ip device info');
            
        });
    });
