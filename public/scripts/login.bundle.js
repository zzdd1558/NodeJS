webpackJsonp([0],[,,function(module,exports,__webpack_require__){"use strict";(function($){var BUTTON_TYPE=1,BANNER_SMALL_TYPE=2,BANNER_BIG_TYPE=3,BUTTON_COLOR_WHITE="white",BUTTON_COLOR_GREEN="green",color="",naver_id_login=function naver_id_login(client_id,redirect_uri){this.button_color=BUTTON_COLOR_GREEN,this.button_type=BUTTON_TYPE,this.button_height=40,this.nil_domain="",this.response_type="token",this.authorize_url="https://nid.naver.com/oauth2.0/authorize",this.state="",this.scope="",this.client_id=client_id,this.redirect_uri=redirect_uri,this.cookie_name="nil_state",this.popup=!1,this.oauthParams={},this.profileParams={},this.is_callback=!1,this.callback_status="",this.callback_message="",this.setPopup=function(){this.popup=!0},this.setState=function(t){this.state=void 0!==t&&""!=t?t:""},this.setDomain=function(t){this.nil_domain=void 0!==t&&""!=t?t:""},this.setButton=function(t,e,i){this.button_color=void 0!==t&&""!=t?t:BUTTON_COLOR_GREEN,this.button_type=void 0!==e&&""!=e?e:BUTTON_TYPE,this.button_height=void 0!==i&&""!=i?i:40},this.getUniqState=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})},this.getLocalStorageItemSafely=function(){try{var t=localStorage.getItem(this.cookie_name);return null==t||0==t.length?t:t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}catch(t){return null}},this.setStateStore=function(){try{if(""!=this.nil_domain?document.cookie=this.cookie_name+"=; path=/; domain="+this.nil_domain+"; expires=Thu, 01 Jan 1970 00:00:00 UTC;":document.cookie=this.cookie_name+"=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC",localStorage.setItem("nil_state",this.state),""!=this.nil_domain){var t=new Date,e=new Date(t.getTime()+3e5),i=this.cookie_name+"="+escape(this.state)+"; expires="+e.toGMTString()+"; domain="+this.nil_domain+";path=/;";document.cookie=i}}catch(n){var t=new Date,e=new Date(t.getTime()+3e5),i=this.cookie_name+"="+escape(this.state)+"; expires="+e.toGMTString()+";path=/;";document.cookie=i}},this.getNaverIdLoginLink=function(){if(this.is_callback?this.state=this.oauthParams.state:this.setStateStore(),void 0==this.client_id||"등록한 ClientID 값"==this.client_id||this.client_id.length<5)return alert("등록한 ClientID 값을 입력해 주세요."),!1;if(void 0==this.redirect_uri||"등록한 Callback URL 값"==this.redirect_uri||this.redirect_uri.length<5)return alert("등록한 Callback URL 값을 입력해 주세요."),!1;var t=this.authorize_url+"?response_type="+this.response_type+"&client_id="+this.client_id+"&redirect_uri="+encodeURIComponent(this.redirect_uri)+"&state="+encodeURIComponent(this.state);return""!=this.scope&&(t=t+"&scope="+encodeURIComponent(this.scope)),t},this.init_naver_id_login=function(){var t=document.getElementById("naver_id_login");if(void 0==t)return alert("id 가 naver_id_login 인 div tag 가 존재해야 합니다."),!1;color="green"==this.button_color?"g":"w",t.innerHTML="";var e="",i=this.getNaverIdLoginLink();void 0!=this.state&&""!=this.state||(this.state=this.getUniqState());var n="";this.popup?n=" onClick=\"window.open(this.href, 'naverloginpop', 'titlebar=1, resizable=1, scrollbars=yes, width=600, height=550'); return false\" ":e="<a href='"+i+"' "+n+" id='naver_id_login_anchor'><img src='../img/naver.png' border='0' title='네이버 아이디로 로그인'></a> ",t.innerHTML=e,this.is_callback&&this.init_naver_id_login_callback()},this.checkStateStore=function(t){if(void 0!=this.state||""==this.state?state=this.getLocalStorageItemSafely():state=this.state,null!=state&&state.length>10){if(state==t){try{localStorage.removeItem(this.cookie_name)}catch(t){}return!0}try{localStorage.removeItem(this.cookie_name)}catch(t){}return!1}return void 0!=this.state||""==this.state?state=this.getCookie():state=this.state,null!=state&&state.length>10&&(state==t?(""!=this.nil_domain?document.cookie=this.cookie_name+"=; path=/; domain="+this.nil_domain+"; expires=Thu, 01 Jan 1970 00:00:00 UTC;":document.cookie=this.cookie_name+"=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC",!0):(""!=this.nil_domain?document.cookie=this.cookie_name+"=; path=/; domain="+this.nil_domain+"; expires=Thu, 01 Jan 1970 00:00:00 UTC;":document.cookie=this.cookie_name+"=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC",!1))},this.getCookie=function(){for(var t="nil_state=",e=t.length,i=document.cookie.length,n=0;n<i;){var o=n+e;if(document.cookie.substring(n,o)==t){var a=document.cookie.indexOf(";",o);return-1==a&&(a=document.cookie.length),unescape(document.cookie.substring(o,a))}if(0==(n=document.cookie.indexOf(" ",n)+1))break}return null},this.parseCallBack=function(){for(var t,e={},i=(document.location+"").substring(1),n=/([^#?&=]+)=([^&]*)/g;null!==(t=n.exec(i));)e[decodeURIComponent(t[1])]=decodeURIComponent(t[2]);this.oauthParams=e},this.parseCallBack_check=function(){this.parseCallBack(),void 0!=this.oauthParams.access_token?this.is_callback=!0:this.is_callback=!1},this.init_naver_id_login_callback=function(){this.parseCallBack_check(),this.is_callback&&(void 0==this.oauthParams.error?void 0!=this.oauthParams.access_token&&(this.checkStateStore(this.oauthParams.state)?(this.callback_status="success",this.callback_message="state check success"):this.state==this.oauthParams.state?(this.callback_status="success",this.callback_message="state check success"):(alert("state 값이 맞이 않습니다."),this.callback_status="warning",this.callback_message="state miss match")):(this.callback_status="fail",this.callback_message="invalid access"))},this.parseCallBack_check(),this.get_naver_userprofile=function(callback_func1){$.ajax({url:"https://openapi.naver.com/v1/nid/getUserProfile.json?response_type=json",type:"GET",data:{access_token:this.oauthParams.access_token},dataType:"jsonp",jsonp:"oauth_callback",success:function success(result){inner_profileParams.age=result.response.age,inner_profileParams.birthday=result.response.birthday,inner_profileParams.email=result.response.email,inner_profileParams.enc_id=result.response.enc_id,inner_profileParams.gender=result.response.gender,inner_profileParams.id=result.response.id,inner_profileParams.nickname=result.response.nickname,inner_profileParams.profile_image=result.response.profile_image,eval(callback_func1)},error:function(t,e,i){alert(t.status),alert(i)}})},this.getProfileData=function(t){return inner_profileParams[t]},this.getOauthMessage=function(){return this.callback_message},this.getOauthStatus=function(){return this.callback_status},this.getAccessToken=function(){return this.oauthParams.access_token}},inner_profileParams={};module.exports=naver_id_login}).call(exports,__webpack_require__(0))},function(t,e){},,,function(t,e,i){"use strict";window.fbAsyncInit=function(){FB.init({appId:"1885966198315995",xfbml:!0,version:"v2.10"}),FB.AppEvents.logPageView()},function(t,e,i){var n,o=t.getElementsByTagName(e)[0];t.getElementById(i)||(n=t.createElement(e),n.id=i,n.src="//connect.facebook.net/en_US/sdk.js",o.parentNode.insertBefore(n,o))}(document,"script","facebook-jssdk")},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),a=function(){function t(){n(this,t)}return o(t,[{key:"startApp",value:function(){gapi.load("auth2",function(){var e=gapi.auth2.init({client_id:"393277494210-pefadhtq8di5fqcfooo6hghp60fvjfeu.apps.googleusercontent.com",cookiepolicy:"single_host_origin"});t.attachSignin(document.getElementById("login_btn_google"),e)})}}],[{key:"attachSignin",value:function(t,e){console.log(t.id),console.log(e),e.attachClickHandler(t,{},function(t){t.getBasicProfile();postSend("google",t.getAuthResponse().access_token)},function(t){alert(JSON.stringify(t,void 0,2))})}}]),t}();t.exports=a},,,,function(t,e,i){t.exports=i.p+"../img/facebook.png"},function(t,e,i){t.exports=i.p+"../img/google.png"},function(t,e,i){t.exports=i.p+"../img/kakao.png"},function(t,e,i){t.exports=i.p+"../img/naver.png"},,,,,,,,,,,,,,,function(t,e,i){"use strict";(function(t){function e(t){return t&&t.__esModule?t:{default:t}}function n(){Kakao.Auth.login({success:function(t){console.log("success kakao : "+t.access_token),s("kakao",t.access_token)},fail:function(t){alert(JSON.stringify(t))}})}function o(){_=new u.default("VxgHymo8VpJl3iyxveUB","http://localhost:3000/naverToken");var t=_.getUniqState();_.response_type="code",_.setButton("green",3,40),_.setDomain("http://localhost:3000/login"),_.setState(t),_.init_naver_id_login()}function a(){FB.login(function(t){if(t.authResponse){s("facebook",t.authResponse.accessToken)}},{scope:"email,public_profile,user_birthday",return_scopes:!0})}function s(e,i){t.post("/api/auth/social/"+e+"/login",{accessToken:i},function(t,e){alert("\nStatus: "+e)})}i(3),i(1);var c=i(7),r=e(c),l=i(2),u=e(l);i(6),i(11),i(12),i(13),i(14);var h=new r.default,_=void 0;t(document).ready(function(){Kakao.init("0e34b26f5967894741aa1e4f97e1537b"),o(),h.startApp(),t("#login_btn_kakao").click(function(){console.log("kakao"),n()}),t("#naver_id_login").click(function(){console.log("naver")}),t("#login_btn_facebook").click(function(){console.log("facebook"),a()}),t("#login_btn_google").click(function(){console.log("google")})})}).call(e,i(0))}],[29]);