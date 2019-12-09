# Gizmo - Media Sharing Application
1. After cloning or downloading run `npm install` to install dependencies.

2. Create uploads and thumbnails folders by hand in your IDE or with:
* `mkdir uploads`
* `mkdir thumbnails`

3. Generate self signed ssl keys in a 1 folder before the project folder:
![Image description](https://github.com/Nikojoel/Gizmo/blob/dev/docs/ssl.PNG)

4. Create an .env file by hand or with `nano .env` or `touch .env` and insert corresponding example data:

![Image description](https://github.com/Nikojoel/Gizmo/blob/dev/docs/dotenv.PNG)

5. Create a database using the `schema.sql` file and add a user. Make sure the `DB_USER`, `DB_PASS` and `DB_NAME` match.

6. Run `app.js` with `nodemon app.js` or `node app.js`



## ROUTES

- #### AUTH
  - POST /auth/login
    - Login into as user
  - GET /auth/logout
    - Logout the user
  - POST /auth/register
    - add user to db
  - PUT /auth/update
    - update the user
  
- #### POST
  - GET /post/search/:search  
    - use new/top/trending to get sorted list of posts
  - GET /post/:id
    - get a single post by id
  - POST /post
    - will return newest posts
  - POST /post/liked
    - Get list of liked posts by logged in user
  - POST /post/vote
    - vote the selected post
    - will swith the voted status if used again by user
    
- #### USER
  - GET /user
    - Gets all users
  - GET /user/id
    - Gets one user
  - POST /user
    - Add a user to db
  - POST /user/profile
    - get the profile for logged in user
  
