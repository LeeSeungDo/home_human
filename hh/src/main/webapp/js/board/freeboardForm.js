
$("#cancelBtn").click(function(event) {
	window.location.href = serverAddr + "/html/board/freeboard.html";
})


function ajaxLoadFreeBoard(no) {
	$.getJSON(serverAddr + "/freeboard/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}

		//console.log(result.data);

		$("#boardNo").val(result.data.boardNo);
		//$("#email").val(result.data.email);
		$("#writer").val(result.data.writer);
		$("#title").text(result.data.title);
		$("#contents").text(result.data.contents);
		$("#createdDate").val(result.data.createDate);
		$("#viewCount").val(result.data.viewCount);
		$("#file1").attr('src', "../../upload/" + result.data.filename);
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


function ajaxLoginUserComparison() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { 
			window.location.href = serverAddr + "/html/index.html"
			return
		}
		var email = result.data.email;

		$.getJSON(serverAddr + "/freeboard/detail.json?no=" + no, function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("조회 실패입니다.")
				return
			}	
			var writerEmail = result.data.email;

			$("#freeUpdateBtn").click(function(event) {
				var no = location.search.split("=")[1];
				console.log(email)
				console.log(writerEmail)
				console.log(no)
				if (email != writerEmail) {
					alert("게시글 수정 권한이 없습니다.")
				} else {
					window.location.href = serverAddr + "/html/board/freeboardUpdate.html?no=" + no					
				}
			})

			$("#deleteBtn").click(function(event) {
				if (email != writerEmail) {
					alert("게시글 삭제 권한이 없습니다.")
				} else {
					if (confirm("정말 삭제하시겠습니까?") == true) {
						ajaxDeleteFreeBoard($("#boardNo").val())
					} else {
						return;
					}  				
				}				
			})
		})
	})
}










