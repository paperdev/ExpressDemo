import http from 'http';
import assert from 'assert';

import '../app.js'
import CONFIG from '../config/server.js'

const URL_TEST = 'http://localhost:' + CONFIG.SERVER.PORT.HTTP;
const CODE_SUCCESS = 200;

describe('Demo Test', () => {
    it('Success', (done) => {
        http.get(URL_TEST, (res) => {
            assert.strictEqual(CODE_SUCCESS, res.statusCode);
            done();
        });
    });
});