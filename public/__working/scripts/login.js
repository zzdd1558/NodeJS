/**
 * Created by parkjp on 2017-07-14.
 */
import "../styles/login.css";
import "./common.js";
import naverLoginApi from "./socialLoginApis/naver.js";
import "./socialLoginApis/facebook.js";
import '../img/login/facebook.png';
import '../img/login/google.png';
import '../img/login/kakao.png';
import '../img/login/naver.png';

const naver_client_id = "VxgHymo8VpJl3iyxveUB";
const naver_redirect_url = encodeURI("http://localhost:3000/social/naver/auth");

$(function () {
    initKakao();
    initNaver();
    initGoogle();

    $("#login_btn_kakao").click(function () {
        kakaoLogin();
    });

    $("#login_btn_facebook").click(function () {
        facebookLogin();
    });
});

function kakaoLogin() {
    Kakao.Auth.login({
        success: function (authObj) {
            sendPostSocialApi("kakao",authObj.access_token);
        },
        fail: function (err) {
            alert(JSON.stringify(err));
        }
    });
}

function facebookLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            let accessToken = response.authResponse.accessToken;

            sendPostSocialApi("facebook" , accessToken);
        }
    }, {
        scope: 'email,public_profile,user_birthday',
        return_scopes: true
    });
}

function googleLogin(element, auth2) {
    auth2.attachClickHandler(element, {}, function (googleUser) {
        let accessToken = googleUser.getAuthResponse().access_token;

        sendPostSocialApi('google', accessToken);
    }, function (error) {
        console.log(error);
    });
}

function initNaver() {
    let naver_id_login = new naverLoginApi(naver_client_id, naver_redirect_url);
    let state = naver_id_login.getUniqState();
    naver_id_login.response_type = "token";
    naver_id_login.setButton("green", 3, 40);
    naver_id_login.setDomain("http://localhost:3000/login");
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
}

function initGoogle() {
    gapi.load('auth2', function () {
        let auth2 = gapi.auth2.init({
            client_id: '393277494210-pefadhtq8di5fqcfooo6hghp60fvjfeu.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        googleLogin(document.getElementById('login_btn_google'), auth2);
    });
}

function initKakao() {
    Kakao.init('0e34b26f5967894741aa1e4f97e1537b');
}

function sendPostSocialApi(social, accessToken){
    console.log(`AccessToken : ${accessToken}`);
    $.post(`/api/auth/social/${social}/login`, {accessToken: accessToken}, (data, status) => {
        console.log(status);
    });
}
