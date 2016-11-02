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


$("#addBtn").click(function(event) {
	var complain = {
	  title: $("#title").val(),
	  contents: $("#contents").val(),
	  writer: $("#writer").val()
	}
	ajaxAddComplain(complain)
});

$("#cancelBtn0").click(function(event) {
			location.href = "complain_t.html"
		});

$("#cancelBtn1").click(function(event) {
	location.href = "complain_t.html"
});

$("#prevBtn").click(function(event) {
	pageNo--;
	ajaxComplainListRsvd1_t();
});

$("#nextBtn").click(function(event) {
	pageNo++;
	ajaxComplainListRsvd1_t();
});

$("#prevBtn2").click(function(event) {
	pageNo--;
	ajaxComplainListRsvd0_t();
});

$("#nextBtn2").click(function(event) {
	pageNo++;
	ajaxComplainListRsvd0_t();
}); 

//글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
    pageLength = 6; /* window.pageLength */

function ajaxComplainListRsvd0_t() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		var userEmail = obj.member.email
		
	$.getJSON(serverAddr + "/complain/list4.json", {
		"pageNo": pageNo,
		"length": pageLength,
		"email" : userEmail
	}, function(obj) {
		var result = obj.jsonResult;
		var test = result.data.list[0].filename;
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
	    var template = Handlebars.compile($('#trTemplateText2').html())
	    $("#complainTable2 .kingking").html(template(result.data))
	    
	  	
	    $(".titleLink0").click(function(event) {
		    window.location.href = serverAddr + "/html/board/complainForm_t.html?no=" + $(this).attr("data-no0")
	    })
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
	})
}



function ajaxComplainListRsvd1_t() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		var userEmail = obj.member.email
		
	$.getJSON(serverAddr + "/complain/list5.json", {
		"pageNo": pageNo,
		"length": pageLength,
		"email" : userEmail
	}, function(obj) {
		var result = obj.jsonResult;
		var test = result.data.list[0].filename;
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
	    var template = Handlebars.compile($('#trTemplateText').html())
	    $("#complainTable .king").html(template(result.data))
	    
	  	
	    $(".titleLink1").click(function(event) {
		    window.location.href = serverAddr + "/html/board/complainForm_t.html?no=" + $(this).attr("data-no1")
	    })
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
	})
}
