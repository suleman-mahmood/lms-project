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

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

// Start listening on port 3010 for requests 
app.listen('3010', () => {
  console.log("server started on port 3010");
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

// -----------------------------------------RO IMPLEMENTATION ---------------------------------------------------------

// Login API
app.get('/login', (req, res) => {
  const {email, password} = req.query;
  const sql_query = `SELECT * FROM RO WHERE r_email = "${email}" and r_password = "${password}"`;

  db.query(sql_query, (err, result) => {
    if(result.length === 0) {
      console.log("RO doesn't exist");
      const sql_query = `SELECT * FROM Instructor WHERE i_email = "${email}" and i_password = "${password}"`;

      db.query(sql_query, (err, result) => {
        if(result.length === 0){
          console.log("Instructor doesn't exist");
          const sql_query = `SELECT * FROM Student WHERE s_email = "${email}" and s_password = "${password}"`;

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

// Add RO into the database
app.get('/add-ro', (req, res) => {
  const {name, email, password} = req.query;
  const sql_query = `INSERT INTO RO VALUES ("${email}", "${name}", "${password}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("RO already exists", err.message);
      throw err;
    }
    res.send({result: result, message: "Successfully added RO in the RO table"})
  })
});

// Add Instructor into the database
app.get('/add-instructor', (req, res) => {
  const {name, email, password, department} = req.query;
  const sql_query = `INSERT INTO Instructor VALUES ("${email}", "${name}", "${password}", "${department}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("INSTRUCTOR already exists", err.message);
      throw err;
    }
    res.send({result: result, message: "Successfully added INSTRUCTOR in the INSTRUCTOR table"})
  })
});

// Remove Instructor into the database
app.get('/remove-instructor', (req, res) => {
  const {email} = req.query;
  const sql_query = `DELETE FROM Instructor WHERE i_email = "${email}"`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("Couldn't Delete Instructor", err.message);
      throw err;
    }
    res.send({result: result, message: "Successfully deleted INSTRUCTOR from the INSTRUCTOR table"})
  })
});

// Add Student
app.get('/add-student', (req, res) => {
  const {name, email, password, roll_number} = req.query;
  
  const sql_query = `INSERT INTO Student VALUES ("${roll_number}", "${email}", "${name}", "${password}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("Student already exists", err.message);
      throw err;
    }
    res.send({enrolled: true, message: "Successfully enrolled Student in the Student table"})
  })
});

// Remove Student from the database
app.get('/remove-student', (req, res) => {
  const {roll_number} = req.query;
  const sql_query = `DELETE FROM Student WHERE roll_number = "${roll_number}"`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("Couldn't Delete Student", err.message);
      throw err;
    }
    res.send({result: result, message: "Successfully deleted Student from the Student table"})
  })
});

// Enroll Student
app.get('/enroll-student', (req, res) => {
  const {course_id, roll_number} = req.query;
  
  const sql_query = `INSERT INTO Takes VALUES (${course_id}, "${roll_number}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("Student is already enrolled in a course", err.message);
      throw err;
    }
    res.send({enrolled: true, message: "Successfully enrolled Student in the course"})
  })
});

// Create Course
app.get('/create-course', (req, res) => {
  const {course_id, name, course_code, department, credit_hours, semester, year, r_email, i_email} = req.query;
  
  const sql_query = `INSERT INTO Courses VALUES ("${course_id}", "${name}", "${course_code}", "${department}", ${credit_hours}, "${semester}", "${year}", "${r_email}", "${i_email}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      console.log("Course already exists", err.message);
      throw err;
    }
    res.send({enrolled: true, message: "Successfully added Course in the Course table"})
  })
});

// -----------------------------------------INSTRUCTOR IMPLEMENTATION --------------------------------------------------

app.get('/courses-taught', (req, res) => {
  const {email} = req.query;

  const sql_query = `SELECT * FROM Courses WHERE i_email = "${email}"`

  db.query(sql_query, (err, result) => {
    if(err) {
      throw err;
    }
    res.send(result)
  })
})

app.get('/roster', (req, res) => {
  const {course_id} = req.query;

  const sql_query = `SELECT * FROM Student WHERE roll_number in (SELECT roll_number FROM Takes WHERE course_id = "${course_id}")`

  db.query(sql_query, (err, result) => {
    if(err) {
      throw err;
    }
    res.send(result)
  })
})

app.get('/create-quiz', (req, res) => {
  const {quiz_id, no_of_ques, start_time, end_time, course_id} = req.query;

  const sql_query = `INSERT INTO Quizes VALUES ("${quiz_id}", "${no_of_ques}", "${start_time}", "${end_time}", "${course_id}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      throw err;
    }
    res.send(result)
  })
})

app.get('/create-question', (req, res) => {
  const {ques_id, marks, prompt, opt_1, opt_2, opt_3, opt_4, answer, quiz_id} = req.query;

  const sql_query = `INSERT INTO Questions VALUES ("${ques_id}", "${marks}", "${prompt}", "${opt_1}", "${opt_2}", "${opt_3}", "${opt_4}", "${answer}", "${quiz_id}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      throw err;
    }
    res.send(result)
  })
})

// Delete the entire quiz and as well as all its associated questions
app.get('/delete-quiz', (req, res) => {
  const {quiz_id} = req.query;

  const sql_query = `DELETE FROM Questions WHERE quiz_id = "${quiz_id}"; DELETE FROM Quizes WHERE quiz_id = "${quiz_id}"`;

  db.query(sql_query, (err, result) => {
    if(err) {
      throw err;
    }
    res.send(result)
  })
})

app.get('/create-assignment', (req, res) => {
  const {a_id, blob, open_date, close_date, course_id} = req.query;

  const sql_query = `INSERT INTO Assignments VALUES ("${a_id}", "${blob}", "${open_date}", "${close_date}", "${course_id}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      throw err;
    }
    res.send(result)
  })
})

app.get('/upload-resources', (req, res) => {
  const {r_id, blob, type, upload_date, course_id} = req.query;

  const sql_query = `INSERT INTO Resources VALUES ("${r_id}", "${blob}", "${type}", "${upload_date}", "${course_id}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      throw err;
    }
    res.send(result)
  })
})

app.get('/post-announcement', (req, res) => {
  const {ann_id, description, time, course_id} = req.query;

  const sql_query = `INSERT INTO Announcements VALUES ("${ann_id}", "${description}", "${time}", "${course_id}")`;

  db.query(sql_query, (err, result) => {
    if(err) {
      throw err;
    }
    res.send(result)
  })
})
