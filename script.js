var $slides = $(".slide"); // Getting all LI elements for slides in array
var slidesNum = $slides.length;
var prevSlideID = null;
var currentSlideID = 0;
var isAnimating = false; // Initializing animation to false at start
var isAutoPlay = false; // Set autoplay to false at start

/**
  * @desc initializes slider to display first slide
  * @param none
  * @return none
*/
function init() {
    
	TweenLite.set($slides, {
		left: "-100%"
    });
	gotoSlide(0, 0);
}

/**
  * @desc moves slider position to previous slide
  * @param none
  * @return none
*/
function gotoPrevSlide() {
	var slideToGo = currentSlideID - 1; // set target slide position to one slide less tha current slide
	if (slideToGo <= -1) { // check if already on first slide
		slideToGo = slidesNum - 1;
	}
	stopAutoPlay(); // stop autoplay if already running
	gotoSlide(slideToGo, 1, "prev");
}


/**
  * @desc moves slider position to next slide
  * @param none
  * @return none
*/
function gotoNextSlide() {
    var slideToGo = currentSlideID + 1; // set target slide position to one slide more tha current slide
	if (slideToGo >= slidesNum) { //check if already on last slide
		slideToGo = 0;
	}
	stopAutoPlay(); // stop autoplay if already running
	gotoSlide(slideToGo, 1, "next");
}

/**
  * @desc moves slider position to target slide
  * @param slideID - number of the target slide, _time - duration of animation, _direction - next or previous
  * @return none
*/
function gotoSlide(slideID, _time, _direction) {
	if (!isAnimating) {
		isAnimating = true;
		prevSlideID = currentSlideID; // set previous slide to current
        currentSlideID = slideID; // set current slide to target
		var $prevSlide = $slides[prevSlideID];
        var $currentSlide = $slides[currentSlideID];
		var time = 1;
		if (_time !== null) { //if duration is passed, set to that value
			time = _time;
		}
		var direction = "next";
		if (_direction != null) {
			direction = _direction; //if direction is passed, set to that value
		}
		if (direction == "next") { // Hide current slide
			TweenLite.to($prevSlide, time, {
				left: "-100%"
			});
			TweenLite.fromTo($currentSlide, time, { // show previous slide
				left: "100%"
			}, {
				left: "0"
            });
		} else {
			TweenLite.to($prevSlide, time, { // hide current slide
				left: "100%"
			});
			TweenLite.fromTo($currentSlide, time, { // show next slide
				left: "-100%"
			}, {
				left: "0"
			});
		}
		TweenLite.delayedCall(time, function() {
			isAnimating = false;
		});
	}
}

/**
  * @desc moves slide to next in repitition
  * @param none
  * @return none
*/
function play(){
  gotoNextSlide();
  TweenLite.delayedCall(4, play);
}

/**
  * @desc starts autoplay function
  * @param flag to set autoplay to immediate
  * @return none
*/
function startAutoPlay(immediate) {
	if (immediate != null) {
		immediate = false;
	}
    
	if (immediate) {
		gotoNextSlide();
	}
	TweenLite.delayedCall(4, play); //delay is autoplay is not immediate
}

/**
  * @desc stops autoplay function
  * @param none
  * @return none
*/
function stopAutoPlay() {
  	isAutoPlay = false;
	TweenLite.killDelayedCallsTo(play);
}

init(); //calls initiate on function load