// const _ = require("lodash")
const Blog = require('../models/blogModel')

const blogList = [
  {
    title: 'The Joy of Japanese KitKats: Unique Flavors You Need to Try',
    author: 'Aki Tanaka',
    url: 'http://localhost:3004/post',
    likes: 5,
  },
  {
    title: 'Matcha Lovers Unite: Rich Matcha KitKats',
    author: 'Riku Tanabe',
    url: 'http://localhost:3004/post',
    likes: 15,
  },
  {
    title: 'Exploring the World of Feullantine White Chocolate',
    author: 'Sakura Yamamoto',
    url: 'http://localhost:3004/post',
    likes: 6,
  },
  {
    title: 'A Dive into Japanese Strawberry Desserts',
    author: 'Riku Tanabe',
    url: 'http://localhost:3004/post',
    likes: 7,
  },
  {
    title: 'Discovering Chocolate Whole Grain Flavors',
    author: 'Paul Nakamura',
    url: 'http://localhost:3004/post',
    likes: 10,
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
