import videojs from 'video.js';
import 'videojs-flash';
import 'videojs-contrib-hls';

export function init() {
    if ($('.page').length) {
        let $video = $('.page .video-js');
        $video.each((index, item) => {
            const currentItem = $(item);
            let videoID = currentItem.attr('id');
            let videoSrc;
            let $video;
            let $poster;

            switch (currentItem.attr('id')) {
                case 'video-1':
                    videoSrc = 'url-проекта/video/video.m3u8?v=0.1';
                    $video = $('#video-1');
                    $poster = '../images/poster.jpg';
                    break;
                // no default
            }

            let mute = false;

            let video = videojs(videoID, {
                controls: true,
                playsinline: true,
                fluid: true,
                muted: mute,
                html5: {
                    nativeAudioTracks: false,
                    nativeVideoTracks: false,
                    nativeTextTracks: false,
                },
                hls: {
                    overrideNative: true,
                },
            });

            video.src(videoSrc);
            video.poster($poster);

            $(document).on('on-video', () => {
                video.play();
            });

            video.on('play', () => {
                $(document).trigger('play-video', videoID);
            });

            video.on('pause', () => {
                $(document).trigger('pause-video');
            });

            video.on('ended', () => {
                video.currentTime(0);
                $(document).trigger('ended-video', videoID);
            });
        })

    }
}
