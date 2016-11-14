/*----------------------------------------------------- 공통 대쉬보드(지우지마세요) -----------------------------------------------------*/
$("#dashboardLink").click(function(event) {
	alert("메인");
	window.location.href = serverAddr + "/html/dashboard/dashboard_t.html"
});

$("#myInfo").click(function(event) {
   alert("내정보");
   window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#gongziLink").click(function(event) {
	alert("공지");
	window.location.href = serverAddr + "/html/board/gongzi_t.html"
});

$("#complainLink").click(function(event) {
	alert("민원");
	window.location.href = serverAddr + "/html/board/complain_t.html"
});

$("#myinfoLink").click(function(event) {
	alert("내정보");
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

// 카카오 준비
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
      //console.log(result.data.phoPath);
      $("#userName1").html(result.data.name);
      $("#userName2").html(result.data.name);
      $("#authLevel").html("임대인");
      
      if (result.data.phoPath != null && result.data.phoPath != "") {
    	  $('#myPhoto1').attr('src', '../../upload/' + result.data.phoPath);
    	  $('#myPhoto2').attr('src', '../../upload/' + result.data.phoPath);
      } else {
    	  $('#myPhoto1').attr('src', '../../images/user_default.png');
    	  $('#myPhoto2').attr('src', '../../images/user_default.png');
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



/*----------------------------------------------------- 미처리 민원 불러오기 -----------------------------------------------------*/

var pageNo = 1, /* window.pageNo */
pageLength = 6; /* window.pageLength */


function ajaxComplainListRsvd1_t() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		var userEmail = obj.member.email
		console.log(userEmail);
		
	$.getJSON(serverAddr + "/complain/list5.json", {
		"pageNo": pageNo,
		"length": pageLength,
		"email" : userEmail
	}, function(obj) {
		var result = obj.jsonResult;
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		// console.log("서버에서 데이터를 잘 가져옵니다.");
		// console.log("핸들바스를 시작합니다.");
		var rsvd = result.data.list[0].rsvd;
		//console.log(rsvd);
		
		var template = Handlebars.compile($('#complaintList').html())       
        $("#complaintListTable").html(template(result.data))  
	    
	    //console.log("핸들바스가 끝났습니다.");
	    
	  	
	      $(document).on('click','#updateBtn1',function(event){
		    window.location.href = serverAddr + 
		    "/html/board/complainUpdate_t.html?no=" + 
		    $(this).attr("data-no1") + "&rsvd=" + rsvd;
	    })
	    // 현재 페이지 번호를 span 태그에 출력한다.
	    pageNo = result.data.pageNo;
	    totalPage = result.data.totalPage;
	    $('#pageNo').text(pageNo);
	    
	    // 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
	    if (pageNo <= 1) {
	    	$('#prevBtn').attr('disabled', true);
	    } else {
	    	$('#prevBtn').removeAttr('disabled');
	    } 
	    
	    // 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
	    if (pageNo >= totalPage) {
	    	$('#nextBtn').attr('disabled', true);
	    } else {
	    	$('#nextBtn').removeAttr('disabled');
	    }
})
	})
}

/*----------------------------------------------------- /미처리 민원 불러오기 -----------------------------------------------------*/











