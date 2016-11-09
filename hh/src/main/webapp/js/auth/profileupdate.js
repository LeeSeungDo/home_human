$("#logoBtn").click(function(event) {
	window.location.href = serverAddr + "/html/index.html"
});

$("#myinfo").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#cancelBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

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
	//console.log(member)
	ajaxUpdateMember(member)

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

function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult

		
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}
		
		myEmail = result.data.email;
		myName = result.data.name;
		myTel = result.data.tel;
		myGender = result.data.gender;
		myBirth = result.data.birth;
		myPostNo = result.data.postNo;
		myBasicAddr = result.data.basicAddr;
		myDetailAddr = result.data.detailAddr;
		myPhoPath = result.data.phoPath;
		myAuth = result.data.auth;
		
		$("#phoPath").val(result.data.phoPath);
//		$("#password").val(result.data.password);

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
