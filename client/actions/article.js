import { LOAD_ALBUM, LOAD_THIS_PAGE, LOAD_TAG_TO_ARTICLE, LOADING } from '../constants/action-types'

const loadAction = (data) => { type: LOADING, data }
const loadThisPageAction = (pN) => { type: LOAD_THIS_PAGE, pN }
const loadTagToArticleAction = (tag) => { type: LOAD_THIS_PAGE, tag }
const loadAlbumAction = () => { type: LOAD_ALBUM }

export {
  loadAction,
  loadThisPageAction,
  loadTagToArticleAction,
  loadAlbumAction
}