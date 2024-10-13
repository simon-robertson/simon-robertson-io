export async function parseMarkdown(contents: string): Promise<string> {
    const source: string[] = contents.trim().split(/\r?\n/)
    const output: string[] = []

    let sourceIndex = 0
    let outputIndex = 0

    let capturingCode = false
    let capturingList = false

    while (sourceIndex < source.length) {
        let line = source[sourceIndex++].trimEnd()

        if (capturingCode) {
            if (/^\s*```/.test(line)) {
                output[outputIndex++] = "</pre>"
                output[outputIndex++] = "</div>"
                capturingCode = false
                continue
            }

            output[outputIndex++] = "<code>"

            if (line === "") {
                output[outputIndex++] = " "
            } else {
                output[outputIndex++] = line
            }

            output[outputIndex++] = "</code>"
            continue
        }

        if (/\[.+?\]\(.+?\)/.test(line)) {
            line = line.replaceAll(/\[(.+?)\]\((.+?)\)/g, (...args: string[]) => {
                return `<a href="${args[2]}">${args[1]}</a>`
            })
        }

        if (/\*\*.+?\*\*/.test(line)) {
            line = line.replaceAll(/\*\*(.+?)\*\*/g, (...args: string[]) => {
                return `<strong>${args[1]}</strong>`
            })
        }

        if (/\*(.+?)\*/.test(line)) {
            line = line.replaceAll(/\*(.+?)\*/g, (...args: string[]) => {
                return `<em>${args[1]}</em>`
            })
        }

        if (capturingList) {
            if (/^\s*\+/.test(line) === false) {
                output[outputIndex++] = "</ul>"
                capturingList = false
                continue
            }

            output[outputIndex++] = "<li>"
            output[outputIndex++] = line.trimStart()
            output[outputIndex++] = "</li>"
            continue
        }

        if (line === "") {
            continue
        }

        if (/^\s*```/.test(line)) {
            output[outputIndex++] = '<div class="code-block">'
            output[outputIndex++] = "<pre>"
            capturingCode = true
            continue
        }

        if (/^\s*\+/.test(line)) {
            output[outputIndex++] = "<ul>"
            capturingList = true
            continue
        }

        if (/^\s*#/.test(line)) {
            const matches = line.match(/^\s*(#+)\s*(.+)/)!

            output[outputIndex++] = "<h"
            output[outputIndex++] = matches[1].length.toString()
            output[outputIndex++] = ">"
            output[outputIndex++] = matches[2]
            output[outputIndex++] = "</h"
            output[outputIndex++] = matches[1].length.toString()
            output[outputIndex++] = ">"
            continue
        }

        output[outputIndex++] = "<p>"
        output[outputIndex++] = line.trimStart()
        output[outputIndex++] = "</p>"
    }

    return output.join("")
}
