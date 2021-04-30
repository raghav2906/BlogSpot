module.exports=(app)=>{
    const blog = require('../controllers/controller')
    const author = require('../controllers/authorcontroller')
    const requirelogin = require('../middleware/requirelogin')
    
    app.get('/api/blogs',blog.getall);
    app.get('/api/blog/:blogId',blog.getone);
    
    app.get('/api/blogauthor/:author',blog.getByAuthor);
    app.get('/api/blogdesc/:desc',blog.getByDesc);
    app.get('/api/blogtitle/:title',blog.getByTitle);

    app.post('/api/create',requirelogin,blog.create);
    app.put('/api/update/:blogId',requirelogin,blog.updateone);
    app.delete('/api/delete/:blogId',requirelogin,blog.deleteone);

    app.post('/api/signup',author.create)
    app.post('/api/signin',author.signin)
    app.get('/api/msg',requirelogin,author.message)

}