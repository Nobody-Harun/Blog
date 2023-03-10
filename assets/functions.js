const VanityURL = location.origin + "/Blog";
const BlogBooks = {
    posts() {
        fetch("https://blogbooks-fetcher-1.haru070.repl.co/posts")
            .then(response => response.json())
            .then(query => {
                var $content = "";
                query.forEach(data => {
                    if (data.excerpt.protected == true) {
                        $content += `<div class="post"><div class="title"><i class='bx bx-lock-alt'></i > ${data.title.rendered}</div><div class="description">Time: ${this.timeAsset(data.date)} / この投稿はパスワードで保護されているため抜粋文はありません。</div></div>`;
                    } else {
                        $content += `<div class="post que" data-postid="${data.id}"><div class="title">${data.title.rendered}</div><div class="description">Time: ${this.timeAsset(data.date)} / ${data.excerpt.rendered}</div></div>`;
                    }
                });
                document.querySelector("#docs").innerHTML = $content;
                document.querySelectorAll(".que").forEach(data => {
                    data.addEventListener("click", () => {
                        location.href = location.origin + "/Blog/" + data.getAttribute("data-postid") + "/";
                    });
                });
            })
            .catch(e => {
                document.querySelector("#docs").innerHTML = e;
                console.error(e);
            });
    },
    page(id = "") {
        if (id === (null || "" || undefined)) return;
        fetch(`https://blogbooks-fetcher-1.haru070.repl.co/page/?id=${id}`)
            .then(response => response.json())
            .then(query => {
                let $content = `<h1>${query.title.rendered}</h1><div class="info">Date: ${this.timeAsset(query.date)} </div><div class="content">${String(query.content.rendered).replaceAll("https://blogbooks.net/chromebook/", "https://nobody-local.github.io/Blog/")}</div>`;
                document.querySelector("#docs").innerHTML = $content;
                document.title = query.title.rendered;
                this.reimage();
                this.author(query.author);
            })
            .catch(e => {
                document.querySelector("#docs").innerHTML = e;
                console.error(e);
            });
    },
    timeAsset(format) {
        format = new Date(format);
        return `${format.getFullYear()}/${format.getMonth()}/${format.getDate()} ${format.getHours()}:${format.getMinutes()}`;
    },
    reimage() {
        document.querySelectorAll("img").forEach(el => {
            el.removeAttribute("srcset");
            fetch(`https://blogbooks-fetcher-1.haru070.repl.co/tools/image/?url=${el.getAttribute("src")}`)
                .then(response => response.text())
                .then(data => {
                    el.setAttribute("src", data);
                })
                .catch(e => {
                    document.querySelector("#docs").innerHTML = e;
                });
        });
    },
    author(id) {
        fetch(`https://blogbooks-fetcher-1.haru070.repl.co/user/?id=${id}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector(".info").innerHTML += "Written By " + data.name;
            });
    }
};

const a = document.createElement("link");
a.rel = "shortcut icon";
a.href = "data:image/png;base64,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bGlwRWZmZWN0XCI6MCxcIm1WRmxpcEVmZmVjdFwiOjB9IiwidG9uZVZhbHVlIjoie1wiYnJpZ2h0bmVzc1wiOjEwMCxcImV4cG9zdXJlXCI6MTAwLFwiY29udHJhc3RcIjoxMDAsXCJzYXR1cmF0aW9uXCI6MTAwLFwiaHVlXCI6MTAwLFwid2JNb2RlXCI6LTEsXCJ3YlRlbXBlcmF0dXJlXCI6MTAwLFwidGludFwiOjEwMCxcInNoYWRvd1wiOjEwMCxcImhpZ2hsaWdodFwiOjEwMH0iLCJlZmZlY3RWYWx1ZSI6IntcImZpbHRlckluZGljYXRpb25cIjo0MDk3LFwiZmlsdGVyVHlwZVwiOjAsXCJhbHBoYVZhbHVlXCI6MTAwfSIsImlzQmxlbmRpbmciOnRydWUsImlzTm90UmVFZGl0IjpmYWxzZSwic2VwVmVyc2lvbiI6IjEyMDEwMCIsInJlU2l6ZSI6NCwicm90YXRpb24iOjEsImFkanVzdG1lbnRWYWx1ZSI6IntcIm1Dcm9wU3RhdGVcIjoxMzEwNzZ9IiwiaXNBcHBseVNoYXBlQ29ycmVjdGlvbiI6ZmFsc2V9AAChCxYAAABPcmlnaW5hbF9QYXRoX0hhc2hfS2V5N2I2ZmU2YTc5YTc3Y2Y2Njg4N2JmMWZkN2VlNDgxMTcwNjMyYTJlNzAzNjRlYmU2OWQwNTEyZWY0YjA3YWExYy8xNjc3NFNFRkhqAAAAAgAAAAAAoQt+AwAAGgMAAAAAoQtkAAAAZAAAACQAAABTRUZU";
document.head.append(a);
document.title = "Fetcher 1.0";