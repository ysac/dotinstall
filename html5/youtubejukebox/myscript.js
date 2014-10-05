var player;

$(function() {

	$('#q').focus();

	$('#search').submit(function() {
		// 検索ワードからYouTubeを検索
		var url = "https://gdata.youtube.com/feeds/api/videos";

		var options = {
			"q": $('#q').val(),
			"alt": 'json',
			"max-results": 10,
			"v": 2
		};

		// 検索した結果を#listに追加
		$.get(url, options, function(rs) {
			console.log(rs);
			$('#list').empty();
			for (var i=0; i<rs.feed.entry.length; i++) {
				var f = rs.feed.entry[i];
				$('#list').append(
					$('<li class="movie">').append(
						$('<img>').attr('src', f['media$group']['media$thumbnail'][0]['url'])
					).data('video-id', f['media$group']['yt$videoid']['$t'])
				);
			}
		}, "json");
	});

	$(document).on('click', 'li.movie', function() {
		// player.loadVideoById($(this).data('video-id'));
		$(this).toggleClass('on');
	});

	var currentIndex = 0;

	function play() {
		// currentIndexのvideoIdを取得
		var videoId = $('li.movie.on:eq('+currentIndex+')').data('video-id');

		// それを再生
		player.loadVideoById(videoId);

		// .playing
		$('li.movie').removeClass('playing');
		$('li.movie.on:eq('+currentIndex+')').addClass('playing');

	}

	$('#play').click(function() {
		play();
	});

	$('#pause').click(function() {
		player.pauseVideo();
	});

	$('#next').click(function() {
		if (currentIndex == $('li.movie.on').length - 1) {
			currentIndex = 0;
		} else {
			currentIndex++;
		}
		play();
	});

	$('#prev').click(function() {
		if (currentIndex == 0) {
			return false;
		}
		currentIndex--;
		play();
	});

});

function onYouTubePlayerAPIReady() {
	player = new YT.Player('player', {
		height: 360,
		width: 640,
		events: {
			onStateChange: onPlayerStateChange
		}
	});
}

function onPlayerStateChange(e) {
	if (e.data == YT.PlayerState.ENDED) {
		$('#next').trigger('click');
	}
}