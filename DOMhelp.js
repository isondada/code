DOMhelp={
	// 获取当前的节点的最后一个兄弟节点
	lastSibling:function(node)
	{
		var tempObj = node.parentNode.lastChild;
		while(tempObj.nodeType!=1 && tempObj.previousSibling!=null)
		{
			tempObj = tempObj.previousSibling;
		}
		return (tempObj.nodeType == 1) ? tempObj : false;
	},

	// 获取当前的节点的第一个兄弟节点
	firstSibling:function(node)
	{
		var tempObj = node.parentNode.firstChild;
		while(tempObj.nodeType!=1 && tempObj.nextSibling!=null)
		{
			tempObj = tempObj.nextSibling;
		}
		return (tempObj.nodeType == 1) ? tempObj : false;
	},

	// 获取当前节点的第一个文本节点的内容
	getText:function(node)
	{
		if(!node.hasChildNodes()){return false;}
		var reg = /^\s+$/;
		var tempObj = node.firstChild;
		while(tempObj.nodeType!=3 && tempObj.nextSibling!=null || reg.test(tempObj.nodeValue))
		{
			tempObj = tempObj.nextSibling;
		}
		return tempObj.nodeType==3 ? tempObj.nodeValue : false;
	},

	// 设置当前节点的第一个文本节点的内容 
	setText:function(node)
	{
		if(!node.hasChildNodes()){return false;}
		var reg = /^\s+$/;
		var tempObj = node.firstChild;
		while(tempObj.nodeType!=3 && tempObj.nextSibling!=null || reg.test(tempObj.nodeValue))
		{
			tempObj = tempObj.nextSibling;
		}
		if(tempObj.nodeType==3)
		{
			tempObj.nodeValue = txt;
		}
		else
		{
			return false;
		}
	},

	// 获取当前节点相邻的非文字或换行的节点
	// direction=1 为下一个节点， =-1 为上一个
	closestSibling:function(node, direction)
	{
		var tempObj;
		if(direction==-1 && node.previousSibling!=null)
		{
			tempObj = node.previousSibling;
			while(tempObj.nodeType!=1 && tempObj.previousSibling!=null)
			{
				tempObj = tempObj.previousSibling;
			}
		}
		else if(direction==1 && node.nextSibling!=null)
		{
			tempObj = node.nextSibling;
			while(tempObj.nodeType!=1 && tempObj.nextSibling!=null)
			{
				tempObj = tempObj.nextSibling;
			}
		}
		return tempObj.nodeType==1 ? tempObj : false;
	},

	// 创建一个内容为txt链接为to的链接
	createLink:function(to, txt)
	{
		var tempObj = document.createElement('a');
		tempObj.appendChild(document.createTextNode(txt));
		tempObj.setAttribute('href', to);
		return tempObj;
	},

	// 创建内容为txt的节点
	createTextElm:function(elm, txt)
	{
		var tempObj = document.createElement(elm);
		tempObj.appendChild(document.createTextNode(txt));
		return tempObj;
	},

	// 添加、移除标签上的class
	// swap:替换  add:添加  remove:移除  check:检查(返回布尔值)
	cssjs : function(a, o, c1, c2)
	{
		switch (a)
		{
			case 'swap': 
				if(!DOMhelp.cssjs('check', o, c1))
				{
					o.className.replace(c2, c1);
				}
				else
				{
					o.className.replace(c1, c2);
				}
			break;

			case 'add':
				if(!DOMhelp.cssjs('check', o, c1))
				{
					o.className += o.className ? ' '+c1 : c1;
				}
			break;

			case 'remove':
				var rep = o.className.match(' '+c1) ? ' '+c1 : c1;
				o.className = o.className.replace(req, '');
			break;

			case 'check':
				var found = false;
				var temparray = o.className.split(' ');
				for (var i=0; i<temparray.length; i++)
				{
					if (temparray[i] == c1)
					{
						found == true;
					}
				}
				return found;
			break;
		}
	}

	// Simulate a debugging console to avoid the need for alerts
	initDebug:function()
	{
		if(DOMhelp.debug){DOMhelp.stopDebug();}
		DOMhelp.debug = document.createElement('div');
		DOMhelp.debug.setAttribute('id', DOMhelp.debugWindowId);
		document.body.insertBefore(DOMhelp.debug, document.body.firstChild);
	},
	setDebug:function(bug)
	{
		if(!DOMhelp.debug){DOMhelp.initDebug();}
		DOMhelp.debug.innerHTML += bug + '\n';
	},
	stopDebug:function()
	{
		if(DOMhelp.debug)
		{
			DOMhelp.debug.parentNode.removeChild(DOMhelp.debug);
			DOMhelp.debug=null;
		}
	}
}