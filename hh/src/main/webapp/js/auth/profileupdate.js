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
				// window.location.href = serverAddr + "/html/index.html";
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

		// console.log(result.data);
		// console.log(result.data.phoPath);
		$("#userName1").html(result.data.name);
		$("#userName2").html(result.data.name);
		$("#password3").val(result.data.password);
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
	var beforePWD = $("#passwordUp").val();
	var afterPWD = ($("#hiddenPwd").val(beforePWD)).val();
	console.log(beforePWD);
	console.log(afterPWD);

	var form0 = $('form')[0];
	var form1 = $('form')[1];
	var formData0 = new FormData(form0);
	var formData1 = new FormData(form1);
	var newPassword = $("#passwordUp").val();

	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		var dbPassword = result.data.password;
		var dbPhoto = '../../upload/' + result.data.phoPath;
		var test = $("#phoPath").attr("src");

		// formData0 - 사진만 바꿈
		// formData1 - 패스워드만 바꿈
		// formData2 - 사진 & 패스워드 둘다 바꿈

		if (dbPhoto != test && newPassword != "") {
			console.log("사진 패스워드 둘다 바꿔요");
			ajaxUpdateFile2(formData0);
			
		} else if (dbPhoto === test && newPassword != "") {
			console.log("패스워드만 바꿔요");
			ajaxUpdateFile1(formData1);
			
		} else if (dbPhoto != test && newPassword === "") {
			console.log("사진만 바꿔요");
			ajaxUpdateFile0(formData0);
			
		} else {
			console.log("바꿀게 없네요");
		}
	})
});

function ajaxUpdateFile0(formData) {
	$.ajax({
		url : serverAddr + "/auth/updateFile0.json",
		data : formData,
		processData : false,
		contentType : false,
		type : 'POST',
		success : function(data) {
			alert("사진 변경");
			window.location.href = serverAddr + "/html/auth/myinfo.html"
		}
	});
}

function ajaxUpdateFile1(formData) {
	$.ajax({
		url : serverAddr + "/auth/updateFile1.json",
		data : formData,
		processData : false,
		contentType : false,
		type : 'POST',
		success : function(data) {
			alert("패스워드 변경");
			window.location.href = serverAddr + "/html/auth/myinfo.html"
		}
	});
}

function ajaxUpdateFile2(formData) {
	$.ajax({
		url : serverAddr + "/auth/updateFile2.json",
		data : formData,
		processData : false,
		contentType : false,
		type : 'POST',
		success : function(data) {
			alert("사진 & 패스워드 변경");
			window.location.href = serverAddr + "/html/auth/myinfo.html"
		}
	});
}

// 회원정보수정 회원데이터 출력
function ajaxInputUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult

		//console.log(result.data.password);
		$("#loginUserEmail0").val(result.data.email);
		$("#loginUserEmail1").val(result.data.email);
		$("#password3").val(result.data.password);
		// $("#hiddenPwd").val(result.data.password);

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

		if (this.field1.value != "" && this.field1.value == this.field2.value) {
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

// Multiple onload function created by: Simon Willison
// http://simonwillison.net/2004/May/26/addLoadEvent/
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