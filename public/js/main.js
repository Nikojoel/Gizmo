'use strict';

const ul = document.querySelector('.main ul');
const main = document.getElementsByClassName("main")[0];

const getPosts = async (url) => {
    try {
        const response = await fetch (url);
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

getPosts(url + "/post");


const getPost = async (id) => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            }
        };
        const response = await fetch (url + "/post/" + id, options);
        const result = await response.json();
        console.log(result);
        ul.innerHTML = "";
        main.innerHTML =
            `
            <h1>Post</h1>
            <div>
                <img src="img/${result.user_picture}" class="profPic"><p>by ${result.user_name}</p>
                <h2>${result.post_title}</h2>
                <div id="postPic">
                    <img src="img/${result.post_file}" width="100%">
                </div>
                <p><strong>${result.post_text}</strong></p>
                <div id="postVotes">
                    <img src="img/icons/thumb_up.png"<p>${result.count_vote}</p>
                </div>
                <p>number of comments ${result.count_comments}</p>
            </div>
            <form id="comment-form" enctype="multipart/form-data">
                <input type="text">
                <input type="submit" value="Comment">
            </form>
            `;
    } catch (e) {
        console.log(e);
    }
};








