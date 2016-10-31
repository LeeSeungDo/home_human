
function ajaxRealEstateContractList1() {
	$.getJSON(serverAddr + "/contract/list1.json", function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#crTemplateText1').html())	    
		$("#contractTable1").html(template(result.data))		
		
		$(document.body).on('click', '.contractForm1', function(event) {
			window.location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + $(this).attr("data-no")
		})
	})
}

function ajaxRealEstateContractList2() {
	$.getJSON(serverAddr + "/contract/list2.json", function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#crTemplateText2').html())	    
		$("#contractTable2").html(template(result.data))		
		
		$(document.body).on('click', '.contractForm2', function(event) {
			window.location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + $(this).attr("data-no")
		})
	})
}

function ajaxRealEstateContractList3() {
	$.getJSON(serverAddr + "/contract/list3.json", function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#crTemplateText3').html())	    
		$("#contractTable3").html(template(result.data))		
		
		$(document.body).on('click', '.contractForm3', function(event) {
			window.location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + $(this).attr("data-no")
		})
	})
}







