$(function () {
    $(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "darkred");
        $(".tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
});

$("#prevBtn").click(function(event) {
	pageNo--;
	ajaxComplainList();
});

$("#nextBtn").click(function(event) {
	pageNo++;
	ajaxComplainList();
});

$("#prevBtn2").click(function(event) {
	pageNo--;
	ajaxComplainListRsvd();
});

$("#nextBtn2").click(function(event) {
	pageNo++;
	ajaxComplainListRsvd();
}); 

//글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
    pageLength = 6; /* window.pageLength */

function ajaxComplainList() {
	$.getJSON(serverAddr + "/complain/list.json", {
		"pageNo": pageNo,
		"length": pageLength
	}, function(obj) {
		var result = obj.jsonResult
		console.log(result.data)
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
	    var template = Handlebars.compile($('#trTemplateText').html())
	    $("#complainTable .king").html(template(result.data))
	  	    
	    // 현재 페이지 번호를 span 태그에 출력한다.
	    pageNo = result.data.pageNo;
	    totalPage = result.data.totalPage;
	    $('#pageNo').text(pageNo);
	    
	    // 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
	    if (pageNo <= 1) {
	    	$('#prevBtn').attr('disabled', true);
	    } else {
	    	$('#prevBtn').removeAttr('disabled');
	    } 
	    
	    // 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
	    if (pageNo >= totalPage) {
	    	$('#nextBtn').attr('disabled', true);
	    } else {
	    	$('#nextBtn').removeAttr('disabled');
	    }
    })
}

function ajaxComplainListRsvd() {
	$.getJSON(serverAddr + "/complain/list2.json", {
		"pageNo": pageNo,
		"length": pageLength
	}, function(obj) {
		var result = obj.jsonResult
		console.log(result.data)
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
	    var template = Handlebars.compile($('#trTemplateText2').html())
	    $("#complainTable2 .kingking").html(template(result.data))
	  	    
	    // 현재 페이지 번호를 span 태그에 출력한다.
	    pageNo = result.data.pageNo;
	    totalPage = result.data.totalPage;
	    $('#pageNo_tab2').text(pageNo);
	    
	    // 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
	    if (pageNo <= 1) {
	    	$('#prevBtn2').attr('disabled', true);
	    } else {
	    	$('#prevBtn2').removeAttr('disabled');
	    } 
	    
	    // 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
	    if (pageNo >= totalPage) {
	    	$('#nextBtn2').attr('disabled', true);
	    } else {
	    	$('#nextBtn2').removeAttr('disabled');
	    }
    })
}


