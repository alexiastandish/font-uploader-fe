import DEFAULT_FONTS from '../constants/fonts.json'
import FontName from 'fontname'

export type Font = {
    family: string
    file: string | File
    postscriptName?: string
    fontSubFamily?: string
}

const readFileMetadata = (fontFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                const fontMeta = FontName.parse(event.target.result)[0]
                resolve({
                    family: fontMeta.fontFamily,
                    fontSubfamily: fontMeta.fontSubfamily,
                    postScriptName: fontMeta.postScriptName,
                })
            } catch (error) {
                console.error(error)
                reject(error)
            }
        }
        reader.readAsArrayBuffer(fontFile)
    })
}

// In the dashboard, this function will first need to access the list of font families each merchant has access to
// ISSUE: even with the list of fonts available to
export function listFonts() {
    let { fonts } = document

    const it = fonts.entries()

    let arr = [...DEFAULT_FONTS]
    let done = false

    while (!done) {
        const font = it.next()
        if (!font.done) {
            arr.push({
                family: font.value[0].family,
                file: font.value[0],
            })
        } else {
            done = font.done
        }
    }

    return arr
}

export async function loadFont({ family, file }: Font) {
    const fontAlreadyLoaded = document.fonts.check(`10px ${family}`)
    if (!fontAlreadyLoaded) {
        const fontFace = new FontFace(
            family,
            typeof file === 'string' ? `url(${file})` : await file.arrayBuffer()
        )

        try {
            await fontFace.load()
            document.fonts.add(fontFace)

            const parsedFont = await readFileMetadata(file)

            return { fontFace, parsedFont }
        } catch (err) {
            console.error(`Font ${family} failed to load`)
        }
    }
}
