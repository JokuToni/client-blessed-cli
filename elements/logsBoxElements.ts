
import * as blessed from 'blessed'
import { boxOptions, screen, globalState, simpleInputQuestion, addSelection } from '../.';


const BOX_NAME = "logs";
export const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);


export const globalLogsPanel = blessed.list({
    parent: mainBox,
    height: "100%",
    bottom: 0,
    left: 0,
    keys: true,
    interactive: true,
    
    style: {
        border: { fg: '#f0f0f0' },
        selected: {
            bg: "white"
        }
    }
})


export const localLogsPanel = blessed.list({
    parent: mainBox,
    height: "100%",
    bottom: 0,
    left: 0,
    keys: true,
    interactive: true,
    
    style: {
        border: { fg: '#f0f0f0' },
        selected: {
            bg: "white"
        }
    }
})