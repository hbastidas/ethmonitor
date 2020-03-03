# ethmonitor

ethereum script for monitoring public addresses


# install

> npm i ethmonitor

  
# usage

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
