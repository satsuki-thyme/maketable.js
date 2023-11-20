function maketable(tbodyArray, theadArray, id, clss) {
  let insId = id ? ` id="${id}"` : ``
  let insClss = clss ? ` class="${clss}"` : ``
  let multiLines = (tbodyArray[0] instanceof Array || typeof tbodyArray[0] === `array`) ? true : false
  let theadExist = theadArray ? true : false
  let tbody = ``
  let thead = ``
  if (multiLines) {
    let tr = ``
    for (let tbItem of tbodyArray) {
      tr += `<tr><td>${tbItem.join(`</td><td>`)}</td></tr>`
    }
    tbody = `<tbody>${tr}</tbody>`
  }
  else {
    tbody = `<tbody><tr><td>${tbodyArray.join(`</td><td>`)}</td></tr></tbody>`
  }
  if (theadExist) {
    thead = `<thead><tr><th>${theadArray.join(`</th><th>`)}</th></tr></thead>`
  }
  return `<table${insId + insClss}>${thead + tbody}</table>`
}
