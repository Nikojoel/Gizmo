'use strict';

const main = document.getElementsByClassName("main")[0];

if (sessionStorage.getItem('token') != null) {
    const getProfile = async () => {
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
    };
    getProfile();

} else {
    errorModel();
}




