$("#deleteBtn").click(function(event) {
	if (confirm("정말 삭제하시겠습니까?") == true) {
		ajaxDeleteGongzi($("#no").text())
	} else {
		return;
	}  
});

function ajaxLoadGongzi(no) {
	$.getJSON(serverAddr + "/board/detail.json?no=" + no, function(obj) {
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
		URL.createObjectURL(result.data.filename)
		$("#file1").attr('src', "../upload/" + result.data.filename);
		$("#updateBtn").click(function(event) {
			window.location.href = serverAddr + "/html/board/gongziUpdate.html?no=" + no
		})
	})
}

function ajaxDeleteGongzi(no) {
	$.getJSON(serverAddr + "/board/delete.json", {
		no: no,
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}
		location.href = serverAddr + "/html/board/gongzi.html"
	})
}




