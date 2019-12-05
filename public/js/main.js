'use strict';

const ul = document.querySelector('.main ul');
const main = document.getElementsByClassName("main")[0];


const getPosts = async (url, route) => {
    try {
        const response = await fetch (url + route );
        const result = await response.json();
        console.log(result);
        main.innerHTML = "<ul></ul>";
        const posts = document.querySelector(".main ul");
        ul.innerHTML = "";
        result.forEach(it => {
            posts.innerHTML += `
    <li>
        <div>
            <div id="thumbNail" onclick="getPost(${it.post_id})">
                <img id="thumbNailImg" src="${url + "/" + it.post_file}">
            </div>
            <div id="postProfile" onclick="showProfile(${it.user_id})">
                <img src="${url + "/" + it.user_picture}" class="profPic">
                <div id="postDesc">
                    <h3 id="titleSize">${it.post_title}</h3>
                    <p id="userNameSize">by ${it.user_name}</p>
                </div>
            </div>
            <p id="thumbNailVotes"><img src="img/icons/thumb_up.png" onclick="vote(${it.post_id}, 1)" width="26px" height="26px">${it.count_vote} UPvotes </p>
            <p><img src="img/icons/comment.png" width="26px" height="26px">${it.count_comments} comments</p>  
         </div>
    </li>
    `;
        });
    } catch (e) {
        console.log(e);
    }
};

getPosts(url, "/post/search/new");


const getPost = async (id) => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            }
        };
        const response = await fetch (url + "/post/" + id, options);
        console.log('response?', response);
        const result = await response.json();
        console.log(result);
        const postId = id;
        ul.innerHTML = "";
        main.innerHTML =
            `
            <div id="postContent">
                <img src="${url + "/" + result.post[0].user_picture}" class="profPic"><p>by ${result.post[0].user_name}</p>
                <h2>${result.post[0].post_title}</h2>
                <div id="postPic">
                    <img src="${url + "/" + result.post[0].post_file}" width="100%">
                </div>
                <p><strong>${result.post[0].post_text}</strong></p>
                <div id="postVotes">
                    <img src="img/icons/thumb_up.png" onclick="vote(${result.post[0].post_id}, 0);" <p>${result.post[0].count_vote}</p>
                    <img src="img/icons/comment.png"<p>${result.post[0].count_comments}</p>
                </div>
            </div>
            
            <form id="comment-form" enctype="multipart/form-data">
                <input type="text" name="comment"required>
                <input type="hidden" name="post_id" value="${postId}">
                <input type="submit" value="Comment">
            </form>
            <h1>Comments</h1>
            <ul id="comments">
            
            </ul>
            `;
        const commentUl = document.getElementById("comments");
        result.commets.forEach(it => {
            commentUl.innerHTML +=
            `
            <li>
                <div>
                    <img src="${url + "/" + it.user_picture}" class="profPic" <p>${it.comment_text}</p>
                </div>
            </li>
            `;
        });
        const commentForm = document.getElementById("comment-form");
        commentForm.addEventListener("submit", async (evt) => {
           evt.preventDefault();
           try {
               const data = serializeJson(commentForm);
               const options = {
                   method: 'POST',
                   headers: {
                       'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(data),
               };
               const response = await fetch (url + "/post/comment", options);
               const result = await response.json();
               console.log(result);
               getPost(postId, 0);
           } catch (e) {
             console.log(e);
           }
        });
    } catch (e) {
        console.log(e);
    }
};

const getVotes = async () => {
    if (sessionStorage.getItem('token') != null) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }
            };
            const response = await fetch(url + "/post/liked", options);
            const result = await response.json();
            console.log(result);
            main.innerHTML =
                `
            <h1>Your votes</h1>
            <ul>
            
            </ul>
            `;
            const ul = document.querySelector(".main ul");
            result.forEach(it => {
                ul.innerHTML +=
                    `
            <li>
                <div>
                    <img src="${url + "/" + it.post_file}" class="profPic" onclick="getPost(${it.post_id})">
                    <h3>${it.post_title}</h3>
                    <img src="img/icons/thumb_up.png">
                </div>
            </li>
            `;
            });

        } catch (e) {
            console.log(e);
        }
    } else {
        errorModel();
    }
};

const getProfile = async () => {
    if (sessionStorage.getItem('token') != null) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }
            };
            const response = await fetch(url + "/user/profile", options);
            const result = await response.json();
            console.log(result);
            if (`${result.user_bio}` === "null") {
                main.innerHTML =
                    `
            <h1>${result.user_firstname}'s profile</h1>
            <h3>@${result.user_name}</h3>
            <h4>${result.user_firstname} ${result.user_lastname}</h4>
            <img src="${url + "/" + result.user_picture}" width="50%" height="50%">
            <h3>Bio</h3>
            <i>Your bio is empty : (</i>
            <input type="button" value="Edit profile" onclick="editProfile()">
            `;
            } else {
                main.innerHTML =
                    `
            <h1>${result.user_firstname}'s profile</h1>
            <h3>@${result.user_name}</h3>
            <h4>${result.user_firstname} ${result.user_lastname}</h4>
            <img src="${url + "/" + result.user_picture}" width="50%" height="50%">
            <h3>Bio</h3>
            <i>${result.user_bio}</i>
            <input type="button" value="Edit profile" onclick="editProfile()">
            `;
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        errorModel();
    }
};


const vote = async (id, status) => {
    if (sessionStorage.getItem('token') != null) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({post_id: id}),
            };
            const response = await fetch (url + "/post/vote", options);
            const result = await response.json();
            console.log(result);
            if (status === 0) {
                getPost(id);
            } else if (status === 1) {
                getPosts(url, "/post/search/new");
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        errorModel();
    }
};













