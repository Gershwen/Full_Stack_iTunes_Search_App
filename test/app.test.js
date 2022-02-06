let assert = require("assert");
const fetch = require("isomorphic-fetch");

// This test checks if fetch works as intended
describe("Get titanic movie", () => {
  it("should get 1", async () => {
    await fetch(
      "https://itunes.apple.com/search?term=titanic&media=movie&limit=1"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        assert.equal(res.resultCount, 1);
      });
  });
});
