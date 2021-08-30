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
        enableFullscreenByButtonClick(event);
        toggleVideo(event);

        if ((event.target !== primaryPlayBtn && event.target !== video && event.target !== secondaryPlayButton && event.target !== videoControlsPanel)) {
            video.dataset.focus = 'disabled';
        }

    })

    document.addEventListener('keydown', (event) => keydownHandler(event));

    function keydownHandler(event) {

        if (video.dataset.focus === 'active' && event.keyCode === 32) {
            playAndStop(event);
        }

        if (event.keyCode === 77) {
            setMute();
        }

        if (event.keyCode === 37) {
            video.playbackRate -= 0.25;
        }

        if (event.keyCode === 39) {
            video.playbackRate += 0.25;
        }

        if (event.keyCode === 70) {

            if (fullscreen.dataset.full === 'active') {
                document.exitFullscreen();
            } else {
                video.requestFullscreen();
            }
        }

    }

    document.addEventListener('fullscreenchange', (event) => {
        let dataChange = fullscreen.dataset.full;
        fullscreen.dataset.full = 'active';
        dataChange === 'active' ? fullscreen.dataset.full = 'disabled' : fullscreen.dataset.full === 'active';

        enableFullscreenByButtonClick(event);
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
                video.dataset.state = 'pre-play';
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
                    video.dataset.state = 'pre-play';
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
        const duration = video.duration;
        video.currentTime = elem.value * duration / 100;
    }

    function enableFullscreenByButtonClick(event) {

        if (event.target === fullscreen) {
            video.requestFullscreen();
        }
    }

    function toggleVideo(event) {
        const target = event.target;

        if (target === nextBtn || target === prevBtn) {

            if (target === nextBtn) {

                if (count === 3) {
                    count = 1;
                } else {
                    ++count;
                }
            }

            if (target === prevBtn) {

                if (count === 1) {
                    count = 3;
                } else {
                    --count;
                }
            }

            video.classList.toggle('video_animate_toTop');
            setTimeout(() => {
                video.classList.toggle('video_animate_toTop');
                video.classList.toggle('video_state_hidden');
                video.setAttribute('src', `assets/video/video${count}.mp4`);
            }, 490);

            setTimeout(() => {
                video.classList.add('video_animate_appear');
                fillTheGradient(rewinder, true);
            }, 510);
            setTimeout(() => {
                video.classList.toggle('video_state_hidden');
                video.classList.remove('video_animate_appear');
            }, 1010);

            video.dataset.state = 'pre-pause';
        }
    }

    console.log(`Score: 30 / 30\n - Реализован обязательный функционал по клику на кнопки-элементы видео - 10\n - Реализован обязательный дополнительный функционал по нажатию на кнопки клавиатуры (Space, KeyF, ArrowLeft, ArrowRight, KeyM) - 10\n - Реализован лёгкий псевдослайдер(переключатель видео) - 10 `);
});
