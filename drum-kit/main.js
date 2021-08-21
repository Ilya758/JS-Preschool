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

    document.addEventListener('click', (event) => {
        let pressedKey = event.target.parentElement.children[0].children[0].getAttribute('data-key') || event.target.children[0].children[0].getAttribute('data-key');
        if (pressedKey) {
            const audio = document.querySelector(`audio[data-key=${pressedKey}]`);
            playSound(audio);
        }
    })

});
