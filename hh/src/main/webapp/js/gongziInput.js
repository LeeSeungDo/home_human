$("#addBtn").click(function(event) {
	var gongzi = {
	  // email: $("#email").val(),
	  title: $("#title").val(),
	  contents: $("#contents").val(),
	  writer: $("#writer").val()
	  // createdDate: $("#createdDate").val()
	  /* type: $("#type").val() */
	}
	ajaxAddGongzi(gongzi)
});

function ajaxAddGongzi(gongzi) {
	$.post(serverAddr + "/gongzi/add.json", gongzi, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    }
		ajaxGongziList();
	    // window.location.href = "gongziForm.html?no=" + no
	    
	}, "json")
}

function ajaxGongziList() {
	$.getJSON(serverAddr + "/gongzi/list.json", function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		for (var i = 0; i < 100; i++) {
			console.log(result.data.no[i]);
		}
	    })

}








