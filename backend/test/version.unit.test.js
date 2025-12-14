const request = require("supertest");
const app = require("../src/app");

describe("GET /api/version Unit Test", () => {
    it("Debe retornar versión y nombre de la API", async () => {
        const res = await request(app).get("/api/version");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("version");
        expect(res.body).toHaveProperty("name");
        expect(res.body.version).toBe("1.0.0");
    });
});