//student controller

const student = require('../models/student')
var Student = require('../models/student')

module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookUp = id => {
    return Student
        .findOne({numero:id})
        .exec()
}

module.exports.insert = student => {
    var newStudent = Student(student)
    return newStudent.save()
}

module.exports.delete = id => {
    return Student
        .deleteOne({numero:id})
}

module.exports.update = student => {
    return Student
        .findOneAndUpdate({numero:student.numero}, {nome:student.nome, git: student.git, tpc:student.tpc})
}