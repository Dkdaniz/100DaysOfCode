let web3 = Web3 | undefined;

async function authentication() {  
    web3 = Web3 | undefined;
    if (!web3) {
        try {
            const networkId = parseInt((window).ethereum.chainId);
            if(networkId !== 4){
                window.alert('NETWORK INVALID');
                return false;
            } else { 
                await (window).ethereum.enable();
                web3 = new Web3((window).ethereum);
                
                return true;
            }
        } catch (error) {
            window.alert('error in process MetaMask.');
            return false;
        }
    }else{
        console.log('You Need of Metamask')
        return false;
    }
}

async function getBalance(){    
    await authentication();
    console.log(web3.givenProvider.selectedAddress)
    web3.eth.getBalance(web3.givenProvider.selectedAddress, function (err, result) {
        if (!err) {
            document.getElementById("myBalance").innerText = web3.utils.fromWei(result, "ether");
        } else {
            console.error(err);
        }
    });
}

async function sendTransaction(){
    await authentication();

    let addressTo = document.getElementById("to").value;
    let valueSend = document.getElementById("value").value;

    console.log(web3);

    web3.eth.sendTransaction({
        from: web3.givenProvider.selectedAddress,
        to: addressTo.toString(),
        value: web3.utils.toWei(valueSend, "ether")
    })
    .on('confirmation', function(confirmationNumber, receipt){ 
        if(confirmationNumber === 1){
            getBalance();
        }
     })
    .on('error', function(){
        window.alert('Erro: Payment dont was processed');
        console.log(error)
    });
}

