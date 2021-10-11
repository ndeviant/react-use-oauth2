type HashMap = { [key: string]: any }

export function parse(s: string): HashMap {
  const str = s.charAt(0) === '?' ? s.slice(1) : s
  const decode = decodeURIComponent
  return `${str}`
    .replace(/\+/g, ' ')
    .split('&')
    .filter(Boolean)
    .reduce((obj: HashMap, item: string) => {
      const ref: string[] = item.split('=')
      const key: string = decode(ref[0] || '')
      const val: string = decode(ref[1] || '')
      const prev = obj[key]
      obj[key] = prev === undefined ? val : ([] as string[]).concat(prev, val)
      return obj
    }, {})
}

export function stringify(obj: HashMap): string {
  const encode = encodeURIComponent
  return Object.keys(obj || {})
    .reduce((arr: string[], key) => {
      ;[].concat(obj[key]).forEach((v) => {
        arr.push(`${encode(key)}=${encode(v)}`)
      })
      return arr
    }, [])
    .join('&')
    .replace(/\s/g, '+')
}

export default {
  stringify,
  parse
}
