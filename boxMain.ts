import * as blessed from 'blessed'
import { boxOptions } from '.';

const BOX_NAME = "main";
const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);


mainBox.on('click', function(data) {
    mainBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    mainBox.screen.render();
});
  

mainBox.key('enter', function(ch, key) {
    mainBox.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    mainBox.setLine(1, 'bar');
    mainBox.insertLine(1, 'foo');
    mainBox.screen.render();
});



export default mainBox;
