const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var async = require('async');

mongoose.connect('mongodb://localhost/testApp');

const StudentSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true
  },
  age: Number
},{discriminatorKey: 'kind',_id: false});

const Student = mongoose.model('Student', StudentSchema);
const LocalSchema = new Schema({ code: String },{_id: false});

/*/!*子表字段和通用表字段优先级*!/
console.log(LocalSchema.path('_id').instance);
/!*子表字段和通用表字段优先级*!/*/

const LocalStudent = Student.discriminator('LocalStudent', LocalSchema);
const ForeignStudent = Student.discriminator('ForeignStudent', new Schema({
  salary: Number,
}));

const student1 = new Student({name:'test1',age:1});
const ergou = new LocalStudent({_id:'ergou',name: 'ergou', age: 1, code: 'M123'});

/*子表字段和通用表字段优先级*/
console.log(typeof ergou._id);
/*子表字段和通用表字段优先级*/

const tony = new ForeignStudent({name: 'tony', age: 1, salary: 100});

async.map([student1, ergou, tony], (item, callback) => {
  item.save((err, doc)=>{
    callback(null, doc);
  })
},(err, docs)=>{
  Student.count({},(err=null,count)=>{
    console.log(count);
  })
});


