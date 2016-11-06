$("#deleteBtn").click(function(event) {
	if (confirm("정말 삭제하시겠습니까?") == true) {
		ajaxDeleteFreeBoard($("#boardNo").text())
	} else {
		return;
	}  
});

function ajaxLoadFreeBoard(no) {
	$.getJSON(serverAddr + "/freeboard/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}

		$("#boardNo").text(result.data.boardNo);
		$("#email").val(result.data.email);
		$("#writer").text(result.data.writer);
		$("#title").val(result.data.title);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createDate);
		$("#viewCount").text(result.data.viewCount);
		$("#file1").attr('src', "../../upload/" + result.data.filename);
		$("#freeUpdateBtn").click(function(event) {
			window.location.href = serverAddr + "/html/board/freeboardUpdate.html?no=" + no
		})
	})
}

function ajaxDeleteFreeBoard(no) {
	$.getJSON(serverAddr + "/freeboard/delete.json", {
		no: no,
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}
		location.href = serverAddr + "/html/board/freeboard.html"
	})
}




