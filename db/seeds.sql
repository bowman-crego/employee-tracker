
INSERT INTO department (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Marketing'),
        ('HR');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 70000, 1),
       ('Software Engineer', 80000, 1),
       ('Marketing Specialist', 55000, 1),
       ('HR Manager', 65000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jim','Smith', 2, 3), 
       ('John', 'Green', 1, NULL),
       ('Jane', 'Austin', 3, 2),
       ('Jimmy', 'Carter', 4, 3);
