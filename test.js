const host = 'spain.jetechbatteries.com'
let locale = ''
const hostA = host.split('.');
console.log(host)
if (hostA?.length === 3) {
  locale = hostA[0]
}
console.log(locale)
