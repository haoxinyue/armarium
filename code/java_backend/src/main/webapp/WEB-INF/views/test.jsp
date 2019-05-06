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
function addDevice() {

    var obj = {

            "deviceCode": 'simenz22', 
            "deviceName": '血糖监护机',
            "deviceModel":'model0122321',
            "assetNo":'A0122321',
            "deviceDesc":"",
            "hospitalId":1000002,
            "departmentId":16,
            "deviceType":2,
            "usageState":1,
            "serialNumber":"SN120002",
            "creater":10002,
            "modifier":10002
            };
    
    $.ajax({
        type: "post",
        url:"/equip/addDevice",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
            alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(JSON.stringify(dat.data));
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

function getDevice() {

    var obj = {

            "deviceId": 100005034, 
            };
    
    $.ajax({
        type: "post",
        url:"/equip/getDevice",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
            alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(JSON.stringify(dat.data));
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

function addMtCase() {
	alert('addMtCase');
    var obj = {
            "caseSubject": '外科', 
            "caseRemark": '外科设备报修',
            "reporterName":"王新生",
            "reporterMobile":"18915350858",
            "reporterUserId":10002,
            "deviceId":100004880,
            "creater":10001,
            "modifier":10001
            };
    
     $.post("/case/addMtCase", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(data.data[0].caseId);
    });
}

function getTimeline() {
    alert('dev_timeline');
    var obj = {
            "deviceId":100002893
            };
    
     $.post("/dev_timeline/getTimelineList", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(JSON.stringify(data.data));
    });
}

function getShafts() {
    alert('getShafts');
    var obj = {
    		"caseId":4
            };
    
     $.post("/case/getCaseTimeShaft", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(JSON.stringify(data.data));
    });
}

function rotateState() {
    alert('rotateState');
    var obj = {
            "assigneeUserId":10003
            };
    
     $.post("/case/rotateMtCase", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(JSON.stringify(data.data));
    });
}

function sendMsg() {
	var obj = {
            "reporterUserId": 10004, 
            "caseRemark": '维修处理中',
            "caseState": 30,
            "caseId":4,
            "reporterMobile":"18915350858",
            "modifier":10004
            };
	
	$.post("/case/sendMsg", obj, function (data) {
        alert('success!');
        
	});
}

function getMtCaseInfo() {
    alert('getMtCaseInfo');
    var obj = {
            "caseId":10
            };
    
     $.post("/case/getMtCaseInfo", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(JSON.stringify(data.data));
    });
}

function getMtCaseList() {
    alert('getMtCaseList');
    var obj = {
            "assigneeUserId":10004
            };
    
     $.post("/case/getMtCaseList", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(JSON.stringify(data.data));
    });
}

function confirmUserToRole() {
	var obj = {
			"roleId":2,
			"creater":10001,
			"users":[{"userId":10003},
			       {"userId":10004},
			       {"userId":10006},
			       {"userId":10007}]
            };
	
	$.post("/auth/confirmUserToRole", obj, function (data) {
        
        alert("返回代码！:   "+data.code);
        alert("返回信息！:   "+data.message);
        alert(JSON.stringify(data.data));
    });
}

