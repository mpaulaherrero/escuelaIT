import { MastermindView } from './views/MastermindView.mjs'
import { ConsoleView } from './views/ConsoleView.mjs'

new MastermindView(new ConsoleView()).play();