
function ajaxComplainList() {
	$.getJSON(serverAddr + "/complain/list.json", function(obj) {
		var result = obj.jsonResult
		//console.log(result)
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
	    var template = Handlebars.compile($('#trTemplateText').html())
	    $("#complainTable .king").html(template(result))
	    
    })
}



