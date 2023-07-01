
{/*}
Q. Design database for Zen class programme
users
codekata
attendance
topics
tasks
company_drives
mentors
*/}

//use zenclass


// Database for users
db.createCollection("users")

db.users.insertMany([
   {
    "userid":1,
    "name":"selvam",
    "email":"selva@gmail.com"
   },
   {
    "userid":2,
    "name":"siva",
    "email":"siva@gmail.com"
   },
   {
    "userid":3,
    "name":"kutty",
    "email":"kutty@gmail.com"
   },
   {
    "userid":4,
    "name":"ahamad",
    "email":"ahamad@gmail.com"
   },
   {
    "userid":5,
    "name":"priya",
    "email":"priya@gmail.com"
   }


])


//Database for codekata details

db.createCollection("codekata");

db.codekata.insertMany([
    {
        userid:1,
        problems:500
    },
     {
        userid:2,
        problems:300
    },
     {
        userid:3,
        problems:255
    },
     {
        userid:4,
        problems:355
    },
     {
        userid:5,
        problems:475
    }
    ])  


    //Database for topics


    db.createCollection("topics");

db.topics.insertMany([
    {   
        topicid:1,
        topic:"HTML",
        topic_date:new Date("3-oct-2020")
    },
     {
         topicid:2,
        topic:"CSS",
        topic_date:new Date("12-oct-2020")
    },
     {
         topicid:3,
        topic:"Bootstrap",
        topic_date:new Date("14-oct-2020")
    },
     {
         topicid:4,
        topic:"JavaScript",
        topic_date:new Date("16-oct-2020")
    },
     {
         topicid:5,
        topic:"React JS",
        topic_date:new Date("25-oct-2020")
    }
    ])


   //Database for tasks

    db.createCollection("tasks");

    db.tasks.insertMany([
    {
        taskid:1,
        topicid:1,
        userid:1,
        task:"HTML task",
        due_date:new Date("5-oct-2020"),
        submitted:true
    },
    {
        taskid:2,
        topicid:2,
        userid:2,
        task:"CSS task",
        due_date:new Date("15-oct-2020"),
        submitted:true
    },
     {
        taskid:3,
        topicid:3,
        userid:3,
        task:"Bootstrap task",
        due_date:new Date("17-oct-2020"),
        submitted:false
    },
      {
        taskid:4,
        topicid:4,
        userid:4,
        task:"JavaScript task",
        due_date:new Date("18-oct-2020"),
        submitted:true
    },
     {
        taskid:5,
        topicid:5,
        userid:5,
        task:"React JS task",
        due_date:new Date("27-oct-2020"),
        submitted:false
    }
    ])

    
   //Database for attendance

      db.createCollection("attendance");

      db.attendance.insertMany([
    {
        userid:1,
        topicid:2,
        attended:true
    },
     {
        userid:2,
        topicid:1,
        attended:true
    },
     {
        userid:3,
        topicid:5,
        attended:false
    },
    {
        userid:4,
        topicid:3,
        attended:true
    },
    {
        userid:5,
        topicid:4,
        attended:false
    }
    
    ])
    
    
 // Database for mentors

      db.createCollection("mentors");

    db.mentors.insertMany([
    {
        mentorid:1,
        mentorname:"Ruban",
        mentor_email:"ruban@gmail.com",
        mentee_count: 20
    },
      {
        mentorid:2,
        mentorname:"sangeetha",
        mentor_email:"sangeetha@gmail.com",
        mentee_count:15
    },
      {
        mentorid:3,
        mentorname:"sathis",
        mentor_email:"sathis@gmail.com",
        mentee_count:100
    },
      {
        mentorid:4,
        mentorname:"sanjay",
        mentor_email:"sanjay@gmail.com",
        mentee_count:18
    },
      {
        mentorid:5,
        mentorname:"sai mohan",
        mentor_email:"saimohan@gmail.com",
        mentee_count:25
    }
    ])

   
  //Database for companydrives

      db.createCollection("companydrives");

      db.companydrives.insertMany([
    {
        userid:1,
        drive_date:new Date("5-oct-2020"),
        company:"Amazon"
    },
     {
        userid:1,
        drive_date:new Date("18-oct-2020"),
        company:"Infosys"
    },
     {
        userid:2,
        drive_date:new Date("21-oct-2020"),
        company:"Amazon"
    },
     {
        userid:3,
        drive_date:new Date("8-oct-2020"),
        company:"TCS"
    },
     {
        userid:4,
        drive_date:new Date("4-nov-2020"),
        company:"ITC"
    },
    {
       userid:5,
        drive_date:new Date("13-nov-2020"),
        company:"Fintech"
    }
    ])
    

// 1.Find all the topics and tasks which are thought in the month of October


db.topics.aggregate([
    {
        $lookup: {
               from: "tasks",
               localField: "topicid",
               foreignField: "topicid",
               as: "taskinfo"
             }
    },
    {
        $match:{$and:[{$or:[{topic_date:{$gt:new Date("30-sep-2020")}},{topic_date:{$lt:new Date("1-nov-2020")}}]},
        
          {$or:[{"taskinfo.due_date":{$gt:new Date("30-sep-2020")}},{"taskinfo.due_date":{$lt:new Date("1-nov-2020")}}]}
        ]}
    }
    
    ])


//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

    db.companydrives.find({$or:[{drive_date:{$gte:new Date("15-oct-2020")}},
    {drive_date:{$lte:new Date("31-0ct-2020")}}]})



// 3.Find all the company drives and students who are appeared for the placement.

db.companydrives.aggregate([
    {
        $lookup: {
              from:"users",
              localField:"userid",
              foreignField:"userid",
              as :"userinfo"
             }
    },
    {
        $project:{
            _id:0,
            "userinfo.name":1,
            company:1,
            drive_date:1,
            "userinfo.email":1,
            "userinfo.userid":1
        }
    }
    ])
//4.Find the number of problems solved by the user in codekata

   db.codekata.aggregate([
    {
        $lookup:{
            from:"users",
            localField:"userid",
            foreignField:"userid",
            as:"userinfo"
        }
    },
    {
        $project:{
            _id:0,
            "userinfo.name":1,
            userid:1,
            problems:1

        }
    }

])

//5.Find all the mentors with who has the mentee's count more than 15

  db.mentors.find({mentee_count:{$gt:15}});

//6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020


db.attendance.aggregate([
    {$lookup: {
           from: "topics",
           localField: "topicid",
           foreignField: "topicid",
           as: "topics"
         }},
         {
             $lookup: {
                    from: "tasks",
                    localField: "topicid",
                    foreignField: "topicid",
                    as: "tasks"
                  }
         },
         {$match:{$and:[{attended:false},{"tasks.submitted":false}]}},
         {$match:{$and:[{$or:[{"topics.topic_date":{$gte:new Date("15-oct-2020")}},{"topics.topic_date":{$lte:new Date("31-oct-2020")}}]}, 
         {$or:[{"tasks.due_date":{$gte:new Date("15-oct-2020")}},{"tasks.due_date":{$lte:new Date("31-oct-2020")}}]}
         ]}},
         {
             $count: "No_of_students_absent"
         }
         
    ])