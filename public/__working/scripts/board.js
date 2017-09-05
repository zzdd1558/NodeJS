import "./common.js";

$(document).ready(function(){
    categoryInit();
    $("#title").focus();
    $("#category").focus(function(){
        console.log("click");

    });
});



function categoryInit(){

    $.ajax({
        type: 'POST',
        url: '/board/category/getCategory',
        dataType: 'json',
        success: function (data) {
            let select = $("#category");
            for(let i = 0; i< data.length; i++){
                $(`<option value="${data[i].category_num}">${data[i].category_name}</option>`).appendTo(select);
            }
        },
        error: function () {
            alert("실패");
        }
    });
}