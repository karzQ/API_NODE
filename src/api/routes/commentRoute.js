module.exports = (server) => {
    const commentController = require('../controllers/commentController');
    const jwtMiddleware = require('../middleware/jwtMiddleware');

    server.route('/posts/:post_id/comments')
        .post(jwtMiddleware.verify_token, commentController.create_a_comment)
        .get(commentController.list_all_post_comments)
        
    server.route('/comments/:comment_id')
        .get(commentController.get_one_comment)
        .get(commentController.list_all_comments)
        .put(commentController.update_a_comment)
        .delete(commentController.delete_a_comment)
}
