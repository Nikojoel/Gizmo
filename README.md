# Gizmo
create uploads and thumbnails folders by hand

you need to create self signed ssl keys in a 1 folder before the project folder:

![Image description](https://github.com/Nikojoel/Gizmo/blob/dev/docs/ssl.PNG)

Create an .env file:

![Image description](https://github.com/Nikojoel/Gizmo/blob/dev/docs/dotenv.PNG)


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
  
