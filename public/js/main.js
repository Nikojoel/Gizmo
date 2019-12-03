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
                <img src="img/${it.post_file}" alt="paskaa" width="150" height="150">
                <h3>${it.post_title}</h3>
            </div>
            <div id="postProfile" onclick="showProfile()">
                <img src="img/${it.user_picture}" class="profPic"><p><strong>by ${it.user_name}</strong></p>
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

// "${url}/${it.post_id}"
const getPost = async (id) => {
    try {
        const response = await fetch (url + "/post/" + id);
        const result = await response.json();
        console.log(result);
        ul.innerHTML = "";
        main.innerHTML =
            `
            <h1>Post</h1>
            `;
    } catch (e) {
        console.log(e);
    }
};








