function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // Slightly slower for better clarity
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Sorry, your browser does not support text to speech.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const speakButtons = document.querySelectorAll('.btn-speak');
    speakButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const word = btn.getAttribute('data-word');
            speak(word);
            
            // Subtle animation feedback
            btn.classList.add('playing');
            setTimeout(() => btn.classList.remove('playing'), 500);
        });
    });
});
