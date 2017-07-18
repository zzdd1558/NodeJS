

$(document).ready(function(){
    //현재 년월일시간등을 가져와 toDate에 저장
    var toDate = new Date();

    // 현재 년, 월, 일을 변수에 저장한다.
    var curYear = toDate.getFullYear();
    var curMonth = toDate.getMonth() + 1;
    var curDate = toDate.getDate();

    //true면 평년 false 면 윤년
    var check = true;

    //최대 120년 차이까지 option 추가
    var minYear = 120;

    //현재 년, 월, 일과 비교하여 같다면 option태그에 selected='selected'추가
    // selected란 처음에 값을 정해주는기능과 같다.

    var checkSelect;

    //페이지 로딩되었을때 minYear만큼 년도 option 생성
    for (var i = curYear; i > curYear - minYear; i--) {
        if (i === curYear) {
            checkSelect = "selected='selected'";
        } else {
            checkSelect = " ";
        }
        $("select#year").append("<option " + checkSelect+" value='" + i + "'>" + i + "년</option>");
    }

    //페이지 로딩되었을때 1~12월만큼 월 option 생성
    checkSelect = " ";
    for (var i = 1; i <= 12; i++) {
        if (i === curMonth) {
            checkSelect = "selected='selected'";
        } else {
            checkSelect = " ";
        }
        $("select#month").append("<option " + checkSelect+" value='" + i + "'>" + i + "월</option>");
    }

    // 페이지 로딩되었을때 년, 월에 따른 일수 표시 ,
    var days;
    switch (curMonth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            days = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            days = 30;
            break;
        case 2:
            // 윤년, 평년 계산
            // 4로 나누었을때 나머지가 0인 년도는 윤년
            // 4로 나누어지고 나머지가 0이지만 100으로 나누었을때도 나머지가 0이면 평년
            // 400으로 나누어 떨어지는 해는 무조건 윤년.
            // 윤년이면 29일 평년이면 28이 된다.

            //윤년인지 아닌지 계산하는식
            if (curYear % 4 === 0 && curYear % 100 !== 0 || curYear % 400 === 0) {//윤년인 경우
                check = false;
            } else { //평년인 경우
                check = true;
            }

            if (check) {
                days = 28;
            } else {
                days = 29;
            }
    }

    checkSelect = " ";

    for (var i = 1; i <=days; i++) {
        if (i === curDate) {
            checkSelect = "selected='selected'";
        } else {
            checkSelect = " ";
        }
        $("select#date").append("<option " + checkSelect+" value='" + i + "'>" + i + "일</option>");
    }

    checkSelect = " ";

})