const { test, describe } = require("node:test")
const assert = require("node:assert")

const listHelper = require("../utils/list_helper")

test("dummy return one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)

  assert.strictEqual(result, 1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      title: "The Joy of Japanese KitKats: Unique Flavors You Need to Try",
      author: "Aki Tanaka",
      url: "http://localhost:3004/post",
      likes: 5,
      id: "6726e6f460db2ccaa9e7a2e0",
    },
  ]

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})
