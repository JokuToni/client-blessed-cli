import * as blessed from 'blessed'

import { boxOptions, screen, globalState, questionWithWaiter, simpleInputQuestion, addSelection } from '.';
import { forEachChild } from 'typescript';


import {inputBox, mainBox, messageBox} from './elements/mainboxElements'






mainBox.on('click', function(data) {
    if (globalState.promptStarted == true) return;
    mainBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    mainBox.screen.render();
});




const connectToServer = async (password: string): Promise<[boolean, string]> => {
    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    globalState.loggedIn = true
    globalState.userData = {
        userId: "345ad-5456fg-4da552-4059fj"
    }

    return [true, "Connected Successfully"]
}

const logInScript = async (startLine: number) => {
    return new Promise(async (resolve, reject) => {
        let currentLine = 0;
        messageBox.setLine(currentLine, ""); currentLine += 1;
        const connect = await questionWithWaiter(messageBox, inputBox, currentLine, "Please enter your password: ", "", "Connecting to server...", connectToServer )  
        resolve(connect[0]) 
    })
}




const createAccountsScript = async (startLine: number) => {
    const numberOfProxies = 8
    const questionText = `Currently {red-fg}${numberOfProxies}{/red-fg} proxies available. \n {gray-fg}Be aware that some proxies might be in use. So if your input number exceeds the amount of proxies that are not in use, you will only start  number of processes {/gray-fg}`
    const numberOfProcesses = await simpleInputQuestion(messageBox, inputBox, startLine, questionText, `Please input a number between (1-${numberOfProxies}):`)
    const windowVisibleQuestionText = "Do you want browser instances to be visible {green-fg}y{/green-fg}/{red-fg}n{/red-fg}?"
    const windowVisible = await simpleInputQuestion(messageBox, inputBox, startLine, windowVisibleQuestionText, "Enter your choice: ")
}

const wagerAccountsScript = async (startLine: number) => {
}



const mainControlScript = async (startLine: number) => {
    const currentLine = startLine;
    messageBox.content="";
    const topLine = 0;

    messageBox.setLine(topLine, `{left}Connected as: {blue-fg} ${globalState.userData.userId}{/blue-fg}.{/left}`)
    messageBox.setLine(topLine + 1, ``)

    const option = await addSelection(messageBox, inputBox, topLine + 2, [
        {text:"Create accounts", value:"1"},
        {text:"Wager accounts", value:"2"},
        {text:"Exit.", value:"3"},
    ])

    switch (option) {
        case "1": await createAccountsScript(topLine + 2)
        case "2": await wagerAccountsScript(topLine + 2)
        case "3": await createAccountsScript(topLine + 2)
    }
}


mainBox.on("click", async function(mouse) {
    mainBox.focus()
})
inputBox.on("click", async function(mouse) {
    return
})



mainBox.key('g', async function(ch, key) {
    if (globalState.promptStarted) return;
    if (globalState.promptStarted == false) globalState.promptStarted = true;
    messageBox.hidden = false;
    let currentLine = 0;
    if (globalState.loggedIn == false) await logInScript(currentLine)
    if (globalState.loggedIn == true) await mainControlScript(currentLine)
    mainBox.screen.render();
});

const mainLoop = async () => {
    mainBox.setContent('{right}Press "g" to start the {black-fg}program{/black-fg}.{/right}\n');
}

export default mainBox;


mainLoop()



