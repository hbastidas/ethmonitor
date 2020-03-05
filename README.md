# ethmonitor

ethereum script for monitoring public addresses  

## install
> npm i ethmonitor


# usage in nodeje

    let ethmonitor = require("ethmonitor")
    let app = new monitor("ropsten", "API INFURA KEY");
    
    const accounts={
    "0x9b0f09B230dbBaBF2e696F2d3427b4681fcf1719":{},
    "0x2e5351FCeD6d2761d8a49464BdEc38216B22aC47":{}
    }
    
    app.getdata(accounts, 3)
    app.on('change', function(data) {
	    //your code here
	    console.log(accounts[data.key]);
    });

  

# usage in browser

    <body>
    <script type="text/javascript" src="https://unpkg.com/ethmonitor@0.0.2/dist/ethmonitor.js"></script>
    <script>
    let app = new ethmonitor("ropsten", "YOUR INFURA API KEY")
    const accounts={
    "0x9b0f09B230dbBaBF2e696F2d3427b4681fcf1719":{},
    "0x2e5351FCeD6d2761d8a49464BdEc38216B22aC47":{}
    }
    
    app.getdata(accounts, 3)
    app.on('change', function(data) {
    //data.key is a ether account
    console.log(accounts[data.key]);
    });
    </script>
    </body>
