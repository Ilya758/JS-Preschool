'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const
        primaryPlayBtn = document.querySelector('.video__btn-play'),
        secondaryPlayButton = document.querySelector('.video__controls-play'),
        volume = document.querySelector('.range_elem_sound'),
        mute = document.querySelector('.video__controls-mute'),
        rewinder = document.querySelector('.range_elem_time'),
        fullscreen = document.querySelector('.video__controls-fullscreen'),
        prevBtn = document.querySelector('.video__controls-prev'),
        nextBtn = document.querySelector('.video__controls-next'),
        videoControlsPanel = document.querySelector('.video__controls'),
        video = document.querySelector('video');
    let count = 1;


    document.addEventListener('click', (event) => {
        playAndStop(event);
    })

    volume.addEventListener('input', () => {
        changeVolume(volume);
        fillTheGradient(volume);
    });

    rewinder.addEventListener('input', () => {
        rewindVideo(rewinder);
        fillTheGradient(rewinder);
    });

    mute.addEventListener('click', setMute);

    function playAndStop(event) {

        video.dataset.focus = 'active';

        if ((event.target === primaryPlayBtn || event.target === video || event.target === secondaryPlayButton || event.keyCode === 32) && fullscreen.dataset.full === 'disabled') {

            if (video.dataset.state === 'pre-pause') {
                video.play();
                video.dataset.state = 'pre-play'
            } else {

                if (video.currentTime.toFixed(2) === video.duration.toFixed(2)) {
                    video.currentTime = 0;
                    video.play();
                } else {
                    video.dataset.state = 'pre-pause';
                    video.pause();
                }
            }
        }

        if ((event.target === primaryPlayBtn || event.target === video || event.target === secondaryPlayButton) && fullscreen.dataset.full === 'active') {

            if (video.dataset.state === 'pre-pause') {
                video.dataset.state = 'pre-play';
            } else {

                if (video.currentTime.toFixed(2) === video.duration.toFixed(2)) {
                    video.dataset.state = 'pre-play'
                } else {
                    video.dataset.state = 'pre-pause';
                }
            }
        }

        video.addEventListener('timeupdate', () => {
            fillTheGradient(rewinder);
        })
    }

    function fillTheGradient(elem, newVideoLoad) {

        if (elem === rewinder && video.dataset.state === 'pre-play') {
            elem.value = video.currentTime * 100 / video.duration;
        }

        if (newVideoLoad === true) {
            elem.value = 0;
        }

        let value = elem.value;
        elem.style.background = `linear-gradient(to right, var(--bg-blue) 0%, var(--bg-blue) ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
    }

    function changeVolume(elem) {
        const val = elem.value;
        video.volume = val / 100;
    }

    function setMute() {
        if (mute.dataset.state === 'no-mute') {
            video.muted = true;
            mute.dataset.state = 'mute';
        } else {
            video.muted = false
            mute.dataset.state = 'no-mute';
        }
    }

    function rewindVideo(elem) {
        const duration = video.duration
        video.currentTime = elem.value * duration / 100;
    }

});
