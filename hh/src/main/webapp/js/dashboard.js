$("#myInfo").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#logout").click(function(event) {
	window.location.href = serverAddr + "/html/index.html"
});

function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
	    	window.location.href = serverAddr + "/html/index.html"
	         return
	    }

		$("#userName").html(result.data.name);
		
	    var auth = result.data.auth;
	    if (auth == 0) {
	    	$("#authLevel").html("(임대인)");
	    } else {
	    	$("#authLevel").html("(임차인)");
	    }
    })
}