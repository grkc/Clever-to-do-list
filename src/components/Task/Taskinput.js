import React from 'react';

class TaskInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input: '',
            inputTextArea: '',
        };
    }
    addTask = () => {
        const {input} = this.state;
        if(input){
            this.props.addTask(input);
            this.setState({input: '', textarea: ''});
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
                    >
                </input>
                <button onClick={this.addTask} className="buttonSaveToDo">&#10004;</button>
            
            </div>
            <textarea 
                    value={input.inputTextArea} 
                    onChange={this.inputChangeArea}  
                    placeholder="Description" 
                    className="descrOfTask"
                ></textarea>
            </div>
            
        )
    }
}
export default TaskInput;