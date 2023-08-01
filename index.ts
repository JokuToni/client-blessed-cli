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


export const simpleInputQuestion = (blessedElement: blessed.Widgets.MessageElement, inputElement: blessed.Widgets.TextboxElement, startLine: number, text:string,question: string) => {
  return new Promise(async (resolve, reject) => {
      inputElement.clearValue()

      blessedElement.setLine(startLine, `${text}`)
      blessedElement.setLine(startLine + 1, `${question}`);
      blessedElement.setLine(startLine + 2, "");

      const inputCallBack = async (err, val) => {            
          blessedElement.setLine(startLine + 3, `Selected: (${val})`)
          await new Promise(resolve => setTimeout(resolve, 1500));
          for (let i = 0; i < (startLine + 4); i++) {
              blessedElement.clearLine(i + startLine)
          }
          resolve(val)
      }

      inputElement.input(inputCallBack)
  })
}


export const questionWithWaiter = (blessedElement: blessed.Widgets.MessageElement, inputElement: blessed.Widgets.TextboxElement, startLine: number, text:string,question: string, waitingMessage: string, callback: (inputValue: string) => Promise<[boolean, string]>) => {
  return new Promise(async (resolve, reject) => {
      inputElement.clearValue()
      
      blessedElement.setLine(startLine, `${text}`)
      blessedElement.setLine(startLine + 1, `${question}`);
      blessedElement.setLine(startLine + 2, "");
      
      const inputCallBack = async (err, val: string | null) => {            
        const loader = blessed.loading({
          parent: blessedElement,
          top: startLine + 3,
          height: "shrink",
          width: "shrink"
        })
        "Connecting to server..."
        loader.load(waitingMessage)
        const result = await callback(val)
        loader.stop()
        blessedElement.setLine(startLine + 3, result[1])
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        for (let i = 0; i < (startLine + 4); i++) {
          blessedElement.clearLine(i + startLine)
        }
        resolve(result[0])  
      }
      
      inputElement.input(inputCallBack)
  })
}


export const addSelection = (blessedElement: blessed.Widgets.MessageElement, inputElement: blessed.Widgets.TextboxElement,  startLine: number, selection: {text: string, value: string}[]) => {
  return new Promise(async (resolve, reject) => {
      let currentLine = 0;
      inputElement.clearValue()
      blessedElement.setLine(startLine, `Please select your action (1-${selection.length}): `)
      currentLine += 1;
      blessedElement.setLine(startLine + 1, "")
      currentLine += 1;

      const endLine = currentLine + 2 + selection.length
      for (let i = 0; i < selection.length; i++) {
          blessedElement.setLine(startLine + i + 2,  `(${i + 1}): ${selection[i].text}`)
          currentLine += 1;
      }

      const inputCallBack = async (err, val) => {            
          blessedElement.setLine(endLine +1, `Selected: (${val})`)
          await new Promise(resolve => setTimeout(resolve, 1500));
          for (let i = 0; i < (endLine+1) - startLine + 1; i++) {
              blessedElement.clearLine(i + startLine)
          }

          resolve(selection[Number(val) - 1].value)
      }

      inputElement.input(inputCallBack)
  })
}






const mainLoop = async () => {
  mainBox.setContent('{right}Press "g" to start the {black-fg}program{/black-fg}.{/right}\n');
  while (true) {
      await new Promise(resolve => setTimeout(resolve, 150));
      screen.render();
  }
}

mainLoop()