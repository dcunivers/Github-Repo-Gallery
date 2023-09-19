//Where the profile info will appear
const profileInfo = document.querySelector(".overview");
//Githubusername
const username = "dcunivers";
//Fetch info from Github profile
const getGithubData =  async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    fetchUserData();
};

getGithubData();

//Displays fetched user information to the page

const fetchUserData = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `;
        profileInfo.append(div);
};

