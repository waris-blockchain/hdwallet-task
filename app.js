let bip39 = require('bip39');
let bip32 = require('bip32');
let bitcoin = require('bitcoinjs-lib');

//mnemonic phrase
var mnemonic = "wash similar napkin quit draft kingdom blind degree able jewel mechanic infant comfort era knock era large page smooth surge drop athlete parrot eager";

// define paths
var path = [
	"m/44'/0'/0'/0/0",
	"m/44'/0'/0'/0/1",
	"m/44'/0'/0'/0/2",
	"m/44'/0'/0'/0/3",
	"m/44'/0'/0'/0/4",
	"m/44'/0'/0'/0/5"
];

//check valid bip39 mnemonic
if (bip39.validateMnemonic(mnemonic)) {    
    bip39.mnemonicToSeed(mnemonic).then(function(buffer){
	    var root = bip32.fromSeed(buffer);
	    console.log("mnemonic =>" , mnemonic);
		path.forEach(element => { 
		   derivedPath = root.derivePath(element);
		   address = bitcoin.payments.p2pkh({ pubkey: derivedPath.publicKey}).address;
		   console.log("\nPath =>" , element);
		   console.log("Address =>" , address);
		}); 
    });
} else {
	console.log("Invalid bip39 mnemonic")
}