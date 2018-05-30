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
  connections: [{
    kind: String,
    item: {type:Schema.Types.ObjectId, refPath: 'connections.kind'}
  }],
  classname: String
},{discriminatorKey: 'kind'});

const TeacherSchema = new Schema({
  name: String,
  title: String,
  age: Number
});

const SubjectSchema = new Schema({
  name: String,
  time: Number,
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }
});

const ClassSchema = new Schema({
  name: String,
  major: String
},{ toJSON: { virtuals: true } });

ClassSchema.virtual('members', {
  ref: 'Student',
  localField: 'name',
  foreignField: 'classname',
  justOne: false
});

const Subject = mongoose.model('Subject', SubjectSchema);
const Student = mongoose.model('Student', StudentSchema);
const Teacher = mongoose.model('Teacher', TeacherSchema);
const MyClass = mongoose.model('MyClass', ClassSchema);

const LocalSchema = new Schema({ code: String });
const ForeignSchema = new Schema({ salary: Number});

const LocalStudent = Student.discriminator('LocalStudent', LocalSchema);
const ForeignStudent = Student.discriminator('ForeignStudent', ForeignSchema);

const student1 = new Student({name:'test1',age:1});
const ergou = new LocalStudent({name: 'ergou', age: 1, code: 'M123'});
const tony = new ForeignStudent({name: 'tony', age: 1, salary: 100});

Student.remove({}, (err, docs)=>{
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
});


'======================populate======================================'

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

Subject.findOne({name: 'math'})
  .populate('students')
  .exec((err, doc) => {
    console.log('========populate normal=======', doc);
  });




const xiaoming = new Student({
  name: 'xiaoming',
  age: 18
});

const xiaohong = new Student({
  name: 'xiaohong',
  age: 18,
});

const jiaoshou = new Teacher({
  name: 'jiaoshou',
  title: 'professor',
  age: 45
});

Student.remove({}).exec((err, docs)=>{
  async.map([xiaohong, jiaoshou], (item, callback)=>{
    item.save((err, doc)=>{
      callback(err, doc);
    })
  }, (err, docs)=>{
    docs.map((doc) => {
      if ("connections" in doc) {
        xiaoming.connections.push({kind: 'Student', item: doc._id});
      }else{
        xiaoming.connections.push({kind: 'Teacher', item: doc._id});
      }
    });

    xiaoming.save((err, doc) => {
      Student.findOne({name: 'xiaoming'}).
      populate('connections.item')
        .exec((err, doc)=>{
          console.log('==========populate dynamic first===========', doc.connections[0].item);
          console.log('==========populate dynamic second===========', doc.connections[1].item);
        });
    });

  });
});

const xiaolv = new Student({
  name: 'xiaolv',
  age: 18,
  classname: 'M1501'
});

Student.remove({}).then(() => {
  xiaolv.save((err, docs) => {
    const labClass = new MyClass({
      name: 'M1501',
      major: 'mechanic'
    });

    MyClass.remove().then(()=>{
      labClass.save((err, doc) => {
        MyClass.findOne({name: 'M1501'}).
          populate('members').
          exec((err, docs) => {
          console.log('===========virtual populate=============', docs);
        })
       })
    });
  })
});