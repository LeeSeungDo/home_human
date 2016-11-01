$("#logoBtn").click(function(event) {
	window.location.href = serverAddr + "/html/index.html"
});


$("#proUpBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/profileupdate.html"
});


$("#contactUpBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/contactupdate.html"
});

$("#buildUpBtn").click(function(event) {
	alert("건물 정보 수정")
	//window.location.href = serverAddr + ""
});

$("#memberUpBtn").click(function(event) {
	alert("탈퇴")
	//window.location.href = serverAddr + ""
});



// 회원정보수정 회원데이터 출력
function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}

		$("#email").html(result.data.email);
		$("#name").html(result.data.name);
		$("#gender").html(result.data.gender);
		$("#birth").html(result.data.birth);
		$("#postNo").html(result.data.postNo);
		$("#basicAddr").html(result.data.basicAddr);
		$("#detailAddr").html(result.data.detailAddr);
		$("#tel").html(result.data.tel);

		var gender = result.data.gender;
	    if (gender == 0) {
	    	
	    	$("#gender").html("남자");
	    } else {
	    	$("#gender").html("여자");
	    }
    })
}
