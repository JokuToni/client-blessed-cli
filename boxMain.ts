import * as blessed from 'blessed'
import { boxOptions, screen } from '.';

const BOX_NAME = "main";
const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);
const prompter = blessed.prompt({
    parent: mainBox,
    bottom: 0,
    padding: 0,
    width: "98%",
    height: "shrink",
    dockBorders: true,
    left: 0,
    tags: true,
    keys: true,
    vi: true
})

const messageBox = blessed.message({
    parent: mainBox,
    top: 0,
    left: 0,
    height: "90%",
    flex: true,
    dockBorders:true,
    width: "98%",
    style: {
        fg: 'white',
        bg: 'green',
        border: { fg: '#f0f0f0' },
      }
})

const line = blessed.line({
    parent: prompter,
    orientation: "horizontal",
    top: 0
})




mainBox.on('click', function(data) {
    mainBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    mainBox.screen.render();
});

mainBox.key('enter', function(ch, key) {
    mainBox.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    mainBox.setLine(1, 'bar');
    mainBox.insertLine(1, 'foo');

    prompter.input("Tell me your name", "", (err, val) => {
        mainBox.insertLine(1, "Pass");
    })
    mainBox.screen.render();
});



const mainLoop = async () => {
    mainBox.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    messageBox.setLine(1, 'Welcome to alphamadness client!');
    messageBox.insertLine(2, 'Please choose what to do next (1-6):');

    prompter.input("Tell me your name", "", (err, val) => {
        messageBox.insertLine(1, "Pass");
    })
   screen.render();
}

export default mainBox;


mainLoop()



