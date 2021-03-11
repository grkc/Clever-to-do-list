import React, { Component } from 'react';
import firebase from 'firebase';
import { ReactComponent as Logo } from './img/logo.svg';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import App from './App';

export default class Registration extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password1: '',
          password2: '',
          hasAccount: false,
        }
      }
      componentDidMount() {
        const db = firebase.database();
        console.log(db);
      }
      handleChange = ({target: {value, id}}) => {
        this.setState({
          [id]: value,
        })
      };
    createAccount = () => {
        const { email, password1, password2 } = this.state;
        if(password1 === password2){
          firebase.auth().createUserWithEmailAndPassword(email, password1)
          .catch(error => alert(error));
          <Router>  
          <Route exact path="/" component={App} />
        </Router>
        }
        else alert("Password missmatch. Please try again");
      };
    render(){
        const { hasAccount } = this.state;
        return(hasAccount ? (<div></div>) : (<div id="registrationWindow"><Logo id="logo"/><div id="loginPageHeader">Registration</div>
        <div className="RegBlock">
          <input
            type="email" 
            id="email"
            className="inputForEnterOrRegistration"
            placeholder="&#9993; Enter your Emal"
            onChange={this.handleChange}
          />
          <input
            type="password"
            id="password1"
            className="inputForEnterOrRegistration"
            placeholder="&#9919; Enter your password"
            onChange={this.handleChange}
          />
          <input
            type="password"
            id="password2"
            className="inputForEnterOrRegistration"
            placeholder="&#9919; Enter your password"
            onChange={this.handleChange}
          />
          <button className="buttonForEnterOrRegistration"
          onClick = {this.createAccount}>
            Chek In  
          </button>
        </div>
        <Link to="/" id="backOnMainPage">&#8617; Back</Link>
        </div>))
      }
    }