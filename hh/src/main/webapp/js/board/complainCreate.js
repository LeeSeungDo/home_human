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

		$(".email").val(result.data.email);
		$(".writer").val(result.data.name);
		
    })
}


$("#addBtn").click(function(event) {
	
	var form = $('form')[0];
	var formData = new FormData(form);
	var title = formData.get("title");
	var contents = formData.get("contents");
	var fileName = formData.get("file").name;
	
	if (fileName == "" || fileName == null) {
		if ((title == "" || title == null) || (contents == "" || contents == null)) {
			alert("빈공간 있어요 다시해요.");
		} else {
			alert("파일 없다. 등록 시작하죠");
			ajaxAddComplainFile0(formData);
		}
	} else {
		if ((title == "" || title == null) || (contents == "" || contents == null)) {
			alert("빈공간 있어요 다시해요.");
		} else {
			alert("파일 있다. 등록 시작하죠");
			ajaxAddComplainFile1(formData);
		}
	}
});

function ajaxAddComplainFile0(formData) {
	$.ajax({
	    url: serverAddr + "/complain/add0.json",
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

function ajaxAddComplainFile1(formData) {
	$.ajax({
	    url: serverAddr + "/complain/add1.json",
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