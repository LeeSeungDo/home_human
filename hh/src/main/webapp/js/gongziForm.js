$("#deleteBtn").click(function(event) {
  ajaxDeleteGongzi($("#no").text())
});

function ajaxLoadGongzi(no) {
	$.getJSON(serverAddr + "/gongzi/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		$("#no").text(result.data.no);
		$("#email").text(result.data.email);
		$("#writer").text(result.data.writer);
		$("#title").val(result.data.title);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createdDate);
		$("#viewCount").text(result.data.viewCount);
		
		$("#updateBtn").click(function(event) {
			 window.location.href = "gongziUpdate.html?no=" + no
			 })
	})
}

function ajaxDeleteGongzi(no) {
	$.getJSON(serverAddr + "/gongzi/delete.json", {
		no: no,
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}
		location.href = "gongzi.html"
	})
}







