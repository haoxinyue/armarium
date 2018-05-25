
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>

<%
String username = request.getParameter("username");
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>

    <base href="<%=basePath%>">
    
    <title>My JSP 'login.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="css/mycss.css">
	<script type="text/javascript" src="../../js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="../../js/jquery-1.9.1.min.js"></script>
	
    <script type="text/javascript">
    function showPic(obj) {
		var src = obj.getAttribute("href");
		var imageHolder = document.getElementById("placeHolder");
		imageHolder.setAttribute("src",src);
	}
	
	function showNode() {
	switch(document.getElementById("sss").firstChild.nodeType) {
	    case 1:
	        alert("第一个为元素节点");
	        break;
	    case 2:
	        alert("第一个为属性节点");
	        break;
	    case 3:
	        alert("第一个为文本节点");
	        break;
	}
	
	alert("节点值为"+$("#sss").firstChild.nodeValue);
	alert("子节点个数为"+$("#sss").childNodes.length);
	}
    </script>
  </head>
  
  <body>

    <div style="height: 30px">
    	用户名:   <input type="text" id="UserID" name="userName" value="<%=username%>"></input>
    </div>
    <div>密码：   <input type="password" id="pass" name="password" value="${password}"></input>  
    </div>  
    <%out.println(basePath); %>
   <div title="money">${amount}</div>
    <div>个人金额： 
    <input type="text" id="money" name="money" value="${money}"></input>
    </div>
    <br>
    <input type="button" onclick="showNode();" value="ttttt">
    <div id="sss">
        <ul>
           <li>
           <a href="entertainment/019.jpg" title="唐嘉怡" onclick="showPic(this);return false;">唐嘉怡</a>
           </li>
           <li>
           <a href="entertainment/006.jpg" title="唐炜" onclick="showPic(this);return false;">唐炜</a>
           </li>
        </ul>
        
    </div>
    <div>
        <img id="placeHolder" alt="my Gallery" src="">
    </div>
    <div>
	    
    </div>
    <div>

    
    </div>
    <br>

    <div ><%out.println("Context路径："+path); %></div>

  </body>
</html>
