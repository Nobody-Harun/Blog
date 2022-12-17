const VanityURL = location.origin + "/Blog";
const BlogBooks = {
    posts() {
        fetch("https://blogbooks-fetcher-1.haru070.repl.co/posts")
            .then(response => response.json())
            .then(query => {
                var $content = "";
                query.forEach(data => {
                    if (data.excerpt.protected == true) {
                        $content += `<div class="post"><div class="title"><i class='bx bx-lock-alt'></i> ${data.title.rendered}</div><div class="description">ロックされている記事</div></div>`;
                    } else {
                        $content += `<div class="post que" data-postid="${data.id}"><div class="title">${data.title.rendered}</div><div class="description">${data.excerpt.rendered}</div></div>`;
                    }
                });
                document.querySelector("#docs").innerHTML = $content;
                document.querySelectorAll(".que").forEach(data => {
                    data.addEventListener("click", () => {
                        location.href = location.origin + "/Blog/" + data.getAttribute("data-postid");
                    });
                })
            })
            .catch(e => {
                document.querySelector("#docs").innerHTML = e;
                console.error(e);
            })
    },
    page(id = "") {
        if (id === (null || "" || undefined)) return;
        fetch(`https://blogbooks-fetcher-1.haru070.repl.co/page/?id=${id}`)
            .then(response => response.json())
            .then(query => {
                $content = `<h1>${query.title.rendered}</h1><div class="date">Date: ${query.date}</div><div class="content">${String(query.content.rendered).replaceAll("https://blogbooks.net/chromebook/", "https://nobody-local.github.io/Blog/")}</div>`;
                document.querySelector("#docs").innerHTML = $content;
            })
            .catch(e => {
                document.querySelector("#docs").innerHTML = e;
                console.error(e);
            })
    }
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}