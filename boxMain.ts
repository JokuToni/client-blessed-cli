import * as blessed from 'blessed'
import { boxOptions, screen, globalState } from '.';
import { forEachChild } from 'typescript';

const BOX_NAME = "main";
const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);
mainBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');


const inputBox = blessed.textbox({
    parent: mainBox,
    bottom: 0,
    width: "98%",
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

let currentLine = 0;

const addLine = (text:string) => {
    messageBox.setLine(currentLine + 1, text)
    currentLine += 1
}
const editLine = (index, text:string) => {
    messageBox.setLine(index, text)
}

const connectToServer = async () => {
    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    globalState.loggedIn = true
    globalState.userData = {
        userId: "345ad-5456fg-4da552-4059fj"
    }
}

const logInScript = async () => {
    return new Promise(async (resolve, reject) => {
        addLine("")
        addLine("Please enter your password: ")
        const inputCallBack = async (err, val) => {
            const loader = blessed.loading({
                parent: messageBox,
                top: currentLine,
                height: "shrink",
                width: "shrink"
            })
            loader.load("Connecting to server...")
            await connectToServer()
            loader.stop()
            editLine(currentLine, "Connected succesfully!")
            await new Promise(resolve => setTimeout(resolve, 1000));

            currentLine = 0;
            messageBox.content = "";

            resolve(true)
        }

        inputBox.input(inputCallBack)
    })
}

const addSelection = (startLine: number, selection: {text: string, value: string}[]) => {
    return new Promise(async (resolve, reject) => {
        editLine(startLine, `Please select your action (1-${selection.length}): `);
        editLine(startLine + 1, "");

        const endLine = currentLine + 2 + selection.length
        for (let i = 0; i < selection.length; i++) {
            editLine(startLine + i + 2,  `(${i + 1}): ${selection[i].text}`)
        }

        const inputCallBack = async (err, val) => {
            if (typeof val == "number" && val <= selection.length) resolve(selection[val].value + 1)
            for (let i = 0; i < endLine - startLine; i++) {
                messageBox.clearLine(i + startLine)
            }
            resolve(await addSelection(startLine, selection))
        }

        inputBox.input(inputCallBack)
    })
}


const mainControlScript = async () => {
    currentLine = 1;
    messageBox.content="";

    const topLine = 0;
    editLine(topLine, `{left}Connected as: {blue-fg} ${globalState.userData.userId}{/blue-fg}.{/left}`)
    addLine("")

    await addSelection(currentLine, [
        {text:"sdsd", value:"1"},
        {text:"sdaaad", value:"2"},
        {text:"sdsd555", value:"3"},
        {text:"sdsdfafafa", value:"4"},
        {text:"ggdgdgdgdf", value:"5"}
    ])
}


mainBox.key('g', async function(ch, key) {
    if (globalState.promptStarted) return;
    if (globalState.promptStarted == false) globalState.promptStarted = true;
    messageBox.hidden = false;

    if (globalState.loggedIn == false) await logInScript()
    if (globalState.loggedIn == true) await mainControlScript()


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



