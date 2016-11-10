$(document.body).ready(function() {
	$('.limitation').on('keyup', function() {
		if($(this).val().length > 200) {
			alert("글자수는 200자 이내로 제한됩니다.!");  
			$(this).val($(this).val().substring(0, 200));
		}
	});
});



$("#addBtn").click(function(event) {
	/*var contract = {
			buildNo: $("#buildNo").val(),
			tenantEmail: $("#tenantEmail").val(),
			contractType: $(":input:radio[name=radio1]:checked").val(),
			deposit: $("#deposit").val(),
			contractDate: $("#contractDate").val(),
			endDate: $("#endDate").val(),
			rentPayDate: $("#rentPayDate").val(),
			utilityPayDate: $("#utilityPayDate").val(),
			contractStatus:	$(":input:radio[name=radio]:checked").val() 		

	}*/
	var val1 = $(":input:radio[name=contractType]:checked").val();

	if (val1 == 0) {
		$('input:radio[name=contractType]:input[value=0]').attr("checked", true);
	} else {
		$('input:radio[name=contractType]:input[value=1]').attr("checked", true);
	}

	
	var val2 = $(":input:radio[name=contractStatus]:checked").val();

	if (val2 == 0) {
		$('input:radio[name=contractStatus]:input[value=0]').attr("checked", true);
	} else if (val2 == 1) {
		$('input:radio[name=contractStatus]:input[value=1]').attr("checked", true);
	} else {
		$('input:radio[name=contractStatus]:input[value=2]').attr("checked", true);
	}

	//contractStatus:	$(":input:radio[name=radio]:checked").val()


	var form = $('form')[0];
	var formData = new FormData(form);	

	ajaxAddContractFile(formData)
});


/*
function ajaxAddContract(contract) {
	$.post(serverAddr + "/contract/add.json", contract, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("등록 실패입니다.")
			return
		} 
	}, "json")
}
 */

/*
$("#addBtn").click(function(event) {

	var form = $('form')[0] + $('form')[1];
	var formData = new FormData(form);

	ajaxAddContract(formData);
});

 */


function ajaxAddContractFile(formData) {
	$.ajax({
		url: serverAddr + "/contract/add.json",
		data: formData,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data){
			alert("EE");
			window.location.href = serverAddr + "/html/contract/contractMnge.html"
		}
	});
}













