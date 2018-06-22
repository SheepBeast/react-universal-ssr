import qs from 'querystring'

export default function(search)  {
  let k , params = {}, query

  search = String(search).replace('?', '')

  console.log('search -->', search)
  query = qs.parse(search)

  for (k in query) {
    params[k] = decodeURIComponent(query[k])
  }

  return params
}