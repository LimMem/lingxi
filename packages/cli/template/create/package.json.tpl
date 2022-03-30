{
  "name": "{{{ appname }}}",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "lingxi build",
    "watch:all": "lingxi build --watch",
    "server": "lingxi build --watch --server"
  },
  "peerDependencies": {
    "react": "17.0.2"
  },
  "dependencies": {
    "antd-mobile": "2.3.4"
  },
  "devDependencies": {
    "@lingxiteam/cli": "^0.1.1"
  }
}
