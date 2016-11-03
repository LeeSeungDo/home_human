$("#logoBtn").click(function(event) {
	window.location.href = serverAddr + "/html/index.html"
});

$("#myinfo").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#cancelBtn").click(function(event) {
	alert("취소")
	//window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#updateBtn").click(function(event) {
	var member = {
			password: $("#password").val(),
			phoPath: $("#phoPath").val()
	}
	ajaxUpdateMember(member)

});3


//회원정보수정 회원데이터 출력
function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}
		$("#password").val(result.data.password);

	})

//function ajaxUpdateMember(member) {
//	$.post(serverAddr + "/auth/update.json", member, function(obj) {
//		var result = obj.jsonResult
//		if (result.state != "success") {
//			alert("변경 실패입니다.")
//			return
//		}
//		alert("변경성공");
//		window.location.href = serverAddr + "/html/auth/myinfo.html"
//	}, "json")
//}

}