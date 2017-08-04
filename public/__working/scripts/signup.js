import "../styles/style.css";
import "./common.js";

import DateFormat from '../../../utils/DateFormat';
import InputValidator from '../../../utils/InputValidator';

const currentDate = new DateFormat();

/** 중복 email인지 확인 여부*/
let booleanEmailCheck = false;


$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#month").change(function () {
        let month = $("#month option:selected").val();
        $("select#date > option").remove();
        setSelectDays(month);
    });

    /** form submit 부분*/

    $("#userForm").submit(function () {

        let email = $("#email");
        let password = $("#password");

        let emailValue = email.val();
        let passwordValue = password.val();
        let validatorCheck = false;

        /** 이메일 정규식 확인 */
        let emailRegResult = InputValidator.isValidEmail(emailValue);

        /** 비밀번호 정규식 확인 */
        let passwordRegResult = InputValidator.isValidPassword(passwordValue)

        if(!emailRegResult || !booleanEmailCheck){
            email.focus();
        }else if (!passwordRegResult){
            password.focus();
        }else if( emailRegResult && passwordRegResult && booleanEmailCheck){
            validatorCheck = true;
        }
        //코드 부분에 에러가 있다면 false라도 전송이된다.
        return validatorCheck;
    })

    /** blur 될때마다 ajax로 아이디 검사*/
    $("#email").blur(function () {
        emailCheck1();
    });

    /** passwordConfirm이 blur 될때마다 password 와 passwordConfirm이 일치하는지 비교 */
    $("#passwordConfirm").blur(function () {
        passwordCheck();
    });

    setYear();
    setMonth();
    setSelectDays(currentDate.month);
});

/** 이메일 check*/
function emailCheck1() {
    $('#emailSpan').remove();
    let email = $("#email").val();
    if (InputValidator.isValidEmail(email)) {
        $.ajax({
            type: 'POST',
            url: './emailCheck',
            data: {
                'email': email
            },
            success: function (data) {
                if (data === 'success') {
                    $("#emailGroup").append("<p id='emailSpan'><span  class='text-success'><strong>사용 가능한 이메일 주소 입니다.</strong></span></p>");
                    booleanEmailCheck = true;
                } else {
                    $("#emailGroup").append("<p id='emailSpan'><span id='emailSpan' class='text-danger'><strong>존재하는 이메일 주소 입니다.</strong></span></p>");
                }
            },
            error: function () {
                alert("실패");
            }
        })
    } else {
        $("#emailGroup").append("<p id='emailSpan'><span id='emailSpan' class='text-danger'><strong>사용 불가능한 이메일 주소 입니다.</strong></span></p>");
    }
}

/** 비밀번호 check*/
function passwordCheck() {
    $("#passwordCheck").remove();
    let password = $("#password").val();
    let passwordConfirm = $("#passwordConfirm").val();
    if ((InputValidator.isValidPassword(password) || InputValidator.isValidPassword(passwordConfirm))){
        if (password != passwordConfirm) {
            $('#passwordGroup').append("<p id='passwordCheck'><span  class='text-danger'><strong>비밀번호가 일치 하지 않습니다.</strong></span></p>");
        } else {
            $('#passwordGroup').append("<p id='passwordCheck'><span  class='text-success'><strong>비밀번호가 일치 합니다.</strong></span></p>");
        }
    } else {
        $('#passwordGroup').append("<p id='passwordCheck'><span  class='text-danger'><strong>영문자,숫자,특수문자로 이루어진 8~16자.</strong></span></p>");
    }
}

// 현재 년도 - this.maxYear 한만큼 select option 생성.
function setYear() {
    for (var i = currentDate.year; i > currentDate.year - 120; i--) {
        let checkSelect = "";
        if (i === currentDate.year) {
            checkSelect = "selected='selected'";
        }
        $("select#year").append("<option " + checkSelect + " value='" + i + "'>" + i + "년</option>");
    }
}

// select option 에 1~12까지 세팅
function setMonth() {
    let ii;
    for (let i = 1; i <= 12; i++) {
        let checkSelect = "";
        if (i === currentDate.month) {
            console.log(`같다 ${currentDate.month}`);
            checkSelect = "selected='selected'";
        }
        if(i <10 ){
           ii = "0"+i;
        }else{
            ii=i;
        }
        $("select#month").append("<option " + checkSelect + " value='" + ii + "'>" + i + "월</option>");
    }

}

// month가 바뀔때마다 select option 갱신.
// 매개변수 month가 없을경우 this.month로 대체.
function setSelectDays(month = currentDate.month) {
    let days = currentDate.getFullDays(month);
    let ii;
    for (let i = 1; i <= days; i++) {
        let checkSelect = "";
        if (i === currentDate.date) {
            checkSelect = "selected='selected'";
        }
        if(i <10 ){
            ii = "0"+i;
        }else{
            ii=i;
        }
        $("select#date").append("<option " + checkSelect + " value='" + i + "'>" + i + "일</option>");
    }
}
