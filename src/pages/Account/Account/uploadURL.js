var uploadURL = __IS_SERVER_SITE__ ? __PROD_UPLOAD_URL__ : __DEV_UPLOAD_URL__

console.log('upload url -->', uploadURL)

export default uploadURL