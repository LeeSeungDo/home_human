$(document.body).ready(function() {
    $('.limitation').on('keyup', function() {
        if($(this).val().length > 200) {
        	 alert("글자수는 200자 이내로 제한됩니다.!");  
            $(this).val($(this).val().substring(0, 200));
        }
    });
});

function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
	    	alert("로그아웃 되었습니다.");
	    	window.location.href = serverAddr + "/html/index.html"
	         return
	    }

		console.log(result.data.email);
		console.log(result.data.name);
		
		$(".email").val(result.data.email);
		$(".writer").val(result.data.name);
		
    })
}


$("#addBtn").click(function(event) {
	var gongzi = {
	  email: $("#email").val(),
	  title: $("#title").val(),
	  contents: $("#contents").val(),
	  writer: $("#writer").val()
	  //createdDate: $("#createdDate").val()
	  /*type: $("#type").val()*/
	}
	ajaxAddGongzi(gongzi)
});

function ajaxAddGongzi(gongzi) {
	$.post(serverAddr + "/gongzi/add.json", gongzi, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    } 
	    window.location.href = serverAddr + "/html/board/gongzi.html"
	    
	}, "json")
}












