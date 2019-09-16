$(document).ready(function(){
	$( ".navbar-toggler" ).addClass('collapsed');
});

$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  });





// List of sentences
var content = [ 
	"you.", 
	"your service.", 
	"managing fund data.", 
];

// Current sentence being processed
var curr_part = 0;

// Character number of the current sentence being processed 
var part_index = 0;

// Holds the handle returned from setInterval
var interval_val;

// Element that holds the text
var element = document.querySelector(".typewrite span");

// Cursor element 
var cursor = document.querySelector("#cursor");

// Implements typing effect
function Type() { 
	// Get substring with 1 characater added
	var text =  content[curr_part].substring(0, part_index + 1);
	element.innerHTML = text;
	part_index++;

	// If full sentence has been displayed then start to delete the sentence after some time
	if(text === content[curr_part]) {
		// Hide the cursor
		cursor.style.backgroundColor = 'transparent';

		clearInterval(interval_val);
		setTimeout(function() {
			interval_val = setInterval(Delete, 50);
		}, 1000);
	}
}

// Implements deleting effect
function Delete() {
	// Get substring with 1 characater deleted
	var text =  content[curr_part].substring(0, part_index - 1);
	element.innerHTML = text;
	part_index--;

	// If sentence has been deleted then start to display the next sentence
	if(text === '') {
		clearInterval(interval_val);

		// If current sentence was last then display the first one, else move to the next
		if(curr_part == (content.length - 1))
			curr_part = 0;
		else
			curr_part++;
		
		part_index = 0;

		// Start to display the next sentence after some time
		setTimeout(function() {
			cursor.style.display = 'inline-block';
			interval_val = setInterval(Type, 100);
		}, 200);
	}
}

// Start the typing effect on load
interval_val = setInterval(Type, 100);





window.onscroll = function() {processBar()};

function processBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.querySelector(".progress-bar").style.width = scrolled + "%";
}





var knowMoreBtn = document.querySelector(".know-more button");
var submitEmailBtn = document.querySelector("#submitEmail");
var contactSubmit = document.querySelector("#contact-submit");



knowMoreBtn.addEventListener('click',addRippleCircle);
submitEmailBtn.addEventListener('click',addRippleCircle);
contactSubmit.addEventListener('click',addRippleCircle);


function addRippleCircle(event){
	var circle = document.querySelector(this.nodeName+".ripple");
	if(!circle)
		circle = document.createElement('div');
	this.appendChild(circle);
	circle.classList.add('ripple');
	var d = Math.max(this.clientWidth, this.clientHeight)
	circle.style.width = circle.style.height = d + 'px';
	circle.style.left =  event.offsetX - d/2 + 'px';
	circle.style.top = event.offsetY - d/2 + 'px';
}

