const express = require('express');
const app = express();
const data = require('./public/database.json');
const Joi = require('joi');

app.use(express.json());

app.get('/employees', (req,res) => {
    if(!data){
        res.status(404).send('Could not find information')
    }
    res.send(data)
});

app.get('/employees/:id', (req,res) => {
    const findEmployee = data.employees.find(employee =>{
        return parseInt(req.params.id) === employee.id
    });

    if(!findEmployee){
        res.status(404).send('Employee was not found');
    }
    res.send(findEmployee);
});

//Add Employee
app.post("/employees", (req, res) => {
    const { error } = validateEmployee(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
 
    const addWorker = {
      id: data.employees.length + 1,
      name: req.body.name,
      salary: req.body.salary,
      department: req.body.department,
    };
    if (!addWorker) {
      res.status(404).send("Could not find information");
    }
    data.employees.push(addWorker);
    res.send(addWorker);
    return;
  });

// Update Employee
  app.put("/employees/:id", (req, res) => {
    const employee = data.employees.find(employee =>{
        return parseInt(req.params.id) === employee.id
    });

    if(!employee) return res.status(404).send('Employee was not found');

    const { error } = validateEmployee(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

        employee.name = req.body.name;
        employee.salary = req.body.salary;
        employee.department = req.body.department;
        
      res.send(employee)
  });

//Delete Employee
  app.delete("/employees/:id", (req, res) => {
    const employee = data.employees.find(employee =>{
        return parseInt(req.params.id) === employee.id
    });

    if(!employee) return res.status(404).send('Employee was not found');


    employee.splice(projectIndex, 1);
   
    return res.send();
    

  });

// Validation function
const validateEmployee = (employee) => {
    const schema = {
        name: Joi.string().min(2).required(),
        salary: Joi.number().required(),
        department: Joi.string().min(2).required(),
      };
      return Joi.validate(employee, schema);
      
}




const port = 5050;
app.listen(port);
