function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
	    	alert("로그아웃 되었습니다.");
	    	window.location.href = serverAddr + "/html/index.html"
	         return
	    }

		$(".email").val(result.data.email);
		$(".writer").val(result.data.name);
		
    })
}


$("#addBtn").click(function(event) {
	
	var form = $('form')[0];
	var formData = new FormData(form);
	
	ajaxAddComplainFile(formData);
});

function ajaxAddComplainFile(formData) {
	$.ajax({
	    url: serverAddr + "/complain/add.json",
	    data: formData,
	    processData: false,
	    contentType: false,
	    type: 'POST',
	    success: function(data){
	    	alert("성공");
	    	window.location.href = serverAddr + "/html/board/complain_t.html"
	    },
	    error: function() {
	    	alert("실패")
	    }
	  });
}