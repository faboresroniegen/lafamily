// LA FAMILIA - Audio Control Module

(function(){
    const audio = document.getElementById('bgAudio');
    const btn = document.getElementById('audioToggleBtn');
    const ICON_PLAY = '<i class="fas fa-music"></i>';
    const ICON_PAUSE = '<i class="fas fa-pause"></i>';

    // Apply saved preference
    const saved = localStorage.getItem('lafamilia_audio_play');
    if (saved === 'true') {
        btn.setAttribute('aria-pressed','true');
        btn.classList.add('playing');
        btn.innerHTML = ICON_PAUSE;
    }

    function updateUI(isPlaying) {
        btn.setAttribute('aria-pressed', String(!!isPlaying));
        if (isPlaying) {
            btn.classList.add('playing');
            btn.innerHTML = ICON_PAUSE;
        } else {
            btn.classList.remove('playing');
            btn.innerHTML = ICON_PLAY;
        }
    }

    function safePlay() {
        audio.play().then(()=>{
            updateUI(true);
            localStorage.setItem('lafamilia_audio_play','true');
        }).catch(()=>{
            updateUI(false);
            localStorage.setItem('lafamilia_audio_play','false');
        });
    }

    btn.addEventListener('click', function(e){
        e.stopPropagation();
        if (audio.paused) {
            safePlay();
        } else {
            audio.pause();
            updateUI(false);
            localStorage.setItem('lafamilia_audio_play','false');
        }
    });

    // If user previously wanted audio, play on first gesture
    document.addEventListener('click', function onFirstGesture() {
        const want = localStorage.getItem('lafamilia_audio_play') === 'true';
        if (want && audio.paused) {
            safePlay();
        }
        document.removeEventListener('click', onFirstGesture);
    });

    // Update button state when audio plays/pauses
    audio.addEventListener('play', ()=> updateUI(true));
    audio.addEventListener('pause', ()=> updateUI(false));
})();
