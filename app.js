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
        if (data.messages === null) {
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
                        const div = document.createElement("div")
                        div.innerHTML = repos[i].name
                        fragment.appendChild(div)
                    }
                    resultdiv.appendChild(fragment)
                })
        
            }
        }

        resultdiv.innerHTML = 
        `<div class="username">${data.login}</div><img href=${data.avatar_url}>`
    })
}