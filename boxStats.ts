import * as blessed from 'blessed'
import { boxOptions } from '.';

const BOX_NAME = "stats";
const mainBox = blessed.box(boxOptions[BOX_NAME] as blessed.Widgets.BoxOptions);









export default mainBox;