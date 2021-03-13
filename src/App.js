/* eslint-disable no-unused-vars */
import './App.css';
import { Component } from 'react';
import firebase from 'firebase';
import { ReactComponent as Logo } from './img/logo.svg';
import { ReactComponent as LogoGoogle } from './img/Google_Logo.svg';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Calendar from './components/Calendar';
import Task from './components/Task/Task.js';
import TaskInput from './components/Task/Taskinput.js';
import TaskUpdate from './components/Task/Taskupdate.js';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      hasAccount: false,
      tasks: [
        {id: 0, title: '0000', done: false, description: '0aa'},
        {id: 1, title: '1111', done: true, description: '01aa'},
        {id: 2, title: '2222', done: true, description: '02aa'},
        {id: 3, title: '3333', done: false, description: '03aa'},
        {id: 4, title: '4444', done: false, description: '04aa'}
      ],
      id: 5,
    };
  }
  deleteTask = id => {
    this.setState({
      tasks: this.state.tasks.filter(x => x.id !== id)
    });
  };

  handleMouseIn() {
    this.setState({ show: true })
  };

  handleMouseOut() {
    this.setState({ show: false })
  };
  componentDidMount() {
    const db = firebase.database();
    console.log(db);
  };
  handleChange = ({target: {value, id}}) => {
    this.setState({
      [id]: value,
    })
  };
  state = {
    date: null
  };
  handleDateChange = date => this.setState({date});
  GoogleLogin = () => {
    var proveder = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(proveder).then(
      function () {
        window.location={App};
      }).catch(function(error){
        var errorMessage = error.errorMessage;
        alert(errorMessage);
      })
  };
  signInAccount = () => {
    const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({hasAccount: true});
      })
      .catch(error => alert(error));
  };
  doneTasks = id => {
   this.setState({
     tasks: this.state.tasks.map(task => {
       if(id === task.id) 
         return {id: task.id, title: task.title, done: !task.done, description: task.description}; 
       else 
        return task})
   });
  };
  addTask = (task, description) => {
    this.setState({
      tasks: [...this.state.tasks, {
        id: this.state.id,
        title: task,
        done: false,
        description: description,
      }],
      id: this.state.id + 1
    });
  }
  updateTask = updatedTask => {
    this.setState({
      tasks: this.state.tasks.map(task => 
        {if(updatedTask.id === task.id) 
          return {id: task.id, title: document.getElementsByClassName("NameOfTask"), done: task.done, description: document.getElementsByClassName('descrOfTask')}; 
        else 
          return task
        }
      )
    })
  }
  saveTask = saveTask => {
    this.setState({
      tasks: this.state.tasks.map(task => {
        if(saveTask.id === task.id) 
          return {id: task.id, title: document.getElementsByClassName('NameOfTask'), done: task.done, description: document.getElementsByClassName('descrOfTask')}; 
        else 
          return task})
    })
  }
  render(){
    const {tasks} = this.state;
    const activeTasks = tasks.filter(task => !task.done);
    const doneTasks = tasks.filter(task => task.done);
    const tooltipStyle = {display: this.state.show ? 'block' : 'none'};
    const tooltipStyle2 = {display: this.state.show ? 'none' : 'block'};
    const {date} = this.state;
    const { hasAccount } = this.state;

    return(hasAccount ? 
    (<div className='mainPageToDo'> 
    {date && <p>Выбранная дата: {date.toLocaleDateString()}</p>}
    <Calendar
        onChange = {this.handleDateChange}
    />
      <div className="blockList">
        <div className="blockWithTasks" style={tooltipStyle2}>
          {[...activeTasks, ...doneTasks].map(task => 
          <Task doneTasks={() => this.doneTasks(task.id)}
            deleteTask={() => this.deleteTask(task.id)}
            updateTask={() => this.updateTask(task)}
              task={task} 
              key={task.id}
              handleMouseIn={this.handleMouseIn.bind(this)}
           ></Task>)}
        </div>
          <div className="blockWithBackAndSave" style={tooltipStyle}>
            <div>
              <button className="buttonBackToDo" onClick={this.handleMouseOut.bind(this)}>&#9668;</button>
              <TaskInput></TaskInput>
            </div>
          </div>
        
      </div>
      <button className="buttonPlus" style={tooltipStyle2} onClick={this.handleMouseIn.bind(this)}>+</button>
    </div>) 
    :
    (<div id="loginWindow"><Logo id="logo"/><div id="loginPageHeader">To Do List</div>
    <div className="signUpBlock">
      <input 
      type="email" 
      id="email" 
      className="inputForEnterOrRegistration" 
      placeholder="&#9993; Enter your Emal"  
      onChange={this.handleChange}/>
      <input 
      type="password" 
      id="password" 
      className="inputForEnterOrRegistration" 
      placeholder="&#9919; Enter your password"
      onChange={this.handleChange}/>
      <button 
      className="buttonForEnterOrRegistration"
      onClick = {this.signInAccount}>Sign in</button>
    </div>
    <div id="blockWithGoogleSignAndRegistration">
      <div id="textForGoogleSign">Sign in with &nbsp;<button id="buttonForEnterGoogle" onClick={this.GoogleLogin}><LogoGoogle id="googleLogo"/> Google</button></div>
      <div id="textBlockOnMainPage">Don't have an account yet? <Link id="linkForRegistration" to="/registration">Register now</Link>
      </div>
    </div>
    </div>))
  }
}