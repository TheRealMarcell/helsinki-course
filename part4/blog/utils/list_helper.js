const _ = require('lodash')

const dummy = (blogs) => {
    return 1
} 

const totalLikes = (blogs) => {
    const reducer = (sum, value) => {
        return sum + value
    }
    const blogLikes = blogs.map((b) => (b['likes']))

    return blogLikes.reduce(reducer, 0) / blogs.length
}

const favoriteBlog = (blogs) => {
    const blogLikes = blogs.map((b) => (b['likes']))
    const maxLikes = Math.max(...blogLikes)


    return blogs.find((b) => b.likes === maxLikes)
}

const mostBlogs = (blogs) => {
    const groupedAuthors = _.groupBy(blogs, 'author')
    const authorBlogCounts = _.mapValues(groupedAuthors, blogs => blogs.length);
    const sortedBlogCounts = _
      .chain(authorBlogCounts)
      .map((num_blogs, artist) => ({ artist, num_blogs }))
      .orderBy(['num_blogs'], ['desc'])
      .value()

    return sortedBlogCounts[0]
}

const mostLikes = (blogs) => {
    const groupedAuthors = _.groupBy(blogs, 'author')
    const authorBlogCounts = _.mapValues(groupedAuthors, blogs => 
        _.sumBy(blogs, 'likes')
    ) 
    const sortedByLikes = _
      .chain(authorBlogCounts)
      .map((total_likes, artist) => ({ artist, total_likes }))
      .orderBy(['total_likes'], ['desc'])
      .value()

    return sortedByLikes[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}