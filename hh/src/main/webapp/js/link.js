$("#dashboardLink").click(function(event) {
	window.location.href = serverAddr + "/html/dashboard/dashboard.html"
});

$("#myInfo").click(function(event) {
   alert("내정보");
   window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#gongziLink").click(function(event) {
	window.location.href = serverAddr + "/html/board/gongzi.html"
});

$("#complainLink").click(function(event) {
	window.location.href = serverAddr + "/html/board/complain_l.html"
});

$("#myinfoLink").click(function(event) {
	alert("내정보");
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});


$("#tenantLink").click(function(event) {
	window.location.href = serverAddr + "/html/contract/contractMnge.html"
});