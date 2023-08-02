import * as blessed from 'blessed'
import { boxOptions } from '.';

import {mainBox, globalLogsPanel, localLogsPanel} from './elements/logsBoxElements'

const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString();
}

const displayLog = async (logsPanel: blessed.Widgets.ListElement, message:string) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const logText = blessed.box({
        parent: logsPanel,
        height: 1,
        width: "98%",            
        left: 0,
        tags: true,
        style: {
            border: { fg: '#f0f0f0' },
        }
    })
    const ss = `[{red-fg}${getCurrentTime()}{/red-fg}]: Hello everybody !! `
    
    logText.setLine(0, message)
    logsPanel.insertItem(0, logText)
    logsPanel.down(1)
}



export default mainBox;


