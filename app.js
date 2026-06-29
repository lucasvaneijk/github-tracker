function search() {
    document.body.classList.add("no-scroll")
    document.documentElement.classList.add("no-scroll")

    const input = document.getElementById("usernameinput").value
    let apikey = document.querySelector(".apiinput").value
    if (apikey !== "" && apikey.includes("github_pat_")) {apikey = `bearer ${apikey}`}
    else {apikey = ""}
    console.log(apikey)
    fetch(`https://api.github.com/users/${input}`
        , {
        headers: {
            Authorization: apikey
        }
        })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log()
        const resultdiv = document.getElementById("resultdiv")
        console.log(data.status)
        if (data.status !== undefined) {
            resultdiv.innerText = `user ${input} not found`
            document.body.classList.remove("no-scroll")
            document.documentElement.classList.remove("no-scroll")
            return
        }
        let fragment = document.createDocumentFragment()
        if (data.public_repos !== 0) {
            const times = Math.ceil(data.public_repos / 100)
            for (let n = 1; n <= times; n++) {
                console.log(n)
                fetch(data.repos_url + `?per_page=100&page=${n}`)
                .then(response2 => response2.json())
                .then(repos => {
                    console.log(repos)
                    for (let i = 0; i < repos.length; i++) {
                        let result = `<a target="_blank" class="reponame" href=${repos[i].html_url}>${repos[i].name}</a>`
                        const div = document.createElement("div")
                        if (repos[i].description) {result += `<p class="repodiscription">${repos[i].description}</p>`}
                        else {result += `<p>No description</p>`}
                        fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json")
                        .then(responsecolors => responsecolors.json())
                        .then(colors => {
                            if (repos[i].language) {result += `<p class="codelanguage" style="color: ${colors[repos[i].language]?.color};">${repos[i].language}</p>`}
                            else {result += "<p>None</p>"}
                            div.innerHTML = result
                        })
                        div.innerHTML = result
                        div.classList.add("repodiv")
                        
                        fragment.appendChild(div)
                        
                        setTimeout(() => {
                            div.classList.add("repodivanimation");
                        }, 10);

                    }
                    document.getElementById("projectsdiv").appendChild(fragment)
                })
        
            }
        }
        else {
            document.getElementById("projectstitle").innerText = "No public projects"
            document.body.classList.remove("no-scroll")
            document.documentElement.classList.remove("no-scroll")
        }
        const cards = document.querySelectorAll(".repodiv")
        let finishedAnimations = 0
        cards.forEach(card => {
            card.addEventListener("animationend", () => {
                card.classList.remove("repodivanimation")
                finishedAnimations += 1
                if (finishedAnimations === cards.length) {
                    document.body.classList.remove("no-scroll")
                    document.documentElement.classList.remove("no-scroll")
                }
            });
        });
        document.getElementById("projectstitle").style.display = "grid"
        resultdiv.style.fontSize = "4rem"
        document.getElementById("contentdiv").style.display = "none"
        document.querySelector(".backbutton").style.display = "flex"
        document.querySelector(".titlecarddiv").style.display = "flex"
        document.querySelector(".apibuttondiv").style.display = "none"
        document.querySelector(".titlecarddiv").style.display = "flex"
        document.querySelector(".contentinfodiv").style.display = "flex"

        document.querySelector(".titlecarddiv").innerHTML = `<div class="imgnamediv"><img class="nameimagecard" src="${data.avatar_url}"><p class="namecard">${data.login}</p></div>
        <p>${data.bio || "no bio"}</p>
        <p class="repos">repos: ${data.public_repos}</p>
        <div class="imgnamediv"><p class="followersp">followers: ${data.followers}</p><p class="followersp">following: ${data.following}</p></div>`
    })
    
}

function goback() {
    document.body.classList.remove("no-scroll")
    document.documentElement.classList.remove("no-scroll")
    document.querySelector(".contentinfodiv").style.display = "none"
    document.querySelector(".backbutton").style.display = "none"
    document.querySelector(".projectsdiv").innerHTML = ""
    document.getElementById("contentdiv").style.display = "flex"
    document.querySelector(".projectstitle").style.display = "none"
    document.querySelector(".apibuttondiv").style.display = "flex"
    document.querySelector(".titlecarddiv").style.display = "none"

}

function enterAPI() {
    document.querySelector(".apiinput").style.display = "flex"
    document.querySelector(".apibutton").style.display = "none"
}