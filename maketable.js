function maketable([tbodyArray, theadArray], [id, clas]) {
  let insId = ""
  let insClass = ""
  if (id !== undefined) insId = ` id="${id}"`
  if (clas !== undefined) insClass = ` class="${clas}"`
  let fnPreProc = {
    indexVFrom: () => {
        if (tbodyArray instanceof Array) return "array"
        else if (tbodyArray instanceof Object) return "object"
        else return false
    },
    indexHFrom: () => {
      let varIndexVFrom = fnPreProc.indexVFrom()
      if (varIndexVFrom === "array") {
        if (tbodyArray[0] instanceof Array) return "array"
        else if (tbodyArray[0] instanceof Object) return "object"
        else return false
      }
      else if (varIndexVFrom === "object") {
        if (tbodyArray[Object.keys(tbodyArray)] instanceof Array) return "array"
        else if (tbodyArray[Object.keys(tbodyArray)] instanceof Object) return "object"
        else return false
      }
    },
    givenThead: () => {
      if (theadArray instanceof Array) return true
      else return false
    }
  }
  let varIndexVFrom = fnPreProc.indexVFrom()
  let varIndexHFrom = fnPreProc.indexHFrom()
  let varGivenThead = fnPreProc.givenThead()
  let fn = {
    indexV: () => {
      switch (varIndexVFrom) {
        case "array":
          return tbodyArray
        case "object":
          return Object.keys(tbodyArray)
        default:
          return false
      }
    },
    indexH: (i) => {
      if ((varIndexHFrom === "array" || varIndexHFrom === "object") && !varGivenThead) return tbodyArray[i]
      else if (varGivenThead) return theadArray
      else return false
    },
    assemble: () => {
      let thead = ""
      let tbody = ""
      /*

        normal case
      
      */
      if (varIndexHFrom === "array" || varIndexHFrom === "object") {
        if (!varGivenThead) {
          if (varIndexHFrom === "object") thead = `<thead><tr><td>${Object.keys(tbodyArray[0]).join('</td><td>')}</td></tr></thead>`
          else thead = ""
        }
        else thead = `<thead><tr><td>${theadArray.join('</td><td>')}</td></tr></thead>`
        let array = []
        for (let i in fn.indexV()) {
          let row = []
          for (let j in fn.indexH(i)) {
            row.push(tbodyArray[i][j])
          }
          array.push(`<tr><td>${row.join('</td><td>')}</td></tr>`)
        }
        tbody = `<tbody>${array.join("")}</tbody>`
      }
      /*

        case of no array or no object in outer array

      */
      else if (varIndexVFrom === "array" && varIndexHFrom === false) {
        thead = ""
        tbody = `<tbody><tr><td>${tbodyArray.join("</td></tr><tr><td>")}</td></tr></tbody>`
      }
      /*

        case of no array or no object in outer object

      */
      else if (varIndexVFrom === "object" && varIndexHFrom === false) {
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
  }
  return fn.assemble()
}
