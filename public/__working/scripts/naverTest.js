/**
 * Created by yunjin on 2017-07-31.
 */
import "../styles/login.css";
import "./common.js";
import naverLoginApi from "./socialLoginApis/naver.js";

let naver_id_login;
naverTest();
$(document).ready(function(){
    alert("Abc");
});

function naverTest() {
    //code와 state의 리다이렉트 경로
    naver_id_login = new naverLoginApi("VxgHymo8VpJl3iyxveUB", "http://localhost:3000/naverToken");
    console.log("왜 안나올까 " + naver_id_login.getOauthStatus());
}
