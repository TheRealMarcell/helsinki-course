const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('getting a blog entry', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('valid number of blogs', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('verify id property name', async() => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert(blog.hasOwnProperty('id'))
    })
})

test('a valid blogpost can be added', async() => {
    const newBlogPost = {
        title: "Test blogpost",
        author: "Test Suite",
        url: "welovetesting.com",
        likes: 40
    }
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogAtEnd.map(b => b.title)

    assert(contents.includes('Test blogpost'))
})

test('like default to 0 if not provided', async() => {
    const newBlogPost = {
        title: "Test blogpost without like",
        author: "Test suite",
        url: "welovetestingverymuch.com"
    }
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogAtEnd = await helper.blogsInDb()
    const newlyAddedBlog = blogAtEnd[blogAtEnd.length -1]
    assert.strictEqual(newlyAddedBlog.likes, 0)

})

test('check error if title not provided', async() => {
    const newBlogPost = {
        author: 'webbster',
        url:'welovetesting.com',
        likes: 420
    }
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(400)
})

test('check error if author not provided', async() => {
    const newBlogPost = {
        title: 'title is provided!',
        url:'welovetesting.com',
        likes: 69
    }
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(400)
})

test('test deletion of post', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogAtEnd = await helper.blogsInDb()

    const titles = blogAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1)
})

test('update information of post', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlogPost = {
        likes: 6917420
    }

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogPost)
      .expect(201)
    
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.likes)

    assert(titles.includes(updatedBlogPost.likes))
})

after(async () => {
    await mongoose.connection.close()
})
