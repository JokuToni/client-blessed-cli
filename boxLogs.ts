import * as blessed from 'blessed'
import { boxOptions } from '.';

const BOX_NAME = "logs";
const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);

let LOGS_BUFFER = [];
let stop_Logs = true;

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
    interactive: true,
    
    style: {
        border: { fg: '#f0f0f0' },
        selected: {
            bg: "white"
        }
    }
})

const displayLogs = async () => {
    for (let i = 0; i < 100; i++) {
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

        logText.setLine(0, `[{red-fg}${getCurrentTime()}{/red-fg}]: Hello everybody !! ${i}`)
        logsPanel.insertItem(0, logText)
        logsPanel.down(1)
    }
}

logsPanel.on("click", async function(mouse) {
    logsPanel.focus()
})


logsPanel.key('r', async function(ch, key) {
    logsPanel.select(0)
});

logsPanel.key('w', async function(ch, key) {
    logsPanel.up(1)
});

logsPanel.key('s', async function(ch, key) {
    logsPanel.down(1)
});


export default mainBox;
displayLogs();


