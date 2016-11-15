$("#cancelBtn").click(function(event) {
	window.location.href = serverAddr + "/html/board/gongzi.html";
})

function ajaxLoadGongzi(no) {
	$.getJSON(serverAddr + "/board/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}

		console.log(result.data);
		$("#writer").val(result.data.writer);
		$("#title").text(result.data.title);
		$("#contents").text(result.data.contents);
		$("#createdDate").val(result.data.createDate);
		$("#viewCount").val(result.data.viewCount);
		
		$("#updateBtn").click(function(event) {
			window.location.href = serverAddr + "/html/board/gongziUpdate.html?no=" + no
		});
		
		$("#deleteBtn").click(function(event) {
			if (confirm("정말 삭제하시겠습니까?") == true) {
				ajaxDeleteGongzi(no)
			} else {
				return;
			}  
		});
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




