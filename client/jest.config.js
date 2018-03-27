module.exports = {
  verbose: true,
  setupFiles: ["./src/utils/__spec__/jest.setup.js"],
  "testURL": "http://localhost:3000",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './src/utils/__spec__/assetsTransformer.js',
  },
};
