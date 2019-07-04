const gitRoot = "https://api.github.com"

function getRepositories() {
    const username = document.getElementById('username').value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `${gitRoot}/users/${username}/repos`);
    req.send();
    return false;
}

function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    const repoList = 
    '<ul>' + 
        repos
        .map(repo => {
            const dataUserName = `data-username="${repo.owner.login}"`;
            const dataRepoName = `data-repository="${repo.name}"`;
            return `
            <li>
                <h3>${repo.name}</h3>
                <a href="${repo.html_url}">${repo.html_url}</a><br>
                <a href="#" ${dataRepoName} ${dataUserName} onclick="getCommits(this)">Get Commits</a><br>
                <a href="#" ${dataRepoName} ${dataUserName} onclick="getBranches(this)">Get Branches</a>
            </li>`;
        })
        .join('') +
    '</ul>'
    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
    const repoName = el.dataset.repository;
    const userName = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', `${gitRoot}/repos/${userName}/${repoName}/commits`);
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = 
    '<ul>' +
        commits
        .map(commit => {
            return `<li>${commit.commit.author.name} - ${commit.author.login} - ${commit.commit.message}</li>`
        })
        .join('') + 
    '</ul>'
    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
    const repoName = el.dataset.repository;
    const userName = el.dataset.username;
    const req = new XMLHttpRequest()
    req.addEventListener('load', displayBranches)
    req.open('GET', `${gitRoot}/repos/${userName}/${repoName}/branches`);
    req.send();
}
  
function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList =
    '<ul>' +
        branches
        .map(branch => {
            return `<li>${branch.name}</li>`
        })
        .join('') + 
    '</ul>'
    document.getElementById('details').innerHTML = branchesList;
}