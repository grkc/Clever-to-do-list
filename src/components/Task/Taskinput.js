import React from 'react';

class TaskInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input: '',
            inputTextArea: '',
            date: this.props.date,
        };
    }
    
    addTask = () => {
        const input = this.state.input;
        const inputTextArea = this.state.inputTextArea;
        const date = this.props.date;
        if(input){
            this.props.addTask(input, inputTextArea, date);
            this.setState({input: '', textarea: '', date: new Date()});
            this.input.value ='';
            this.inputTextArea.value ='';
        }
    };
    updateTask = () => {
        const {input} = this.state;
        const {inputTextArea} = this.state.inputTextArea;
        if(input){
            this.props.updateTask(input.input, inputTextArea);
            this.setState({input: document.getElementsByClassName("NameOfTask").value, inputTextArea: document.getElementsByClassName("descrOfTask").value });
        }
    }
    inputChange = event => {
        this.setState({input:event.target.value});
    };
    inputChangeArea = event => {
        this.setState({inputTextArea: event.target.value});
    };
    render(){
        const {input} = this.state;
        return(
            <div>
            <div>
                <input 
                    placeholder ="The Task"
                    onChange={this.inputChange} 
                    value= {input.input}
                    className="NameOfTask"
                    ref={ input => this.input = input}
                    >
                </input>
                <button onClick={this.addTask} className="buttonSaveToDo">&#10004;</button>
            
            </div>
            <textarea 
                    value={input.inputTextArea} 
                    onChange={this.inputChangeArea}  
                    placeholder="Description" 
                    className="descrOfTask"
                    ref={ inputTextArea => this.inputTextArea = inputTextArea}
                ></textarea>
            </div>
            
        )
    }
}
export default TaskInput;