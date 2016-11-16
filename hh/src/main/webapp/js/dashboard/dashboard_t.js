/*----------------------------------------------------- 이 밑으로는 지우셔도 됩니다. -----------------------------------------------------*/
/*----------------------------------------------------- 공지사항 불러오기 -----------------------------------------------------*/
function ajaxFirstList() {
   $.getJSON(serverAddr + "/board/firstlist.json", function(obj) {
      var result = obj.jsonResult
      if (result.state != "success") {
         alert("서버에서 데이터를 가져오는데 실패했습니다.")
         return
      }
      //console.log(result.data.list[0]);
      var title = result.data.list[0].title;
      var contents = result.data.list[0].contents;
      var boardNo = result.data.list[0].boardNo;
      $("#gongzi_title").html(title);
      $("#gongzi_contents").html(contents);
      
      $("#gongzi_detail").click(function(event) {
         alert("공지 디테일");
         window.location.href = serverAddr + "/html/board/gongziForm.html?no=" + boardNo;
      });
   })
}
/*----------------------------------------------------- /공지사항 불러오기 -----------------------------------------------------*/



/*----------------------------------------------------- 미처리 민원 불러오기 -----------------------------------------------------*/

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
		
		var template = Handlebars.compile($('#complaintList').html())       
        $("#complaintListTable").html(template(result.data))  
	    
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

/*----------------------------------------------------- /미처리 민원 불러오기 -----------------------------------------------------*/










