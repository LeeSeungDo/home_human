$("#updateBtn").click(function(event) {
  var gongzi = {
	    title: $("#title").val(),
	    contents: $("#contents").val(),
	    email: $("email").val(),
	    no: $("#no").val()
				  }
  ajaxUpdateGongzi(gongzi)
});



function ajaxLoadGongzi(no) {
	$.getJSON(serverAddr + "/gongzi/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		$("#no").val(result.data.no);
		$("#email").val(result.data.email);
		$("#writer").val(result.data.writer);
		$("#title").val(result.data.title);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createdDate);
		$("#viewCount").text(result.data.viewCount);		
	})
}

function ajaxUpdateGongzi(gongzi) {
	$.post(serverAddr + "/gongzi/update.json", gongzi, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		//console.log(window.location.href)
		var no = location.search.split("=")[1];
		//console.log(no)
		location.href = serverAddr + "/html/gongziForm.html?no=" + no
	}, "json")
}








