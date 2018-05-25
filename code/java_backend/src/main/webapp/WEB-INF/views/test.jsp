<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<script type="text/javascript" src="../../js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="../../js/jquery-1.9.1.min.js"></script>

<title>Insert title here</title>

<script type="text/javascript">
$(document).ready(function(){
	
	alert('post submit!');
	var obj = {
			
			"deviceCode": 'de', 
			"deviceName": '核磁共振机',
			"deviceModel":'model0122328',
			"hospitalId":1000002,
			"departmentId":16,
			"deviceType":2,
			"usageState":1,
			"serialNumber":"SN120002",
			"qrCode":"xxxw",
			"creater":10002,
			"modifier":10002
			};
	
	$.post("/equip/addDevice", obj, function (data) {
		   
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(data.data[0].deviceId);
    });
	
});


</script>
</head>

<body>
<%out.println("Context路径：XXXXXXXX hello spring boot -- jsp"); %>
</body>
</html>