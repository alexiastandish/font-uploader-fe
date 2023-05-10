import DEFAULT_FONTS from '../constants/fonts.json'

export type Font = {
    name: string
    file: string | File
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
            arr.push({ name: font.value[0].family, file: font.value[0] })
        } else {
            done = font.done
        }
    }

    return arr
}

export async function loadFont({ name, file }: Font) {
    const fontAlreadyLoaded = document.fonts.check(`10px ${name}`)
    if (!fontAlreadyLoaded) {
        const fontFace = new FontFace(
            name,
            typeof file === 'string' ? `url(${file})` : await file.arrayBuffer()
        )

        try {
            await fontFace.load()

            document.fonts.add(fontFace)

            return fontFace
        } catch (err) {
            console.error(`Font ${name} failed to load`)
        }
    }
}
