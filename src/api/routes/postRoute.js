module.exports = (server) => {
    const postController = require('../controllers/postController');

    server.route('/posts')
        .get(postController.list_all_post)
        .post(postController.create_a_post)
        
    server.route('/posts/:post_id')
        .get(postController.get_one_post)
        .put(postController.update_a_post)
        .delete(postController.delete_a_post)


}
