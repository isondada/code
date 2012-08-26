DOMhelp={
	// ��ȡ��ǰ�Ľڵ�����һ���ֵܽڵ�
	lastSibling:function(node)
	{
		var tempObj = node.parentNode.lastChild;
		while(tempObj.nodeType!=1 && tempObj.previousSibling!=null)
		{
			tempObj = tempObj.previousSibling;
		}
		return (tempObj.nodeType == 1) ? tempObj : false;
	},

	// ��ȡ��ǰ�Ľڵ�ĵ�һ���ֵܽڵ�
	firstSibling:function(node)
	{
		var tempObj = node.parentNode.firstChild;
		while(tempObj.nodeType!=1 && tempObj.nextSibling!=null)
		{
			tempObj = tempObj.nextSibling;
		}
		return (tempObj.nodeType == 1) ? tempObj : false;
	},

	// ��ȡ��ǰ�ڵ�ĵ�һ���ı��ڵ������
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

	// ���õ�ǰ�ڵ�ĵ�һ���ı��ڵ������ 
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

	// ��ȡ��ǰ�ڵ����ڵķ����ֻ��еĽڵ�
	// direction=1 Ϊ��һ���ڵ㣬 =-1 Ϊ��һ��
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

	// ����һ������Ϊtxt����Ϊto������
	createLink:function(to, txt)
	{
		var tempObj = document.createElement('a');
		tempObj.appendChild(document.createTextNode(txt));
		tempObj.setAttribute('href', to);
		return tempObj;
	},

	// ��������Ϊtxt�Ľڵ�
	createTextElm:function(elm, txt)
	{
		var tempObj = document.createElement(elm);
		tempObj.appendChild(document.createTextNode(txt));
		return tempObj;
	},

	// ��ӡ��Ƴ���ǩ�ϵ�class
	// swap:�滻  add:���  remove:�Ƴ�  check:���(���ز���ֵ)
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