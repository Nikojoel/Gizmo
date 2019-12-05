'use strict';

const ul = document.querySelector('.main ul');
const main = document.getElementsByClassName("main")[0];


const getPosts = async (url, route) => {
    try {
        const response = await fetch (url + route );
        const result = await response.json();
        console.log(result);

        result.forEach(it => {
            ul.innerHTML += `
    <li>
        <div>
            <div onclick="getPost(${it.post_id})">
                <img src="${url + "/" + it.post_file}" alt="paskaa" width="150" height="150">
                <h3>${it.post_title}</h3>
            </div>
            <div id="postProfile" onclick="showProfile(${it.user_id})">
                <img src="${url + "/" + it.user_picture}" class="profPic"><p><strong>by ${it.user_name}</strong></p>
            </div>
            <p><img src="img/ic_warning_black_48dp.png">${it.count_vote} votes <img src="img/ic_warning_black_48dp.png">${it.count_comments} comments</p>

    </li>
    `;
        });
    } catch (e) {
        console.log(e);
    }
};

getPosts(url, "/post/new");


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
                    <img src="img/icons/thumb_up.png"<p>${result.post[0].count_vote}</p>
                    <img src="img/icons/message.png"<p>${result.post[0].count_comments}</p>
                </div>
            </div>
            
            <form id="comment-form" enctype="multipart/form-data">
                <input type="text">
                <input type="submit" value="Comment">
            </form>
            <h1>Comments</h1>
            `;
        result.commets.forEach(it => {
            main.innerHTML +=
                `
            <div>
                <img src="${url + "/" + it.user_picture}" class="profPic" <p>${it.comment_text}</p>
            </div>
                `;
           console.log(it);
        });
        const commentForm = document.getElementById("comment-form");
        commentForm.addEventListener("submit", async (evt) => {
           evt.preventDefault();
           try {
               // TODO
           } catch (e) {
             console.log(e);
           }
        });
    } catch (e) {
        console.log(e);
    }
};










