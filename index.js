function createEmployeeRecord(arr) {
    let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
      }
    return obj;
}

function createEmployeeRecords(arr) {
    return arr.map((emp) => {
        return createEmployeeRecord(emp)
    });
}


function createTimeInEvent(obj, date) {
    let splitDate = date.split(" ");

    let timeObj = {
        type: "TimeIn",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    }

    obj.timeInEvents.push(timeObj);
    return obj;
}

function createTimeOutEvent(obj, date) {
    let splitDate = date.split(" ");
  
    let timeObj = {
      type: "TimeOut",
      hour: parseInt(splitDate[1]),
      date: splitDate[0]
    }
    
    obj.timeOutEvents.push(timeObj);
    return obj;
  }


  function hoursWorkedOnDate(obj, date) {
    let timeInEvents = obj.timeInEvents;
    let timeOutEvents = obj.timeOutEvents;
    
    for(let i = 0; i < timeInEvents.length; i++) {
      if(timeInEvents[i].date === date) {
        let hours = timeOutEvents[i].hour - timeInEvents[i].hour;
        return hours / 100;
      }
    }
  }

  function wagesEarnedOnDate(obj, date) {
    let hours = hoursWorkedOnDate(obj, date);
    return hours * obj.payPerHour;
  }


  function allWagesFor(obj) {
    let timeEvents = obj.timeInEvents;
    let total = 0;
    for(let i = 0; i < timeEvents.length; i++) {
      total += wagesEarnedOnDate(obj, timeEvents[i].date);
    }
    return total;
  }

  function calculatePayroll(employees) {
    let total = 0;
    for(let i = 0; i < employees.length; i++) {
      total += allWagesFor(employees[i])
    }
    return total;
  }

  function findEmployeeByFirstName(employees, name) {
    let firstEmp = employees.find(emp => {
      return emp.firstName === name;
    });
    return firstEmp;
  }
