/*------------------------------------------- 공통 대쉬보드(꼭 확인하세요!!!!!) ----------------------------------*/
/* [ 대쉬보드 JS 사용법 ]
 * <link rel="stylesheet" type="text/css" href="../../css/dashboard/sseung.css" /> 를 html 에 붙이세요.
 * dashboard.js 에서 [ 공통 대쉬보드 ] 부분을 복사해서 붙여넣어 주세요.
 * 되도록이면 [ 공통 대쉬보드 ] 부분을 수정하지 말아주세요.
 * [ 공통 대쉬보드 ] 부분에 수정 발생시 따로 공지하겠습니다.
 * 감사합니다. 				- 이승도 -
 */
$("#dashboardLink").click(function(event) {
	alert("메인");
	window.location.href = serverAddr + "/html/dashboard/dashboard.html"
});

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
      //console.log(result.data);
      $("#userName1").html(result.data.name);
      $("#userName2").html(result.data.name);
      $("#authLevel").html("임대인");
      
      //console.log($.isNumeric(result.data.email));
      
      if($.isNumeric(result.data.email)) {
    	  if (result.data.phoPath != null && result.data.phoPath != "") {
        	  $('#myPhoto1').attr('src', result.data.phoPath);
        	  $('#myPhoto2').attr('src', result.data.phoPath);
          } else {
        	  $('#myPhoto1').attr('src', '../../images/user_default.png');
        	  $('#myPhoto2').attr('src', '../../images/user_default.png');
          }
      } else {
    	  if (result.data.phoPath != null && result.data.phoPath != "") {
        	  $('#myPhoto1').attr('src', '../../upload/' + result.data.phoPath);
        	  $('#myPhoto2').attr('src', '../../upload/' + result.data.phoPath);
          } else {
        	  $('#myPhoto1').attr('src', '../../images/user_default.png');
        	  $('#myPhoto2').attr('src', '../../images/user_default.png');
          }
      }
    })
}
/*----------------------------------------------------- /로그인 정보 불러오기 -----------------------------------------------------*/
/*----------------------------------------------------- /공통 대쉬보드(지우지마세요) -----------------------------------------------------*/


$(function () { 
    $(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "darkred");
        $(".tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
});

$(document).on('click','#updateBtn1',function(event){
	var complain = {
			no: $(".card1").attr("data-val1"),
			title: $("#title1").text(),
			contents: $("#complain_conts1").text(),
	        rsvd: $("#rsvd1").is(":checked") ? 1 : 0
	        }
	
	        if (confirm("정말 변경하시겠습니까?") == true) {
	           ajaxUpdateComplain(complain)
	           } else {
	              alert("변경 실패")
	              return;
	           }
	   });

$(document).on('click','#updateBtn0',function(event){
	var complain = {
			no: $(".card0").attr("data-val0"),
			title: $("#title0").text(),
			contents: $("#complain_conts0").text(),
	        rsvd: $("#rsvd1").is(":checked") ? 1 : 0
	        }
	
	        if (confirm("정말 변경하시겠습니까?") == true) {
	           ajaxUpdateComplain(complain)
	           } else {
	              alert("변경 실패")
	              return;
	           }
	   });




//글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
    pageLength = 6; /* window.pageLength */


function ajaxComplainListRsvd1() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
      //console.log(obj.member.email)
      var userEmail = obj.member.email
    
   $.getJSON(serverAddr + "/complain/list3.json", {
      "pageNo": pageNo,
      "length": pageLength,
      "email" : userEmail
   }, function(obj) {
      var result = obj.jsonResult
      //console.log(result.data)
      if (result.state != "success") {
           alert("서버에서 데이터를 가져오는데 실패했습니다.")
           return
       }
      
       var template = Handlebars.compile($('#trTemplateText').html())
       $("#complainTable").html(template(result.data))
            
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

function ajaxComplainListRsvd0() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
      var userEmail = obj.member.email
    
   $.getJSON(serverAddr + "/complain/list2.json", {
      "pageNo": pageNo,
      "length": pageLength,
      "email" : userEmail
   }, function(obj) {
      var result = obj.jsonResult
      //console.log(result.data)
      if (result.state != "success") {
           alert("서버에서 데이터를 가져오는데 실패했습니다.")
           return
       }
      
      var template = Handlebars.compile($('#trTemplateText2').html())
       $("#complainTable2").html(template(result.data))
            
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

function ajaxUpdateComplain(complain) {
   $.post(serverAddr + "/complain/update.json", complain, function(obj) {
      var result = obj.jsonResult
      if (result.state != "success") {
         alert("변경 실패입니다.")
         return
      }
      window.location.href = "complain_l.html"
   }, "json")
}

