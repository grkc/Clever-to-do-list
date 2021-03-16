import React from 'react';

class TaskInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input: '',
            inputTextArea: '',
        };
    }
    
    saveTask = () => {
        this.props.saveTask(this.input.value, this.inputTextArea.value);
        this.input.value ='';
        this.inputTextArea.value ='';
    };

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
                <button onClick={this.saveTask} className="buttonSaveToDo">&#10004;</button>
            
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