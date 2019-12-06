'use strict';
// All static element functionality (footer, aside, header) and pop up windows
const url = "http://localhost:3000";

const model = document.getElementById("popUp");
const aside = document.getElementsByClassName("sidebar")[0];
const header = document.getElementsByClassName("header")[0];
const footer = document.getElementsByClassName("footer")[0];

const createHeader = async () => {
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
            try {
                const data = serializeJson(loginForm);
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                };
                const response = await fetch(url + '/auth/login', options);
                const json = await response.json();
                console.log('login response', json);
                if (!json.user) {
                    alert("Wrong username or password. Try again");
                } else {
                    sessionStorage.setItem('token', json.token);
                    console.log(json.user.user_name);
                    model.style.display = "none";
                    location.reload();
                }
            } catch (e) {
                console.log(e);
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
                try {
                    const data = new FormData(registerForm);
                    const options = {
                        method: 'POST',
                        body: data,
                    };
                    const response = await fetch(url + "/auth/register", options);
                    const json = await response.json();
                    console.log(json);
                    model.style.display = "none";
                } catch (e) {
                    console.log(e);
                }
            });
            close();
        });
    });
};

const logOut = async () => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            }
        };
        const response = await fetch (url + "/auth/logout", options);
        const result = await response.json();
        console.log(result);
        sessionStorage.removeItem("token");
        window.location.replace("index.html")
    } catch (e) {
        console.log(e);
    }
};

const checkToken = async () => {
    if (sessionStorage.getItem('token') != null) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }
            };
            const response = await fetch (url + "/user/profile", options);
            const result = await response.json();
            console.log(result);
            header.innerHTML =
                `
                <div>
                    <a id="logo" href="index.html"> <img src="img/logo.png" width="76px" height="76px"> </a>
                </div>
                <div id="loginProfile">
                    <a onclick="getProfile()">
                    <img src="${url + "/" + result.user_picture}" class="profPic">
                    <h3>${result.user_name}</h3>
                    </a>
                    <img id="logOut" src="img/icons/logout.png" width="48px" height="48px" onclick="logOut()">
                </div>
                `;
        } catch (e) {
            console.log(e);
        }
    } else {
        header.innerHTML =
            `
            <div>
                <a id="logo" href="index.html"> <img src="img/logo.png" width="76px" height="76px"> </a>
            </div>
            <div id="login">
                <a id="loginImg"><img src="img/icons/profile.png" width="50px" height="50px">Login/Register</a>
            </div>
        `;
        createHeader();
    }
};

checkToken();

const showProfile = async (id) => {
    try {
        const response = await fetch (url + "/user/" + id);
        const result = await response.json();
        console.log(result);
        if (`${result.user_bio}` === "null") {
            model.innerHTML =
            `
            <div class="modelContent">
                <h1>${result.user_name}'s profile</h1>
                <span class="close">&times</span>
                <h3>@${result.user_name}</h3>
                <img src="${url + "/" + result.user_picture}" width="150px" height="200px">
                <div id="bioTextSmall">
                <h3>Bio</h3>
                <i>This bio is empty : (</i>
                </div>
            </div>
        `;
        } else {
        model.innerHTML =
        `
        <div class="modelContent">
            <h1>${result.user_name}'s profile</h1>
            <span class="close">&times</span>
            <h3>@${result.user_name}</h3>
            <img src="${url + "/" + result.user_picture}" width="150px" height="200px">
            <div id="bioTextSmall">
            <h3>Bio</h3>
            <i>${result.user_bio}</i>
            </div>
        </div>
        `;
        }
        model.style.display = "block";
        close();
    } catch (e) {
        console.log(e);
    }
};

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

aside.innerHTML =
    `
    <div id="newPostBar">
        <p id="newPost"><img src="img/icons/new_post.png" width="64px" height="64px">New post</p>
    </div>
    <ul id="stickyList">
        <li id="search">
            <img src="img/icons/search.png" width="50px" height="50px">
            <form id="search-form" name="search" enctype="multipart/form-data">
                <input id="searchText" type="text" placeholder="Search..." required>
            </form>
        </li>
        <li id="home">
            <a href="index.html"><img src="img/icons/home.png" width="50px" height="50px">Home</a>
        </li>
        <li id="profile">
            <a onclick="getProfile()" "><img src="img/icons/profile.png" width="50px" height="50px">Profile</a>
        </li>
        <li id="votes">
            <a onclick="getVotes()"><img src="img/icons/votes.png" width="50px" height="50px">Votes</a>
        </li>
        <li id="sort" onclick="showDropDown()">
            <a><img src="img/icons/sort.png" width="50px" height="50px">Sort</a>
            <div class="hidden" id="dropDownContent">
                <a onclick="getMostVoted()">Most voted</a>
                <a onclick="getTrending()">Trending</a>
                <a onclick="getNew()">New</a>
          </div>
        </li>
    </ul>
    `;

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit",(evt) => {
    evt.preventDefault();
    const data = document.getElementById("searchText").value;
    getSearch(data);
});

document.getElementById("newPostBar").addEventListener("click", () => {
    if (sessionStorage.getItem('token') != null) {
        model.innerHTML =
        `
        <div class="modelContent">
            <form id="post-form" enctype="multipart/form-data">
                <h1>New post</h1>
                <span class="close">&times</span>
                <h3>Title</h3>
                <input type="text" name="post_title" required>
                <h3>Text</h3>
                <input type="text" name="post_text" required>
                <h3>Picture</h3>
                <input type="file" name="post_file" required>
                <input type="submit" value="Post" id="postButton">
            </form>
        </div>
        `;
        const postForm = document.getElementById("post-form");

        postForm.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            try {
                const data = new FormData(postForm);
                const options = {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    }
                };
                const response = await fetch (url + "/post", options);
                const result = await response.json();
                console.log(result);
                location.reload();
            } catch (e) {
                console.log(e);
            }
        });
    } else {
        errorModel();
    }
    model.style.display = "block";
    close();
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
    const editForm = document.getElementById("edit-form");

    editForm.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        try {
            const data = new FormData(editForm);
            const options = {
                method: 'PUT',
                body: data,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }
            };
        const response = await fetch (url + "/auth/update", options);
        const result = await response.json();
        console.log(result);
        location.reload();
        } catch (e) {
            console.log(e);
        }
    });
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

function showDropDown() {
    document.getElementById("dropDownContent").classList.toggle("hidden");
}

function errorModel() {
    model.innerHTML =
    `
    <div class="modelContent">
        <span class="close">&times</span>
        <div class="errorPic">
            <img src="img/icons/down_face.png">
            <h3>Please login to use this feature</h3>
        </div>
    </div>
    `;
    model.style.display = "block";
    close();
}

function getTrending() {
    getPosts(url, "/post/search/trending");
}

function getNew() {
    getPosts(url, "/post/search/new");
}

function getMostVoted() {
    getPosts(url, "/post/search/top");
}

function getSearch(searchData) {
    getPosts(url, "/post/search/" + searchData);
}