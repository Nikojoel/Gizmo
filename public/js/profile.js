'use strict';

const main = document.getElementsByClassName("main")[0];

main.innerHTML =
    `
    <h1>Jenna's profile</h1>
        <div class="profileContent">
            <div id="bio">
                <img src="img/prof.jpg" width="350px" height="500px">
                <div id="bioText">
                    <h2>Bio</h2>
                    <i>"Goats are like mushrooms, if you shoot a duck, I'm scared of toasters"</i>
                </div>
            </div>
            <h3>@Jenna</h3>
            <h4>Jenna Rowling</h4>
            <input id="editProfileButton" type="submit" value="Edit profile" onclick="editProfile()">
        </div>
    `;


