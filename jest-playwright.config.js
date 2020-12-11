module.exports = {
  browsers: ['chromium'],
  // browsers: ['chromium', 'firefox', 'webkit'],
  // devices: ['iPhone 6'],
  serverOptions: {
    command: 'npm run server:integration',
    debug: true,
    launchTimeout: 10000,
    port: 9999,
    usedPortAction: 'ask'
  }
}