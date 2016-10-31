$(".deleteBtn").click(function(event) {
	if (location.search.startsWith("?")) {
		var contractNo = location.search.split("=")[1];
	}
	if (confirm("정말 삭제하시겠습니까?") == true) {		
		ajaxDeleteContract(contractNo)
	} else {
		return;
	} 
});

function ajaxLoadContract(no) {
	$.getJSON(serverAddr + "/contract/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
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
		$("#contractNo").val(result.data.contractNo);
		$(".updateBtn").click(function(event) {
			window.location.href = serverAddr + "/html/contract/tenantRegiUpdateForm.html?no=" + no
		})			
	})
}

function ajaxDeleteContract(no) {
	$.getJSON(serverAddr + "/contract/delete.json", {
		no: no,
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}
		location.href = serverAddr + "/html/contract/contractMnge.html"
	})
}




