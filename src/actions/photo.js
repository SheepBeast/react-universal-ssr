import { SHOW_PHOTE, SHOW_THIS_PHOTO, CLOSE_PHOTO } from '../constants/action-types'

const showPhotoAction = (device, boxDisplay, url, index, count, desc, imgs, descs) => {
  type: SHOW_PHOTO,
    boxDisplay,
    device,
    url,
    index,
    count,
    desc,
    imgs,
    descs
};

const closePhotoAction = (device, boxDisplay) => {
  type: CLOSE_PHOTO,
    boxDisplay,
    device
};

const showThisPhotoAction = (device, boxDisplay, index) => {
  type: SHOW_THIS_PHOTO,
    boxDisplay,
    device,
    index
  };

export {
  showPhotoAction,
  showThisPhotoAction,
  closePhotoAction
}