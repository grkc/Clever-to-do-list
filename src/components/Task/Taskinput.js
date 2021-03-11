import React from 'react';

class TaskInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input:''
        };
    }
    addTask = () => {
        const {input} = this.state;
        if(input){
            this.props.addTask(input);
            this.setState({input: ''});
        }
    };
    updateTask = () => {
        const {input} = this.state;
        if(input){
            this.props.updateTask(input);
            this.setState({input: ''});
        }
    }
    inputChange = event => {
        this.setState({input:event.target.value});
    };
    render(){
        const {input} = this.state;
        return(
            <div>
                <input 
                    placeholder ="The Task"
                    onChange={this.inputChange} 
                    value={input}
                    className="NameOfTask"
                    >
                </input>
                <button onClick={this.addTask} className="buttonSaveToDo">&#10004;</button>
            </div>
        )
    }
}
export default TaskInput;