$(() => {
    $('#search-form').submit((e) => {
        e.preventDefault();
        $('#video').html("");
        const artist = $('#search-artist').val();
        const title = $('#search-title').val();
        getLyrics(artist, title);
        getVideo(artist, title);
    });

    function getLyrics(artist, title) {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

        $.getJSON(url, (response) => {
            showLyrics(response);
        });
    }

    function showLyrics(lyrics) {
        $.each(lyrics, (i, value) => {
            $('#lyrics').append(`<p>${value}</p>`);
        });

    }

    function getVideo(artist, title) {

        const search = artist + ' ' + title;

        var params = {
            part: 'snippet',
            key: 'AIzaSyAc6OMgygOQ_QGPaAUrLaSQ6wlXpYm9Lhw',
            q: search,
        }
        const url = 'https://www.googleapis.com/youtube/v3/search';

        $.getJSON(url, params, function (data) {
            showVideo(data);
        });
    }

    function showVideo(videos) {
        $.each(videos.items, (i, value) => {
            var youtubeImage = value.snippet.thumbnails.medium.url;
            var searchMe = '<a href="https://www.youtube.com/watch?v=' + value.id.videoId + '"><img class="uthumb" src="' + youtubeImage + '"></a>';
            $('#video').append(searchMe);
        });
    }
});