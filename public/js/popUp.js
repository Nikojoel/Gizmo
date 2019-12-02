'use strict';
// All static element functionality

const model = document.getElementById("popUp");
const aside = document.getElementsByClassName("sidebar")[0];
const header = document.getElementsByClassName("header")[0];
const footer = document.getElementsByClassName("footer")[0];

footer.innerHTML =
    `
    <p><strong>Developed by Niko Holopainen, Jalmari Espo, Enar Mariinsky</strong></p>
    <ul>
        <li id="github">
        <a href="https://github.com/">GitHub</a>
        </li>
    </ul>
    `;

header.innerHTML =
    `
    <div id="login">
        <p><img src="img/ic_warning_black_48dp.png" width="24px" height="24px">Login/Register</p>
    </div>
    `;


aside.innerHTML =
    `
    <h1>Sticky</h1>
            <div id="newPostBar">
                <p><img src="img/ic_warning_black_48dp.png" width="24px" height="24px">New post</p>
            </div>
            <ul>
                <li>
                    <img src="img/ic_warning_black_48dp.png" width="24px" height="24px">
                    <input type="text" placeholder="Search...">
                </li>
                <li id="home">
                    <a href="index.html"><img src="img/ic_warning_black_48dp.png" width="24px" height="24px">Home</a>
                </li>
                <li id="profile">
                    <a href="profile.html"><img src="img/ic_warning_black_48dp.png" width="24px" height="24px">Profile</a>
                </li>
                <li id="votes">
                    <a href="votes.html"><img src="img/ic_warning_black_48dp.png" width="24px" height="24px">Votes</a>
                </li>
                <li id="sort">
                    <a><img src="img/ic_warning_black_48dp.png" width="24px" height="24px">Sort</a>
                    <div class="dropdown-content">
                        <a href="#">Most voted</a>
                        <a href="#">Trending</a>
                        <a href="#">New</a>
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
                    <h1>Existing user</h1>
                    <span class="close">&times</span>
                    <h3>Username</h3>
                    <input type="text" id="usernameText" required>
                    <h3>Password</h3>
                    <input type="password" id="passwordText" required>
                    <input type="checkbox" onclick="showPassword()">Show password
                    <input type="submit" value="Login" id="loginButton">
                    <p id="register"><strong>Not registered? Register here</strong></p>
                </div>
        `;
    model.style.display = "block";
    close();
    document.getElementById("register").addEventListener("click", () => {
        model.innerHTML =
            `
           <div class="modelContent">
                    <h1>New user</h1>
                    <span class="close">&times</span>
                    <h3>First name</h3>
                    <input type="text" id="firstNameText" required>
                    <h3>Last name</h3>
                    <input type="text" id="lastNameText" placeholder="optional" >
                    <h3>Username</h3>
                    <input type="text" id="usernameText" required>
                    <h3>Password</h3>
                    <input type="password" id="passwordText" required>
                    <input type="checkbox" onclick="showPassword()">Show password
                    <input type="submit" value="Register" id="registerButton">
                </div>
           `;
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
                    <h1>Edit profile</h1>
                    <span class="close">&times</span>
                    <h3>Bio</h3>
                    <input type="text" id="newBio" required>
                    <h3>Username</h3>
                    <input type="text" id="newUsername" required>
                    <h3>Picture</h3>
                    <input type="file" id="newProfilePic" required>
                    <input type="submit" id="submit" value="Save">
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