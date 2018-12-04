const parserOptions = {
};

module.exports = {
  webpackConfig: require("./webpack/client.config.js"),
  propsParser: require("react-docgen-typescript")
    .withCustomConfig("./tsconfig.json", parserOptions)
    .parse,
  skipComponentsWithoutExample: true,
  styleguideDir: "./build/styleguide",
  sections: [
    {
      name: 'Core',
      components: 'src/components/Core/**/*.tsx',
    },
    {
      name: 'Atoms',
      components: 'src/components/Atoms/**/*.tsx',
    },
    {
      name: 'Molecules',
      components: 'src/components/Molecules/**/*.tsx',
    },
    {
      name: 'Organisms',
      components: 'src/components/Organisms/**/*.tsx',
    },
    {
      name: 'Templates',
      components: 'src/components/Templates/**/*.tsx',
    },
    {
      name: 'Icons',
      components: 'src/components/Icons/**/*.tsx',
    },
  ]
};
