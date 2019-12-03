'use strict';
// All static element functionality
const url = "http://localhost:3000";

const model = document.getElementById("popUp");
const aside = document.getElementsByClassName("sidebar")[0];
const header = document.getElementsByClassName("header")[0];
const footer = document.getElementsByClassName("footer")[0];


footer.innerHTML =
    `
    <div id="names">
    <a>Developed by Niko Holopainen, Jalmari Espo, Enar Mariinsky</a>
    </div>
    <div id="footerLinks">
    <ul>
        <li id="github">
        <a href="https://github.com/">GitHub</a>
        </li>
        <li id="twitter">
        <a href="https://twitter.com">Twitter</a>
        </li>
        <li id="instagram">
        <a href="https://instagram.com">Instagram</a>
        </li>
    </ul>
    </div>
    `;

header.innerHTML =
    `
    <div>
        <a id="logo" href="index.html"> <img src="img/logo.png" width="64px" height="64px"> </a>
    </div>
    <div>
        <a id="loginImg"><img src="img/icons/profile.png" width="48px" height="48px">Login/Register</a>
    </div>
    `;


aside.innerHTML =
    `
            <div id="newPostBar">
                <p id="newPost"><img src="img/icons/new_post.png">New post</p>
            </div>
            <ul>
                <li>
                    <img src="img/icons/search.png" width="36px" height="36px">
                    <input type="text" placeholder="Search...">
                </li>
                <li id="home">
                    <a href="index.html"><img src="img/icons/home.png" width="36px" height="36px">Home</a>
                </li>
                <li id="profile">
                    <a href="profile.html"><img src="img/icons/profile.png" width="36px" height="36px">Profile</a>
                </li>
                <li id="votes">
                    <a href="votes.html"><img src="img/icons/votes.png" width="30px" height="30px">Votes</a>
                </li>
                <li id="sort" onclick="showDropDown()">
                    <a><img src="img/icons/sort.png" width="36px" height="36px">Sort</a>
                    <div class="hidden" id="dropDownContent">
                        <a href="index.html" onclick="getMostVoted()">Most voted</a>
                        <a href="index.html" onclick="getTrending()">Trending</a>
                        <a href="index.html" onclick="getNew()">New</a>
                  </div>
                </li>
            </ul>
    `;

document.getElementById("newPostBar").addEventListener("click", () => {
    model.innerHTML =
        `
        <div class="modelContent">
                    <h1>New post</h1>
                    <span class="close">&times</span>
                    <h3>Title</h3>
                    <input type="text" id="postTitle" required="">
                    <h3>Text</h3>
                    <input type="text" id="postText" required="">
                    <h3>Picture</h3>
                    <input type="file" id="postFile" required="">
                    <input type="submit" value="Post" id="postButton">
                </div>
        `;
    model.style.display = "block";
    close();
});

document.getElementById("login").addEventListener("click", () => {
    model.innerHTML =
        `
         <div class="modelContent">
            <form id="login-form" enctype="multipart/form-data">
                <h1>Existing user</h1>
                <span class="close">&times</span>
                <h3>Email</h3>
                <input type="email" name="username" required>
                <h3>Password</h3>
                <input type="password" name="password" id="passwordText" required>
                <input type="checkbox" onclick="showPassword()">Show password
                <input type="submit" value="Login" name="login">
                <p id="register"><strong>Not registered? Register here</strong></p>
            </form>
        </div>     
        `;
    model.style.display = "block";
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        const data = serializeJson(loginForm);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url + '/auth/login', fetchOptions);
        const json = await response.json();
        console.log('login response', json);
        if (!json.user) {
            alert(json.message);
        } else {
            sessionStorage.setItem('token', json.token);
            console.log(json.user.user_name);
            model.style.display = "none";
        }
    });
    close();

    document.getElementById("register").addEventListener("click", () => {
        model.innerHTML =
            `
            
           <div class="modelContent">
                <form id="register-form" enctype="multipart/form-data">
                    <h1>New user</h1>
                    <span class="close">&times</span>
                    <h3>First name</h3>
                    <input type="text" name="firstname" required>
                    <h3>Last name</h3>
                    <input type="text" name="lastname" placeholder="optional" >
                    <h3>Email</h3>
                    <input type="email" name="email" required>
                    <h3>Username</h3>
                    <input type="text" name="username" required>
                    <h3>Password</h3>
                    <input type="password" name="password" id="passwordText" required>
                    <input type="checkbox" onclick="showPassword()">Show password
                    <h3>Profile picture</h3>
                    <input type="file" name="profile" required>
                    <input type="submit" value="Register" name="submit">
                </form>
                </div>
           `;
        const registerForm = document.getElementById("register-form");

        registerForm.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            const data = new FormData(registerForm);
            const fetchOptions = {
                method: 'POST',
                body: data,
            };
            const response = await fetch(url + "/auth/register", fetchOptions);
            const json = await response.json();
            console.log(json);
            model.style.display = "none";
        });
        close();
    });
});

function close() {
    document.getElementsByClassName("close")[0].addEventListener("click", () => {
        model.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === model) {
            model.style.display = "none";
        }
    });
}

function editProfile () {
        model.innerHTML =
            `
            <div class="modelContent">
                <form id="edit-form" enctype="multipart/form-data">
                    <h1>Edit profile</h1>
                    <span class="close">&times</span>
                    <h3>Bio</h3>
                    <input type="text" name="bio" required>
                    <h3>Username</h3>
                    <input type="text" name="username" required>
                    <h3>Picture</h3>
                    <input type="file" name="profile" required>
                    <input type="submit" name="submit" value="Save">
                </form>
            </div>
            `;
        model.style.display = "block";
        close();
}

function showPassword() {
    const pwText = document.getElementById("passwordText");
    if (pwText.type === "password") {
        pwText.type = "text";
    } else {
        pwText.type = "password";
    }
}

function showProfile() {
    model.innerHTML =
        `
        <div class="modelContent">
            <h1>Jenna's profile</h1>
            <span class="close">&times</span>
            <h3>@Jenna</h3>
            <p>Jenna Rowling</p>
            <img src="img/prof.jpg" width="175px" height="250px">
            <div id="bioTextSmall">
                    <h3>Bio</h3>
                    <i>"Goats are like mushrooms, if you shoot a duck, I'm scared of toasters"</i>
            </div>
        </div>
        `;
    model.style.display = "block";
    close();
}

function showDropDown() {
    document.getElementById("dropDownContent").classList.toggle("hidden");
}

function getTrending() {

}

function getNew() {

}

function getMostVoted() {

}