function confirmRole() {
    var obj = {
            "roleId":2,
            "creater":10001,
            "users":[{"userId":10003},
                   {"userId":10004},
                   {"userId":10006},
                   {"userId":10007}]
            };
    
    $.ajax({
        type: "post",
        url:"/auth/confirmUserToRole",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
        	alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(JSON.stringify(dat.data));
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

function addStockCase() {
    var obj = {
            "hospitalId":1000002,
            "planTime":"2018/09/30 12:00:00",
            "depts":[16,260],
            "assigneeUserId":10003,
            "creater":10001,
            "modifier":10001
            };
    
    $.ajax({
        type: "post",
        url:"/stock_tk_case/addStockTKCase",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
            alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(JSON.stringify(dat.data));
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

function getMtCaseInfos() {
    var obj = {
           
            "assigneeUserId":10002
            };
    
    $.ajax({
        type: "post",
        url:"/case/getMtCaseList",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
            alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(JSON.stringify(dat.data));
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

function updMtCase() {
    alert('updMtCase');
    var obj = {
            "reporterUserId": 10004, 
            "caseRemark": '维修处理中',
            "caseState": 30,
            "caseId":4,
            "solveInterval":60,
            "modifier":10004
            };
    
     $.post("/case/updMtCase", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(data.data[0].caseId);
    });
}

function closeInsCase() {

    var obj = {
            "reporterUserId": 10004, 
            "caseRemark": '维修处理中',
            "caseState": 30,
            "caseId":4,
            "solveInterval":60,
            "modifier":10004
            };
    
     $.post("/install_case/closeInsCase", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(data.data[0].caseId);
    });
}

function updDevice() {
    var obj = {
    		accessory: "tyyyyyy",
    			assetNo: "abc123",
    			creater: 10003,
    			departmentId: 307, 
    			deviceCode: "sssss1",
    			deviceDesc: "xxxxx",
    			deviceId: 100000043,
    			deviceModel: "ssssss3",
    			deviceName: "sssss2",
    			deviceOwner: "wang",
    			deviceState: 1,
    			deviceType: 1,
    			hospitalId: 1000001,
    			inspectionInterval: 30,
    			maintenanceEndDate: "2018/11/08",
    			maintenanceInterval: 60,
    			manufacturer: "ssssss8",
    			modifier: 10003,
    			needInspection: 1,
    			needMaintain: 1,
    			needMetering: 0,
    			picture1: "http://47.100.198.255:8080/accessory/queryPic?file=hu1.png",
    			producingPlace: "ssssss7",
    			purchaseAmount: 10200,
    			serialNumber: "ssssss4",
    			usageState: 1
            };
    
    $.ajax({
        type: "post",
        url:"/equip/updDevice",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
            alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(JSON.stringify(dat.data));
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

function closeMtCase() {
    var obj = {
    		caseId: 19,
    		caseRemark: "已完工",
    		caseState: 40,
    		deviceId: 100000022,
    		modifier: 10003,
    		reporterUserId: 10003
            };
    
    $.ajax({
        type: "post",
        url:"/case/closeMtCase",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
            alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(JSON.stringify(dat.data));
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

function addInsCase() {
    var obj = {
            "deviceName": "血压机", 
            "hospitalId": 103,
            "deptId": 1002,
            "deviceType":30,
            "expectedTime":"2018/08/09 12:00:59",
            "deviceModel":"XT-Mod-008",
            "serialNumber":"ea32dbceezqwy12",
            "needMetering":1,
            "creater":10004,
            "modifier":10004
            };
    
     $.post("/equip/updDevice", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);
            alert(data.data.deviceId);
    });
}

function login() {

    var obj = {
            "loginName":"tangwei",
            "loginPassword":"yyy",
            "creater":10001,
            "modifier":10001
            };
    
     $.post("/auth/login", obj, function (data) {
           
            alert("返回代码！:   "+data.code);
            alert("返回信息！:   "+data.message);

    });
}

function bindUser() {
    var obj = {
            openId:"zs19851108",
            loginName:"zhangsan",
            loginPassword:"111",
            
          };
    
    $.ajax({
        type: "post",
        url:"/auth/bindUser",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
            alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(JSON.stringify(dat.data));
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

function getWechatSession() {
    var obj = {
            jsCode:"061wmAj20XmWRI1bxlj20wmOj20wmAjS",

            
          };
    
    $.ajax({
        type: "post",
        url:"/auth/getWechatSession",
        data:JSON.stringify(obj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (dat) {
            alert("返回代码！:   "+dat.code);
            alert("返回信息！:   "+dat.message);
            alert(dat.data);
        
        },
        error: function (e) {
            alert(e);
        }
    });
}

$(document).ready(function(){
	
	//this.login();
});


</script>
</head>

<body>
<%out.println("Context路径：XXXXXXXX hello spring boot -- jsp"); %>
<form action="http://47.100.198.255:8080/accessory/fileUpload" method="POST" enctype="multipart/form-data">
    文件：<input type="file" name="fileUpload"/>
    <input type="submit" />
    <input type="button" value="test" onclick="getMtCaseInfos()"/>
    <input type="button" value="testXX" onclick="getWechatSession()"/>
    <br>
    <img src='http://47.100.198.255:8080/accessory/queryPic?fileName=di.png'  style="width:300px"/>
</form>
<a href="http://47.100.198.255:8080/accessory/queryPic?fileName=di.png">下载test</a>
</body>
</html>