/**
 * Created by yunjin on 2017-07-20.
 */

class GoogleLoginApi {
    startApp() {

        gapi.load('auth2', function () {
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
        auth2.attachClickHandler(element, {},
            function onSuccess(googleUser) {
                postSend('google',googleUser.getAuthResponse().access_token);

            }, function (error) {
                alert(JSON.stringify(error, undefined, 2));
            }
        );
    }
}


module.exports = GoogleLoginApi;