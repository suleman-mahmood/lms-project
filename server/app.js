const express = require('express');
const mysql = require('mysql');

const app = express();

const initialize_tables = `
Create Table RO (
  r_email VARCHAR(100),
  r_name VARCHAR(100),
  r_password VARCHAR(100),
  PRIMARY KEY(r_email)
  
);

Create Table Instructor(
  i_email VARCHAR(100),
  i_name VARCHAR(100),
  i_password CHAR(64),
  department VARCHAR(50),
  Primary Key (i_email)
);

Create Table Student (
  roll_number VARCHAR(50),
  s_email VARCHAR(100),
  s_name VARCHAR(100),
  s_password CHAR(64),
  Primary KEY (roll_number)
);
Create Table Courses(
  course_id INT(4),
  c_name VARCHAR(100),
  course_code VARCHAR(10),
  department VARCHAR(50),
  credit_hours INT(1),
  semester VARCHAR(10),
  year INT(4),
  r_email VARCHAR(100),
  i_email VARCHAR(100),
  Primary KEY(course_id),
  Foreign KEY (r_email) REFERENCES RO(r_email),
  Foreign KEY (i_email) REFERENCES Instructor(i_email)
);

Create Table Takes(
  course_id INT(4),
  roll_number VARCHAR(50),
  Primary Key (course_id,roll_number),
  Foreign KEY (course_id) REFERENCES Courses(course_id),
  Foreign KEY (roll_number) REFERENCES Student (roll_number)
  
);



Create Table Quizes (
  quiz_id INT(4),
  no_of_ques INT(4),
  start_time TIME,
  end_time TIME,
  course_id INT(4),
  Primary KEY (quiz_id),
  Foreign KEY (course_id) REFERENCES Courses(course_id)
  
);

Create Table Announcements (
  ann_id INT(64),
  decription text,
  a_time TIME,
  course_id INT(4),
  Primary KEY (ann_id),
  Foreign KEY (course_id) REFERENCES Courses(course_id)
);

Create Table Assignments (
  a_id INT(64),
  a_blob blob,
  open_date datetime,
  close_date datetime,
  course_id INT(4),
  Primary Key (a_id),
  Foreign KEY (course_id) REFERENCES Courses(course_id)
);

Create Table Resources (
  r_id INT(64),
  r_blob blob,
  r_type VARCHAR(10),
  upload_date datetime,
  course_id INT(4),
  Primary KEY (r_id),
  Foreign KEY (course_id) REFERENCES Courses(course_id)
);

Create Table Questions(
  ques_id INT (64),
  marks INT(64),
  prompt text,
  opt_1 VARCHAR(100),
  opt_2 VARCHAR(100),
  opt_3 VARCHAR(100),
  opt_4 VARCHAR(100),
  answer VARCHAR(100),
  quiz_id INT (64),
  Primary KEY( ques_id),
  Foreign KEY (quiz_id) REFERENCES Quizes(quiz_id)
);

Create Table submits_q(
  quiz_id INT(64),
  roll_number VARCHAR(50),
  sq_time TIME,
  answer blob,

  Primary KEY (quiz_id,roll_number),
  Foreign KEY (roll_number) REFERENCES Student(roll_number)
);

Create Table submits_a(
  sa_id INT (64),
  roll_number VARCHAR(50),
  sa_time TIME,
  sa_blob blob,
  Foreign KEY (roll_number) REFERENCES Student(roll_number)
);
`;

// Start listening on port 3000 for requests 
app.listen('3000', () => {
  console.log("server started on port 3000");
})

// Create Connection to sql server
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "lms",
  multipleStatements: true
})

// Connect to the sql server
db.connect((err) => {
  if(err) throw err;

  console.log("My Sql connected successfully!");
});

// Create database
app.get('/create-db', (req, res) => {
  const sql = 'CREATE DATABASE lms';
  db.query(sql, (err, result) => {
    if(err) {
      console.log("Database already created", err.message);
      throw err;
    }
    res.send("Database created....");
  })
});

// Initialize database
app.get('/init-db', (req, res) => {
  db.query(initialize_tables, (err, result) => {
    if(err) {
      console.log("Error in creating tables", err.message);
      throw err;
    }
    res.send("Tables initialized and created....");
  })
});

// Login API
app.get('/login', (req, res) => {
  const {email, password} = req.query;
  const sql_query = `SELECT * FROM RO WHERE r_email = "${email}"`;

  db.query(sql_query, (err, result) => {
    if(result.length === 0) {
      console.log("RO doesn't exist");
      const sql_query = `SELECT * FROM Instructor WHERE i_email = "${email}"`;

      db.query(sql_query, (err, result) => {
        if(result.length === 0){
          console.log("Instructor doesn't exist");
          const sql_query = `SELECT * FROM Student WHERE s_email = "${email}"`;

          db.query(sql_query, (err, result) => {
            if(result.length === 0){
              console.log("Student doesn't exist");
              res.send({access_level: "None"})
            }
            else res.send({access_level: "Student"});
          })
        }
        else res.send({access_level: "Instructor"});
      })
    }
    else res.send({access_level: "RO"});
  })
});

// Add RO API
app.get('/add-ro', (req, res) => {
  const {name, email, password} = req.query;
  const sql_query = `INSERT INTO RO VALUES ("${email}", "${name}", "${password}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("RO already exists", err.message);
      throw err;
    }
    res.send("Successfully added RO in the RO table")
  })
});

// Enroll Student
app.get('/enroll-student', (req, res) => {
  const {name, email, password, roll_number} = req.query;
  const sql_query = `INSERT INTO Student VALUES ("${roll_number}", "${email}", "${name}", "${password}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("Student already exists", err.message);
      throw err;
    }
    res.send("Successfully enrolled Student in the Student table")
  })
});