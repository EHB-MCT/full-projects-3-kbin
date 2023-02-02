const path = require('path');



module.exports = {

    // entry: ['./src/index.js', './src/savedInput.js'],

    entry: {

        index: './src/test.js',

        info: './src/info.js',

        hologram: './src/hologram.js'

    },

    output: {

        path: path.resolve(__dirname, 'dist'),

        filename: '[name].js'

    },

    mode: 'development'

}

