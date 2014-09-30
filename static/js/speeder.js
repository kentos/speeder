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
	theEnd: false,

	init: function() {
		this.$loader = $("#loading");
		
		$("#wrapper").html("");
		$(window).on("resize", this.windowSizes);
		$(window).on("scroll", this.isScrolling);
		
		this.myReadingList = myReadingList;

		var next_article = this.readingList();
		this.loadArticle(next_article);
	},

	readingList: function() {
		var next_url;

		if(this.currentIx in this.myReadingList) {
			next_url = this.myReadingList[this.currentIx];
			this.currentIx++;
		} else {
			next_url = "empty";
		}
		
		return next_url;
	},

	isScrolling: function(e) {
		var that = e.currentTarget.app;
		var scrolled = window.scrollY;

		if(that.theEnd === false && that.isLoading == false && (that.winHeight + scrolled) - that.pixelBreakPoint > 0) {
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

			if(cb.img > '') {
				var img = $("<img/>").attr("src", cb.img);
			} else {
				var img = "";
			}

			var title = $("<h2/>").html(cb.title).addClass("the_headline");
			var lead = $("<div/>").html(cb.lead).addClass("the_lead");
			var body = $("<div/>").html(cb.body).addClass("the_body");
			var article = $("<article/>").append(title).append(img).append(lead).append(body);
			
			$("#wrapper").append(article);

			that.pixelBreakPoint = $("#wrapper").height();
			console.log(that.pixelBreakPoint);

			that.$loader.hide();
			that.isLoading = false;
		});
	},

	loadNextArticle: function() {
		var next_url = this.readingList();

		if(next_url == "empty") {
			this.showEndMessage();
			this.theEnd = true;
		} else {
			this.loadArticle(next_url);
		}
	},

	showEndMessage: function() {
		$("#wrapper").append("You have reached the end. Check back soon for more to read!");
	}
};

$(function(){
	
	/*var url = "loadArticle.php?u=http://www.aftonbladet.se/nyheter/valaret2014/article19613544.ab";

	$.get(url, function(cb){
		$("#wrapper").html($("article", cb).html());
	});*/

	app.init();

})