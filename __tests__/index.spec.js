/* @jest-environment node */
import regeneratorRuntime from 'regenerator-runtime';
import server from '../src/app';
import supertest from 'supertest';

const app = () => supertest(server);

describe('check test status', () => {

    it('should get home route', async() => {

        const response = await app().get('/');

        expect(response.status).toBe(200);

        // expect(response.body).toBe()
    });
});

