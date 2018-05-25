'======================discriminator======================================'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var async = require('async');

mongoose.connect('mongodb://localhost/testApp');

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  },
  connnections: [{
    kind: String,
    item: {type:Schema.Types.ObjectId, refPath: 'connections.kind'}
  }]
},{discriminatorKey: 'kind'});

const TeacherSchema = new Schema({
  name: String,
  title: String,
  age: Number
});

const Student = mongoose.model('Student', StudentSchema);
const LocalSchema = new Schema({ code: String });
const ForeignSchema = new Schema({ salary: Number});

const LocalStudent = Student.discriminator('LocalStudent', LocalSchema);
const ForeignStudent = Student.discriminator('ForeignStudent', ForeignSchema);

const student1 = new Student({name:'test1',age:1});
const ergou = new LocalStudent({name: 'ergou', age: 1, code: 'M123'});
const tony = new ForeignStudent({name: 'tony', age: 1, salary: 100});

/*Student.remove({}, (err, docs)=>{
  async.map([student1, ergou, tony], (item, callback) => {
    item.save((err, doc)=>{
      callback(null, doc);
    })
  },(err, docs)=>{
    Student.count({},(err,count)=>{
      console.log('============discriminator==============',count);
    });

    Student.find({},(err, docs) => {
      console.log(docs);
    })
  });
});*/


'======================populate======================================'


const SubjectSchema = new Schema({
  name: String,
  time: Number,
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }
});

const Subject = mongoose.model('Subject', SubjectSchema);

const tom = new Student({
  name : 'tom',
  age: 18,
});

tom.save((err, doc)=>{
  Subject.remove({}, (err, docs)=>{
    const math = new Subject({
      name: 'math',
      time: 38,
      student: tom
    });

    math.save((err, doc) => {
      if(err) return err;
    });
  });
});

Subject.find({},(err, docs)=>{
  console.log(docs);
});

Subject.findOne({name: 'math'})
  .populate('student')
  .exec((err, doc) => {
    console.log('========populate normal=======', doc.student);
  });

Student.findOne();

const Teacher = mongoose.model('Teacher', TeacherSchema);
const xiaoming = new Student({
  name: 'xiaoming',
  age: 18
});

xiaoming.save((err, doc) => {
  const xiaohong = new Student({
    name: 'xiaohong',
    age: 18
  });
  const jiaoshou = new Teacher({
    name: 'jiaoshou',
    title: 'professor',
    age: 45
  });

  async.map([xiaohong, jiaoshou], (item, callback)=>{
    item.save((err, doc)=>{
      callback(err, doc);
    })
  }, (err, docs)=>{
    docs.map((doc) => {
      if(doc.connections){
        xiaoming.connnections.push({kind:'Student', item: doc._id})
      }

      xiaoming.connnections.push({kind: 'Teacher', item: doc._id})
    });
  })
});

Student.findOne({name: 'xiaoming'}).
  populate('connection.item')
  .exec((err, doc)=>{
    console.log('==========populate dynamic===========', doc);
  });