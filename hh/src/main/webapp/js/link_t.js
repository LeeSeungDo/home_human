$("#dashboardLink").click(function(event) {
	alert("메인");
	window.location.href = serverAddr + "/html/dashboard/dashboard_t.html"
});

$("#gongziLink").click(function(event) {
	alert("공지");
	window.location.href = serverAddr + "/html/board/gongzi_t.html"
});

$("#complainLink").click(function(event) {
	alert("민원");
	window.location.href = serverAddr + "/html/board/complain_t.html"
});

$("#myinfoLink").click(function(event) {
	alert("내정보");
	window.location.href = serverAddr + "/html/auth/myinfo_t.html"
});