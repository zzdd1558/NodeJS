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
    //code와 state의 리다이렉트 경로
    let naver_id_login = new naverLoginApi("VxgHymo8VpJl3iyxveUB", "http://localhost:3000/naver/login/redirect");
    console.log(naver_id_login);
    console.log("왜 안나올까 " + naver_id_login.getAccessToken());
}
