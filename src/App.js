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

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      hasAccount: false,
      tasks: [
        {id: 0, title: '0000', done: false, description: '0aa', date: new Date('Dec 01 2020 00:00:00 GMT+0300')},
        {id: 1, title: '1111', done: true, description: '01aa', date: new Date('Dec 01 2021 00:00:00 GMT+0300')},
        {id: 2, title: '2222', done: true, description: '02aa', date: new Date('Dec 01 2022 00:00:00 GMT+0300')},
        {id: 3, title: '3333', done: false, description: '03aa', date: new Date('Dec 01 2023 00:00:00 GMT+0300')},
        {id: 4, title: '4444', done: false, description: '04aa', date: new Date('Dec 01 2024 00:00:00 GMT+0300')},
      ],
      id: 5,
    };
  }
  selectedTask = task => {
    this.setState({
      selectedTask: task, 
      show: true,
    });
  };
  deleteTask = id => {
    this.setState({
      tasks: this.state.tasks.filter(x => x.id !== id)
    });
  };
  handleMouseIn1() {
    this.setState({ show: true })
  };
  handleMouseOut1() {
    this.setState({ show: false })
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
    firebase.auth().signInWithPopup(proveder).then(response => {
      this.setState({hasAccount: true});
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
         return {id: task.id, title: task.title, done: !task.done, description: task.description, date: task.date}; 
       else 
        return task})
   });
  };
  addTask = (title, description) => {
    console.log('ADD')
    this.setState({
      tasks: [...this.state.tasks, {
        id: this.state.id,
        title: title,
        done: false,
        description: description,
        date: this.state.date,
      }],
      id: this.state.id + 1,
      show: false,
    });
    
    }
 
  updateTask = (title, description) => {
    this.setState({
      tasks: this.state.tasks.map(task => 
        {if(this.state.selectedTask.id === task.id) 
          return {
            id: task.id, 
            title: title, 
            done: task.done, 
            description: description,
            date: task.date,
          }; 
        else 
          return task
        }
      ),
      selectedTask: null,
      show: false,
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
    <Calendar
        onChange = {this.handleDateChange}
    />
      <div className="blockList">
        <div className="blockWithTasks" style={tooltipStyle2}>
          {date && <p id="selectedData">{date.toLocaleDateString()}</p>}
          {[...activeTasks, ...doneTasks]
          .filter(task => typeof date === 'undefined' || task.date.toLocaleDateString() === date.toLocaleDateString())
          .map((task) => 
          <Task doneTasks={() => this.doneTasks(task.id)}
            deleteTask={() => this.deleteTask(task.id)}
              task={task} 
              key={task.id}
              handleMouseIn={this.selectedTask.bind(this)}
           ></Task>)}
        </div>
          <div className="blockWithBackAndSave" style={tooltipStyle}>
            <div>
              <button className="buttonBackToDo" onClick={this.handleMouseOut.bind(this)}>&#9668;</button>
              {
              this.state.selectedTask != null 
              ? <TaskInput saveTask={this.updateTask}></TaskInput> 
              : <TaskInput saveTask={this.addTask}></TaskInput>
              }
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