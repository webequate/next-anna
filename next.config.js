module.exports = {
  webpack(config) {
    // Externalize heavy MJML-related libraries to keep their internal dynamic
    // requires from being bundled / rewritten into RSC virtual paths that
    // break fs access (causing ENOENT for uglify-js). They will be resolved
    // at runtime from node_modules instead.
    if (!config.externals) config.externals = [];
    const mjmlExternals = [
      "mjml",
      "mjml-core",
      "mjml-parser-xml",
      "mjml-validator",
      "mjml-react",
      "html-minifier",
      "uglify-js",
      "web-resource-inliner",
      "clean-css",
      "juice",
      "cheerio",
    ];
    config.externals.push(function ({ request }, callback) {
      if (request && mjmlExternals.includes(request)) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    });
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  // ...other config
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};
