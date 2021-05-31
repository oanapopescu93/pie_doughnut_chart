"use strict"

function Linechart(mycanvas, mylegend, dataSource){
    var self = this;
	
    var canvas = document.getElementById(mycanvas);
    var ctx = canvas.getContext("2d");	
	canvas.width = 1200;
	canvas.height = 400;
	
	var dataArr = []; 
	for (var i in dataSource) {
	  dataArr.push(dataSource[i].value);
	}
	var arrayLength = dataArr.length; 
	var largest = 0;
	
	var top = 50;  
	var bottom = 300;  
	var left = 50;  
	var right = 1200; 

	var height = 300;
	var width = 1000;
    
    this.draw = function(){
		console.warn(dataSource);		
		ctx.clearRect( 0, 0, 1200, 400 ); 
		
		drawAxis();	
		
		drawTitle("black", "bold 14px Arial");
		
		drawAxisValues(); 		
		
		drawLines();
		
		drawDots();	
		
		drawDotValues();
		
	}	
	
	function drawAxis(){
		ctx.beginPath(); 
		ctx.moveTo(left, bottom);
		ctx.lineTo(right, bottom);
		ctx.stroke();
		
		ctx.beginPath(); 
		ctx.moveTo(left, top);
		ctx.lineTo(left, bottom);
		ctx.stroke();
	}
	
	function drawTitle(text_color, text_font){
		ctx.fillStyle = text_color;
		ctx.font = text_font;
		ctx.fillText( "Months", right / 2 - 20, bottom + top);      
		ctx.fillText( "Money", left - 20, top - 10);	
	}
	
	function drawAxisValues(){
		ctx.beginPath();
		ctx.fillText( "1", left - 4, bottom + 25);      
		for( var i = 1; i < arrayLength; i++ ){          
			ctx.moveTo( right / arrayLength * i +left, (height - dataArr[ i ] / largest * height)); 
			ctx.fillText( ( i + 1 ), right / arrayLength * i + left - 4, bottom + 25);		
		}      
		ctx.stroke(); 
	}
	
	function drawLines(){
		for( var i = 0; i < arrayLength; i++ ){      
			if( dataArr[ i ] > largest ){          
				largest = dataArr[ i ];      
			}  
		}    
		ctx.beginPath();  		
		ctx.strokeStyle = "black"; 
		
		if(( height - dataArr[i] / largest * height ) >= 300){
			ctx.moveTo( left, (height - dataArr[0] / largest * height));
		} else {
			ctx.moveTo( left, (height - dataArr[0] / largest * height) + top);
		}			
		
		for( var i = 1; i < arrayLength; i++ ){
			if(( height - dataArr[i] / largest * height ) >= 300){
				ctx.lineTo( right / arrayLength * i + left, ( height - dataArr[i] / largest * height ));
			} else {
				ctx.lineTo( right / arrayLength * i + left, ( height - dataArr[i] / largest * height ) + top);
			}
			
		} 		
		ctx.stroke();
	}
	
	function drawDots(){
		ctx.beginPath();
		if(( height - dataArr[i] / largest * height ) >= 300){
			ctx.arc(left, (height - dataArr[0] / largest * height), 2, 0, 2 * Math.PI);
		} else {
			ctx.arc(left, (height - dataArr[0] / largest * height) + top, 2, 0, 2 * Math.PI);
		}
		for( var i = 1; i < arrayLength; i++ ){ 
			if(( height - dataArr[i] / largest * height ) >= 300){
				ctx.moveTo(right / arrayLength * i + left, ( height - dataArr[i] / largest * height ));
				ctx.arc(right / arrayLength * i + left, ( height - dataArr[i] / largest * height ), 2, 0, 2 * Math.PI);
				ctx.fill();	
			} else {
				ctx.moveTo(right / arrayLength * i + left, ( height - dataArr[i] / largest * height ) + top);
				ctx.arc(right / arrayLength * i + left, ( height - dataArr[i] / largest * height ) + top, 2, 0, 2 * Math.PI);
				ctx.fill();
			}
		}
	}

	function drawDotValues(){ 
		ctx.beginPath();
		if(( height - dataArr[i] / largest * height ) >= 300){
			ctx.fillText( dataArr[0], left, (height - dataArr[0] / largest * height) - 10);
		} else {
			ctx.fillText( dataArr[0], left - 15, (height - dataArr[0] / largest * height) + top - 10);
		}
		for( var i = 1; i < arrayLength; i++ ){    
			if(( height - dataArr[i] / largest * height ) >= 300){
				ctx.moveTo(right / arrayLength * i + left - 4, ( height - dataArr[i] / largest * height ));
				ctx.fillText( dataArr[i], right / arrayLength * i + left - 4, ( height - dataArr[i] / largest * height ) - 10);	
			} else {
				ctx.moveTo(right / arrayLength * i + left - 15, ( height - dataArr[i] / largest * height ) + top);
				ctx.fillText( dataArr[i], right / arrayLength * i + left - 15, ( height - dataArr[i] / largest * height ) + top - 10);	
			}				
		}      
		ctx.stroke(); 
	}
}