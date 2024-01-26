const text = `
| Tables   |      Are      |  Cool    |
|----------|:-------------:    |------:|
| col 1 is |      apa kabar left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
`

const c = require('markdown-table-prettify')

;(async () => {
    const a = c.CliPrettify.prettify(text)
    console.log(a)

    
})()