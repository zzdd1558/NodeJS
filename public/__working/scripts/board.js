import "./common.js";

$(document).ready(function(){
    categoryInit();
    $("#title").focus();
    $("#category").focus(function(){
        console.log("click");
    });

    $("#submit").click(function(){
        let check = true;

        if($("#category").val() == "0"){
            alert('카테고리를 설정해 주세요');
            check= false;
        }

        return check;
    })
});

function categoryInit(){
    $.ajax({
        type: 'POST',
        url: '/board/category/getCategory',
        dataType: 'json',
        success: function (data) {
            let select = $("#category");
            for(let i = 0; i< data.length; i++){
                console.log(data[i].category_num + " : " + data[i].category_name);
                $(`<option value=${data[i].category_num} > ${data[i].category_name} </option>`).appendTo(select);
            }
        },
        error: function () {
            alert("실패");
        }
    });
}