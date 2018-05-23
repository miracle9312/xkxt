const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var async = require('async');

mongoose.connect('mongodb://localhost/testApp');

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number
},{discriminatorKey: 'kind'});

const Student = mongoose.model('Student', StudentSchema);
const LocalSchema = new Schema({ code: String });
const ForeignSchema = new Schema({ salary: Number});

const LocalStudent = Student.discriminator('LocalStudent', LocalSchema);
const ForeignStudent = Student.discriminator('ForeignStudent', ForeignSchema);

const student1 = new Student({name:'test1',age:1});
const ergou = new LocalStudent({name: 'ergou', age: 1, code: 'M123'});

const tony = new ForeignStudent({name: 'tony', age: 1, salary: 100});

Student.find({}, async (err, docs)=>{
  docs.map((doc)=>{
    doc.remove();
  });
});

async.map([student1, ergou, tony], (item, callback) => {
  item.save((err, doc)=>{
    callback(null, doc);
  })
},(err)=>{
  Student.count({},(err,count)=>{
    console.log(count);
  });

  Student.find({}, (err, person)=> {
    console.log(person);
  })
});
