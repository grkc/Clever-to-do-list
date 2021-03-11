import React from 'react'

const Task = ({task, ...props}) => {
    const ActionBtn = () => (
    <div className="action-btn">
        {!task.done ? 
        (<button className="checkButYes" onClick={props.doneTasks}>&#10004;</button> )
        :
        (<button className="checkButNo"  onClick={props.deleteTask}>&#10006;</button>)}
    </div>
);
    const className = 'task' + (task.done ? 'task-done' : '');
    return(
        <div className={className}>
            <p className="listDo"><ActionBtn></ActionBtn><button className="editBtn" onClick={props.handleMouseIn}>{task.title} </button></p>
            
        </div>
    );
};
export default Task;