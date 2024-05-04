// const html = document.querySelector('html')
// const focoBt = document.querySelector('.app__card-button--foco')
// const curtoBt = document.querySelector('.app__card-button--curto')
// const longoBt = document.querySelector('.app__card-button--longo')
// const banner = document.querySelector('.app__image')

// focoBt.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'foco')
//     banner.setAttribute('src', '/imagens/foco.png')
// })


// curtoBt.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'descanso-curto')
//     banner.setAttribute('src', '/imagens/descanso-curto.png')
// })

// longoBt.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'descanso-longo')
//     banner.setAttribute('src', '/imagens/descanso-longo.png')
// })

const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio ('/sons/luna-rise-part-one.mp3')
musica.loop = true
const musicaInicio = new Audio('/sons/play.wav');
const musicaFim = new Audio('/sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const somPause = new Audio('/sons/pause.mp3')

let tempoDecorridoEmSegundos = 0
let intervalodId = null


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


function changeContext(contexto, Src) {
    tempoDecorridoEmSegundos = getTempo(contexto);
    mostrarTempo ()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', Src);
    switch (contexto) {
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
                break;
        case "descanso-curto":
            title.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `    
                break;
        case "descanso-longo":
            title.innerHTML = `
            Hora de voltar a superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            default:
                break;
    
            }
}

function getTempo(contexto) {
    switch (contexto) {
        case "foco":
            return 1500; // 25 minutos em segundos
        case "descanso-curto":
            return 300; // 5 minutos em segundos
        case "descanso-longo":
            return 900; // 15 minutos em segundos
        default:
            return 0;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        alert('Tempo Finalizado');
        musicaFim.play(); // Toca o som no final da contagem regressiva
        return;
    }
    if (tempoDecorridoEmSegundos === 25) {
        musicaInicio.play(); // Toca o som no início da contagem regressiva
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
};
startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(intervalodId) {
        zerar()
        return
    }
     intervalodId = setInterval(contagemRegressiva, 1000) 
     iniciarOuPausarBt.textContent = "Pausar"
     iniciarOuPausarIcon.setAttribute('src', '/imagens/pause.png')
     musicaInicio.play();

}

document.querySelector('.app__card-button--foco').addEventListener('click', () => {
    changeContext('foco', '/imagens/foco.png');
    focoBt.classList.add('active')
    tempoDecorridoEmSegundos = 1500

});

document.querySelector('.app__card-button--curto').addEventListener('click', () => {
    changeContext('descanso-curto', '/imagens/descanso-curto.png');
    curtoBt.classList.add('active')
    tempoDecorridoEmSegundos = 300
});

document.querySelector('.app__card-button--longo').addEventListener('click', () => {
    changeContext('descanso-longo', '/imagens/descanso-longo.png');
    longoBt.classList.add('active')
    tempoDecorridoEmSegundos = 900
});

function zerar () {
    clearInterval (intervalodId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarIcon.setAttribute('src', '/imagens/play_arrow.png'); // Altera o ícone para "Play" quando pausado
    intervalodId = null
    somPause.play();
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo ()