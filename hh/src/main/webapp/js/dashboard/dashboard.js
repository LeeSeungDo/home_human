/*----------------------------------------------------- 공통 대쉬보드(지우지마세요) -----------------------------------------------------*/
$("#myInfo").click(function(event) {
   alert("내정보");
   window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#gongziLink").click(function(event) {
	alert("공지");
	window.location.href = serverAddr + "/html/board/gongzi.html"
});

$("#complainLink").click(function(event) {
	alert("민원");
	window.location.href = serverAddr + "/html/board/complain_l.html"
});


$(document).ready(function() {
   Kakao.init("bfb48672ff68dbf137c2daffb44adfb0");

   $("#logout").click(function(event) {
      alert("로그아웃");
      Kakao.Auth.logout(function(data) {
         if (data) { // 정상적으로 로그아웃이 되면 true가 떨어져서 처리하였습니다.
            window.location.href = serverAddr + "/html/index.html";
         }
      });
   });

   $("#getOut").click(function(event) {
      alert("탈퇴");
      Kakao.API.request({
         url : '/v1/user/unlink',
         success : function(res) {
            alert("탈퇴성공");
            kakaoOut();
            //window.location.href = serverAddr + "/html/index.html";
         }
      });
   });
   
   function kakaoOut() {
      alert("로그아웃 중...");
      Kakao.Auth.logout(function(data) {
         if (data) { // 정상적으로 로그아웃이 되면 true가 떨어져서 처리하였습니다.
            alert("로그아웃 됨!");
            window.location.href = serverAddr + "/html/index.html";
         }
      });
   }
});


/*----------------------------------------------------- 로그인 정보 불러오기 -----------------------------------------------------*/
function ajaxLoginUser() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
       if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
          window.location.href = serverAddr + "/html/index.html"
            return
       }

      $("#userName1").html(result.data.name);
      $("#userName2").html(result.data.name);
      
       var auth = result.data.auth;
       if (auth == 0) {
          $("#authLevel").html("임대인");
       } else {
          $("#authLevel").html("[임차인]");
       }
    })
}
/*----------------------------------------------------- /로그인 정보 불러오기 -----------------------------------------------------*/
/*----------------------------------------------------- /공통 대쉬보드(지우지마세요) -----------------------------------------------------*/



/*----------------------------------------------------- 이 밑으로는 지우셔도 됩니다. -----------------------------------------------------*/
/*----------------------------------------------------- 공지사항 불러오기 -----------------------------------------------------*/
function ajaxFirstList() {
   $.getJSON(serverAddr + "/board/firstlist.json", function(obj) {
      var result = obj.jsonResult
      if (result.state != "success") {
         alert("서버에서 데이터를 가져오는데 실패했습니다.")
         return
      }
      //console.log(result.data.list[0]);
      var title = result.data.list[0].title;
      var contents = result.data.list[0].contents;
      var boardNo = result.data.list[0].boardNo;
      $("#gongzi_title").html(title);
      $("#gongzi_contents").html(contents);
      
      $("#gongzi_detail").click(function(event) {
         alert("공지 디테일");
         window.location.href = serverAddr + "/html/board/gongziForm.html?no=" + boardNo;
      });
   })
}
/*----------------------------------------------------- /공지사항 불러오기 -----------------------------------------------------*/



/*----------------------------------------------------- 세입자 불러오기 -----------------------------------------------------*/
function ajaxTenantList() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
       if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
          window.location.href = serverAddr + "/html/index.html"
            return
       }

      var tenantEmail = result.data.email;
      //console.log(tenantEmail);
      
      $.getJSON(serverAddr + "/contract/tenantList.json", {email: tenantEmail}, function(obj) {
         var result = obj.jsonResult
         if (result.state != "success") {
            alert("서버에서 세입자 데이터를 가져오는데 실패했습니다.")
            return
         }
         //console.log(result);
         //alert("서버에서 세입자 데이터를 가져옴 성공!!");
         console.log(result.data.list)
         
         var template = Handlebars.compile($('#tenantList').html())       
         $("#tenantListTable").html(template(result.data))   
      })
    })
}
/*----------------------------------------------------- /세입자 불러오기 -----------------------------------------------------*/















