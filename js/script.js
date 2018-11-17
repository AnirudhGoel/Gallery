var htmlText = "";
var paginationCount = 0;
var xyz = new Array();

var $grid = $('.grid').masonry({
	itemSelector: '.grid-item',
	gutter: '.gutter-sizer',
	stagger: 30
	// horizontalOrder: true
});


$(document).ready(function() {
	$.ajax({
		url: 'fileList.json',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json",
		beforeSend: function(xhr){
		    if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		},
		success: function(data) {
			xyz = shuffle(data['files']);

			getMoreImages(paginationCount, 20);
			paginationCount += 2;

			$grid.on( 'click', '.grid-item', function() {
				if ( $( this ).hasClass('grid-item--gigante') ) {
					$('.grid-item').removeClass('grid-item--gigante');
				} else {
					$('.grid-item').removeClass('grid-item--gigante');
					$( this ).addClass('grid-item--gigante');
				}

				$grid.masonry();
			});

			$('.lazy').Lazy({
		        scrollDirection: 'vertical',
		        effect: 'fadeIn',
		        afterLoad: function() {
		        	$grid.masonry();
		        }
		    });
		},
		error: function(error) { console.log(error); }
	});
});


function getMoreImages(paginationCount, quantity) {
	htmlText = "";
	offset = 10 * paginationCount;

	for (var i = offset; i < offset + quantity; i++) {
		// console.log(xyz[i]['file_name']);

		var actualWidth = xyz[i]['width'];
		var actualHeight = xyz[i]['height'];
		var displayWidth = $('.grid-item').width();
		var displayHeight = Math.abs(1 - (actualWidth - displayWidth) / actualWidth) * actualHeight;

		displayHeight += 'px';

		// console.log(actualWidth, actualHeight, displayWidth, displayHeight);

		htmlText += '<div class="grid-item" style="min-height: ' + displayHeight + ';"><img class="lazy" data-src="img/' + xyz[i]['file_name'] + '" /></div>';
	}

	$(".grid").append(htmlText);
	$grid.masonry();
}

$(window).scroll(function() {
	console.log("Near end of page, fetching more images...");

   	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
		getMoreImages(paginationCount, 10);
        paginationCount += 1;
   	}
});

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}