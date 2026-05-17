import app from '../app'
import supertest from "supertest";

export let request = supertest(app)

beforeAll(async () => {
    // supertest doesn't require explicit port listening
}, 10000)

afterAll(async () => {
    // cleanup if needed
})