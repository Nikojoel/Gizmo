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
        console.log('getUser results: ', result);
    } catch (e) {
        console.log('failed fetch ', e);
    }
};
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
                <li><img src="./thumbnails/${it.post_file}"/></li>
                <li><h3>Comments: ${it.count_comments}</h3></li>
                <li><h3>Votes: ${it.count_vote}</h3></li>
                <li><h3 onclick="renderOne(${it.post_id})">title: ${it.post_title}</h3></li>
                <li><h3 onclick="fetchUsers(url, '/user/${it.user_id}')">user:  ${it.user_name}</h3></li>
                </ul>
                <ul class="buttons">
                <li><button onclick="deletePost(${it.post_id})">delete</button></li>
                <li><button onclick="banUser(${it.user_id})">BAN USER</button></li>
                </ul>
            </article>`
    })
};
const renderOne = async (id) => {
    const result = await getOne(id);
    console.log(result);

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