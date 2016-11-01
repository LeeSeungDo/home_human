$(document.body).ready(function() {
	$('.limitation').on('keyup', function() {
		if($(this).val().length > 200) {
			alert("글자수는 200자 이내로 제한됩니다.!");  
			$(this).val($(this).val().substring(0, 200));
		}
	});
});

$("#addBtn").click(function(event) {
	var contract = {
			buildNo: $("#buildNo").val(),
			tenantEmail: $("#tenantEmail").val(),
			contractType: $("#contractType input:checked").val(),
			deposit: $("#deposit").val(),
			contractDate: $("#contractDate").val(),
			endDate: $("#endDate").val(),
			rentPayDate: $("#rentPayDate").val(),
			utilityPayDate: $("#utilityPayDate").val(),
			contractStatus: $("#contractStatus input:checked").val()
	}	
	ajaxAddContract(contract)
});

function ajaxAddContract(contract) {
	$.post(serverAddr + "/contract/add.json", contract, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("등록 실패입니다.")
			return
		} 
		window.location.href = serverAddr + "/html/contract/contractMnge.html"
	}, "json")
}













