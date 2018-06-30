var uploadURL = process.env.NODE_ENV == 'production' ? '"http://112.74.162.225:8081/upload"' : '"http://localhost:8081/upload"'

console.log('upload url -->', uploadURL)

export default uploadURL