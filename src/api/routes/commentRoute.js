module.exports = (server) => {
    const commentController = require('../controllers/commentController');

    server.route('/posts/:post_id/comments')
        .post(commentController.create_a_comment)
        .get(commentController.list_all_comments)
        
    server.route('/comments/:comment_id')
        .get(commentController.get_one_comment)
        .put(commentController.update_a_comment)
        // .delete(commentController.delete_a_comment)
}
