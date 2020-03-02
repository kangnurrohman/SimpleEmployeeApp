const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

// start route get

router.get('/', (req, res) => {
	Employee.find({})
		.then(employees => {
			res.render('index', {
				employees
			});
		})
		.catch(err => {
			req.flash('error_msg', 'ERROR:' + err);
			console.log(err);
		})
});

router.get('/employee/new', (req, res) => {
	res.render('new');
});

router.get('/employee/search', (req, res) => {
	res.render('search', {
		employee: ""
	});
});

router.get('/employee', (req, res) => {
	let searchQuery = {
		name: req.query.name
	};
	Employee.findOne(searchQuery)
		.then(employee => {
			res.render('search', {
				employee
			});
		})
		.catch(err => {
			req.flash('error_msg', 'ERROR:' + err);
			console.log(err);
		})
});

router.get('/edit/:id', (req, res) => {
	let searchQuery = {
		_id: req.params.id
	};
	Employee.findOne(searchQuery)
		.then(employee => {
			res.render('edit', {
				employee
			});
		})
		.catch(err => {
			req.flash('error_msg', 'ERROR:' + err);
			console.log(err);
		})
});

// start route post

router.post('/employee/new', (req, res) => {
	let newEmployee = {
		name: req.body.name,
		designation: req.body.designation,
		salary: req.body.salary
	};

	Employee.create(newEmployee)
		.then(employee => {
			req.flash('success_msg', 'Employee data added to database successfully');
			res.redirect('/');
		})
		.catch(err => {
			req.flash('error_msg', 'ERROR:' + err);
			console.log(err);
		});
});

// start route put

router.put('/edit/:id', (req, res) => {
	let searchQuery = {
		_id: req.params.id
	};
	Employee.updateOne(searchQuery, {
			$set: {
				name: req.body.name,
				designation: req.body.designation,
				salary: req.body.salary
			}
		})
		.then(employee => {
			req.flash('success_msg', 'Employee data updated successfully');
			res.redirect('/');
		})
		.catch(err => {
			req.flash('error_msg', 'ERROR:' + err);
			console.log(err);
		});
});

// delete routes start

router.delete('/delete/:id', (req, res) => {
	let searchQuery = {
		_id: req.params.id
	};
	Employee.deleteOne(searchQuery)
		.then(employee => {
			req.flash('success_msg', 'Employee deleted successfully');
			res.redirect('/');
		})
		.catch(err => {
			req.flash('error_msg', 'ERROR:' + err);
			console.log(err);
		})
});

module.exports = router;