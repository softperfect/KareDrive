// module.exports = {
//   getAssetExts: () => [ 'obj', 'dae', 'scn', 'zip' ]
// }

const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const { resolver: { assetExts } } = await getDefaultConfig();

  return { resolver: { assetExts: assetExts.concat(['obj', '3ds','max','mtl','dae', 'scn', 'zip']) } };
})();
