$(function() {
	var num=0;
	var confirmImgData = [];//已选择的图片素材数据
	var confirmVideoData = [];//已选择视频素材数据
	$('.goBack').on('click', function() {
		window.location.href = "/#/projectadmin/systemModeling/cmsModeling/editModel"
	})
	// 图片点击
	$("#imageComponents").click(function() {
		$('#imageTable').bootstrapTable('refresh');
		$("#imageComponent").modal();
		renderImg(confirmImgData);
	});
	//视频点击
	$("#videoComponents").click(function(){
		if(confirmVideoData.length ==0){
			$('#videoTable').bootstrapTable('refresh');
			$("#videoComponent").modal();
			renderVideo(confirmVideoData);
		}else{
			layer.alert('每个场景只能添加一组视频!',{icon: 0,offset: ['170px', '48%'],title:'提示'})
		}
		
	});
	//模态框关闭清空已选择列表
	$('#imageComponent').on('hide.bs.modal', function () {
        confirmImgData = [];
        $("#confirmImgtable").bootstrapTable('load', confirmImgData);
    });
    $('#videoComponent').on('hide.bs.modal', function () {
        confirmVideoData = [];
        $("#confirmVideotable").bootstrapTable('load', confirmVideoData);
    });
    
	// 图片素材
	$("#imageTable").bootstrapTable({
		url: "js/image.json", // 获取表格数据的url
		cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
		striped: true, //表格显示条纹，默认为false
		pagination: true, // 在表格底部显示分页组件，默认false
		pageSize: 5, // 页面数据条数
		pageList: [5],
		//search: true,     //搜索
		// clickToSelect: true, //点击行选择
		pageNumber: 1, // 首页页码
		sortOrder: "desc", // 排序规则
		sortName: "updateTime", // 要排序的列。
		columns: [{
			checkbox: true, // 显示一个勾选框
			align: "center", // 居中显示
		}, {
			field: 'ids', // 返回json数据中的name
			title: '编号', // 表格表头显示文字
			align: 'center', // 左右居中
			valign: 'middle', // 上下居中
			width: 50,
			formatter: function(value, row, index) {
				return index + 1
			}
		}, {
			field: "fodderName",
			title: "素材名称",
			align: "center",
			width: 200,
			valign: "middle"
		}, {
			field: "fodderType",
			title: "类型",
			align: "center",
			width: 80,
			valign: "middle",
			formatter: function(value, row, index) {
				if(value == 1) {
					return "图片";
				} else if(value == 2) {
					return "视频";
				} else if(value == 3) {
					return "文字";
				}
			}
		}]
	});
	//已选择图片素材
	function renderImg(data){
		$("#confirmImgtable").bootstrapTable({
			data:data,
			columns: [{
				checkbox: true, // 显示一个勾选框
				align: "center", // 居中显示
			}, {
				field: 'ids', // 返回json数据中的name
				title: '编号', // 表格表头显示文字
				align: 'center', // 左右居中
				valign: 'middle', // 上下居中
				width: 50,
				formatter: function(value, row, index) {
					return index + 1
				}
			}, {
				field: "fodderName",
				title: "素材名称",
				align: "center",
				width: 200,
				valign: "middle"
			}, {
				field: "fodderType",
				title: "类型",
				align: "center",
				width: 80,
				valign: "middle",
				formatter: function(value, row, index) {
					if(value == 1) {
						return "图片";
					} else if(value == 2) {
						return "视频";
					} else if(value == 3) {
						return "文字";
					}
				}
			}]
		})
	}
	
	$('#confirmAdd').on('click',function(){
		var data = $("#imageTable").bootstrapTable('getSelections');
		if(data.length==0){
			layer.alert('请选择需要增加的素材!',{icon: 0,offset: ['170px', '48%'],title:'提示'})
		}else{
			for(var i=0;i<data.length;i++){
				confirmImgData.push({
					'fodderContext':data[i].fodderContext,
					'fodderName':data[i].fodderName,
					'fodderType':data[i].fodderType
				})
			}
			$("#confirmImgtable").bootstrapTable('load', confirmImgData);
			$("#imageTable").bootstrapTable('refresh');
		}
	})	
	var pageAreaWidth = $('.editModel').width(); //容器宽度
	var pageAreaHeight = $('.editModel').height(); //容器高度
	$("#uploadOK").on('click',function(){
		num++;
		var data = confirmImgData;
		var strLi = ''
		for(var i=0;i<data.length;i++){
			strLi+='<li>'+
					'<img class="dragImage" src="'+data[i].fodderContext+'"/>'+
				'</li>'
						
		}
		var str = '<div class="pictureBox" id="pictureBox_'+num+'">'+
						'<ul class="lunboWrap">'+strLi+
						'</ul>'+
						'<script type="text/javascript">'+
							'setInterval(function(){'+
								'$("#pictureBox_'+num+' .lunboWrap li").eq(0).appendTo("#pictureBox_'+num+' .lunboWrap")'+
							'},2500)'+
						'</script>'+
					'</div>'
		$('.editModel').append(str);
		$( ".pictureBox" ).draggable({
			containment: ".editModel",
			drag: function(event, ui) {
				var widgetWidth = $(ui.helper).width();
				var widgetHeight = $(ui.helper).height();
				if(ui.position.left > pageAreaWidth - widgetWidth) {
					ui.position.left = pageAreaWidth - widgetWidth
				}
				if(ui.position.top > pageAreaHeight - widgetHeight) {
					ui.position.top = pageAreaHeight - widgetHeight
				}
			}
		});
		$( ".pictureBox" ).resizable({
			containment: ".editModel",
			autoHide: true,
			resize: function(event, ui) {
				var width = $(this).width();
				var height = $(this).height();
				$(this).css(
					"width", width);
				$(this).css(
					"height", height);
			}
		});
		$("#imageComponent").modal('hide');
	})
	//插入页面
	function insertPageFn(){
		$.ajax({
            url: "http://192.168.2.88:8891/h5cms/insertPage",
            dataType: "JSON",
            type: "post",
            success: function (result) {
            	console.log(result);
                if(result.status == 200){
                    
                }else{

                }
            }
        });
	}
	$("#savePage").click(function() {
			layer.confirm('确定保存该节目？', {
				btn: ['确定', '取消'] 
			}, function() {
				console.log("你点击了确定!");
			}, function() {
				console.log("你点击了取消!");
			});
		//console.log($(".editModel").html());
	})
	//选择分辨率
	$("#pixel").change(function(){
		if($("#pixel").find("option:selected").text() == '自定义'){
			/*$("#userdefinedPixel").modal();*/
		}else{
			var pixel =  $("#pixel").find("option:selected").text().split('*');
			$('.editModel').css('width',pixel[0]);
			$('.editModel').css('height',pixel[1]);	
		}
	})
	//选择视频素材
	$("#videoTable").bootstrapTable({
		url: "js/video.json", // 获取表格数据的url
		cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
		striped: true, //表格显示条纹，默认为false
		pagination: true, // 在表格底部显示分页组件，默认false
		pageSize: 5, // 页面数据条数
		pageList: [5],
		pageNumber: 1, // 首页页码
		sortOrder: "desc", // 排序规则
		sortName: "updateTime", // 要排序的列。
		singleSelect : true, //表格单选
		columns: [
			{
				checkbox: true, // 显示一个勾选框
				align: "center", // 居中显示
			}, 
			{
				field: 'ids', 
				title: '编号', 
				align: 'center', 
				valign: 'middle', 
				width: 50,
				formatter: function(value, row, index) {
					return index + 1
				}
			}, 
			{
				field: "videoName",
				title: "视频名称",
				align: "center",
				width: 200,
				valign: "middle"
			}, 
			{
				field: "videoType",
				title: "分类",
				align: "center",
				width: 80,
				valign: "middle",
				formatter: function(value, row, index) {
					if(value == 1) {
						return "视频";
					} else if(value == 2) {
						return "视频";
					} else if(value == 3) {
						return "文字";
					}
				}
			},
			{
				field: "videoPath",
				title: "视频路径",
				align: "center",
				width: 200,
				valign: "middle"
			}, 
			{
				field: "videopixel",
				title: "尺寸（像素）",
				align: "center",
				width: 200,
				valign: "middle"
			}, 
			{
				field: "fileSize",
				title: "大小",
				align: "center",
				width: 200,
				valign: "middle"
			},
		]
	});
	//已选择视频素材	
	function renderVideo(data){
		$("#confirmVideotable").bootstrapTable({
			data:data,
			columns: [
				{
					checkbox: true, // 显示一个勾选框
					align: "center", // 居中显示
				}, 
				{
					field: 'ids', 
					title: '编号', 
					align: 'center', 
					valign: 'middle', 
					width: 50,
					formatter: function(value, row, index) {
						return index + 1
					}
				}, 
				{
					field: "videoName",
					title: "视频名称",
					align: "center",
					width: 200,
					valign: "middle"
				}, 
				{
					field: "videoType",
					title: "分类",
					align: "center",
					width: 80,
					valign: "middle",
					formatter: function(value, row, index) {
						if(value == 1) {
							return "视频";
						} else if(value == 2) {
							return "视频";
						} else if(value == 3) {
							return "文字";
						}
					}
				},
				{
					field: "videoPath",
					title: "视频路径",
					align: "center",
					width: 200,
					valign: "middle"
				}, 
				{
					field: "videopixel",
					title: "尺寸（像素）",
					align: "center",
					width: 200,
					valign: "middle"
				}, 
				{
					field: "fileSize",
					title: "大小",
					align: "center",
					width: 200,
					valign: "middle"
				},
			]
		})
	}
	//添加选中视频
	$("#confirmAddvideo").click(function(){
		var videoCheckedArr = $("#videoTable").bootstrapTable('getSelections');
		if(videoCheckedArr.length == 0){
			layer.alert('请选择需要的视频素材!',{icon: 0,offset: ['170px', '48%'],title:'提示'})	
		}else{
			confirmVideoData = [];
			$("#confirmVideotable").bootstrapTable('load', confirmVideoData);
			for(var i=0;i<videoCheckedArr.length;i++){
				confirmVideoData.push({
					'videoName':videoCheckedArr[i].videoName,
					'videoType':videoCheckedArr[i].videoType,
					'videoPath':videoCheckedArr[i].videoPath,					
					'videopixel':videoCheckedArr[i].videopixel,
					'fileSize':videoCheckedArr[i].fileSize,
				})
			}
			$("#confirmVideotable").bootstrapTable('load', confirmVideoData);
			$("#videoTable").bootstrapTable('refresh');
		}
	})
	//确认添加视频
	$("#uploadVideo").click(function(){
		
		$('.editModel').append('<video src="/i/movie.ogg" controls="controls">');
		//console.log(confirmVideoData);
	});
})