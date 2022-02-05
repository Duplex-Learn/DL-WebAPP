const createRenderer = (baseURL) => {
  return {
    image(href, title, text) {
      return `<img style="width:100%;height:auto;" src="${baseURL}raw/master${href}" />`
    },
  }
}

export default createRenderer
