'use strict';

const main = document.getElementsByClassName("main")[0];

const getVotes = async () => {
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
                    <img src="img/${it.post_file}" class="votePic">
                    <h3>${it.post_title}</h3>
                    <img src="img/icons/thumb_up.png">
                </div>
            </li>
            `;
        });

    } catch (e) {
        console.log(e);
    }
};

getVotes();




