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

$("#updateBtn").click(function(event) {
  var contract = {
		  buildNo: $("#buildNo").val(),
		  tenantEmail: $("#tenantEmail").val(),
		  contractType: $("contractType").val(),
		  deposit: $("#deposit").val(),
		  contractDate: $("#contractDate").val(),
		  endDate: $("endDate").val(),
		  rentPayDate: $("#rentPayDate").val(),
		  utilityPayDate: $("#utilityPayDate").val(),
		  contractStatus: $("#contractStatus").val(),
		  contractNo: $("#contractNo").val()
				  }
  if (confirm("정말 변경하시겠습니까?") == true) {
    ajaxUpdateContract(contract)
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
		$("#buildNo").val(result.data.buildNo);
		$("#tenantEmail").val(result.data.tenantEmail);
		$("#contractType").val(result.data.contractType);
		$("#deposit").val(result.data.deposit);
		$("#contractDate").val(result.data.contractDate);
		$("#endDate").val(result.data.endDate);
		$("#rentPayDate").val(result.data.rentPayDate);		
		$("#utilityPayDate").val(result.data.utilityPayDate);
		$("#contractStatus").val(result.data.contractStatus);		
	})
}

function ajaxUpdateContract(contract) {
	$.post(serverAddr + "/contract/update.json", contract, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		 var no = location.search.split("=")[1];
		 location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + no
	}, "json")
}








