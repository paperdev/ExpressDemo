import http from 'http';
import assert from 'assert';
import { describe, it } from 'mocha';

import '../app.js';
import CONFIG from '../config/server.js';

const URL_TEST = 'http://localhost:' + CONFIG.SERVER.PORT.HTTP;
const CODE_SUCCESS = 200;
const CODE_404 = 404;

const URL_LOGIN = '/user/login';

describe('Demo Test', () => {
    it('Success', (done) => {
        http.get(URL_TEST + URL_LOGIN, (res) => {
            assert.strictEqual(CODE_SUCCESS, res.statusCode);
            done();
        });
    });

    it('404 Not Found', (done) => {
        http.get(URL_TEST, (res) => {
            assert.strictEqual(CODE_404, res.statusCode);
            done();
        });
    });
});