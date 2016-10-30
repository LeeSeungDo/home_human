$("#deleteBtn").click(function(event) {
	if (confirm("정말 삭제하시겠습니까?") == true) {
		ajaxDeleteGongzi($("#no").text())
	} else {
		return;
	}  
});

function ajaxLoadContract(no) {
	$.getJSON(serverAddr + "/contract/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		console.log(result)		
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}

		$("#email").val(result.data.tenantEmail);
		$("#detailAddress").val(result.data.detailAddress);
		$("#contractType").val(result.data.contractType);
		$("#contractDate").val(result.data.contractDate);
		$("#endDate").val(result.data.endDate);
		$("#rentPayDate").val(result.data.rentPayDate);
		$("#contractStatus").val(result.data.contractStatus);

		/*
		   $("#updateBtn").click(function(event) {
			window.location.href = serverAddr + "/html/board/gongziUpdate.html?no=" + no		
		})	
		*/
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
		location.href = serverAddr + "/html/board/gongzi.html"
	})
}




