const fs = require('fs')
const {
    addStudent,
    CheckStudentExist,
    deleteStudent,
    editStudent,
    postEditStudent
} = require('../../../libs/commonDb/dbFunctions')

const {
    getRestaurants,
    getARestaurant,
    createRestaurant,
    checkRestaurantExist,
    updateRestaurant,
    deleteRestaurant
} = require('../../../libs/commonDb/dbFunctions')

function restaurants() {
    return {
        //Get add student page
        async addStudent(req, res) {
            try {
                res.render('student/addStudent')
            } catch (e) {
                res.redirect('/')
            }
        },
        // post add student page
        async postAddStudent(req, res) {
            try {
                const file = req.body.profile
                let checkStudent = await CheckStudentExist(req.body.name)
                if(checkStudent.length === 0) {
                    if(file.match(/^data:image\/png;base64,/)){
                        const file_data = file.replace(/^data:image\/png;base64,/, "");
                        fs.writeFile(`./public/images/${req.body.name}.png`, file_data, 'base64', (err) => {
                            if(err) throw err
                        })
                    }
                    if(file.match(/^data:image\/jpg;base64,/)){
                        const file_data = file.replace(/^data:image\/jpg;base64,/, "");
                        fs.writeFile(`./public/images/${req.body.name}.png`, file_data, 'base64', (err) => {
                            if(err) throw err
                        })
                    }
                    let data = {
                        name: req.body.name,
                        age: req.body.age,
                        department: req.body.department,
                        dob: req.body.dob,
                        mark: req.body.mark,
                    }
                    await addStudent(data)
                    res.redirect('/');
                } else {
                    res.redirect('/addstudent')
                }
            } catch (e) {
                res.redirect('/addstudent')
            }
        },
        //Delete a student
        async deleteStudent(req, res) {
            let id = req.params.id
            try {
                await deleteStudent(id)
                res.redirect('/')
            } catch (e) {
                res.redirect('/')
            }
        },
        
        // edit student
        async editStudent(req, res) {
            let id = req.params.id
            try {
                let student = await editStudent(id)
                res.render('student/editStudent', {student})
            } catch (e) {
                res.redirect('/')
            }
        },
        
        // update restaurant address
        async postEditStudent(req, res) {
            let id = req.params.id
            try {
                const file = req.body.profile
                if(file.match(/^data:image\/png;base64,/)){
                    const file_data = file.replace(/^data:image\/png;base64,/, "");
                    fs.writeFile(`./public/images/${req.body.name}.png`, file_data, 'base64', (err) => {
                        if(err) throw err
                    })
                }
                if(file.match(/^data:image\/jpg;base64,/)){
                    const file_data = file.replace(/^data:image\/jpg;base64,/, "");
                    fs.writeFile(`./public/images/${req.body.name}.png`, file_data, 'base64', (err) => {
                        if(err) throw err
                    })
                }
                let data = {
                    name: req.body.name,
                    age: req.body.age,
                    department: req.body.department,
                    dob: req.body.dob,
                    mark: req.body.mark,
                }
                await postEditStudent(id, data)
                res.redirect('/')
            } catch (e) {
                res.redirect(`/edit/${id}`)
            }
        },
    }
}

module.exports = restaurants