'use strict';
const host = 'https://localhost:8000';
const html = document.querySelector('div');
const search = document.querySelector('input');
const searchButton = document.getElementById('searchButton')

const popupbar = (msg) => {
    const popup = document.getElementById("popupbar");
    popup.innerText = msg;
    popup.className = "show";
    setTimeout(() => {
        popup.className = popup.className.replace("show", "");
    }, 3000);
};

const fetchPosts = async (host, path) => {
    try {
        const response = await fetch(host + path);
        return await response.json();
    } catch (e) {
        console.log('failed fetch ', e);
    }
};

const getOne = async (id) => {
    const response = await fetch(host + '/post/' + id);
    return await response.json();
};

const fetchUsers = async (host, path) => {
    try {
        const response = await fetch(host + path);
        const result = await response.json();
        renderUser(result);
    } catch (e) {
        console.log('failed fetch ', e);
    }
};
const renderUser = (u) => {
    const entries = Object.entries(u);
    let list ="";
    for(const [key, value] of entries) {
        list += `<li>${key}: <h2> ${value}</h2></li>`
    }
    html.innerHTML =
        `
        <ul class="postDetails">
            <li><img src="${u.user_picture}" </li>
            ${list}     
            <li><button onclick="banUser(${u.user_id})">BAN USER</button></li>      
        </ul>
        `
}
const deletePost = async (id) => {
    if (sessionStorage.getItem('token') === null) {
        popupbar('not authorized');
    }
    const options = {
        method: 'delete',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
    try {
        const path = url + '/post/' + id;
        await fetch(path, options);
        popupbar('Post has been deleted');
        renderPosts('/post/search/new');
    } catch (e) {
        console.log(e);
    }
};

const banUser = async (id) => {
    if (sessionStorage.getItem('token') === null) {
        popupbar('not authorized');
    }
    try {
        const options = {
            method: 'put',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const path = host + '/user/' + id;
        await fetch(path, options);
        renderPosts('/post/search/new');
        popupbar('User has been banned');
    }
    catch (e) {
        console.log(e);
    }
};

const renderPosts = async (path) => {
    const result = await fetchPosts(host, path);
    html.innerHTML = '';
    await result.forEach(it => {
        html.innerHTML +=
            `<article>
                <ul>
                <li><button onclick="deletePost(${it.post_id})">delete</button></li>
                <li><button onclick="banUser(${it.user_id})">BAN USER</button></li>
                <li><img src="./thumbnails/${it.post_file}"/></li>
                <li><h4>Comments: ${it.count_comments}</h4></li>
                <li><h4>Votes: ${it.count_vote}</h4></li>
                <li><h3 onclick="renderOne(${it.post_id})">title: ${it.post_title}</h3></li>
                <li><h3 onclick="fetchUsers(url, '/user/${it.user_id}')">user:  ${it.user_name}</h3></li>
                </ul>
            </article>`
    })
};
const renderOne = async (id) => {
    const result = await getOne(id);
    console.log(result)
    const [post] = result.post;
    const [...comments] = result.commets;
    let list ="";
    comments.forEach(it =>{
        list += `<li onclick="fetchUsers(url, '/user/${it.comment_owner_id}')"><a>${it.user_name}: ${it.comment_text}</a></li>`;
    });
    html.innerHTML =
        `
        <ul class="postDetails">
            <li><h1>Title:${post.post_title}</h1></li>
            <li><img src="${post.post_file}"/></li>
            <li onclick="fetchUsers(url, '/user/${post.post_owner}')"><a>User: ${post.user_name}</a></li>
            <li><p>Text: ${post.post_text}</p></li>
        </ul>
        <ul class="postDetails">
            <li><h1>Comments:</h1></li>
            ${list}
            <li><button onclick="deletePost(${post.post_id})">delete</button></li>
            <li><button onclick="banUser(${post.post_owner})">BAN USER</button></li>
        </ul>
        `
}

searchButton.addEventListener('click', (evt) => {
    const path = '/post/search/' + search.value;
    renderPosts(path)
});
search.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        searchButton.click();
    }
});

document.getElementById('homeButton')
    .addEventListener('click',(evt)=> {
       renderPosts('/post/search/new');
    });

renderPosts('/post/search/new');