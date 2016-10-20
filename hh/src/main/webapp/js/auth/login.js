///////////////////////////////////////////____Login 처리___//////////////////////////////////////////
$("#loginBtn").click(function(event) {
	var user = {
    email: $("#email").val(),
    password: $("#password").val(),
    saveEmail: $("#saveEmail").is(":checked")
  }
	alert("로그인");
  ajaxLogin(user)
});

function ajaxLogin(user) {
	$.ajax({
		url: serverAddr + "/auth/login.json",
		method: "POST",
		dataType: "json",
		data: user,
		success: function(obj) {
			var result = obj.jsonResult
		    if (result.state != "success") {
	            alert("로그인 실패입니다.\n이메일 또는 암호를 확인하세요.")
	            return
	        }
	        window.location.href = serverAddr + "/html/dashboard/dashboard.html"
		},
		error: function(msg) {
			alert(msg)
		}
	})
}

function ajaxLogout(user) {
	$.getJSON(serverAddr + "/auth/logout.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success")
	        console.log("로그아웃 실패입니다.")
    })
}



///////////////////////////////////////////____Login 처리___//////////////////////////////////////////
