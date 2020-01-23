const request = require("supertest");
const { shuffle, random } = require("lodash");

const fakeData = [
  { id: 0, name: "toto" },
  { id: 1, name: "tutu" },
  { id: 2, name: "titi" },
  { id: 3, name: "tata" }
];
const mockQuery = jest.fn().mockResolvedValue({ players: shuffle(fakeData) });

jest.mock("./query", () => mockQuery);

const app = require("./app.js");

test("test server exist", () => {
  expect(typeof app).toBe("function");
});

describe("Test the player path", () => {
  test("the /players/ should return players object  from the data.json in local ordered by ID", async () => {
    const response = await request(app).get("/players");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(fakeData);
  });

  test("the /players/id should the player from data.player for the givenID", async () => {
    const randomId = random(fakeData.length);
    const response = await request(app).get(`/players/${randomId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(fakeData[randomId]);
  });

  test("the /players/id should return a 404 error status if player not exist", async () => {
    const response = await request(app).get(`/players/${fakeData.length + 10}`);
    expect(response.statusCode).toBe(404);
  });
});
