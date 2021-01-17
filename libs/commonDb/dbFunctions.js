const db = require('../../app/config/connection')
const collection = require('../../app/config/collections')
const ObjectId = require('mongodb').ObjectID



// school login 
function loginDepartment(data) {
    if(data.username === 'Emstell' && data.password === 'Emstell') {
        return true
    } else return false
}

// get all students
function getAllStudents() {
    return db.get().collection(collection.STUDENTS).aggregate([]).toArray()
}

// add student
function addStudent(data) {
    return db.get().collection(collection.STUDENTS).insertOne(data)
}

// check a student is exist
function CheckStudentExist(name) {
    return db.get().collection(collection.STUDENTS).aggregate([
        {
            $match: {name: name}
        }
    ]).toArray()
}

// Delete a student
function deleteStudent(id) {
    return db.get().collection(collection.STUDENTS).deleteOne({_id: ObjectId(id)})
}

// Edit a restaurant
function editStudent(id) {
    return db.get().collection(collection.STUDENTS).aggregate([
        {
            $match: {_id: ObjectId(id)}
        }
    ]).toArray()
}

// Update Edited student details
function postEditStudent(id, data) {
    return db.get().collection(collection.STUDENTS).updateOne({_id: ObjectId(id)}, {$set: data})
}

//Export db functions
module.exports = {
    loginDepartment,
    getAllStudents,
    addStudent,
    CheckStudentExist,
    deleteStudent,
    editStudent,
    postEditStudent
}
