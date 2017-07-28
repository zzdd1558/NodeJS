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

let naver_id_login;
$(document).ready(function () {
    console.log(window.location.href);
    Kakao.init('0e34b26f5967894741aa1e4f97e1537b');
    loginWithNaver();
    //kakao Login 부분
    google.startApp();


    $("#login_btn_kakao").click(function () {
        console.log("kakao");
        loginWithKakao();

    });

    $("#naver_id_login").click(function () {
        console.log("naver");
    });

    $("#login_btn_facebook").click(function () {
        console.log("facebook");
        loginWithFacebook();
    });

    $("#login_btn_google").click(function () {

        console.log("google");
        // google.handleSignInClick();
    });
});


function loginWithKakao() {
    Kakao.Auth.login({
        success: function (authObj) {
            // 로그인 성공시, API를 호출합니다.
            //token 정보
            console.log("kakao : " + authObj.access_token);

            $.post("http://localhost:3000/api/auth/social/kakao/login",
                {
                    accessToken: authObj.access_token
                },
                function (data, status) {
                    alert("\nStatus: " + status);

                }
            );

            /*Kakao.API.request({
             url: '/v1/user/me',
             success: function (res) {
             //로그인 회원의 이메일 , 닉네임 ,
             console.log("1 : " + res.kaccount_email);
             console.log("2 : " + res.properties.nickname);
             },
             fail: function (error) {
             alert(JSON.stringify(error));
             }
             });*/
        },
        fail: function (err) {
            alert(JSON.stringify(err));
        }

    });
}


function loginWithNaver() {
    naver_id_login = new naverLoginApi("VxgHymo8VpJl3iyxveUB", "http://localhost:3000/login");
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
            let access_token = response.authResponse.accessToken; //get access token
            // let user_id = response.authResponse.userID; //get FB UID

            //Facebook Login User access_token
            // console.log('Facebook access_token = ' + access_token);

            //Facebook Login User user_id
            // console.log('Facebook user_id = ' + user_id);
            $.post("http://localhost:3000/api/auth/social/facebook/login",
                {
                    accessToken: access_token
                },
                function (data, status) {
                    alert("\nStatus: " + status);

                }
            );
        }
    }, {
        scope: 'email,public_profile,user_birthday',
        return_scopes: true
    });
}


function getUserData() {
    FB.api('/me', {fields: 'name,email,gender,birthday'}, function (response) {

        //페이스북 User에 대한 정보를 받아서 출력
        console.log("Facebook UserDate : " + JSON.stringify(response));

    });
}
