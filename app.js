function search() {
    const input = document.getElementById("usernameinput").value
    fetch(`https://api.github.com/users/${input}`
        , {
        headers: {
            Authorization: "Bearer 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"
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

                        document.body.style.overflow = "auto";
                    }
                    document.getElementById("projectsdiv").appendChild(fragment)
                })
        
            }
        }
        else {document.getElementById("projectstitle").innerText = "No public projects"}
        const cards = document.querySelectorAll(".repodiv")
        cards.forEach(card => {
            card.addEventListener("animationend", () => {
                card.classList.remove("repodivanimation")
            });
        });
        document.getElementById("projectstitle").style.display = "grid"
        resultdiv.style.fontSize = "4rem"
        document.getElementById("contentdiv").style.display = "none"
        resultdiv.innerHTML = 
        `<div class="username">${data.login}</div><img class="profilepicture" src=${data.avatar_url}>`
    
        fragment = document.createDocumentFragment()
        constdocument
    })
}