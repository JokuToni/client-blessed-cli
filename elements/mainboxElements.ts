
import * as blessed from 'blessed'
import { boxOptions, screen, globalState, simpleInputQuestion, addSelection } from '../.';

const BOX_NAME = "main";


export const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);
mainBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');



export const inputBox = blessed.textbox({
    parent: mainBox,
    bottom: 0,
    width: "98%",
    height: "20%",
    dockBorders: true,
    left: 0,
    mouse: false,
    tags: true,
    keys: true,
    vi: true,
    style: {
        fg: 'white',
        border: { fg: '#f0f0f0' },
      }
})


export const messageBox = blessed.message({
    parent: mainBox,
    hidden: true,
    top: 0,
    left: 0,
    input: true,
    mouse: false,
    height: "80%",
    dockBorders:true,
    width: "98%",
    style: {
        fg: 'white',
        border: { fg: '#f0f0f0' },
      }
})