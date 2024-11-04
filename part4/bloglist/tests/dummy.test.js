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

describe("most likes", () => {
  const blogList = [
    {
      title: "The Joy of Japanese KitKats: Unique Flavors You Need to Try",
      author: "Aki Tanaka",
      url: "http://localhost:3004/post",
      likes: 5,
      id: "6726e6f460db2ccaa9e7a2e0",
    },
    {
      title: "Matcha Lovers Unite: Rich Matcha KitKats",
      author: "Riku Tanabe",
      url: "http://localhost:3004/post",
      likes: 13,
      id: "67271c2c1222e4c56ae1502d",
    },
  ]

  test("highest number of likes", () => {
    const result = listHelper.favouritesBlog(blogList)
    assert.deepStrictEqual(result, 13)
  })
})

describe("most number of blogs with author name", () => {
  const blogList = [
    {
      title: "The Joy of Japanese KitKats: Unique Flavors You Need to Try",
      author: "Aki Tanaka",
      url: "http://localhost:3004/post",
      likes: 5,
      id: "6726e6f460db2ccaa9e7a2e0",
    },
    {
      title: "Matcha Lovers Unite: Rich Matcha KitKats",
      author: "Riku Tanabe",
      url: "http://localhost:3004/post",
      likes: 13,
      id: "67271c2c1222e4c56ae1502d",
    },
    {
      title: "Exploring the World of Feullantine White Chocolate",
      author: "Sakura Yamamoto",
      url: "http://localhost:3004/post",
      likes: 6,
      id: "672820d7e1e08353f243360e",
    },
    {
      title: "A Dive into Japanese Strawberry Desserts",
      author: "Riku Tanabe",
      url: "http://localhost:3004/post",
      likes: 13,
      id: "67282122e1e08353f2433610",
    },
    {
      title: "Discovering Chocolate Whole Grain Flavors",
      author: "Riku Tanabe",
      url: "http://localhost:3004/post",
      likes: 12,
      id: "67282128e1e08353f2433612",
    },
  ]

  test("most number of blogs with the author", () => {
    const result = listHelper.mostBlogs(blogList)
    assert.deepStrictEqual(result, { author: "Riku Tanabe", blogs: 3 })
  })
})

describe(" most liked author", () => {
  const blogList = [
    {
      title: "The Joy of Japanese KitKats: Unique Flavors You Need to Try",
      author: "Aki Tanaka",
      url: "http://localhost:3004/post",
      likes: 5,
      id: "6726e6f460db2ccaa9e7a2e0",
    },
    {
      title: "Matcha Lovers Unite: Rich Matcha KitKats",
      author: "Riku Tanabe",
      url: "http://localhost:3004/post",
      likes: 13,
      id: "67271c2c1222e4c56ae1502d",
    },
    {
      title: "Exploring the World of Feullantine White Chocolate",
      author: "Riku Tanabe",
      url: "http://localhost:3004/post",
      likes: 16,
      id: "672820d7e1e08353f243360e",
    },
    {
      title: "A Dive into Japanese Strawberry Desserts",
      author: "Aki Tanaka",
      url: "http://localhost:3004/post",
      likes: 11,
      id: "67282122e1e08353f2433610",
    },
    {
      title: "Discovering Chocolate Whole Grain Flavors",
      author: "Mei Watanabe",
      url: "http://localhost:3004/post",
      likes: 12,
      id: "67282128e1e08353f2433612",
    },
  ]

  test(" most liked author", () => {
    const result = listHelper.mostLikes(blogList)

    assert.deepStrictEqual(result, { author: "Riku Tanabe", likes: 29 })
  })
})
