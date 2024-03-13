let str = '<div></div><p> <img src="/public/upload/ueditor/image/20210417/1618650469930744737/bn2.jpeg"/></p> '
let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
let imgSrc = ''
str = str.replace(/<p>(\s?<img[^>]+>\s?)<\/p>\s?$/g,function(word,$1){
  const src = $1.match(srcReg)
  if(src[1]){
     imgSrc = src[1]
  }
 return ''
})

console.log( imgSrc )
console.log(str)
