
const monthsOf30DaysArray = [4, 6, 9, 11];

class DateFormat {

    constructor() {
        this.DateObject = new Date();
        this.year = this.DateObject.getFullYear();
        this.month = this.DateObject.getMonth() + 1;
        this.date = this.DateObject.getDate();
    }

    isLeapYear() {
        return this.year % 4 === 0 && this.year % 100 !== 0 || this.year % 400 === 0;
    }

    getFullDays(month = this.month) {
        if(month == 2) {
            if(this.isLeapYear())
                return 29;
            return 28;
        }

        if(monthsOf30DaysArray.includes(month)) {
            return 30;
        } else {
            return 31;
        }
    }
}

module.exports = DateFormat;