'use strict';
document.addEventListener('DOMContentLoaded', () => {

    function playSound(audio) {
        const item = audio.parentElement.parentElement;
        item.classList.add('item_state_active');
        audio.play();
        audio.currentTime = 0.005;
        setTimeout(() => item.classList.remove('item_state_active'), 200);
    }

    document.addEventListener('keydown', (event) => {
        const audio = document.querySelector(`audio[data-key=${event.code}]`);
        if (audio) {
            playSound(audio);
        }
    });

    const keysList = document.querySelector('.keys__list')

    keysList.addEventListener('click', (event) => {

        let pressedKey = event.target.parentElement.children[0].children[0].getAttribute('data-key') || event.target.children[0].children[0].getAttribute('data-key');
        if (pressedKey) {
            const audio = document.querySelector(`audio[data-key=${pressedKey}]`);
            playSound(audio);
        }
    })

    const slider = document.querySelector('.header__slider');

    slider.addEventListener('click', () => {
        const thumb = document.querySelector('.header__thumb');
        const mSlider = slider.getBoundingClientRect();
        const mThumb = thumb.getBoundingClientRect();
        const item = document.querySelectorAll('.keys__item');
        item.forEach((i) => i.classList.toggle('item_theme_dark'));
        thumb.classList.toggle('header__thumb_state_active');
        slider.classList.toggle('header__slider_state_active');
        document.querySelector('.wrapper').classList.toggle('wrapper_theme_dark');
        document.querySelector('.header__tooltip').classList.toggle('tooltip_theme_dark');
        if (+getComputedStyle(thumb).left.replace('px', '') > 1) {
            thumb.classList.add('header__thumb_state_reverse-move');
            thumb.style.left = '1px';
            setTimeout(() => {
                thumb.classList.remove('header__thumb_state_reverse-move');
            }, 510);
        }
        else {
            thumb.classList.add('header__thumb_state_move');
            thumb.style.left = mSlider.width - mThumb.width - slider.clientLeft * 2 - 1 + 'px';
            setTimeout(() => {
                thumb.classList.remove('header__thumb_state_move');
            }, 510)
        }
    })
});
