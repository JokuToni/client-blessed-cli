import * as blessed from 'blessed'
import { boxOptions, screen, globalState } from '.';

const BOX_NAME = "main";
const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);
mainBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');


const inputBox = blessed.textbox({
    parent: mainBox,
    bottom: 0,
    width: "98%",
    input: true,
    height: "20%",
    dockBorders: true,
    left: 0,
    border: "line",
    tags: true,
    keys: true,
    vi: true
})

const messageBox = blessed.message({
    parent: mainBox,
    hidden: true,
    top: 0,
    left: 0,
    input: true,
    height: "80%",
    dockBorders:true,
    width: "98%",
    style: {
        fg: 'white',
        bg: 'green',
        border: { fg: '#f0f0f0' },
      }
})

const line = blessed.line({
    parent: inputBox,
    orientation: "horizontal",
    top: 0
})

mainBox.on('click', function(data) {
    if (globalState.promptStarted == true) return;
    mainBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    mainBox.screen.render();
});

mainBox.key('g', function(ch, key) {
    if (globalState.promptStarted!) globalState.promptStarted = true;

    messageBox.hidden = false;
    messageBox.setLine(1, 'Welcome to alphamadness client!');
    messageBox.insertLine(2, 'Please choose what to do next (1-6):');

    mainBox.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    mainBox.setLine(1, 'bar');
    mainBox.insertLine(1, 'foo');

    inputBox.input((err, val) => {

        messageBox.insertLine(2, val);
    })



    mainBox.screen.render();
});

const mainLoop = async () => {

    mainBox.setContent('{right}Press "g" to start the {black-fg}program{/black-fg}.{/right}\n');
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 50));
        mainBox.screen.render();
    }
}

export default mainBox;


mainLoop()



