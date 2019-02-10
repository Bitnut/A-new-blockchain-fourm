// 服务器进程创建！

import config from "config";

import * as steem from "@steemit/steem-js"; // 开发前端取消链接steemit

const path = require("path");
const ROOT = path.join(__dirname, "../..");

// Tell `require` calls to look into `/app` also
// it will avoid `../../../../../` require strings

// use Object.assign to bypass transform-inline-environment-variables-babel-plugin (process.env.NODE_PATH= will not work)
Object.assign(process.env, { NODE_PATH: path.resolve(__dirname, "..") });

require("module").Module._initPaths();

// Load Intl polyfill
// require('utils/intl-polyfill')(require('./config/init').locales);

// FIXME:下面这段代码设置了全局的许多函数变量，主要是steem端需要的变量

global.$STM_Config = {
  fb_app: config.get("facebook_app_id"),
  steemd_connection_client: config.get("steemd_connection_client"),
  steemd_connection_server: config.get("steemd_connection_server"),
  steemd_use_appbase: config.get("steemd_use_appbase"),
  chain_id: config.get("chain_id"),
  address_prefix: config.get("address_prefix"),
  img_proxy_prefix: config.get("img_proxy_prefix"),
  ipfs_prefix: config.get("ipfs_prefix"),
  disable_signups: config.get("disable_signups"),
  read_only_mode: config.get("read_only_mode"),
  registrar_fee: config.get("registrar.fee"),
  upload_image: config.get("upload_image"),
  site_domain: config.get("site_domain"),
  facebook_app_id: config.get("facebook_app_id"),
  google_analytics_id: config.get("google_analytics_id")
};

const WebpackIsomorphicTools = require("webpack-isomorphic-tools");
const WebpackIsomorphicToolsConfig = require("../../webpack/webpack-isotools-config");

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  WebpackIsomorphicToolsConfig
);

global.webpackIsomorphicTools.server(ROOT, () => {
  // 这里都是steem的设置和启动，开发前端已经注释掉
  steem.api.setOptions({
    url: config.steemd_connection_client,
    retry: {
      retries: 10,
      factor: 5,
      minTimeout: 50, // start at 50ms
      maxTimeout: 60 * 1000,
      randomize: true
    },
    useAppbaseApi: !!config.steemd_use_appbase
  });
  // FIXME:下面同样是两段华景变量配置的代码
  steem.config.set("address_prefix", config.get("address_prefix"));
  steem.config.set("chain_id", config.get("chain_id"));

  // 下面是两段调试的代码，意义未明
  // const CliWalletClient = require('shared/api_client/CliWalletClient').default;
  // if (process.env.NODE_ENV === 'production') connect_promises.push(CliWalletClient.instance().connect_promise());
  try {
    require("./server"); // 调用server.js 启动服务器
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
