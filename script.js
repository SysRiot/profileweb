
/* ============================================================================
 *  Proyecto: SysRiot Web Experience
 *  Autor: SysRiot
 *  GitHub: https://github.com/SysRiot
 *  Discord: SysRiot
 *  Descripción: Script principal para manejar el reproductor de música, 
 *               la pantalla de bienvenida y funcionalidades interactivas.
 *  Estilo: Hacker / Cyberpunk / Glitch Aesthetic
 * ============================================================================ */





// Evento que espera a que todo el contenido del DOM esté cargado
// Event that waits for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos del DOM ---
    // --- DOM Elements ---
    const audio = document.getElementById('music-player'); // Reproductor de audio / Audio player
    const welcomeOverlay = document.getElementById('welcome-overlay'); // Pantalla de bienvenida / Welcome screen overlay
    const enterBtn = document.getElementById('enter-btn'); // Botón de entrar / Enter button
    const discordBtn = document.getElementById('discord-copy-btn'); // Botón para copiar Discord / Discord copy button
    const notification = document.getElementById('copy-notification'); // Notificación de copiado / Copy notification
    const progressBar = document.getElementById('progress-bar'); // Barra de progreso / Progress bar
    const currentTimeSpan = document.getElementById('current-time'); // Tiempo actual de la canción / Current playback time
    const totalDurationSpan = document.getElementById('total-duration'); // Duración total de la canción / Total duration

    // --- Lógica de la Pantalla de Bienvenida y Autoplay ---
    // --- Welcome Screen and Audio Autoplay Logic ---
    if (enterBtn && welcomeOverlay) {
        enterBtn.addEventListener('click', () => {
            // Intenta reproducir el audio al hacer clic en "ENTRAR"
            // Attempts to play audio when "ENTER" is clicked
            audio.play().catch(error => {
                console.error("Error al reproducir el audio:", error);
                // Error playing the audio
            });

            // Oculta la pantalla de bienvenida
            // Hides the welcome screen
            welcomeOverlay.classList.add('hidden');
        });
    }

    // --- Lógica para copiar Discord al portapapeles ---
    // --- Logic to copy Discord username to clipboard ---
    if (discordBtn && notification) {
        discordBtn.addEventListener('click', () => {
            const textToCopy = 'sysriot'; // Nombre de usuario a copiar / Username to copy
            const textArea = document.createElement('textarea'); // Crea un textarea temporal / Creates a temporary textarea
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px'; // Lo saca fuera de la vista / Moves it off-screen
            document.body.appendChild(textArea);
            textArea.select();

            try {
                // Intenta copiar el contenido
                // Attempts to copy the content
                document.execCommand('copy');

                // Muestra la notificación visual de "copiado"
                // Shows visual "copied" notification
                notification.classList.add('copy-notification-visible');
                setTimeout(() => {
                    notification.classList.remove('copy-notification-visible');
                }, 2000);
            } catch (err) {
                console.error('No se pudo copiar el texto: ', err);
                // Failed to copy the text
            }
            document.body.removeChild(textArea); // Elimina el textarea temporal / Removes the temporary textarea
        });
    }

    // --- Lógica del Reproductor de Música ---
    // --- Music Player Logic ---

    // Formatea segundos en formato MM:SS
    // Formats seconds into MM:SS
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Evento al cargar los metadatos del audio (por ejemplo, duración total)
    // Event triggered when audio metadata is loaded (e.g., total duration)
    audio.addEventListener('loadedmetadata', () => {
        if (totalDurationSpan) {
            totalDurationSpan.textContent = formatTime(audio.duration); // Muestra duración total / Show total duration
        }
    });

    // Evento que se ejecuta mientras el audio se reproduce
    // Event triggered as audio plays
    audio.addEventListener('timeupdate', () => {
        if (progressBar && audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`; // Actualiza la barra de progreso / Updates progress bar
        }
        if (currentTimeSpan) {
            currentTimeSpan.textContent = formatTime(audio.currentTime); // Actualiza el tiempo actual / Updates current time
        }
    });

    // Evento que se activa cuando termina el audio
    // Event triggered when the audio ends
    audio.addEventListener('ended', () => {
        audio.currentTime = 0; // Reinicia al principio / Resets to beginning
        audio.play(); // Lo vuelve a reproducir automáticamente / Automatically replays
    });
});
