var app = {
	initUrl: "",
	scroller: false,
	winWidth: window.innerWidth,
	winHeight: window.innerHeight,
	pixelBreakPoint: 0,
	$loader: $("#loading"),
	isLoading: false,
	myReadingList: null,
	currentIx: 0,

	init: function() {
		this.$loader = $("#loading");
		
		$("#wrapper").html("");
		$(window).on("resize", this.windowSizes);
		
		this.myReadingList = myReadingList;

		var next_article = this.readingList();
		this.loadArticle(next_article);
		this.addScrolling();
	},

	readingList: function() {
		var next_url = this.myReadingList[this.currentIx];
		
		this.currentIx++;

		return next_url;
	},

	addScrolling: function(){
		$(window).on("scroll", this.isScrolling);
	},

	isScrolling: function(e) {
		var that = e.currentTarget.app;
		var scrolled = window.scrollY;
		if(that.isLoading == false && (that.winHeight + scrolled) - that.pixelBreakPoint > 0) {
			console.log("loading article ...");
			that.loadNextArticle();
		}
	},

	windowSizes: function() {
		console.log("window resizes");
		this.winWidth = window.innerWidth;
		this.winHeight = window.innerHeight;
	},

	loadArticle: function(url) {
		var that = this;
		
		that.$loader.show();
		that.isLoading = true;

		$.get("loadArticle.php", { u: url }, function(cb){
			var article = $("article", cb).html();

			$("#wrapper").append("<article>" + article + "</article>");

			that.pixelBreakPoint = $("#wrapper").height();
			console.log(that.pixelBreakPoint);

			that.$loader.hide();

			that.isLoading = false;
		});
	},

	loadNextArticle: function() {
		var next_url = this.readingList();

		this.loadArticle(next_url);
	}
};

$(function(){
	
	/*var url = "loadArticle.php?u=http://www.aftonbladet.se/nyheter/valaret2014/article19613544.ab";

	$.get(url, function(cb){
		$("#wrapper").html($("article", cb).html());
	});*/

	app.init();

})