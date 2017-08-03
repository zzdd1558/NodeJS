import "../styles/style.css";
import "./common.js";

import DateFormat from '../../../utils/DateFormat';
const currentDate = new DateFormat();

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#month").change(function () {
        let month = $("#month option:selected").val();
        $("select#date > option").remove();
        setSelectDays(month);
    });

    /** form submit 부분*/

    $("form").submit(function(){

        //false면 전송 안함 true면 전송.
        return false;
    })

    /** keypress 될때마다 ajax로 아이디 검사*/
    $("#email").blur(function(){
        let email = $("#email").val();
        $('#emailSpan').remove();
        console.log(email);
        if(email.length >6){
            $.ajax({
                type : 'POST',
                url : '/signup/emailCheck',
                data : {
                    'email' : email
                },
                success : function(data){
                    if(data === 'success'){
                        $("#emailGroup").append("<p id='emailSpan'><span  class='text-success'><strong>사용 가능한 이메일 주소 입니다</strong></span></p>");
                    }else{
                        $("#emailGroup").append("<p id='emailSpan'><span id='emailSpan' class='text-danger'><strong>사용 불가능한 이메일 주소 입니다</strong></span></p>");
                    }
                },
                error : function(){
                    alert("실패");
                }
            })
        }else{
            $("#emailGroup").append("<p id='emailSpan'><span id='emailSpan' class='text-danger'><strong>사용 불가능한 이메일 주소 입니다</strong></span></p>");
        }

    });

    /** keypress 될때마다 password 와 passwordConfirm이 일치하는지 비교 */

    $("#passwordConfirm").blur(function(){
        passwordCheck();
    })

    setYear();
    setMonth();
    setSelectDays(currentDate.month);
});
function passwordCheck(){
    let password = $("#password").val();
    let passwordConfirm = $("#passwordConfirm").val();
    $("#passwordCheck").remove();
    if((password.length >=8 || passwordConfirm.length >= 8)){
        if(password != passwordConfirm ){
            $('#passwordGroup').append("<p id='passwordCheck'><span  class='text-danger'><strong>비밀번호가 일치 하지 않습니다.</strong></span></p>");
        }else {
            $('#passwordGroup').append("<p id='passwordCheck'><span  class='text-success'><strong>비밀번호가 일치 합니다.</strong></span></p>");
        }
    }else{
        $('#passwordGroup').append("<p id='passwordCheck'><span  class='text-danger'><strong>비밀번호의 길이가 짧습니다.</strong></span></p>");
    }
}

// 현재 년도 - this.maxYear 한만큼 select option 생성.
function setYear() {
    let checkSelect="";
    for (var i = currentDate.year; i > currentDate.year - 120; i--) {
        if (i === currentDate.year) {
            checkSelect = "selected='selected'";
        }
        $("select#year").append("<option " + checkSelect + " value='" + i + "'>" + i + "년</option>");
    }

}

// select option 에 1~12까지 세팅
function setMonth() {
    let checkSelect="";
    for (let i = 1; i <= 12; i++) {
        if (i === currentDate.month) {
            checkSelect = "selected='selected'";
        }
        $("select#month").append("<option " + checkSelect + " value='" + i + "'>" + i + "월</option>");
    }
}

// month가 바뀔때마다 select option 갱신.
// 매개변수 month가 없을경우 this.month로 대체.
function setSelectDays(month = currentDate.month) {
    let days = currentDate.getFullDays(month);
    let checkSelect="";

    for (let i = 1; i <= days; i++) {
        if (i === currentDate.date) {
            checkSelect = "selected='selected'";
        }
        $("select#date").append("<option " + checkSelect + " value='" + i + "'>" + i + "일</option>");
    }
}
