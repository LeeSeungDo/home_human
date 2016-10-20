$("#deleteBtn").click(function(event) {
	if (confirm("정말 삭제하시겠습니까?") == true) {
		ajaxDeleteGongzi($("#no").text())
	} else {
		return;
	}  
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

function ajaxReplyList(no) {
	$.getJSON(serverAddr + "/reply/list2.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
	    var template = Handlebars.compile($('#rrTemplateText').html())	    
	    $("#replyTable tbody").html(template(result))	    
	    
    })
}

$("#reAddBtn").click(function(event) {	
	var reply = {
	  //email: $("#email").val(),
	  contents: $("#reContents").val(),
	  no: no
	  //createdDate: $("#createdDate").val()
	  /*type: $("#type").val()*/
	}
	ajaxAddReply(reply)
});

function ajaxAddReply(reply) {
	$.post(serverAddr + "/reply/add2.json", reply, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    }	
		location.reload();
	}, "json")
}



