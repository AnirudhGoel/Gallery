$.getJSON('fileList.json', function(data) {
	htmlText = "";

	data['files'] = shuffle(data['files']);

	for (var i = 0; i < data['files'].length; i++) {
		console.log(data['files'][i]['file_name']);

		var actualWidth = data['files'][i]['width'];
		var actualHeight = data['files'][i]['height'];
		var displayWidth = $('.grid-item').width();
		var displayHeight = Math.abs(1 - (actualWidth - displayWidth) / actualWidth) * actualHeight;

		displayHeight += 'px';

		console.log(actualWidth, actualHeight, displayWidth, displayHeight);

		htmlText += '<div class="grid-item" style="min-height: ' + displayHeight + ';"><img class="lazy" data-src="img/' + data['files'][i]['file_name'] + '" /></div>';
	}

	$(".grid").append(htmlText);



	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		gutter: '.gutter-sizer',
		stagger: 30,
		horizontalOrder: true
	});

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