function maketable([tbodyArray, theadArray], [id, clas]) {
  // HTML attribute id
  let insId = ""
  if (id !== undefined) insId = ` id="${id}"`

  // HTML attribute class
  let insClass = ""
  if (clas !== undefined) insClass = ` class="${clas}"`

  // vertical index from array or object or another
  let indexV = ""
  if (tbodyArray instanceof Array) indexV = "array"
  else if (tbodyArray instanceof Object) indexV = "object"
  else indexV = false

  // horizontal index from array or object or another
  let indexH = ""
  if (tbodyArray[0] instanceof Array) indexH = "array"
  else if (tbodyArray[0] instanceof Object) indexH = "object"
  else indexH = false

  // whether thead is given
  let givenThead = false
  if (theadArray instanceof Array) if (!(theadArray[0] instanceof Array) && !(theadArray[0] instanceof Object)) givenThead = true

  let assemble = () => {
    let thead = ""
    let tbody = ""
    /*

      normal case
    
    */
    if (indexH === "array" || indexH === "object") {
      if (!givenThead) {
        if (indexH === "object") thead = `<thead><tr><td>${Object.keys(tbodyArray[0]).join('</td><td>')}</td></tr></thead>`
        else thead = ""
      }
      else thead = `<thead><tr><td>${theadArray.join('</td><td>')}</td></tr></thead>`
      let array = []
      for (let i in tbodyArray) {
        let row = []
        for (let j in tbodyArray[i]) {
          row.push(tbodyArray[i][j])
        }
        array.push(`<tr><td>${row.join('</td><td>')}</td></tr>`)
      }
      tbody = `<tbody>${array.join("")}</tbody>`
    }
    /*

      case of no array or no object in outer array

    */
    else if (indexV === "array" && indexH === false) {
      thead = ""
      tbody = `<tbody><tr><td>${tbodyArray.join("</td></tr><tr><td>")}</td></tr></tbody>`
    }
    /*

      case of no array or no object in outer object

    */
    else if (indexV === "object" && indexH === false) {
      let row = []
      let keys = Object.keys(tbodyArray)
      for (let i of keys) {
        row.push(tbodyArray[i])
      }
      thead = `<thead><tr><td>${keys.join("</td><td>")}</td></tr></thead>`
      tbody = `<tbody><tr><td>${row.join("</td><td>")}</td></tr></tbody>`
    }
    /*

      another case

    */
    else return false
    return `<table${insId}${insClass}>${thead}${tbody}</table>`
  }
  return assemble()
}
