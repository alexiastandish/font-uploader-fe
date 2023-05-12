# Self Service Fonts

This proof of concept was created to demostrate self service fonts on the merchant dashboard. The goal of the self servince fonts feature is to allow merchants to upload specific font families / font files on the front end in order to customize the design of their app.

This application is particularly focused on the client side and UI/UX of self service fonts: loading fonts dynamically, allowing users to load a custom font file, rendering the selected and available font files / font families in the text preview (lorem ipsum text) and dropdown picker.

## Architecture

### Components

`FontPicker`

-   responsible for handling the loading state of the available fonts in the dropdown when the page loads and when a new fonts is uploaded successfully
-   responsible for iterating through and shaping the `fontOptions` data that gets passed to react-selet Select dropdown (recomputes memoized array when `props.options` changes)
-   calls onChange function that sets the selected font from the dropdown

`FontUploader`

-   responsible for loading state of the font file being uploaded
-   when a font is uploaded, the onChange event sends the font family and the font file to a helper function that checks to see if the font file exists. If it does not, a new FontFace object is created, passing the Font family and Font file (source) to the FontFace constructor
    -   `family`: Specifies a font family name that can be used to match against this font face when styling elements
    -   `source`: The font source (can either be a url to a font face file or Binary font face data in an ArrayBuffer or a TypedArray)
    -   `await fontFace.load()` waits for the font to be loaded
    -   `documents.fonts.add(fontFace)` adds the font to document **allowing us to dynamically style the available merchant fonts listed in the dropdown as well as and the selected font in phone preview with the expected typography UI**

To test with hardcoded available (previously uploaded and stored) font families / font files, use `fonts.json`) to hard code what would represent the data passed into the FontPicker component when the feature is initialized (bc this pos is not hooked up to an actual database or bucket).

## Dependencies

-   [FontFace API](https://developer.mozilla.org/en-US/docs/Web/API/FontFace)
-   [fontname](https://github.com/danbovey/fontname)
