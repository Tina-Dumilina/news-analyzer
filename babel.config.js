const presets = [
  [
    "@babel/env",
    {
      targets: { 
        edge: "15",
        firefox: "50",
        chrome: "64",
        safari: "11.1",
        android: "56",
        ios: "11",
      },
      useBuiltIns: "usage", 
      corejs: "3.4.1" 
    }
  ],
];

module.exports = { presets };