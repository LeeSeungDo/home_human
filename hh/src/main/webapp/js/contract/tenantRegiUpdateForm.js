$(document.body).ready(function() {
	$('.updateLimit').on('keyup', function() {
		if($(this).val().length > 200) {
			alert("글자수는 200자 이내로 제한됩니다.!");  
			$(this).val($(this).val().substring(0, 200));
		}
	});
});


$("#cancelBtn").click(function(event) {
	var contractNo = location.search.split("=")[1];	 
	location.href= serverAddr + "/html/contract/viewMyContract.html?no=" + contractNo
});

$(".updateBtn").click(function(event) {
	
	var contract = {
			contractNo: contractNo,
			buildNo: $("#buildNo").val(),
			contractType: $("#contractType input:checked").val(),
			deposit: $("#deposit").val(),
			contractDate: $("#contractDate").val(),
			endDate: $("#endDate").val(),
			rentPayDate: $("#rentPayDate").val(),
			utilityPayDate: $("#utilityPayDate").val(),
			contractStatus: $("#contractStatus input:checked").val()
	}  
		ajaxUpdateContract(contract);  
});


function ajaxLoadContract(no) {
	$.getJSON(serverAddr + "/contract/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		$("#buildNo").val(result.data.buildNo);
		$("#tenantEmail").val(result.data.tenantEmail);
		if ((result.data.contractType) == 0) {
			$('input:radio[name="radio1"][value="0"]').prop('checked', true);
		} else {
			$('input:radio[name="radio1"][value="1"]').prop('checked', true);
		}
		$("#contractType").val(result.data.contractType);
		$("#deposit").val(result.data.deposit);
		$("#contractDate").val(result.data.contractDate);
		$("#endDate").val(result.data.endDate);
		$("#rentPayDate").val(result.data.rentPayDate);		
		$("#utilityPayDate").val(result.data.utilityPayDate);
		if((result.data.contractStatus) == 0) {
			$('input:radio[name="radio"][value="0"]').prop('checked', true);
		} else if ((result.data.contractStatus) == 1){
			$('input:radio[name="radio"][value="1"]').prop('checked', true);
		} else {
			$('input:radio[name="radio"][value="2"]').prop('checked', true);
		}
	})
}

function ajaxUpdateContract(realEstateContract) {
	$.post(serverAddr + "/contract/update.json", realEstateContract, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		var no = location.search.split("=")[1];
		location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + no
	}, "json")
}








