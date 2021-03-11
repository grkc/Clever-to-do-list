import React from 'react';
import './index.css'
import classnames from 'classnames';
import * as calendar from './calendar';

export default class Calendar extends React.Component {
    static defaultProps = {
        date: new Date(),
        years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        monthNames: ['Jan­u­ary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        weekDayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        onChange: Function.prototype
    };
    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectDate: null
    };
    get year(){
        return this.state.date.getFullYear();
    }
    get month(){
        return this.state.date.getMonth();
    }
    get day(){
        return this.state.date.getDate();
    }
    handlePrevMonthButtonClick = () => {
        const date = new Date(this.year, this.month - 1);
        this.setState({date});        
    };
    handleNextMonthButtonClick = () => {
        const date = new Date(this.year, this.month + 1);
        this.setState({date});
    };
    handleSelectChange = () => {
        const year = this.yearSelect.value;
        const month = this.monthSelect.value; 
        const date = new Date(year, month);
        this.setState({date});
    };
    handleDayClick = date => {
        this.setState({selectedDate: date});
        this.props.onChange(date);
    }

    render() {
        const {years, monthNames, weekDayNames} = this.props;
        const {currentDate, selectedDate} = this.state;
        const monthData = calendar.getMonthData(this.year, this.month);
        return(
            <div className="calendar">
                <header>
                    <h1 className="h1Todolist">To Do List</h1>
                    <button className="buttonCalendar" onClick={this.handlePrevMonthButtonClick}>{'<'}</button>
                    <select
                        className="selectCalendarMonth"
                        ref = {element => this.monthSelect = element}
                        value = {this.month}
                        onChange={this.handleSelectChange}
                    >
                        {monthNames.map((name, index) => 
                            <option key={name} value={index}>{name}
                            </option>
                        )}
                    </select>
                    <select
                        className="selectCalendarYear"
                        ref = {element => this.yearSelect = element}
                        value= {this.year}
                        onChange={this.handleSelectChange}
                    >
                        {years.map(year => 
                            <option key={year} value={year}>{year}
                            </option>
                        )}
                    </select>
                    <button className="buttonCalendar" onClick={this.handleNextMonthButtonClick}>{'>'}</button>
                </header>
                <table className='calendarTable'>
                    <thead>
                        <tr>
                            {weekDayNames.map(name => 
                                <th key={name}>
                                    {name}
                                </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {monthData.map((week, index) => 
                        <tr key = {index} className = "week">
                            {week.map((date, index) => date ?
                                <td 
                                tabIndex="0"
                                key={index} 
                                className={classnames('day', {
                                    'today': calendar.areEqual(date, currentDate),
                                    'selected': calendar.areEqual(date, selectedDate)
                                })}
                                onClick={() => this.handleDayClick(date)}
                                >{date.getDate()}</td>
                                :
                                <td key = {index}/>
                            )}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}