const {
    loginDepartment,
    getAllStudents
} = require('../../../libs/commonDb/dbFunctions')

let status = false;
function homeController() {
    return {
        //get home page
        async home(req, res) {
            try {
                let student = await getAllStudents();
                if(status == true) res.render('home', {student})
                else res.redirect('/login')
            } catch (e) {
                res.redirect('/login')
            }
        },
        //get login page
        async login(req, res) {
            try {
                res.render('login')
            } catch (e) {
                res.render('login')
            }
        },
        //post login
        async postLogin(req, res) {
            try {
                let val = await loginDepartment(req.body)
                if (val === true) {
                    status = true
                    res.redirect('/')
                } else {
                    res.redirect('/login')
                }
            } catch (e) {
                res.redirect('/login')
            }
        },
        //get logout route
        async logout(req, res) {
            try {
                status = false
                res.redirect('/login')
            } catch (e) {
                res.redirect('/')
            }
        },
    }
}

module.exports = homeController