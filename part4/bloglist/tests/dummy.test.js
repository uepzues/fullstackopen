const { test, describe } = require("node:test")
const assert = require("node:assert")

const listHelper = require("../utils/list_helper")

const blogList = [
  {
    title: "The Joy of Japanese KitKats: Unique Flavors You Need to Try",
    author: "Aki Tanaka",
    url: "http://localhost:3004/post",
    likes: 5,
  },
  {
    title: "Matcha Lovers Unite: Rich Matcha KitKats",
    author: "Riku Tanabe",
    url: "http://localhost:3004/post",
    likes: 15,
  },
  {
    title: "Exploring the World of Feullantine White Chocolate",
    author: "Sakura Yamamoto",
    url: "http://localhost:3004/post",
    likes: 6,
  },
  {
    title: "A Dive into Japanese Strawberry Desserts",
    author: "Riku Tanabe",
    url: "http://localhost:3004/post",
    likes: 7,
  },
  {
    title: "Discovering Chocolate Whole Grain Flavors",
    author: "Riku Tanabe",
    url: "http://localhost:3004/post",
    likes: 10,
  },
]

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

describe("most liked blog", () => {
  test("most liked blog", () => {
    const result = listHelper.favouritesBlog(blogList)
    assert.deepStrictEqual(result, 15)
  })
})

describe("most number of blogs of an author", () => {
  test("most number of blogs with an author", () => {
    const result = listHelper.mostBlogs(blogList)
    assert.deepStrictEqual(result, { author: "Riku Tanabe", blogs: 3 })
  })
})

describe(" most liked author", () => {
  test(" most liked author", () => {
    const result = listHelper.mostLikes(blogList)

    assert.deepStrictEqual(result, { author: "Riku Tanabe", likes: 32 })
  })
})
