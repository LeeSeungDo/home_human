$("#logoutBtn").click(function(event) {
	location.href = serverAddr + "/html/index.html"
});

function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
	         $('.my-login').css("display", "none")
	         return
	    }
	      
	    $('.my-logout').css("display", "none")
	      
	    $("#authName").text(result.data.name)
	    
	    var auth = result.data.auth 
	    if (auth == 0) {
	    	$("#authLevel").html("(관리자)");
	    } else {
	    	$("#authLevel").html("(세입자)");
	    }
    })
}