
function recmmendation(){}

function drawChart(){}

function updateName(){}

function undo(){}

function checkOut(){}

function add(){}

function save(){}// save to local & serverside

function load(){}// find user credential(in XML) and load data(from a json file named as userName.json)

function logIn(){}// encryped user info back-end php code



$( document ).ready(function() {
	$(".submit").hover(function(){
			$(this).stop().animate({
				opacity:"0.8"
				}, 800);
			},function(){
				$(this).stop().animate({
				opacity:"1"
			}, 800);
	})

	$("#logInButton").click(function(){
		$("#front-panel").fadeOut(800,function(){$("#login-panel").fadeIn(800);})
		$("p.title").html("Please enter your user name and password:");	
	});

	$("#createButton").click(function(){
		
		$("#front-panel").fadeOut(800,function(){$("#main-panel").fadeIn(800);$("p.title").css({"display":"none"});})		
	});
	
});

