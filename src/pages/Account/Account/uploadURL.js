var uploadURL = process.env.NODE_ENV == 'production' ? __PROD_UPLOAD_URL__ : __DEV_UPLOAD_URL__

console.log('upload url -->', uploadURL)

export default uploadURL