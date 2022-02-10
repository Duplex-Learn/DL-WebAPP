import hljs from 'highlight.js'

const createRenderer = (baseURL) => {
  return {
    image(href, title, text) {
      return `<img style="width:100%;height:auto;" src="${baseURL}raw/master${href}" />`
    },
    code(code, infostring, escaped) {
      code = hljs.highlight(infostring, code, false).value
      return `<pre class="hljs"><code>${code}</code></pre>`
    },
  }
}

export default createRenderer
