# UrbanUnity: Residence Community Mgmt

We created this project as a part of Database Management System Course.
# Contents
- Project Description
- Basic Structure
  - Functionalities
  - ER Diagram
  - Database Schema
  - Screenshots of the Interface
- Tech Stack
- How to Run
- Contributors

# Project Description

In this project we created a UrbanUnity: Residence Community Mgmt with user interface and database support.This project is a part of our curriculum, here we solved the problem of manual entry of data in apartments by creating user interface and storing data in mysql database.

# Basic Structure

## Functionalities

- Admin
  - Admin can login.
  - Admin can view the tenant and owner details.
  - Admin can create owner.
  - Admin can allot parking slot.
  - Admin can view the complaints.
  - Admin can see total Owners.
  - Admin can see total Tenants.
  - Admin can see total Employee.
- Owner
  - Owner can see the Tenant details of his/her owned room.
  - Owner can create Tenant.
  - Owner can see the complaints from his/her owned room.
  - Owner can see the Room Details.
  - Owner can see Total Complaint.
  - Owner can see Number of Employee.
- Tenant

  - Tenant can see the alloted parking slot.
  - Tenant can pay maintenance fee.
  - Tenant can raise complaints.
  - Tenant can see his/her Tenant id.
  - Tenant can see his/her Name.
  - Tenant can see his/her Age.
  - Tenant can see his/her DOB.
  - Tenant can see his/her Room no.

- Employee

  - Employee can see all the complaints.
  - Employee can see Total number of Complaints

- Visitors
  -Vistor can register to veiw any block and room number and cureent data and time of registering is noted
  -All vistor data like Name,Phone number,Block Number,Room Number,Date and Time of Visiting can be seen by the Admin

- All the admins, owners, tenant, employees can login and logout.

## ER Diagram

<kbd><img src="assets/er-diagram.png" width="800px"></kbd>

## Database Schema

<kbd><img src="assets/schema.png" alt="database-schema" width="800px"></kbd>

## Screenshots of the Implementation
![LOGINDBS](https://github.com/zaidk2021/PROJECTFINALDBMS/assets/93735014/23d2462f-810e-4467-8d06-a1df4cc10dba){:width=800}




<kbd><img src="assets/owner.png" alt="owner-dashboard" width="800px"></kbd>
<kbd><img src="assets/employee.png" alt="employee-dashboard" width="800px"></kbd>

<kbd><img src="assets/tenant.png" alt="tenant-dashboard" width="800px"></kbd>

<kbd><img src="assets/employee.png" alt="employee-dashboard" width="800px"></kbd>
<kbd><img src="assets/employee.png" alt="employee-dashboard" width="800px"></kbd>

# Tech Stack

- Frontend - HTML5, Tailwind css, React JS
- Backend - NodeJS, ExpressJS
- Database - MySql

# How to Run

- First, clone the github repo
- Then, install the dependencies by opening the terminal with path as that of cloned github folder and do the following

  - For Client side, cd client

          npm install --legacy-peer-deps

  - For Server side, cd server

          npm install --legacy-peer-deps

- Install MySql workbench if you don't have one, and then import the export.sql file under database folder in workbench.

- Then in server folder create a file "config_sql.js" add localhost name, database name, username and password of your sql workbench and export it.

- Now to run, type the following

  - For client,

          npm run start

  - For sever,
    npm run start

- Now, you can use the project.



`Thank you!🧑‍💻`
