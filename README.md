# Course_app
A course selling web application with working backend servers and database.

An app that lets you(user) buy courses created by admin.<br>
Uses -
        NodeJS,
        Express,
        MongoDB,
        Mongoose Library

Repo has 3 folders & 2 files - db, Middleware and routes.<br>
                             - index.js and config.js

db has : 
        index.js - contains mongoose schemas for user, admin and courses table.

Middleware has:

        admin.js - contains authentication logic using JWT tokens for admins

        user.js - contains authentication logic using JWT tokens for users

routes has:

        admin.js - conatins various routes for admins
                        - signup (POST): signs up the admin creating a new admin in database.

                        - signin (POST): signs in the admin verifying if admin exists or not providing jwt back.

                        - courses (POST): creates a new course for users in database.

                        - courses (GET): returns every course on web app.

        user.js - contains various routes for users
                        - signup (POST): signs up the user creating a new user in database.

                        - signin (POST): signs in the user verifying if user exists or not providing jwt back.

                        - courses (GET): returns every course on web app.

                        - courses/:courseID (POST): purchases the course with course id as 'courseID'.

                        - purchasedCourses (GET): returns all courses that user has purchased.

        **(Every route except signin and signup expects jwt token in header from user which the user gets at signin.)

index.js - contains code to connect from server<br>
config.js - contains jwt token