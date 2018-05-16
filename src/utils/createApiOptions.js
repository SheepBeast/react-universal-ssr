const noop = () => { }

export default function createApiOptions(method, data = {}, tokenId = "", requestOptions = {}) {
  return {
    data: {
      method,
      tokenId,
      data
    },
    ...requestOptions
  }
}