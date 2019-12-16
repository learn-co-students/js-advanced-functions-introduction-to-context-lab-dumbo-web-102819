// Your code here
const createEmployeeRecord = function(arrayArg) {
    let tempObj = {
        firstName: arrayArg[0],
        familyName: arrayArg[1], 
        title: arrayArg[2], 
        payPerHour: arrayArg[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return tempObj
}

const createEmployeeRecords = function(arrayOfArraysArg) {
    return arrayOfArraysArg.map((arrayArg) => 
        createEmployeeRecord(arrayArg))
}

const createTimeInEvent = function(employeeObject, dateStamp) {
    let tempObj = {
        type: "TimeIn", 
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    }
    employeeObject.timeInEvents.push(tempObj)
    return employeeObject
}

const createTimeOutEvent = function(employeeObject, dateStamp) {
    let tempObj = {
        type: "TimeOut", 
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    }
    employeeObject.timeOutEvents.push(tempObj)
    return employeeObject
}

const hoursWorkedOnDate = function(recordObject, dateString) {
    let clockIn = 0
    let clockOut = 0
    recordObject.timeInEvents.forEach((timeInObj) => {
        if (timeInObj.date === dateString) {
            clockIn = timeInObj.hour
        }
    })
    recordObject.timeOutEvents.forEach((timeOutObj) => {
        if (timeOutObj.date === dateString) {
            clockOut = timeOutObj.hour
        }
    })
    let hoursWorked = ((clockOut - clockIn) * .01)
    return hoursWorked
}

const wagesEarnedOnDate = function(recordObject, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(recordObject, dateStamp)
    return (hoursWorked * recordObject.payPerHour)
}

const allWagesFor = function(employeeRecordObject) {
    let tempTotal = 0
    employeeRecordObject.timeInEvents.forEach((timeObj) => {
        tempTotal += wagesEarnedOnDate(employeeRecordObject, timeObj.date)
    })
    return tempTotal
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    function findFirstName(employ, firstName) {
        return employ.firstName === firstName
    }
    let found = srcArray.find((element) => findFirstName(element, firstName))
    return found
}

const calculatePayroll = function(employeeArray) {
    let totalPay = 0
    employeeArray.forEach((employee) => {
        console.log(employee)
        totalPay += allWagesFor(employee)
    })
    return totalPay
}

