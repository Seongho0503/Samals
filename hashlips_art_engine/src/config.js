const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "SAVE THE ANIMALS";
const description = "You can save the animals";
const baseUri = "https://ipfs.io/ipfs/QmfA2UzgLcDCBy7xx27eswENqojdGvLSyfWZUMFsRFgadh/market/shark";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 25,
    layersOrder: [
      {
        name: "Main/backgroundPremium",
        options: {
          blend: MODE.colorBurn,
        },
      },
      { name: "Main/animalResize/donate/elephant" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
      { name: "Main/frontWeapon" },
    ],
  },
  {
    growEditionSizeTo: 50,
    layersOrder: [
      { name: "Main/backgroundPremium" },
      { name: "Main/animalResize/donate/elephant" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
      { name: "Main/frontWeapon" },
    ],
  },
  {
    growEditionSizeTo: 75,
    layersOrder: [
      {
        name: "Main/backgroundPremium",
        options: {
          blend: MODE.colorBurn,
        },
      },
      { name: "Main/backWeapon" },
      { name: "Main/animalResize/donate/elephant" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
    ],
  },
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Main/backgroundPremium" },
      { name: "Main/backWeapon" },
      { name: "Main/animalResize/donate/elephant" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
    ],
  },
  {
    growEditionSizeTo: 125,
    layersOrder: [
      {
        name: "Main/backgroundPremium",
        options: {
          blend: MODE.colorBurn,
        },
      },
      { name: "Main/animalResize/donate/frog" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
      { name: "Main/frontWeapon" },
    ],
  },
  {
    growEditionSizeTo: 150,
    layersOrder: [
      { name: "Main/backgroundPremium" },
      { name: "Main/animalResize/donate/frog" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
      { name: "Main/frontWeapon" },
    ],
  },
  {
    growEditionSizeTo: 175,
    layersOrder: [
      {
        name: "Main/backgroundPremium",
        options: {
          blend: MODE.colorBurn,
        },
      },
      { name: "Main/backWeapon" },
      { name: "Main/animalResize/donate/frog" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
    ],
  },
  {
    growEditionSizeTo: 200,
    layersOrder: [
      { name: "Main/backgroundPremium" },
      { name: "Main/backWeapon" },
      { name: "Main/animalResize/donate/frog" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
    ],
  },
  {
    growEditionSizeTo: 225,
    layersOrder: [
      {
        name: "Main/backgroundPremium",
        options: {
          blend: MODE.colorBurn,
        },
      },
      { name: "Main/animalResize/donate/tiger" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
      { name: "Main/frontWeapon" },
    ],
  },
  {
    growEditionSizeTo: 250,
    layersOrder: [
      { name: "Main/backgroundPremium" },
      { name: "Main/animalResize/donate/tiger" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
      { name: "Main/frontWeapon" },
    ],
  },
  {
    growEditionSizeTo: 275,
    layersOrder: [
      {
        name: "Main/backgroundPremium",
        options: {
          blend: MODE.colorBurn,
        },
      },
      { name: "Main/backWeapon" },
      { name: "Main/animalResize/donate/tiger" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
    ],
  },
  {
    growEditionSizeTo: 300,
    layersOrder: [
      { name: "Main/backgroundPremium" },
      { name: "Main/backWeapon" },
      { name: "Main/animalResize/donate/tiger" },
      { name: "Main/glassNormal" }, // glassNormal
      { name: "Main/hatNormal" }, // hatNormal
    ],
  },
  {
    growEditionSizeTo: 325,
    layersOrder: [
      {
        name: "Main/backgroundPremium",
        options: {
          blend: MODE.colorBurn,
        },
      },
      { name: "Main/animalResize/donate/Toco Toucan" },
      { name: "Main/glassOneEye" }, // glassNormal
      { name: "Main/hatOneEye" }, // hatNormal
      { name: "Main/frontWeapon" },
    ],
  },
  {
    growEditionSizeTo: 350,
    layersOrder: [
      { name: "Main/backgroundPremium" },
      { name: "Main/animalResize/donate/Toco Toucan" },
      { name: "Main/glassOneEye" }, // glassNormal
      { name: "Main/hatOneEye" }, // hatNormal
      { name: "Main/frontWeapon" },
    ],
  },
  {
    growEditionSizeTo: 375,
    layersOrder: [
      {
        name: "Main/backgroundPremium",
        options: {
          blend: MODE.colorBurn,
        },
      },
      { name: "Main/backWeapon" },
      { name: "Main/animalResize/donate/Toco Toucan" },
      { name: "Main/glassOneEye" }, // glassNormal
      { name: "Main/hatOneEye" }, // hatNormal
    ],
  },
  {
    growEditionSizeTo: 400,
    layersOrder: [
      { name: "Main/backgroundPremium" },
      { name: "Main/backWeapon" },
      { name: "Main/animalResize/donate/Toco Toucan" },
      { name: "Main/glassOneEye" }, // glassNormal
      { name: "Main/hatOneEye" }, // hatNormal
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 1600,
  height: 1600,
  smoothing: true,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 10 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
