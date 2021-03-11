const COUNT_DAYS_OF_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
};

export function areEqual(a, b){
    if(!a || !b) return false;
    return ( a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate());
}
/*
const DayOfWeek = {
    Mondey: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0
};*/
export function isLeapYear(year){
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date){
    const month = date.getMonth();
    const year = date.getFullYear();
    if(isLeapYear(year) && month === Month.February)   
        return  DAYS_IN_MONTH[month] + 1; 
    else return DAYS_IN_MONTH[month];  
}

export function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();
    if(dayOfWeek === 0) return 6;
    return dayOfWeek - 1;
}

export function getMonthData(year, month){
    const result = [];
    const date = new Date(year, month);
    let day = 1;
    const daysInMonth = getDaysInMonth(date);
    const monthStartOn = getDayOfWeek(date);
    for( let i = 0; i < ((daysInMonth + monthStartOn) / COUNT_DAYS_OF_WEEK); i++){
        result[i] = [];
        for(let j = 0; j < COUNT_DAYS_OF_WEEK; j++){
            if((i === 0 && j < monthStartOn) || day > daysInMonth)
                result[i][j] = undefined;
            else result[i][j] = new Date(year, month, day++);
        }
    }
    return result;
}