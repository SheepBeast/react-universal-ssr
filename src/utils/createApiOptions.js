const noop = () => { }

export default function createApiOptions(method, data = {}, tokenId = "", requestOptions = {}) {
  var options = {
    data: {
      method,
      tokenId,
      data
    },
    ...requestOptions
  }

  console.log('create api options -->', options)

  return options
}