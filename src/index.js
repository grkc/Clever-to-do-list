import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Registration from './Registration';
import firebase from 'firebase';
import * as ServiceWorker from "./serviceWorker.js";
import { BrowserRouter as Router, Route} from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDcYmqoyijUqOhDbdoi4twbna4hrdgT3jU",
  authDomain: "todolist-3a094.firebaseapp.com",
  databaseURL: "https://todolist-3a094-default-rtdb.firebaseio.com",
  projectId: "todolist-3a094",
  storageBucket: "todolist-3a094.appspot.com",
  messagingSenderId: "442693549435",
  appId: "1:442693549435:web:515477bde0c0c7b82cd1de"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>  
    <Route exact path="/" component={App} />
    <Route path="/registration" component={Registration} />
  </Router>,
  document.getElementById('root')
);

ServiceWorker.unregister();
export default ServiceWorker;