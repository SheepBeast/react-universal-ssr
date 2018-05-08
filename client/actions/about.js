import { SHOW_MOVE_AREA } from '../constants/action-types'

const showMoveAreaAction = (left, display, focusKey, device) => {
  type: SHOW_MOVE_AREA,
    left,
    display,
    focusKey,
    device
};

export {
  showMoveAreaAction
}