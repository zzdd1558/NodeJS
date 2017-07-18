import DateFormat from '../../../utils/DateFormat';

const curDate = new DateFormat();  //TODO : 이걸 사용해보세요

$(document).ready(function(){
    curDate.setYear();
    curDate.setMonth();
    curDate.setSelectDays(curDate);


    $("#month").change(function(){
        let month = $("#month option:selected").val();
        $("select#date > option").remove();
        curDate.setSelectDays(month);
    })
})