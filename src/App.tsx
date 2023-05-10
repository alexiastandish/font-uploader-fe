import { useState } from 'react'
import './App.css'
import FontPicker from './components/FontPicker'
import FontUploader from './components/FontUploader'
import { listFonts } from './utils/helpers/fonts'

export type FontOption = {
    name: string
    file: string | File
}

function App() {
    const [font, setFont] = useState<string>()
    return (
        <div className="App" style={{ fontFamily: font }}>
            <p style={{ fontFamily: font }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>

            <div className="select-container">
                <FontPicker
                    options={listFonts()}
                    value={font}
                    onChange={(e) => setFont(e?.value)}
                />
            </div>

            <div className="uploader-container">
                <FontUploader
                    onFontUploaded={(font?: string) => font && setFont(font)}
                />
            </div>
        </div>
    )
}

export default App
