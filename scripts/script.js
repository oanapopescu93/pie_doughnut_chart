$(document).ready(function(){
	var myLinechart = new Linechart("year_progress", "incomes_legend", progress_element); 
	myLinechart.draw();
	var myPiechart = new Piechart("incomes", "incomes_legend", income_element, mycolors_income); 
	myPiechart.draw();
	var myPiechart01 = new Piechart("expences", "expences_legend", expence_element, mycolors_expence, 0.5); 
	myPiechart01.draw();

    $(".years-list li").click(function(){
        $(".years-list li").removeClass('active')
        $(this).addClass('active')
    });
    $(".months-list li").click(function(){
        $(".months-list li").removeClass('active')
        $(this).addClass('active')
    });
});