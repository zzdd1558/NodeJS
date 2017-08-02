/**
 * Created by parkjp on 2017-07-14.
 */
import "../styles/login.css";
import "./common.js";
import '../img/login/facebook.png';
import '../img/login/google.png';
import '../img/login/kakao.png';
import '../img/login/naver.png';

let isReirect = typeof isRedirectPage === 'undefined' ? false : isRedirectPage;

$(function () {
    $("button[button-type=social]").click(function() {
        console.log(1);
        let social = $(this).attr('id');

        location.href = `/social/${social}/login`;
    });

    if(isReirect) {
        redirect();
    }
});

function redirect () {
    let at = $("input[type=hidden]");
    let socialType = at.attr('social');
    let token = at.attr('token');
    $.post(`/api/auth/social/${socialType}/login`, {accessToken: token});
}
