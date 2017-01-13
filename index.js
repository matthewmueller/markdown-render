/*
 * Module dependencies
 */

var highlight = require('highlight.js')
var Remarkable = require('remarkable')

/**
 * Export render
 */

module.exports = render

/**
 * Mappings between remarkable and highlight.js
 */

var language = {
  'js': 'javascript',
  'html': 'xml',
  'shell': 'bash'
}

/**
 * Highlight configuration
 */

highlight.configure({
  tabReplace: '  '
})

/**
 * Configure MD
 */

var md = new Remarkable({
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,        // Use '/' to close single tags (<br />)
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang ',       // CSS language prefix for fenced blocks
  highlight: function (code, lang) {
     // differences between remarkable and highlight.js
    lang = (language[lang]) ? language[lang] : lang

     // Let's not let syntax highlighting kill anything
    try {
      return lang
         ? highlight.highlight(lang, code).value
         : highlight.highlightAuto(code).value
    } catch (e) {}

    return ''
  }
})

/**
 * Export `render`
 */

function render (src) {
  return md.render(src)
}
