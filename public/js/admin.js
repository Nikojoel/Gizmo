'use strict';
const url = 'https://localhost:8000';
const html = document.querySelector('div');

const fetchPosts = async (url, path) => {
    try {
        const response = await fetch(url + path);
        const result = await response.json();
        console.log('getPost results: ', result);
        return result;
    } catch (e) {
        console.log('failed fetch ', e);
    }
};

const getOne = async (id) => {
    const result = await fetchPosts(url, /post/ + id)
    console.log(result);
};

const fetchUsers = async (url, path) => {
    try {
        const response = await fetch(url + path);
        const result = await response.json();
        console.log('getUser results: ', result);
    } catch (e) {
        console.log('failed fetch ', e);
    }
};

const renderPosts = async () => {
    const result = await fetchPosts(url, '/post/search/new');
    html.innerHTML = '';
    await result.forEach(it => {
        html.innerHTML +=
            `<article>
                <ul>
                <li><img src="./thumbnails/${it.post_file}"/></li>
                <li><h3>Comments: ${it.count_comments}</h3></li>
                <li><h3>Votes: ${it.count_vote}</h3></li>
                <li><h3 onclick="getOne(${it.post_id})">title: ${it.post_title}</h3></li>
                <li><h3 onclick="fetchUsers(url, '/user/${it.user_id}')">user:  ${it.user_name}</h3></li>
                </ul>
                <ul class="buttons">
                <li><button>delete</button></li>
                <li><button>BAN USER</button></li>
                </ul>
            </article>`
    })
};

renderPosts();
fetchUsers(url, '/user/15');