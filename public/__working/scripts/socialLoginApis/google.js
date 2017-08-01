/**
 * Created by yunjin on 2017-07-20.
 */

class GoogleLoginApi {
    startApp() {

        gapi.load('auth2', function () {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            let auth2 = gapi.auth2.init({
                client_id: '393277494210-pefadhtq8di5fqcfooo6hghp60fvjfeu.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
            GoogleLoginApi.attachSignin(document.getElementById('login_btn_google'), auth2);
        });
    };

    static attachSignin(element, auth2) {
        console.log(element.id);
        console.log(auth2);
        auth2.attachClickHandler(element, {},
            function onSuccess(googleUser) {
                var profile = googleUser.getBasicProfile();

                postSend('google',googleUser.getAuthResponse().access_token);
                /*//사용자에 대한 고유 ID 출력
                 console.log("ID: " + profile.getId());

                 //사용자의 '풀네임'을 출력
                 console.log('Full Name: ' + profile.getName());

                 //사용자의 '이름' 출력
                 console.log('Given Name: ' + profile.getGivenName());

                 //사용자의 '성' 출력
                 console.log('Family Name: ' + profile.getFamilyName());

                 //사용자의 이미지 URL 주소 출력
                 console.log("Image URL: " + profile.getImageUrl());

                 //사용자의 google 계정 Email을 출력
                 console.log("Email: " + profile.getEmail());*/

            }, function (error) {
                alert(JSON.stringify(error, undefined, 2));
            }
        );
    }
}


module.exports = GoogleLoginApi;