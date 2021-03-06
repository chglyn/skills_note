//jQuery源码的解析
$(function(){ ... }) --> $(document).ready(function(){ ... }) --> $().ready() -->jQuery.ready.promise().done(fn) 
-->if(document.readyStatus === 'complate') { ... }else{ ...//complated } --> $.ready() --> readyList.resolveWidth(document, [jQuery]) --> fn

(function(window, undefined) { //undefined --> 防止被外部修改
	/*
		1、首先定义一些变量和函数 
		  平常使用jquery时的函数：jQuery = function() {};
		  var undefined = 1;
		  console.log(undefined) --> 1 ie6/7
		  使用typeof window.a == 'undefined' 判断

		2、jQuery基于prototype面向对象的程序 (添加一些方法和属性，只能给原生的对象使用）
		eg：
			$('div').css();
			var arr=new Array();
			arr.push();
			arr.sort();
			
			jQuery.fn = jQuery.prototype = {
				jquery：版本
					alert($().jquery)
				constructor: 修正指向问题
					function A(){}
					//A.prototype.constructor = A;
					//A.prototype.name = 'cherry';
					//A.prototype.age = 30;
					A.prototype = {
						constructor: A
						name: 'sunny',
						age: 18
					}
					var a = new A();
					alert(a.constructor)
				init() 初始化和参数管理
					$('false/undefined/null/""')
					$('#div/div/.li/ #div div.class')
					$('<li>/<li>hello')
						//match = null;
						//match = [null, '<li>', null]; //$('<li>')
						//match = ['#div', null, 'div1']; //$('#div')
						//match = ['<li>hello</li>', '<li>', null]; //$('<li>hello')
						//创建元素 $('<li>', document/contentWidow.document) $('<li>', $(document))
						/*把字符串转化为数组 parseHTML
							var str = '<li>1<li><li>2</li>';
							//var str = '<li>1<li><li>2</li><script>alert(1)<\/script>';
							var arr = jQuery.parseHTML(str, document, false); //document当前,还有其他;true 设置script
							$.each(arr, function(i) {
								$('ul').append(arr[i])
							})

							var arr = [1, 2];
							var arr2 = [3, 4];
							console.log($.merge(arr, arr2)); //对外合并数组 对内合并数组和JSON

							$('<li>', {title:'hi', html:'hello', css:{color:'red'}}).appendTo('ul'); //只支持单标签
							//this.html('hello')

							rootjQuery : $(document)

							find底层 --> sizzle看下面
						*/

					$(this/document)
						//判断nodeType区别
					$(function() {})
						//判断是不是方法
					$([]/{}) 
						//<div></div>
						//$('div') == $($('div'))
					//jQuery.makeArra(selector).push() 把类数组转化成数组的方法 
					//$.makeArra(oDiv, {length:0}) 内部使用两个参数转化成JSON
				selector 存储选择器字符
				length this对象的长度
				toArray() 转数组
					//<div></div><div></div>
					//console.log($('div').toArray()); //[div, div]
				get() 转原生集合
					//<div></div><div></div><div></div>
					//$('div').get(参数:正负数).innerHTML = 'hello';
					//$('div').get() 不传参得到一个集合 具有length属性
				pushStack() JQ对象的入栈
					/*栈 --> 先进后出
					<div>1</div><span>2</span>
					$('div').pushStack($('span')).css('color', 'red').end().css('color', 'yellow');
					end() 回溯到栈的下一层 --> 栈的里面 div
					*/
				each() 遍历集合
					//工具方法(底层)  实例方法(架构)  
				ready() DOM加载的接口
					//添加一个回调promise().done()
				slice() 集合的截取
					//截取不包括结束位置
				first() 集合的第一项
				last() 集合的最后一项
				eq() 集合的指定项
					// eq(参数:正负数)
				map() 返回新集合
					//arr = $.map(Array, function(elem, i) {
					//	return elem;
					//})
				end() 返回集合前一个状态
				push() 内部使用
				sort() 内部使用
				splice() 内部使用
			}
		3、extend： 比如jQuery类方法（方便写插件）
			/*
				$.extend() 
				当只写一个对象自变量的时候，JQ中扩展插件的形式
					$.extend({
						foo: function() {
							console.log(1);
						},
						fn: function() {
							console.log(2);
						}
					})
					$.foo();
					$.fn();

				$.fn.extend() 扩展JQ实例方法
					$.fn.extend({
						foo: function() {
							console.log(3);
						},
						fn: function() {
							console.log(4);
						}
					})
					$().foo();
					$().fn();
				$.extend() --> this --> this.foo() -->$.foo()
				$.fn.extend() --> this --> $.fn --> this.foo -->$().foo() 
				$.fn --> JQ.prototype

				当写多个对象自变量的时候，后面的对象都是扩展到第一个对象身上
				var a = {};
				$.extend(a, {name:'sunny'}, (age: 18));
				console.log(a);

				还可以做深拷贝和浅拷贝
				var a = {}, b = {name:'sunny'};
				$.extend(a, b);
				a.name = 'hello';
				console.log(a.name); //sunny

				b = {name: {age: 18}};
				$.extend(/true/, a, b); //true深拷贝
				a.name.age = 30;
				console.log(a.name.age); //30

			*/
		4、jQuery.extend:扩展一些工具方法(jQuery.prototype)（eg：$.trim(), $.proxy() 方法，既可以给jQuery用也可以给原生js使用）
			jQuery.extend({
				expando 生成唯一JQ字符串（内部）
				noConflict() 防止冲突
					var $ = 123;
					$.noConflict($);
				isReady DOM是否加载完（内部）
				readyWait 等待多少文件的计数器（内部）
				holdReady() 推迟DOM触发
				ready() 准备DOM触发
				isFunction() 是否为函数
				isArray() 是否为数组
				isWindow() 是否为window
					$.isWindow(window);
				isNumber() 是否为数字
				type() 判断数据类型
				isPlanObject() 是否为对象自变量
				isEmptyObject 是否为空对象
					var obj = {name:'sunnyt'};
					console.log($.isEmptyObject(obj));//true
				error() 抛出错误
					$.error('msg');
				parseHTML() 解析节点
					str = '<li></li><script><\/script>';
					console.log($.parseHTML(str, document, true)); //true处理script标签,默认false; 返回一个数组
				parseJSON() 解析JSON
					var str = '{name: "hello"}';
					console.log($.parseJSON(str));
					//JSON.parse和eval  JSON.parse安全性高
					//JSON.stringify()
				parseXML() 解析XML
				noop() 空函数
					function fn() {
						this.default = {
							show: function() {}
							//show: $.noop --> $.noop 代替 function() {}
						}
					}
					fn.prototype.init = function(opt) {
						$.extend(this.default, opt);
					}
				globalEval() 全局解析JS --> 局部变量转化全局的
					function fn() {
						var val = true;  //函数外访问不了
						jQuery.globalEval(var val = true); 
					}
					fn();
					//源码中判断 严格模式下不支持eval，进行判断
					function fn() {
						var val = eval;
						val('var a = 1');
						//eval('var a = 1'); 不能直接写成eval, js中eval是关键字
					}
					fn();
					alert(a); //1
				camelCase() 转驼峰(内部)
					//margin-top --> marginTop; ie下不转化首字母大写-->msTransform
				nodeName() 是否为指定节点名(内部)
					alert($.nodeName(document.body, 'body'));		
				each() 遍历集合
					$.each(json, function(key, val) {
						console.log(val);
						return false; //只打印第一个值
					})
				trim() 去前后空格
					str.trim();
				makeArray(参数) 类数组转化为真数组
					//内部使用 makeArray(参数, {length:0})
				inArray() 数组版出现的位置 indexOf-->字符串中出现的位置
					var arr = ['a', 'b', 'c'];
					$.inArray('b', arr); //1-->b在数组中出现的位置
				merge(arr1, arr2) 合并数组
				grep() 过滤新数组
					var arr = [1, 2, 3, 4];
					var newArr = $.grep(arr, function(n, i) { //n 对应的值，i对应的下标
						return n > 2; //为真存入新数组
					}, true); //true 取相反值; false取真值
					console.log(newArr);
				map() 映射新数组
					var arr = [1, 2, 3, 4];
					arr = $.map(arr, function(n) {
						return n + 1; //使用map必须使用return
					})
					console.log(arr);
				guid 唯一标识符，可以累加 (内部) 例如：绑定标识 
				proxy() 改this指向	<!-- jquery中方式 -->
					function fn(参数1, 参数2) {
						console.log(this);
						console.log(参数1, 参数2);
					}
					fn(); // window
					// $.proxy(fn, document) == fn(); 
					//执行this指向document 添加括号执行 传参方式
					$.proxy(fn, document)(参数1, 参数2); 
					$.proxy(fn, document, 参数1, 参数2)();
					$.proxy(fn, document, 参数1)(参数2);
				access() 多功能值操作（内部）
					eg: $().css(); $().attr(); --> set/get; 字符串格式和JSON格式
				now() 当前时间  --> Date.now 距离1970的毫秒数 == $.now().getTime()
				swap() css交换(内部) -->  能获取隐藏元素的值 原生js不能获取
				//jQuery中隐式的添加block-->设置绝对定位-->计算完再还原隐藏
				isArraylike() 判断是不是类数组
			})
		5、Sizzle：复杂选择器的实现
		  eg：$('ul li + p input')

		6、Callbacks: 回调对象： 对函数的统一管理
		  eg: --> 观察者模式
			function fn1() { console.log(1); }
			function fn2() { console.log(2); }
			var cb = $.Callbacks();
			cb.add(fn1);
			cb.add(fn2);
			//合并添加参数 cb.add(fn1, fn2);  cb.add([fn1, fn2]);
			cb.fire(); //调用fire()方法执行 1, 2; 支持出发多次
			cb.remove(fn2); //删除一个方法
			cb.fire(); //调用fire()方法执行 1 
			//外部不能直接调用立即函数里面的函数; 使用Callbacks调用立即执行函数,如下:
			var opt = $.Callbacks();
			(function() {
				function fn() {
					console.log(1);
				}
				opt.add(fn);
			}())
			opt.fire(); //1
			//Callbacks参数剖析 
			$.Callbacks('once'); --> 只触发一次
			$.Callbacks('memory'); --> 记忆 先调用fire() 再add()也可以执行
			$.Callbacks('unique'); --> 去重, 相同的参数名只处理一次
			$.Callbacks('stopOnFalse'); --> 所添加的函数, 再添加数组过程中返回值是false, 后续的函数不会执行
			//$.Callbacks(once, memory); $.Callbacks(once:true, memory:true); 参数可以组合
			//fire(参数) 可以添加参数, 函数里面接受参数 
			// disable静止方法, lock 锁方法 
		------------------------------------------------------
			var cb = $.Callbacks();
			setTimeout(function() {
				console.log(1);
				cb.fire();
			}, 1000);
			cb.add(function() {
				console.log(2);
			})
			//result --> 1, 2
		7、Deferred：延迟对象(只对应一个延迟操作，)：对异步的统一管理  --> 其实还是调用Callbacks
			var fd = $.Deferred();
			setTimeout(function() {
				console.log(1);
				fd.resolve();
				//fd.reject(); --> fd.fail(function() { ... }); 失败触发的回调
				//fd.notify() --> fd.progress(function() { ... }); 进行时触发的回调
			}, 1000)
			fd.done(function() { //成功触发的回调
				console.loag(2);
			})
			//result --> 1, 2
			//done函数先存储在fd里面，在resolve执行后done再执行
			//调用ajax简写 $.ajax('xxx.php').done(function() { ... }).fail(function() { ... });
			
			var fd = $.Deferred();
			setTimeout(function() {
				fd.reject(); //可以传参数 对应then接受参数
			}, 1000)
			fd.then(function() { //成功... }).then(function() { //失败... }).then(function() {  //进度... });
			//promise没有三种类型状态，不能调用; deferred可以
			
			//when 辅助方法... （when对应多个延迟对象）
			语法：$.when().done()	
			function fn1() {
				var df = $.Deferred();
				df.resolve();
				return df;
			}
			function fn2() {
				var df = $.Deferred();
				//df.resolve();
				df.reject();
				return df; 
			}
			//--> 上面函数return必须是个延迟对象, 省略和普通函数一样直接跳过不执行
			$.when(fn1(), fn2()).done(function() {
				console.log('成功'); //传过来的参数都完成才执行
			}).fail(function() {
				console.log('失败'); //只要传过来的参数有一个未完成就执行
			})
		8、support：功能检测 （处理原生js浏览器兼容性问题）
		   	support.checkOn --> true 新版本webkit 否则旧版本 webkit
			//在每个浏览器上打印属性
		 	for(var prop in $.support) {
				console.log($.support[prop]); 
			}
			//onfocusin onfocusout 支持冒泡事件(只有ie) 
			//content-box 标准模式 向外伸张 border-box 怪异模式 向内收缩
		9、data() ：数据缓存
			//DOM元素与对象之间相互在引用，大部分浏览器就会出现内存泄漏
			var oDOM = document.getElementById(div), 
			    obj = {};
			oDOM.name = obj;
			obj.name = oDOM;
			
			$(elem).data('name', 'hello'); 
			// data适合挂载JSON  obj...
			
			var obj = { name: 'helllo' };
			//Object.freeze(obj);  只能读取对象的属性, 不能修改对象的属性
			obj.name = 'hi';
			console.log(obj.name);
			
			Object.defineProperty(obj, 0, { 
				get: function() {
					return {};
				}
			})
			
			//html5获取属性 
			<div data-cs-all="测试"></div>
			console.log($('div').get(0).dataset.csAll);
		10、队列方法 队列管理 (可控)
			queue：入队  相当于数组 push()
			dequeue：出队 相当于数组 shift()
			//例如 连续改变元素的位置
			$(elem).animate({ left:100 });
			$(elem).animate({ top:100 });
			//只调用进队 没有出队不会执行
			function fn() {
				console.log(1);
			}
			//$.queue(document, 'fn');
			//$.queue(document, 'fn', a);
			$.queue(document, 'fn', [fn, ...]);
			//$.dequeue('fn');
			//内部名字 fx --> $(elem).animate({ ... }).queue('fx', function(next) { text();(出队...) }).animate({ ... });
		11、对元素属性的操作
			attr() prop() val() addClass() 等方法对元素属性的操作
			//底层实现方法
			$(elem).attr('name', 'hello'); --> setAttribute('name', 'hellow');
			$(elem).prop('name', 'hello'); --> document.getElementById('div').name = 'hello';或 elem.['name'] = 'hello';
			//以上适合挂载id class ...
			attr() --> 可以获取自定义属性 eg: elem.attr('title');
			prop() --> 自定义属性有些浏览器不识别 eg: elem.prop('title'); --> 火狐不识别
		 	
			//连续删除多个属性 $(elem).removeAttr(id, class, ...);
			//连续添加多个class $(elem).addClass(class1, class2, ...);
			
			//toggleClass存在的className就删除，没有就添加className; eg:切换 $(elem).toggleClass(className);
			toggleClass(className, true); //true --> 不管className是否存在都是添加, false不管className是否存在都是删除
			//hasClass 检测是否存在class
			
			//addClass 回调
			$(elem).addClass(function() {
				//console.log(index); 给元素动态添加className
				return className + index;
			})
			
			//能通过链式操作 是通过return this实现(this指向一个对象) ***
			$(elem).addClass(classsName).html('xxx').click(function() { ... });
			//每次执行完都返回一个对象($(elem).addClass(classsName)返回一个对象); this指的每次生成的对象
			
			//下拉多选 multiple属性
		12、事件操作的方法
			eg：on() trigger()等方法
		13、DOM操作
			eg：添加 删除 获取 包装等
		14、css方法：样式的操作
			eg： 加减乘除等
		15、提交的数据和ajax()操作
			eg：跨域 ajax load getJSON 等
		16、animate()：运动的方法 show() hide() fadeout()等
		17、offset() scrollTop()等 位置和尺寸的方法
		18、JQ支持模块化模式
		19、在底部挂载window上暴露出去(对外提供的接口) window.jQuery = window.$ = jQuery;
	*/
}(window)) //window --> 传参比较快，压缩可以识别
