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