# Gizmo - Media Sharing Application

#### Only accessible with Metropolia VPN
[Deployed project on Metropolia centos server](https://10.114.34.120/app/index.html)

---


### Description
The intent of this project is to create a Full Stack media sharing application
1. After cloning or downloading run `npm install` to install dependencies.
<details>
  <summary>Check all dependencies</summary>
  
- ["app-root-path"](https://www.npmjs.com/package/app-root-path)
- ["bcryptjs"](https://www.npmjs.com/package/bcryptjs)
- ["cors"](https://www.npmjs.com/package/cors)
- ["dotenv"](https://www.npmjs.com/package/dotenv)
- ["express"](https://www.npmjs.com/package/express)
- ["express-validator"](https://www.npmjs.com/package/express-validator)
- ["jsonwebtoken"](https://www.npmjs.com/package/jsonwebtoken)
- ["multer"](https://www.npmjs.com/package/multer)
- ["mysql2"](https://www.npmjs.com/package/mysql2)
- ["passport"](https://www.npmjs.com/package/passport)
- ["passport-jwt"](https://www.npmjs.com/package/passport-jwt)
- ["passport-local"](https://www.npmjs.com/package/passport-local)
- ["sharp"](https://www.npmjs.com/package/sharp)
</details>

2. Create uploads and thumbnails folders by hand in your IDE or with:
* `mkdir uploads`
* `mkdir thumbnails`

3. Generate self signed ssl keys in 1 folder before the project folder:
![Image description](https://github.com/Nikojoel/Gizmo/blob/dev/docs/ssl.PNG)

4. Create an .env file by hand or with `nano .env` or `touch .env` and insert corresponding example data:

![Image description](https://github.com/Nikojoel/Gizmo/blob/dev/docs/dotenv.PNG)

5. Create a database using the `schema.sql` file and add a user. Make sure the `DB_USER`, `DB_PASS` and `DB_NAME` match.

![Image description](https://github.com/Nikojoel/Gizmo/blob/dev/docs/db.png)

6. Run `app.js` with `nodemon app.js` or `node app.js`

![Image description](https://github.com/Nikojoel/Gizmo/blob/dev/docs/nodemon.png)

---
## ROUTES

- #### AUTH
  - POST /auth/login
    - Login into as user
  - GET /auth/logout
    - Logout the user
  - POST /auth/register
    - Add user to db
  - PUT /auth/update
    - Update the user
  
- #### POST
  - GET /post/search/:search  
    - Use new/top/trending to get sorted list of posts
  - GET /post/:id
    - Get a single post by id
  - POST /post
    - Will return newest posts
  - POST /post/liked
    - Get list of liked posts by logged in user
  - POST /post/vote
    - Vote the selected post
    - Will switch the voted status if used again by user
    
- #### USER
  
  - GET /user/id
    - Gets one user
  - POST /user
    - Add a user to db
  - POST /user/profile
    - Get the profile for logged in user
  - PUT /user/id
    - Ban user
- #### ADMIN
  - POST /admin
    - Gets admin portal html page
  
