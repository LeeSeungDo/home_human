var bit = {}
console.log("bit : " + bit);

bit.cookieToObject = function() {
	console.log("document.cookie : " + document.cookie);
	var cookies = document.cookie.split(";")
	var obj = {}
	
	if (cookies.length == 0) 
		return obj;
	
	console.log("cookies : " + cookies);
    cookies.forEach(function(data) {
	  var cookie = data.trim().split("=")
	  console.log("cookie : " + cookie);
	  console.log("cookie[0] : " + cookie[0]);
	  console.log("cookie[1] : " + cookie[1]);
	  obj[cookie[0]] = cookie[1].replace(/\"/gi, "")
    });
    
	return obj
}
