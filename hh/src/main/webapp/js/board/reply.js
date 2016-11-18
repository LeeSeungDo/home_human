function ajaxReplyList(no) {
	$.getJSON(serverAddr + "/reply/list2.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		//console.log(result.data);
		var template = Handlebars.compile($('#rrTemplateText').html())	    
		$("#replyTable tbody").html(template(result))	    

	})

	$(document.body).on("click",".bit-delete-btn",function(event) {	
		if (confirm("정말 삭제하시겠습니까?") == true) {
			ajaxDeleteReply($(this).attr("data-no"))
		} else {
			return;
		}  
	});
}


$("#reAddBtn").click(function(event) {	
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
	    	alert("로그아웃 되었습니다.");
	    	window.location.href = serverAddr + "/html/index.html"
	         return
	    }
		var email = result.data.email;
		
		if (location.search.startsWith("?")) {
			var no = location.search.split("=")[1];
		}
		var reply = {
			no: no,	
			email: email,
			reContents: $("#reContents").val()
		}
	
		//console.log(reply);
	
		ajaxAddReply(reply)
	});
});


$(document.body).ready(function() {
    $('.reAddLimit').on('keyup', function() {
        if($(this).val().length > 50) {
        	 alert("글자수는 50자 이내로 제한됩니다.!");  
            $(this).val($(this).val().substring(0, 50));
        }
    });
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
			reno: $(this).attr("data-no"),
			reContents: $(".update-contents").val()
	}
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
			$("#replyTable tr[data-no=" + no + "]").find("p").html(
				"<textarea id='reUpdateLimit' name='contents' class='materialize-textarea update-contents limitation reAddLimit' style='padding-bottom: 0;'></textarea>");
			$("#replyTable tr[data-no=" + no + "]").find("td:eq(2)").html(
				"<button type='button' class='btn btn-primary btn-sm bit-save-btn' style='margin-bottom: 2%;' data-no=" + no + ">저장</button>" +
				"<button type='button' class='btn btn-primary btn-sm bit-cancel-btn' data-no=" + no + ">취소</button>");
			
			$("#replyTable tr[data-no=" + no + "]").find(".update-contents").val(result.data.reContents);
		}
	})	
}




$(document.body).ready(function() {
    $('.reUpdateLimit').on('keyup', function() {
        if($(this).val().length > 50) {
        	 alert("글자수는 50자 이내로 제한됩니다.!");  
            $(this).val($(this).val().substring(0, 50));
        }
    });
});


function ajaxUpdateReply(reply) {
	$.post(serverAddr + "/reply/update2.json", reply, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		location.reload();
	}, "json")
}


$(document.body).on("click",".bit-cancel-btn",function(event) {
	var reno = $(this).attr("data-no")
	ajaxCancelReply(reno)
});


function ajaxCancelReply(no) {
	$.getJSON(serverAddr + "/reply/detail2.json?no=" + no, function(obj) {
		var result = obj.jsonResult		
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		} else {			
			$("#replyTable tr[data-no=" + no + "]").find("p").html(
					result.data.reContents);
			$("#replyTable tr[data-no=" + no + "]").find("td:eq(2)").html(
					"<button type='button' class='btn btn-primary btn-sm bit-update-btn' style='margin-bottom: 2%;' data-no="+ no +">수정</button>" +
					"<button type='button' class='btn btn-primary btn-sm bit-delete-btn' data-no="+ no +">삭제</button>");	
		}
	})		
}



