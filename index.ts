import * as blessed from 'blessed'
interface boxOptions {
    [key:string]: blessed.Widgets.BoxOptions
}

interface userData {
  userId: string
}

interface globalState {
  promptStarted: boolean,
  loggedIn: boolean,


  userData: userData | undefined
}

export const globalState: globalState = {
  promptStarted: false,
  loggedIn: false,
  userData: undefined
}
const mainBoxOptions = {
    tags: true,
    border: { type: 'line' },
    dockBorders:true,
    style: {
      fg: 'white',
      bg: 'black',
      border: { fg: '#f0f0f0' },
    }
}


export const boxOptions =  {
    "main": Object.assign({}, mainBoxOptions, {
        height: "100%",
        width: "60%",
        right: 0,
    }),
    "logs": Object.assign({}, mainBoxOptions, {
        height: "75%",
        width: "40%",
        left: 0,
        bottom: 0
    }),
    "stats": Object.assign({}, mainBoxOptions, {
        height: "30%",
        width: "40%",
        left: 0,
        top: 0
    }), 
}


export const screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
});

// Screen needs to initialized before can add boxes

import statsBox from './boxStats'
import mainBox from './boxMain'
import logsBox from './boxLogs'


screen.title = 'alp';

screen.append(statsBox);
screen.append(mainBox);
screen.append(logsBox);

// If our box is clicked, change the content.

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render();


const mainLoop = async () => {
  mainBox.setContent('{right}Press "g" to start the {black-fg}program{/black-fg}.{/right}\n');
  while (true) {
      await new Promise(resolve => setTimeout(resolve, 150));
      screen.render();
  }
}

mainLoop()