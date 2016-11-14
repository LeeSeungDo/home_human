$(document.body).ready(function() {
    $('.limitation').on('keyup', function() {
        if($(this).val().length > 200) {
        	 alert("글자수는 200자 이내로 제한됩니다.!");  
            $(this).val($(this).val().substring(0, 200));
        }
    });
});

var rsvdAll;

function rsvdCall(rsvd) {
	rsvdAll = rsvd;
}


$("#updateBtn").click(function(event) {
  var complain = {
    title: $("#title").val(),
    contents: $("#contents").val(),
    email: $("#email").val(),
    no: $("#no").val(),
    rsvd: rsvdAll
  }
  console.log(complain);
  if (confirm("정말 변경하시겠습니까?") == true) {
	  ajaxUpdateComplain(complain)
	  } else {
		  return;
	  }
}); 

function ajaxLoadComplain(no, rsvd) {
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
		window.location.href = "complain_t.html"
	}, "json")
}


function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
	    	alert("로그아웃 되었습니다.");
	    	window.location.href = serverAddr + "/html/index.html"
	         return
	    }

		$(".email").val(result.data.email);
		$(".writer").val(result.data.name);
		
    })
}

