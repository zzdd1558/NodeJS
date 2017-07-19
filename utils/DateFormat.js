
const monthsOf30DaysArray = [4, 6, 9, 11];

class DateFormat {

    //생성자
    constructor() {
        this.DateObject = new Date();
        this.year = this.DateObject.getFullYear();
        this.month = this.DateObject.getMonth() + 1;
        this.date = this.DateObject.getDate();
        this.maxYear = 120;
    }

    //윤년 계산 true / false.
    isLeapYear() {
        return this.year % 4 === 0 && this.year % 100 !== 0 || this.year % 400 === 0;
    }

    // 2월에 대한 윤년 및 월별 요일 받아오기.
    getFullDays(month = this.month) {
        if(month == 2) {
            if(this.isLeapYear())
                return 29;
            return 28;
        }
        if(monthsOf30DaysArray.includes(Number(month))) {
            return 30;
        } else {
            return 31;
        }
    }



}

module.exports = DateFormat;