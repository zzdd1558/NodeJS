/**
 * Created by yunjin on 2017-07-31.
 */
import "../styles/login.css";
import "./common.js";
import naverLoginApi from "./socialLoginApis/naver.js";

$(document).ready(function(){
    naverTest();
});

function naverTest() {
    let naver_id_login = new naverLoginApi("VxgHymo8VpJl3iyxveUB", "http://localhost:3000/social/naver/auth");
    console.log(naver_id_login);

    console.log(naver_id_login.getAccessToken());
}
