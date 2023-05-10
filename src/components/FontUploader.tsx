import React, { useState } from 'react'
import { FontOption } from '../App'
import { loadFont } from '../utils/helpers/fonts'

export type FontUploaderProps = {
    onFontUploaded?: (font?: { family: string; file: File }) => void
    setFontList?: React.Dispatch<React.SetStateAction<FontOption>>
}

const FontUploader = (props: FontUploaderProps) => {
    const [isFontsLoading, setIsFontsLoading] = useState(false)

    const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0]

        if (file) {
            setIsFontsLoading(true)

            const fontName =
                file?.name?.replace(/\.[^/.]+$/, '') || 'custom font'
            await loadFont({ family: fontName, file })
            setIsFontsLoading(false)

            props.onFontUploaded?.({
                family: fontName,
                file,
            })
        }
    }

    return isFontsLoading ? (
        <div>Loading...</div>
    ) : (
        <input type="file" accept=".ttf,.otf" onChange={onFileUpload} />
    )
}

export default FontUploader
