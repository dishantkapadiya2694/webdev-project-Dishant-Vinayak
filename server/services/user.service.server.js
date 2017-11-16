module.exports = function (app) {

	let userModel = require('../model/user/user.model.server');

	app.post('/api/v1/user', createUser);
	app.get('/api/v1/user', findUser);
	app.get('/api/v1/user/:userId', findUserById);
	app.put('/api/v1/user/:userId', updateUser);
	app.delete('/api/v1/user/:userId', deleteUser);

	function createUser(req, res) {
		userModel.createUser(req.body)
			.then(function(user){
				res.send(user);
			})
			.catch(function(err){
				res.status(400);
				res.send({
					"error": "error while creating user"
				})
			})
	}

	function findUser(req, res) {
		let query = req.query;
		if (query.hasOwnProperty('password')) {
			findUserByCredentials(query, res)
		} else {
			findUserByEmail(query, res);
		}
	}

	function findUserByEmail(req, res) {
		userModel.findUserByEmail(req.email)
			.then(function (user){
				if(user === null){
					res.status(404).send({
						"error": "user not found"
					});
					return;
				}
				res.status(200).send(user);
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "Not Found"
				});
			});
	}

	function findUserByCredentials(req, res) {
		userModel.findUserByCredentials(req.email, req.password)
			.then(function (user){
				if(user === null){
					res.status(404).send({
						"error": "user not found"
					});
					return;
				}
				res.status(200).send(user);
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "Not Found"
				});
			});
	}

	function findUserById(req, res) {
		let userId = req.params.userId;

		userModel.findUserById(userId)
			.then(function (user){
				if(user === null){
					res.status(404).send({
						"error": "user not found"
					});
					return;
				}
				res.status(200).send(user);
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "Not Found"
				});
			});
	}

	function updateUser(req, res) {
		let userId = req.params.userId;
		let user = req.body;

		userModel.updateUser(userId, user)
			.then(function (result){
				res.status(200).send({
					"message": "user updated successfully"
				});
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "Not Found"
				});
			});
	}

	function deleteUser(req, res) {
		let userId = req.params.userId;

		userModel.deleteUser(userId)
			.then(function (result){
				console.log(result);
				if(result.result.n === 0){
					res.status(404).send({
						"error": "user not found"
					});
					return;
				}
				res.status(200).send({
					"message": "user deleted successfully"
				});
			})
			.catch(function (error) {
				res.status(404).send({
					"error": "Not Found"
				});
			});
	}
};