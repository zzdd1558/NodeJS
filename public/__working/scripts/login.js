/**
 * Created by parkjp on 2017-07-14.
 */
import "../styles/login.css";
import "./common.js";
import googleLoginApi from "./socialLoginApis/google.js";
import naverLoginApi from "./socialLoginApis/naver.js";
import '../img/login/facebook.png';
import '../img/login/google.png';
import '../img/login/kakao.png';
import '../img/login/naver.png';

const google = new googleLoginApi();
Kakao.init('0e34b26f5967894741aa1e4f97e1537b');
$(document).ready(function(){
    //kakao Login 부분

    google.handleClientLoad();
    loginWithNaver();

    $("#login_btn_kakao").click(function(){
       console.log("kakao");
       loginWithKakao();
    });

    $("#naver_id_login").click(function(){
        console.log("naver");
    });

    $("#login_btn_facebook").click(function(){
        console.log("facebook");
    });

    $("#login_btn_google").click(function(){
        console.log("google");
        google.handleSignInClick();
    });
});


function loginWithKakao() {
    Kakao.Auth.login({
        success: function(authObj) {
            // 로그인 성공시, API를 호출합니다.
            Kakao.API.request({
                url: '/v1/user/me',
                success: function(res) {
                    //로그인 회원의 이메일 , 닉네임 ,
                    console.log("1 : " + res.kaccount_email);
                    console.log("2 : " + res.properties.nickname);
                },
                fail: function(error) {
                    alert(JSON.stringify(error));
                }
            });
        },
        fail: function(err) {
            alert(JSON.stringify(err));
        }
    });

}

function loginWithFacebook(){

}

function loginWithNaver() {
    let naver_id_login = new naverLoginApi("VxgHymo8VpJl3iyxveUB", "http://localhost:3000/member");
    let state = naver_id_login.getUniqState();
    naver_id_login.response_type = "code";
    naver_id_login.setButton("green", 3, 40);
    naver_id_login.setDomain("http://localhost:3000/login");
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
}