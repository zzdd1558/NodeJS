/**
 * Created by parkjp on 2017-07-14.
 */
import "../styles/style.css";
import "./common.js";
import '../img/login/facebook.png';
import '../img/login/google.png';
import '../img/login/kakao.png';
import '../img/login/naver.png';

$(document).ready(function(){


    //kakao Login 부분
    Kakao.init('0e34b26f5967894741aa1e4f97e1537b');
    $("#login-btn-kakao").click(function(){
       console.log("kakao");
        loginWithKakao();
    })

    $("#login-btn-naver").click(function(){
       console.log("naver");
    })



    function loginWithKakao() {
        // 로그인 창을 띄웁니다.
        Kakao.Auth.login({
            success: function (authObj) {
                alert(JSON.stringify(authObj));
            },
            fail: function (err) {
                alert(JSON.stringify(err));
            }
        });
    };



})

