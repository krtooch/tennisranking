const mockData = {
  data: Date.now(),
  name: "some strangeData"
};
const mockAxios = jest.fn().mockResolvedValue({ data: mockData });

jest.mock("axios", () => mockAxios);
const query = require("./query");

describe("query", () => {
  test("test query exist and is a function", () => {
    expect(typeof query).toBe("function");
  });

  test("Return result from axios.get('url')", async () => {
    const res = await query();
    expect(mockAxios.mock.calls.length).toBe(1);
    expect(res).toEqual(mockData);
    expect(mockAxios.mock.calls[0][0]).toBe(
      "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json"
    );
  });
});
