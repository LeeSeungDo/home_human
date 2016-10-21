$("#updateBtn").click(function(event) {
  var complain = {
    title: $("#title").val(),
    contents: $("#contents").val(),
    email: $("#email").val(),
    no: $("#no").val()
  }
  if (confirm("정말 변경하시겠습니까?") == true) {
	  ajaxUpdateComplain(complain)
	  } else {
		  return;
	  }
});

$("#deleteBtn").click(function(event) {
	if (confirm("정말 삭제하시겠습니까?") == true) {
		 ajaxDeleteComplain($("#no").text())
	} else {
		return;
	}  
});


function ajaxLoadComplain(no) {
	$.getJSON(serverAddr + "/complain/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		$("#no").val(result.data.no);
		$("#title").val(result.data.title);
		$("#title").text(result.data.title);
		$("#contents").val(result.data.contents);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createdDate);
		$("#viewCount").text(result.data.viewCount);
	})
}

function ajaxUpdateComplain(complain) {
	$.post(serverAddr + "/complain/update.json", complain, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		window.location.href = "complainApp_t.html"
	}, "json")
}

function ajaxDeleteComplain(no) {
	$.getJSON(serverAddr + "/complain/delete.json", {
		no: no
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			console.log("삭제 실패입니다.")
			return
		}
		location.href = "complainApp_t.html"
	})
}
