import express from 'express';
import http from 'http';
import cluster from 'cluster';
import os from 'os';

import CONFIG from '../config/server.js';
import router from '../routes/index.js';
import logHandler from '../utils/logHandler.js';
import errorHandler from '../utils/errorHandler.js';

const PORT = CONFIG.SERVER.PORT.HTTP;
const CPUS = os.cpus().length;
const app = express();
const main_server = http.createServer(app);

export default async function() {
    app.use(logHandler);
    app.use(errorHandler);
    await router(app);

    if (CONFIG.SERVER.CLUSTER && cluster.isMaster) {
        for (let i = 0; i < CPUS; i++) {
            cluster.fork();
        }
    }
    else {
        main_server.listen(PORT);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
// Http Event Listener
main_server.on('listening', (err) => {
    if (err) {
        return console.error('Server start failed.\n' + err);
    }
    console.log('Server running on port : ' + main_server.address().port);
});

main_server.on('errorHandler', (err) => {
    console.error('Server start failed.\n' + err);
});

main_server.on('close', (err) => {
    if (err) {
        return console.error('Server close failed.\n' + err);
    }
    console.log('Server closed.');
});

////////////////////////////////////////////////////////////////////////////////////////////////
// Cluster Event Listener
cluster.on('online', (worker) => {
    console.log('Worker %d is online.', worker.process.pid);
});

cluster.on('exit', (worker) => {
    console.log('Worker %d ended.', worker.process.pid);
    cluster.fork();
});
////////////////////////////////////////////////////////////////////////////////////////////////