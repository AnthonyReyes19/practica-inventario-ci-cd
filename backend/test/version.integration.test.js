const request = require("supertest");
const app = require("../src/app");

describe("Integración: /api/version", () => {
    it("Debe devolver información del backend correctamente", async () => {
        const response = await request(app).get("/api/version");
        
        expect(response.status).toBe(200);
        expect(response.body.version).toBeDefined();
        expect(typeof response.body.version).toBe("string");
    });
});