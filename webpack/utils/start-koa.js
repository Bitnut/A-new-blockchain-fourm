// 启动 koa 后端
const cp = require('child_process');
const path = require('path');
const watch = require('node-watch');

let server;
let started;
let serverReload;
const KOA_PATH = path.join(__dirname, '../../src/server/index');

const startServer = () => {

    // Define `restartServer`
    const restartServer = () => { //重启服务器函数
        console.log('restarting koa application');
        serverReload = true;
        server.kill('SIGTERM');   //服务器正常退出
        return startServer();
    };

    // merge env for the new process
    const env = {...process.env, NODE_ENV: 'development', BABEL_ENV: 'server'};
    // start the server procress
    server = cp.fork(KOA_PATH, {env});
    // when server is `online`
    server.once('message', (message) => {
        if (/*message.match(/^online$/)*/true) {
            if (serverReload) {
                serverReload = false;
                //browserSync.reload();
            }
            if (!started) {
                started = true;
                // node 使用 process.stdin 和 process.stdout 实现标准输入输出
                // Listen for `rs` in stdin to restart server
                console.log('type `rs` in console for restarting koa application');
                process.stdin.setEncoding('utf8');
                process.stdin.on('data', (data) => {
                    const parsedData = (data + '').trim().toLowerCase();
                    if (parsedData === 'rs') return restartServer();
                });

                // Start watcher on server files and restart server on change
                const server_path = path.join(__dirname, '../../src/server');
                // const app_path = path.join(__dirname, '../../app');
                watch([server_path], () => restartServer());
            }
        }
    });
};

// kill server on exit
process.on('exit', () => server.kill('SIGTERM'));
//process实现了EventEmitter接口，exit方法会在当进程退出的时候执行。
//因为进程退出之后将不再执行事件循环，所有只有那些没有回调函数的代码才会被执行。


module.exports = function () {
    return !server ? startServer() : () => ({});
};
