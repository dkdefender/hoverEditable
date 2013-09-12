/*
Hover Editable Plugin for jQuery by DarkDefender aka Lazutin Igor Andreevich, 2013 year
usage : $(<selector>).hoverEditable({height : height, color : color});
*/
(function( $ ) {
$.fn.hoverEditable = function(options) {
	var settings = $.extend( {
	color : "#F2F7A3",
	height : 20
	}, options);
	
	var textareaclass = "fullwidth";
	var textareaid = "hoverEdit";
	var hoverArea = "comm_editable_area";
	var layerOpened = 0;
	var currentObject;

	$(".item_comment").on("focus mouseover keyup",function()
		{
		$("#"+hoverArea).remove();
		layerOpened = 0;
			
		currentObject = this;
		var pos = $(this).offset();
		var top = pos.top;
		var left = pos.left;
		var thiswidth = $(this).width();
		var thisheight = $(this).height();
		
		$("body").append("<div id='"+hoverArea+"'></div>");
		$("#"+hoverArea).hide();
		$("#"+hoverArea).css("background",settings.color);
		
		$("#"+hoverArea).css("width","auto");
		$("#"+hoverArea).css("height",settings.height+"px");
		$("#"+hoverArea).css("display","block");
		$("#"+hoverArea).css("position","absolute");
		$("#"+hoverArea).css("top",top-thisheight*1.5+"px");
		$("#"+hoverArea).css("left",left+(thiswidth/2)+"px");
		$("#"+hoverArea).css("padding","5px");
		$("."+textareaclass).css("width","100%");
		$("."+textareaclass).css("background","none");
		$("."+textareaclass).css("border","none");
		$("."+textareaclass).css("resize","none");
		$("."+textareaclass).css("outline","none");

		
		$("#"+hoverArea).html($(this).val());
		$("#"+hoverArea).show();
		
		$(currentObject).bind("keyup change click hover input paste",function(event)
			{
			checkHoverLayer();
			});
		checkHoverLayer();
		});
	
	function checkHoverLayer()
		{
		$("#"+hoverArea).html($(currentObject).val());
		if($(currentObject).val() == "")
			{
			$("#"+hoverArea).remove();
			layerOpened = 0;
			}
			else
			{
			layerOpened = 1;
			}
		}
	
	$(document).on("click",function(event)
		{
		var clickedObj = event.target;
		var current_id = $(clickedObj).attr("id");
		if((current_id != hoverArea && clickedObj != currentObject) && layerOpened == 1)
			{
			$("#"+hoverArea).remove();
			layerOpened = 0;
			}
		});
};
})(jQuery);