import React from 'react';

class TaskUpdate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input: '',
            inputTextArea: '',
        };
    }
    updateTask = () => {
        const input = this.state.input;
        const inputTextArea = this.state.inputTextArea;
        if(input){
            this.props.updateTask(input, inputTextArea);
            this.setState({input: '', textarea: ''});
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
                ></input>
                <button onClick={this.updateTask} className="buttonSaveToDo">&#10004;</button>
            
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
export default TaskUpdate;