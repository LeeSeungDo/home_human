/*----------------------------------------------------- 공통 대쉬보드(지우지마세요) -----------------------------------------------------*/
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
      
      console.log(result.data);
      console.log(result.data.phoPath);
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
      
      ajaxInputUser();
    })
}
/*----------------------------------------------------- /로그인 정보 불러오기 -----------------------------------------------------*/
/*----------------------------------------------------- /공통 대쉬보드(지우지마세요) -----------------------------------------------------*/

$("#cancelBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#updateBtn").click(function(event) {
	var form = $('form')[0];
	var formData = new FormData(form);
	
	console.log(formData);
	ajaxUpdateFile(formData);
});

function ajaxUpdateFile(formData) {
	$.ajax({
	    url: serverAddr + "/auth/updateFile.json",
	    data: formData,
	    processData: false,
	    contentType: false,
	    type: 'POST',
	    success: function(data){
	    	alert("EE");
	    	window.location.href = serverAddr + "/html/dashboard/dashboard.html"
	    }
	  });
}

/*
//업데이트 적용
$("#updateBtn").click(function(event) {
	var member = {
			email: myEmail,
			name: myName,
			birth: myBirth,
			gender: myGender,
			postNo: myPostNo,
			basicAddr: myBasicAddr,
			detailAddr: myDetailAddr,
			tel: myTel,
			auth: myAuth,
			phoPath: $("#phoPath").val(),
			password: $("#passwordUp").val()
	}
	console.log(member)
	
	//ajaxUpdateMember(member)

});

//업데이트
function ajaxUpdateMember(member) {
	$.post(serverAddr + "/auth/update.json", member, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		alert("변경성공");
		window.location.href = serverAddr + "/html/auth/myinfo.html"
	}, "json")
}
*/

//회원정보수정 회원데이터 출력
var myEmail;
var myName;
var myTel;
var myGender;
var myBirth;
var myPostNo;
var myBasicAddr;
var myDetailAddr;
var myPhoPath;
var myAuth;

function ajaxInputUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		
		myEmail = result.data.email;
		myName = result.data.name;
		myTel = result.data.tel;
		myGender = result.data.gender;
		myBirth = result.data.birth;
		myPostNo = result.data.postNo;
		myBasicAddr = result.data.basicAddr;
		myDetailAddr = result.data.detailAddr;
		myPhoPath = result.data.phoPath;
		
		console.log(result.data.email);
		$("#loginUserEmail").val(result.data.email);
		//console.log(myPhoPath);
		if (result.data.phoPath != null && result.data.phoPath != "") {
	    	  $('#phoPath').attr('src', '../../upload/' + result.data.phoPath);
	      } else {
	    	  $('#phoPath').attr('src', '../../images/user_default.png');
	      }
	})
}

































// 비밀번호 확인
function verifynotify(field1, field2, result_id, match_html, nomatch_html) {
	this.field1 = field1;
	this.field2 = field2;
	this.result_id = result_id;
	this.match_html = match_html;
	this.nomatch_html = nomatch_html;

	this.check = function() {
		// Make sure we don't cause an error
		// for browsers that do not support getElementById
		if (!this.result_id) {
			return false;
		}
		if (!document.getElementById) {
			return false;
		}
		r = document.getElementById(this.result_id);
		if (!r) {
			return false;
		}

		if (this.field1.value != ""
			&& this.field1.value == this.field2.value) {
			r.innerHTML = this.match_html;
		} else {
			r.innerHTML = this.nomatch_html;
		}
	}
}

function verifyInput() {
	verify = new verifynotify();
	verify.field1 = document.password_form.password1;
	verify.field2 = document.password_form.password2;
	verify.result_id = "password_result";
	verify.match_html = "<span style=\"color:blue\">비밀번호가 일치합니다.<\/span>";
	verify.nomatch_html = "<span style=\"color:red\">비밀번호가 일치하지 않습니다.<\/span>";

	// Update the result message
	verify.check();
}

//Multiple onload function created by: Simon Willison
//http://simonwillison.net/2004/May/26/addLoadEvent/
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(function() {
	verifyInput();
});
