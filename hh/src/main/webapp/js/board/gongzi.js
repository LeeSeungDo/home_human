function ajaxFirstList() {
	$.getJSON(serverAddr + "/board/firstlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#frTemplateText').html())	    
		$("#firstTable").html(template(result))	    
	})
}



function ajaxGongziList() {
	$.getJSON(serverAddr + "/board/list.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
	    var template = Handlebars.compile($('#trTemplateText').html())	    
	    $("#gongziTable").html(template(result))
	    
	    $(document.body).on('click', '.card1', function(event) {
		    window.location.href = serverAddr + "/html/board/gongziForm.html?no=" + $(this).attr("data-no")
	    })
    })
}





