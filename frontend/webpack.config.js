const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html', // The name of the report file
      openAnalyzer: false, // Prevents the report from opening automatically
      generateStatsFile: false, // We already generate stats.json with Angular
    }),
  ],
};
