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

//글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
  pageLength = 6; /* window.pageLength */


function ajaxComplainListRsvd1_t() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		var userEmail = obj.member.email
		console.log(userEmail);
		
	$.getJSON(serverAddr + "/complain/list5.json", {
		"pageNo": pageNo,
		"length": pageLength,
		"email" : userEmail
	}, function(obj) {
		var result = obj.jsonResult;
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		// console.log("서버에서 데이터를 잘 가져옵니다.");
		// console.log("핸들바스를 시작합니다.");
		var rsvd = result.data.list[0].rsvd;
		//console.log(rsvd);
		
	    var template = Handlebars.compile($('#trTemplateText').html())
	    //console.log(template);
	    $("#complainTable").html(template(result.data))
	    
	    //console.log("핸들바스가 끝났습니다.");
	    
	  	
	      $(document).on('click','#updateBtn1',function(event){
		    window.location.href = serverAddr + 
		    "/html/board/complainUpdate_t.html?no=" + 
		    $(this).attr("data-no1") + "&rsvd=" + rsvd;
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
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
		var rsvd = result.data.list[0].rsvd;
		
		
	    var template = Handlebars.compile($('#trTemplateText2').html())
	    $("#complainTable2").html(template(result.data))
	    
	   $(document).on('click','#updateBtn0',function(event){
		    window.location.href = serverAddr + 
		    "/html/board/complainUpdate_t.html?no=" + 
		    $(this).attr("data-no0") + "&rsvd=" + rsvd;
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





//$(document).on('click','#updateBtn1',function(event){
//	var complain = {
//			no: $(".card1").attr("data-no1"),
//			title: $("#title1").text(),
//			contents: $("#complain_conts1").text(),
//	        rsvd: $("#rsvd1").is(":checked") ? 1 : 0
//	        }
//	
//	        if (confirm("정말 변경하시겠습니까?") == true) {
//	           ajaxUpdateComplain(complain)
//	           } else {
//	              alert("변경 실패")
//	              return;
//	           }
//	   });
//
//$(document).on('click','#updateBtn0',function(event){
//	var complain = {
//			no: $(".card0").attr("data-no0"),
//			title: $("#title0").text(),
//			contents: $("#complain_conts0").text(),
//	        rsvd: $("#rsvd1").is(":checked") ? 1 : 0
//	        }
//	
//	        if (confirm("정말 변경하시겠습니까?") == true) {
//	           ajaxUpdateComplain(complain)
//	           } else {
//	              alert("변경 실패")
//	              return;
//	           }
//	   });


//function ajaxLoadComplain(no, rsvd) {
//	$.getJSON(serverAddr + "/complain/detail.json?no=" + no, function(obj) {
//		var result = obj.jsonResult
//		if (result.state != "success") {
//			alert("조회 실패입니다.")
//			return
//		}
//		
//		//console.log(rsvd);
//		$("#no").val(result.data.no);
//		$("#title").val(result.data.title);
//		$("#title").text(result.data.title);
//		$("#contents").val(result.data.contents);
//		$("#contents").text(result.data.contents);
//		$("#createdDate").text(result.data.createdDate);
//		$("#viewCount").text(result.data.viewCount);
//		
//		$(document).on('click','#updateBtn',function(event){
//	          window.location.href = serverAddr + "/html/board/complainUpdate_t.html?no=" + no + "=" + rsvd;
//	          })
//	})
//}


