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

$(document).on('click','#updateBtn1',function(event){
	var complain = {
			no: $(".card1").attr("data-val1"),
			title: $("#title").text(),
			contents: $("#complain_conts1").text(),
	        rsvd: $("#rsvd1").is(":checked") ? 1 : 0
	        }
	
	        if (confirm("정말 변경하시겠습니까?") == true) {
	           ajaxUpdateComplain(complain)
	           } else {
	              alert("변경 실패")
	              return;
	           }
	   });

$(document).on('click','#updateBtn0',function(event){
	var complain = {
			no: $(".card0").attr("data-val0"),
			title: $("#title").text(),
			contents: $("#complain_conts0").text(),
	        rsvd: $("#rsvd1").is(":checked") ? 1 : 0
	        }
	
	        if (confirm("정말 변경하시겠습니까?") == true) {
	           ajaxUpdateComplain(complain)
	           } else {
	              alert("변경 실패")
	              return;
	           }
	   });




//글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
    pageLength = 6; /* window.pageLength */


function ajaxComplainListRsvd1() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
      console.log(obj.member.email)
      var userEmail = obj.member.email
    
   $.getJSON(serverAddr + "/complain/list3.json", {
      "pageNo": pageNo,
      "length": pageLength,
      "email" : userEmail
   }, function(obj) {
      var result = obj.jsonResult
      console.log(result.data)
      if (result.state != "success") {
           alert("서버에서 데이터를 가져오는데 실패했습니다.")
           return
       }
      
       var template = Handlebars.compile($('#trTemplateText').html())
       $("#complainTable").html(template(result.data))
            
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

function ajaxComplainListRsvd0() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
      var userEmail = obj.member.email
    
   $.getJSON(serverAddr + "/complain/list2.json", {
      "pageNo": pageNo,
      "length": pageLength,
      "email" : userEmail
   }, function(obj) {
      var result = obj.jsonResult
      console.log(result.data)
      if (result.state != "success") {
           alert("서버에서 데이터를 가져오는데 실패했습니다.")
           return
       }
      
      var template = Handlebars.compile($('#trTemplateText2').html())
       $("#complainTable2").html(template(result.data))
            
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

function ajaxUpdateComplain(complain) {
   $.post(serverAddr + "/complain/update.json", complain, function(obj) {
      var result = obj.jsonResult
      if (result.state != "success") {
         alert("변경 실패입니다.")
         return
      }
      window.location.href = "complain_l.html"
   }, "json")
}

