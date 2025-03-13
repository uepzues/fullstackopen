const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const blogHelper = require('./blogList_helper')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const Blog = require('../models/blogModel')

describe('when there are blog posts saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    // console.log("DB cleared")

    for (const blog of blogHelper.blogList) {
      const blogObject = new Blog(blog)
      await blogObject.save()
    }
  })
  test('list are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct amount of blog post', async () => {
    // console.log("test")

    const result = await api.get('/api/blogs')

    assert.strictEqual(result.body.length, blogHelper.blogList.length)
  })

  test("returns the uid as 'id'", async () => {
    const result = await api.get('/api/blogs')

    const ids = Object.keys(result.body[0])

    assert.strictEqual(ids.includes('id') && !ids.includes('_id'), true)
  })

  describe('when posting content', () => {
    test('successfuly creates a post', async () => {
      const newPost = {
        title: 'This is a new title',
        author: 'Balthazar Wulf',
        likes: 1,
        url: 'http://localhost/post',
      }

      await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const posts = await blogHelper.blogListInDb()

      assert.strictEqual(posts.length, blogHelper.blogList.length + 1)

      const savedPost = posts.find(
        (post) => post.author === newPost.author && post.url === newPost.url,
      )

      //   console.log(savedPost)
      assert.equal(Boolean(savedPost), true)
    })

    test('likes property is missing', async () => {
      const newPost = {
        title: 'This is a new title',
        author: 'Balthazar Wulf',
        url: 'http://localhost/post',
      }

      await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const savedPost = await blogHelper.blogListInDb()
      const keys = Object.keys(savedPost[savedPost.length - 1])
      // console.log(savedPost.length)

      assert.strictEqual(!keys.includes('likes'), true)
    })

    test('missing url properties should result in status 400', async () => {
      const newPost = [
        {
          title: 'This is a new title',
          author: 'Ogandu Mowible',
          likes: 3,
        },
        {
          author: 'Lucy Miles',
          url: 'http://localhost/post',
          likes: 3,
        },
      ]

      const result = await api
        .post('/api/blogs')
        .send(newPost[0])
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.status, 400)
    })

    test('missing title properties should result in status 400', async () => {
      const newPost = [
        {
          title: 'This is a new title',
          author: 'Ogandu Mowible',
          likes: 3,
        },
        {
          author: 'Lucy Miles',
          url: 'http://localhost/post',
          likes: 3,
        },
      ]

      const result = await api
        .post('/api/blogs')
        .send(newPost[1])
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.status, 400)
    })
  })

  describe('when updating post', () => {
    test('successful update of post', async () => {
      const savedPost = await blogHelper.blogListInDb()
      const { id } = savedPost[0]

      const post = {
        title: 'updated title',
        author: 'updated author',
        url: 'http://updated-url.com',
        likes: 6,
      }

      const result = await api
        .put(`/api/blogs/${id}`)
        .send(post)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // console.log("inside test", result.body)

      assert.strictEqual(result.status, 200)
      assert.strictEqual(result.body.title, post.title)
    })
  })

  describe('when deleting a post', () => {
    test('deletes a valid id successfuly', async () => {
      const savedPost = await blogHelper.blogListInDb()

      const { id } = savedPost[0]

      const result = await api.delete(`/api/blogs/${id}`).expect(204)

      assert.strictEqual(result.status, 204)
    })

    test('fails to delete with invalid id status 404', async () => {
      const id = '6732bd6457ffeebfa15945b5'

      const result = await api.delete(`/api/blogs/${id}`).expect(400)

      assert.strictEqual(result.status, 400)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
