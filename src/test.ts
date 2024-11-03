import { omit, omitBy, pickBy } from './collection'

const picked = omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
console.log(picked) // { a: 1 }
