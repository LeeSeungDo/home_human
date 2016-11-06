$(document.body).ready(function() {
	$('.limitation').on('keyup', function() {
		if($(this).val().length > 200) {
			alert("글자수는 200자 이내로 제한됩니다.!");  
			$(this).val($(this).val().substring(0, 200));
		}
	});
});

$("#addBtn").click(function(event) {
	
	var form = $('form')[0];
	var formData = new FormData(form);
	
	ajaxAddFreeBoardFile(formData);
});


function ajaxAddFreeBoardFile(formData) {
	$.ajax({
	    url: serverAddr + "/freeboard/add.json",
	    data: formData,
	    processData: false,
	    contentType: false,
	    type: 'POST',
	    success: function(data){
	    	alert("EE");
	    	window.location.href = serverAddr + "/html/board/freeboard.html"
	    }
	  });
}


/*
$("#addBtn").click(function(event) {
	var freeboard = {
			writer: $("#writer").val(),
			title: $("#title").val(),
			contents: $("#contents").val()
	}
	ajaxAddFreeBoard(freeboard)
});

function ajaxAddFreeBoard(freeboard) {
	$.post(serverAddr + "/freeboard/add.json", freeboard, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("등록 실패입니다.")
			return
		} 
		window.location.href = serverAddr + "/html/board/freeboard.html"
	}, "json")		
}
*/











