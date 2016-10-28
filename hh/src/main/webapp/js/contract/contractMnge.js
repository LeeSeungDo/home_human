
function ajaxRealEstateContractList() {
	$.getJSON(serverAddr + "/contract/list.json", function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#crTemplateText').html())	    
		$("#contractTable").html(template(result.data))		
		
		$(document.body).on('click', '.contractForm', function(event) {
			window.location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + $(this).attr("data-no")
		})
	})
}







