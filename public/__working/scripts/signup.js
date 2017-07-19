import "../styles/style.css";
import "./common.js";
import DateFormat from '../../../utils/DateFormat';
const currentDate = new DateFormat();

$(document).ready(function () {
    $("#month").change(function () {
        let month = $("#month option:selected").val();
        $("select#date > option").remove();
        setSelectDays(month);
    })

    setYear();
    setMonth();
    setSelectDays(currentDate.month);

// 현재 년도 - this.maxYear 한만큼 select option 생성.
    function setYear() {
        let checkSelect;
        for (var i = currentDate.year; i > currentDate.year - 120; i--) {
            if (i === currentDate.year) {
                checkSelect = "selected='selected'";
            } else {
                checkSelect = " ";
            }
            $("select#year").append("<option " + checkSelect + " value='" + i + "'>" + i + "년</option>");
        }

    }

// select option 에 1~12까지 세팅
    function setMonth() {
        let checkSelect;
        for (let i = 1; i <= 12; i++) {
            if (i === currentDate.month) {
                checkSelect = "selected='selected'";
            } else {
                checkSelect = " ";
            }
            $("select#month").append("<option " + checkSelect + " value='" + i + "'>" + i + "월</option>");
        }

    }

// month가 바뀔때마다 select option 갱신.
// 매개변수 month가 없을경우 this.month로 대체.
    function setSelectDays(month = currentDate.month) {
        let days = currentDate.getFullDays(month);
        let checkSelect;

        for (let i = 1; i <= days; i++) {
            if (i === currentDate.date) {
                checkSelect = "selected='selected'";
            } else {
                checkSelect = " ";
            }
            $("select#date").append("<option " + checkSelect + " value='" + i + "'>" + i + "일</option>");
        }


    }
})