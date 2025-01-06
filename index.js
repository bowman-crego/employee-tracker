import inquirer from "inquirer";
import {pool, connectToDb} from "./connection.js";
import fs from "fs";

// create an async function to await a desired input from the user

async function init() {

 await connectToDb()

    async function mainMenu() { 
        const choices = [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
    
        ]; 
    
    
    
    //prompt what selections can be made in the command line
    const { action } = await inquirer.prompt({ 
        message: "What would you like to do?" ,
        name: "actions",
        type: "list",
        choices: choices,
    });
    
    switch (action) {
        case 'View all departments':
            return viewAllDepartments();
        
        case 'View all roles':
            return viewAllRoles();
        
        case 'View all employees':
            return viewAllEmployees();
        
        case 'Add a department':
            return addDepartment();
        
        case 'Add a role':
            return addRole();
    
        case 'Add an employee':
            return addEmployee();
    
        case 'Update an employee role':
            return updateEmployeeRole();
        case 'Exit':
            return exit();
            db.end();
            process.exit();
        
        }
    }   
    
    mainMenu();
    
    
    // .then(answers => {
    //     console.info('Answers:', answers);
    // })
}

async function viewAllDepartments() {
    try {
        const result = await pool.query('SELECT * FROM department');
        console.table(result.rows);
    } catch (error) {
        console.error("Error retrieving departments:", error);
    }
    await mainMenu();
}

async function viewAllRoles() {
    try {
        const result = await pool.query('SELECT * FROM role');
        console.table(result.rows);
    } catch (error) {
        console.error("Error retrieving roles:", error);
    }
    await mainMenu();
}
async function viewAllEmployees() {
    try {
        const result = await pool.query('SELECT * FROM employee');
        console.table(result.rows);
    } catch (error) {
        console.error("Error retrieving employees:", error);
    }
    await mainMenu();
}
async function addDepartment() {
    try {
        const { name } = await inquirer.prompt({
            message: "What is the name of the department?",
            name: "name",
            type: "input",
        });
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added department ${name}`);
    } catch (error) {
        console.error("Error adding department:", error);
    }
    await mainMenu();
}
async function addRole() {
    try {
        const { title, salary, department_id } = await inquirer.prompt([
            {
                message: "What is the title of the role?",
                name: "title",
                type: "input",
            },
            {
                message: "What is the salary of the role?",
                name: "salary",
                type: "input",
            },
            {
                message: "What is the department ID of the role?",
                name: "department_id",
                type: "input",
            },
        ]);
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
        console.log(`Added role ${title}`);
    } catch (error) {
        console.error("Error adding role:", error);
    }
    await mainMenu();
}
async function addEmployee() {
    try {
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            {
                message: "What is the first name of the employee?",
                name: "first_name",
                type: "input",
            },
            {
                message: "What is the last name of the employee?",
                name: "last_name",
                type: "input",
            },
            {
                message: "What is the role ID of the employee?",
                name: "role_id",
                type: "input",
            },
            {
                message: "What is the manager ID of the employee?",
                name: "manager_id",
                type: "input",
            },
        ]);
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
        console.log(`Added employee ${first_name} ${last_name}`);
    } catch (error) {
        console.error("Error adding employee:", error);
    }
    await mainMenu();
}
async function updateEmployeeRole() {
    try {
        const { employee_id, role_id } = await inquirer.prompt([
            {
                message: "What is the employee ID?",
                name: "employee_id",
                type: "input",
            },
            {
                message: "What is the new role ID?",
                name: "role_id",
                type: "input",
            },
        ]);
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
        console.log(`Updated employee ${employee_id} to role ${role_id}`);
    } catch (error) {
        console.error("Error updating employee role:", error);
    }
    await mainMenu();
}
async function exit() {
    console.log("Goodbye!");
    process.exit();
}

init();