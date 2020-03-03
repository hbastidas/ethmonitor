var Web3 = require('web3');
var EventEmitter = require('events');

class monitor extends EventEmitter{

    /**
     * constructor for monitor eth
     * 
     * 
     * @param {string} net mainnet, ropsten, kovan, rinkeby, goerli
     * @param {string} key infurakey
     */
    constructor(net, key){
        super()
        this.ws="wss://"+net+".infura.io/ws/v3/"+key;
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.ws));
    }

    getdata(accounts, modblock=3){
        let self=this
        let subscription = this.web3.eth.subscribe('newBlockHeaders').on("data", function(blockHeader){
            if((blockHeader.number % modblock)==0){
                console.log(blockHeader.number)
                for (const key in accounts) {                    
                    self.web3.eth.getBalance(key).then(bal =>{
                        if(parseFloat(accounts[key]["balance"])!=parseFloat(bal)){
                            accounts[key]["balance"]=bal;
                            accounts[key]["hval"]=self.web3.utils.fromWei(bal, 'ether');
                            self.emit('change', {key: key, bal: bal});
                        }
                    })
                }
            }
        }).on("error", console.error);
    }
}

module.exports=monitor;

// 
// let app = new monitor("ropsten", "6676727b364c441e9b8a01c6f5b840c0");
// const accounts={
//     "0x9b0f09B230dbBaBF2e696F2d3427b4681fcf1719":{},
//     "0x2e5351FCeD6d2761d8a49464BdEc38216B22aC47":{}
// }
    
// app.getdata(accounts, 3)

// //reacciona a cambios
// app.on('change', function(data) {

//     //data.key is a ether account
//     console.log(accounts[data.key]);
// });