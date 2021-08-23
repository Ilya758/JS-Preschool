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

    const keysList = document.querySelector('.keys__list');

    keysList.addEventListener('click', (event) => {

        let pressedKey = event.target.parentElement.children[0].children[0].getAttribute('data-key') || event.target.children[0].children[0].getAttribute('data-key');
        if (pressedKey) {
            const audio = document.querySelector(`audio[data-key=${pressedKey}]`);
            playSound(audio);
        }
    });

    const slider = document.querySelector('.header__slider');

    slider.addEventListener('click', () => {
        const thumb = document.querySelector('.header__thumb');
        const mThumb = thumb.getBoundingClientRect();
        document.querySelectorAll('.keys__item').forEach((i) => i.classList.toggle('item_theme_dark'));
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
        } else {
            thumb.classList.add('header__thumb_state_move');
            thumb.style.left = slider.getBoundingClientRect().width - mThumb.width - slider.clientLeft * 2 - 1 + 'px';
            setTimeout(() => {
                thumb.classList.remove('header__thumb_state_move');
            }, 510)
        }

    });

    console.log(`Score: 30 / 30\n - реализован обязательный функционал нажатия по клавишам с последующим воспроизведением звуков (10);\n - реализован обязательный дополнительный функционал по клику на кнопки c последующим воспроизведением звуков (10);\n - реализовано переключение темы со светлой на тёмную (10).\n - планируется в будущем реализация адаптивного перестроения (responsive)`)
});
