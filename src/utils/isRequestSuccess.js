export default function(ret) {
  // console.log('is requrest success -->', ret)
  return ret.data.resultCode === 0
}