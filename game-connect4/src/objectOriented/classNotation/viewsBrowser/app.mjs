import { Connect4View } from '../views/Connect4View.mjs'
import { ConsoleBrowser } from '../views/ConsoleBrowser.mjs'

const connect4 = new Connect4View(new ConsoleBrowser());

document.getElementsByTagName('button')[0].addEventListener('click', () => {
    connect4.play();
})
