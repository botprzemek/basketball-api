import postController from 'controllers/method/post.controller'
import patchController from 'controllers/method/patch.controller'
import getController from 'controllers/method/get.controller'
import deleteController from 'controllers/method/delete.controller'

export default {
	post: postController,
	patch: patchController,
	get: getController,
	delete: deleteController
}
