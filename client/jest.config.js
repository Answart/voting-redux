module.exports = {
    verbose: true,
    setupFiles: ["raf/polyfill", "./src/utils/__test__/jest.setup.js"],
    "testURL": "http://localhost:3000",
    snapshotSerializers: ["enzyme-to-json/serializer"],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        "\\.js$": "<rootDir>/node_modules/babel-jest",
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './src/utils/__test__/assetsTransformer.js',
    },
    "transformIgnorePatterns": ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
    "collectCoverage": true,
    "coverageDirectory": "./coverage",
    "coveragePathIgnorePatterns": ["./src/utils/__test__", "./src/core/helpers"],
};