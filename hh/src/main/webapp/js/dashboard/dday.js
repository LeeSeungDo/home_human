function ajaxRealEstateContractList() {
   $.getJSON(serverAddr + "/contract/list.json", function(obj) {
      var result = obj.jsonResult
      console.log(result.data.list[0])
      if (result.state != "success") {
         alert("서버에서 데이터를 가져오는데 실패했습니다.")
         return
      }
      //console.log(result.data.list[0]);
      var rentPayDate = result.data.list[0].rentPayDate;
      $("#rentPayDate").html(rentPayDate);
    
      var now = new Date();
      var then = new Date(rentPayDate); 
      var gap = then.getTime() - now.getTime();
      gap = Math.floor(gap / (1000 * 60 * 60 * 24));
      $("#dday").html(gap);
      
   })
}


