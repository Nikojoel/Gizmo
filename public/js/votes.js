'use strict';

const ul = document.querySelector(".main ul");

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
        main.innerHTML =
            `
        <div id="errorPic">
            <img src="img/icons/down_face.png">
            <h3>Please login to use this feature</h3>
        </div>
            `;
        console.log(e);
    }
};

getVotes();




