"use strict"

function Piechart(mycanvas, mylegend, dataSource, colors, doughnutHoleSize){
    var self = this;	
	
    var canvas = document.getElementById(mycanvas);
    var ctx = canvas.getContext("2d");	
	canvas.height = 300;
    
    this.draw = function(){		
		var total_value = 0;
        var color_index = 0;
		var start_angle = 0;
		
        for (var i in dataSource){ 
			total_value = total_value + dataSource[i].value;
        }     
		
		for (var i in dataSource){  
			var slice_angle = 2 * Math.PI * dataSource[i].value / total_value;
						
			drawPieSlice(
                ctx,
                canvas.width/2,
                canvas.height/2,
                Math.min(canvas.width/2, canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                colors[color_index%colors.length]
            );
 
            start_angle = start_angle + slice_angle;
            color_index = color_index + 1;
        }
		
		for (var i in dataSource){ 
			var val = dataSource[i].value;
			var slice_angle = 2 * Math.PI * val / total_value;
			var pieRadius = Math.min(canvas.width/2,canvas.height/2);
			var labelX = canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
			var labelY = canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
			
		 
			if (doughnutHoleSize){
				var offset = (pieRadius * doughnutHoleSize ) / 2;
				labelX = canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
				labelY = canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);               
			}
			
			//console.warn(labelX,labelY);
			
			ctx.beginPath();
			ctx.rect(labelX-18,labelY-20, 50, 30);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.strokeStyle = 'black';
			ctx.stroke();
			ctx.closePath();
		 
			var labelText = Math.round(100 * val / total_value);
			ctx.fillStyle = "black";
			ctx.font = "bold 18px Arial";
			ctx.fillText(labelText+"%", labelX-10,labelY);	
			
			start_angle = start_angle + slice_angle;			
        } 
		
		if(doughnutHoleSize){	
			drawPieSlice(
                ctx,
                canvas.width/2,
                canvas.height/2,
                doughnutHoleSize * Math.min(canvas.width/2,canvas.height/2),
                0,
                2 * Math.PI,
                "#fff"
            );
		} 
		
		if(mylegend){
			$('#' + mycanvas).after('<div class="legend" id="' + mylegend + '"></div>');
			
            var legendHTML = "";
            for (var i in dataSource){ 
                legendHTML = legendHTML + "<div><span style='display:inline-block;width:20px;background-color:"+colors[i]+";'>&nbsp;</span> "+dataSource[i].name+"</div>";
            }
            $('#' + mylegend).html(legendHTML);
		}
		
	}	
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(centerX,centerY);
	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	ctx.closePath();
	ctx.fill();
}
