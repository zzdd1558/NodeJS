/**
 * Created by yunjin on 2017-07-31.
 */

import $ from 'jquery';


class socialTokenSendToPost{
    postSend(social , access_token){
        $.post("http://localhost:3000/api/auth/social/"+ social + "/login",
            {
                accessToken: access_token
            },
            function (data, status) {
                alert("\nStatus: " + status);

            }
        );
    }
}



module.exports = socialTokenSendToPost;