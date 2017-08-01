/**
 * Created by parkjp on 2017-07-14.
 */
import "../styles/login.css";
import "./common.js";
import googleLoginApi from "./socialLoginApis/google.js";
import naverLoginApi from "./socialLoginApis/naver.js";
import "./socialLoginApis/facebook.js";
import '../img/login/facebook.png';
import '../img/login/google.png';
import '../img/login/kakao.png';
import '../img/login/naver.png';

const google = new googleLoginApi();

$(function () {
    Kakao.init('0e34b26f5967894741aa1e4f97e1537b');
    loginWithNaver();
    google.startApp();

    $("#login_btn_kakao").click(function () {
        loginWithKakao();
    });

    $("#login_btn_facebook").click(function () {
        loginWithFacebook();
    });
});

function loginWithKakao() {
    Kakao.Auth.login({
        success: function (authObj) {
            postSend("kakao",authObj.access_token);
        },
        fail: function (err) {
            alert(JSON.stringify(err));
        }
    });
}

function loginWithNaver() {
    let naver_id_login = new naverLoginApi("VxgHymo8VpJl3iyxveUB", "http://localhost:3000/naver/login/redirect");
    let state = naver_id_login.getUniqState();
    naver_id_login.response_type = "code";
    naver_id_login.setButton("green", 3, 40);
    naver_id_login.setDomain("http://localhost:3000/login");
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
}

function loginWithFacebook() {
    FB.login(function (response) {
        if (response.authResponse) {
            let access_token = response.authResponse.accessToken;

            postSend("facebook" , access_token);
        }
    }, {
        scope: 'email,public_profile,user_birthday',
        return_scopes: true
    });
}

function postSend( social , access_token){
    $.post(`/api/auth/social/${social}/login`,
        {
            accessToken: access_token
        },
        function (data, status) {
            alert("\nStatus: " + status);

        }
    );
}
