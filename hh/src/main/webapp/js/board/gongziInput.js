$("#addBtn").click(function(event) {
	var gongzi = {
	  //email: $("#email").val(),
	  title: $("#title").val(),
	  contents: $("#contents").val(),
	  writer: $("#writer").val(),
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
	    window.location.href = "gongzi.html"
	    
	}, "json")
}













