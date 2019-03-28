import React, { Component } from 'react';
import './App.css';
import * as e from 'ethers';
import QRCode from 'qrcode-react';
import Web3 from 'web3';
import Fortmatic from 'fortmatic';
import ReWalletLogo from './rewallet.png';
import { REWALLET_ADDRESS, REWALLET_SC } from './smartcontract.js'

const fm = new Fortmatic('pk_test_A033CF1C6FD5F439');
var web3F = "";

var user = {
  address: "",
  privateKey: "",
  bal: "",
  price: "",
  etherscan: ""
}

class ReWallet extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: user
    }
  }

  async componentWillMount() {}

  async signIn(t) {
    t.preventDefault();
    console.log("entro")
    let accounts = await fm.user.login();
    console.log(accounts)
    if (accounts.length > 0) {
      web3F = new Web3(fm.getProvider());
      this.setUserInfo();
    }
  };

  async logOut(t) {
    t.preventDefault();
    user = {
      address: "",
      privateKey: "",
      bal: "",
      price: "",
      etherscan: ""
    };

    this.setState({user: user});
    web3F = "";
    fm.user.logout();
  };

  async setUserInfo () {
    web3F.eth.getAccounts((err, accounts) => {
      if (err) throw err;
      let address = accounts[0];
      user.address = address;
      user.etherscan = "https://etherscan.io/address/" + address
    });
    let balances = await fm.user.getBalances();
    
    let ethBalance = balances.find((e) => {
      return e.crypto_currency === 'ETH';
    });

    console.log("Balance" + JSON.stringify(ethBalance.crypto_amount));
    user.bal = ethBalance.crypto_amount;

    fetch("https://coincap.io/page/ETH")
      .then((res) => res.json() )
      .then((data) => {
        user.price = (user.bal*data.price).toFixed(2);
        this.setState({user: user})
      })
  };

  async handleSendSCTransaction(t) {
    t.preventDefault()
    console.log("enviar")

    let fullname = this.refs.fullname.value;
    let email = this.refs.email.value;
    let age = this.refs.age.value;
    let city = this.refs.city.value;
    let message = this.refs.message.value;
    // let to2 = this.refs.to2.value;

    const contract = new web3F.eth.Contract(REWALLET_SC, REWALLET_ADDRESS);

    web3F.eth.getAccounts().then((accounts) => {
      contract.methods.escribirMail(
        fullname, email, age, city, message
      ).send({from: accounts[0]})
      .once('transactionHash', (hash) => { console.log(hash); })
      .once('receipt', (receipt) => { console.log(receipt); });
    });
  }

  async handleSendTransaction (t) {
    t.preventDefault()
    console.log("enviar")
    let to = this.refs.to.value;
    let amount = this.refs.amount.value;
    if(to !== "" && amount !== "") {
      if (!isNaN(Number(amount))) {
        amount = e.utils.parseEther(amount.toString());
          web3F.eth.getAccounts().then((accounts) => {
            console.log(accounts[0])
            console.log(to)
            console.log(amount)
            web3F.eth.sendTransaction({
              from: accounts[0],
              to: to,
              value: amount
            })
            .once('transactionHash', (hash) => { console.log(hash); })
            .once('receipt', (receipt) => { console.log(receipt); });
          });
        }
     } else alert ("Rellene los campos");
  };

  render() {
    if(user.address !== "") {
      return(
        <div className="element2">
            <div className="card">
            <div className="send">
                <form onSubmit={this.logOut.bind(this)}>
                    <button type="submit">Logout</button>
                </form>
              </div>
              <div className="address">
                  {this.state.user.address}
              </div>
              <div className="info">
                  <img src={ReWalletLogo} style={{width: "200px", height: "200px"}} alt="eth"></img>
                  <div className="qr">
                    <QRCode value={this.state.user.etherscan} bgColor="#51a1c0" size={170} fgColor="#444" />
                  </div>
                  <div className="bal">
                      <div className="total">
                        ${this.state.user.price}
                      </div>
                      <div>
                        {this.state.user.bal} ETH
                      </div>
                  </div>
              </div>
              <div className="send">
                <form onSubmit={this.handleSendTransaction.bind(this)}>
                    <input type="text" ref="to" placeholder="Type send address" style={{color: "black", backgroundColor: "white", borderColor: "black"}}/>
                    <input type="text" ref="amount" placeholder="Type amount" style={{color: "black", backgroundColor: "white"}}/>
                    <button type="submit">Send money</button>
                </form>
              </div>
            </div>

            <div className="element3"></div>

            <div className="card">
              <div className="address">
                  Write a Message
              </div>
              <div className="send">
                <form onSubmit={this.handleSendSCTransaction.bind(this)}>
                    <input type="text" ref="fullname" placeholder="Fullname" style={{color: "black", backgroundColor: "white", borderColor: "black"}}/>
                    <input type="text" ref="email" placeholder="Email" style={{color: "black", backgroundColor: "white", borderColor: "black"}}/>
                    <input type="number" ref="age" placeholder="Age" style={{color: "black", backgroundColor: "white", borderColor: "black"}}/>
                    <input type="text" ref="city" placeholder="City" style={{color: "black", backgroundColor: "white", borderColor: "black"}}/>
                    <input type="text" ref="message" placeholder="Message" style={{color: "black", backgroundColor: "white", borderColor: "black"}}/>
                    <input type="text" ref="to2" placeholder="Type send address" style={{color: "black", backgroundColor: "white", borderColor: "black"}}/>
                    <button type="submit">Send Message</button>
                </form>
              </div>
            </div>
        </div>
        
      )
    }
    else {
      return(
        <div className="element">
        <div className="cardLogin">
          <div className="info2">
            <div className="centered">
            <img src={ReWalletLogo} style={{width: "200px", height: "200px"}} alt="eth"></img>
              
              <div className="bal">
                  <div className="total">
                    ReWallet
                  </div>
                  <div><br/></div>
                  <div>
                    <h5>The powerfull of a Ethereum Wallet in your hands</h5>
                  </div>
              </div>
            </div>
              
          </div>
          <div className="send">
            <form onSubmit={this.signIn.bind(this)}>
                <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
        </div>
      )
    }
  }
}

export default ReWallet;
