//Where the profile info will appear
const profileInfo = document.querySelector(".overview");
//Githubusername
const username = "dcunivers";
//Select unordered list to show repos list
const repoList = document.querySelector(".repo-list");
//Selects the "repo" section where all the repo info appears
const repoSection = document.querySelector(".repos");
//Selects where the individual repo data will appear
const repoDataSection = document.querySelector(".repo-data");
//Selects button back to the repo gallery
const backToRepoButton = document.querySelector(".view-repos");
//selects the input with the “Search by name” placeholder
const filterInput = document.querySelector(".filter-repos");

//Fetch info from Github profile
const getGithubData =  async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);

    fetchUserData(data);
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
        
        fetchRepos();
};

const fetchRepos = async function () {
    const fetchRepoData = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepoData.json();
    //console.log(repoData);
    displayRepo(repoData);
};

//Displays info about each repo
const displayRepo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItems = document.createElement("li");
        repoItems.classList.add("repo");
        repoItems.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItems);
    }
};

repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    };
});

getRepoInfo = async function (repoName) {
    const getRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getRepo.json();
    //console.log(repoInfo);
    
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];
    for (let language in languageData) {
        languages.push(language)
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    backToRepoButton.classList.remove("hide");
    repoDataSection.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
     <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataSection.append(div);
    repoDataSection.classList.remove("hide");
    repoSection.classList.add("hide");
};

backToRepoButton.addEventListener("click", function() {
    repoSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    backToRepoButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});