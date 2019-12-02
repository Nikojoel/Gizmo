'use strict';

const ul = document.querySelector('.main ul');

const getPosts = async (url) => {
    try {
        const response = await fetch (url);
        const result = await response.json();
        console.log(result);
/*
        result.forEach(it => {
            ul.innerHTML += `
    <li>
        <div>
            <a href="post.html">
                <img src="img/${it.pic}" alt="paskaa" width="150" height="150">
                <h3>${it.title}</h3>
            </a>
            <a id="postProfile" onclick=showProfile()>
                <img src="img/${it.profPic}" class="profPic"><p><strong>by ${it.userName}</strong></p>
            </a>
            <p><img src="img/ic_warning_black_48dp.png">${it.votes} votes <img src="img/ic_warning_black_48dp.png">${it.comments} comments</p>
        </div>
    </li>
    `;

        });
 */
    } catch (e) {
        console.log(e);
    }
};

getPosts("http://localhost:3000/post");




