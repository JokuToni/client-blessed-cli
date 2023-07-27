import * as blessed from 'blessed'
import { boxOptions } from '.';

const BOX_NAME = "logs";
const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);

let CURRENT_LINE = 0;

const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString();
}

const logsPanel = blessed.list({
    parent: mainBox,
    height: "100%",
    bottom: 0,
    left: 0,
    keys: true,
    content: "fdfdfdf",



    style: {
        border: { fg: '#f0f0f0' },
      }
})

const displayLogs = async () => {
    for (let i = 0; i < 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        const logText = blessed.box({
            parent: logsPanel,
            height: 1,
            width: "98%",
            
            left: 0,
            style: {
                border: { fg: '#f0f0f0' },
            }
        })

        logText.setLine(0,  `[${getCurrentTime()}]: Hello everybody !! ${i}`)
        logsPanel.pushItem(logText)

    }
}



export default mainBox;

displayLogs();

