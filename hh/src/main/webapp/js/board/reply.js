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
    
    $(document.body).on("click","#reDeleteBtn",function(event) {	
    	if (confirm("정말 삭제하시겠습니까?") == true) {
 		ajaxDeleteReply($(this).attr("data-no"))
    	} else {
    		return;
    	}  
 });
}

$("#reAddBtn").click(function(event) {	
	if (location.search.startsWith("?")) {
		var no = location.search.split("=")[1];
		}
	var reply = {
	  //email: $("#email").val(),
	  no: no,	
	  reContents: $("#reContents").val()
	  //createdDate: $("#createdDate").val()
	  /*type: $("#type").val()*/
	}
	ajaxAddReply(reply)
});

function ajaxAddReply(reply) {
	$.post(serverAddr + "/reply/add2.json?no=" + no, reply, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    }	
		location.reload();
	}, "json")
}


function ajaxDeleteReply(no) {
	$.getJSON(serverAddr + "/reply/delete2.json?no="+no, {
		no: no,
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}		
		location.reload();
	})
}


$(document.body).on("click",".bit-update-btn",function(event) {
	var tno = $(this).attr("data-no")
	ajaxLoadReply(tno)
});


$(document.body).on("click",".bit-save-btn",function(event) {
	var reply = {
			reno: $("#reno").val(),  
			reContents: $(".update-contents").val()
			//email: $(#email).val()
	}
	console.log(reply)
	if (confirm("정말 변경하시겠습니까?") == true) {
		ajaxUpdateReply(reply)
	} else {
		return;
	}
	
});


function ajaxLoadReply(no) {
	$.getJSON(serverAddr + "/reply/detail2.json?no=" + no, function(obj) {
		var result = obj.jsonResult		
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		} else {
			$(".update-contents").val(result.data.reContents);
		}
	})
	$("#replyTable tr[data-no=" + no + "]").find("td:eq(2)").html(
			"<textarea type='text' class='update-contents'></textarea>");
	$("#replyTable tr[data-no=" + no + "]").find("td:eq(5)").html(
			"<button type='button' class='bit-save-btn'>저장</button><button>취소</button>");
}



function ajaxUpdateReply(reply) {
	$.post(serverAddr + "/reply/update2.json", reply, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		location.reload();
	}, "json")
}












