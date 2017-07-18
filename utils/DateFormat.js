
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


    // 현재 년도 - this.maxYear 한만큼 select option 생성.
    setYear(){
        let checkSelect;
        for (var i = this.year; i > this.year - this.maxYear; i--) {
            if (i === this.year) {
                checkSelect = "selected='selected'";
            } else {
                checkSelect = " ";
            }
            $("select#year").append("<option " + checkSelect+" value='" + i + "'>" + i + "년</option>");
        }

    }

    // select option 에 1~12까지 세팅
    setMonth(){
        let checkSelect;
        for (let i = 1; i <= 12; i++) {
            if (i === this.month) {
                checkSelect = "selected='selected'";
            } else {
                checkSelect = " ";
            }
            $("select#month").append("<option " + checkSelect+" value='" + i + "'>" + i + "월</option>");
        }

    }

    // month가 바뀔때마다 select option 갱신.
    // 매개변수 month가 없을경우 this.month로 대체.
    setSelectDays(month = this.month){
        let days = this.getFullDays(month);
        let checkSelect;

        for (let i = 1; i <=days; i++) {
            if (i === this.date) {
                checkSelect = "selected='selected'";
            } else {
                checkSelect = " ";
            }
            $("select#date").append("<option " + checkSelect+" value='" + i + "'>" + i + "일</option>");
        }


    }
}

module.exports = DateFormat;