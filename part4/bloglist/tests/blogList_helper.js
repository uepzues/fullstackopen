// const _ = require("lodash")
const Blog = require("../models/blogModel")

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
    likes: 15,
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
    likes: 7,
    id: "67282122e1e08353f2433610",
  },
  {
    title: "Discovering Chocolate Whole Grain Flavors",
    author: "Riku Tanabe",
    url: "http://localhost:3004/post",
    likes: 10,
    id: "67282128e1e08353f2433612",
  },
]

const blogListInDb = async () => {
  const list = await Blog.find({})
  return list.map((blog) => blog.toJSON())
}

module.exports = {
  blogList,
  blogListInDb,
}
