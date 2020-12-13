module.exports = {
  browsers: ['chromium', 'firefox', 'webkit'],
  // browsers: ['chromium'],
  serverOptions: {
    command: 'npm run server:integration',
    debug: true,
    launchTimeout: 10000,
    port: 9999,
    usedPortAction: 'ask'
  }
}