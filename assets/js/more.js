//从md文件加载文章
function loaddata() {
    // 获取当前位置
    const posi = document.location.toString().split("//")[1].split("/");
    const kind = posi[1];
    const searchParams = new URLSearchParams(posi[2].split(".html")[1])
    const name = searchParams.get("id");
    // 从csv读取记录并匹配
    const r = Math.random()
    d3.csv("/assets/db/postdata.csv", function (data, row, label) {
        if (row == 0) {
            loadlatest(data);
        }
        if (row.toString() == Math.floor(r * label[label.length - 1].split("-")[0])) {
            loadlatest(data);
        }
        if (data.kind == kind & data.name == name) {
            const user = data.user;
            const tags = data.tags.split("|");
            // 导入md文件
            jQuery.get(name + ".md", function (data) {
                const content = document.getElementById("content");
                data = data.replace(/_/g, "\\$&");
                data = data.replace(/\\\\|\\\{|\\\}|\\\,/g, "\\\\$&");
                data = data.substring(data.indexOf("#"));
                const titleend = data.indexOf("\n");
                document.title = data.slice(1, titleend).replace(/[<](sub|sup|\/sub|\/sup)[>]/g, "") + " | 一只太阳猪的故事";
                document.getElementById("title").innerHTML = data.slice(1, titleend);
                content.innerHTML = marked.parse(data.substring(titleend));
                renderMathInElement(content);
            });
            const fragment = document.createDocumentFragment();
            var li = document.createElement("li");
            li.className = "icon solid fa-user";
            li.innerHTML = "<span>" + user + "</span>";
            fragment.append(li);
            var li = document.createElement("li");
            li.className = "icon solid fa-calendar-days";
            li.innerHTML = "<span>" + name.substring(0, 4) + "-" + name.substring(4, 6) + "-" + name.substring(6, 8) + "</span>";
            fragment.append(li);
            // var li = document.createElement("li");
            // li.className = "icon solid fa-clock-rotate-left";
            // li.innerHTML = "<span id=\"busuanzi_value_page_pv\"></span><span class=\"next\"> 次阅读</span>";
            // fragment.append(li);
            for (var i = 0; i < tags.length; i++) {
                let li = document.createElement("li");
                li.className = "icon solid fa-tags";
                li.innerHTML = "<a href=\"#\">" + tags[i] + "</a>";
                fragment.append(li);
            }
            document.getElementById("tags").append(fragment);
        }
    });

}


// 加载一篇时间轴
function timeline() {
    // 获取当前位置
    const posi = document.location.toString().split("//")[1].split("/");
    const kind = posi[1];
    const name = posi[2].split(".")[0];
    // 从csv读取记录并匹配
    const r = Math.random();
    d3.csv("/assets/db/postdata.csv", function (data, row, label) {
        if (row == 0) {
            loadlatest(data);
        }
        if (row.toString() == Math.floor(r * label[label.length - 1].split("-")[0])) {
            loadlatest(data);
        }
        jQuery.get(name + ".md", function (data) {
            const titleend = data.indexOf("\n");
            const title = data.slice(0, titleend)
            const label = title.split("|")[0].slice(2);
            const location = title.split("|")[1];
            document.title = label + " | 一只太阳猪的故事";
            document.getElementById("label").innerHTML = label;
            document.getElementById("location").innerHTML = location;
            const content = data.split("##")
            for (let i = 1; 1 < split.length; i++) {
                let section = document.createElement("section")
            }
        });
    });
}


// 加载一篇文章摘要到目录
function loadpost(data) {
    const article = document.createElement("article")
    const kind = data.kind
    const name = data.name;
    const user = data.user
    const title = data.title
    const abstract = data.abstract;
    const special = data.special;
    const a = document.createElement("a");
    a.className = "image";
    if (special) {
        a.href = "/" + kind + "/" + name + ".html"
    } else {
        a.href = "/" + kind + "/post.html?id=" + name
    }
    a.innerHTML = "<img src=\"https://julian-blog.oss-cn-chengdu.aliyuncs.com/" + kind + "/images/" + name + ".png\"/>";
    article.append(a);
    const h = document.createElement("h3");
    h.innerHTML = title;
    article.append(h);
    const tags = document.createElement("ul");
    tags.className = "tags"
    const auth = document.createElement("li");
    auth.className = "icon solid fa-user";
    auth.innerHTML = "<span>" + user + "</span>";
    tags.append(auth);
    const date = document.createElement("li");
    date.className = "icon solid fa-calendar-days";
    date.innerHTML = "<span>" + name.substring(0, 4) + "-" + name.substring(4, 6) + "-" + name.substring(6, 8) + "</span>";
    tags.append(date);
    article.append(tags);
    const p = document.createElement("p");
    p.textContent = abstract;
    article.append(p);
    const actions = document.createElement("ul");
    actions.className = "actions";
    actions.innerHTML = "<li><a href=/" + kind + "/" + name + ".html class=\"button\">查看详细</a></li>";
    article.append(actions);
    return article;
}


// 加载一篇文章到最新
function loadlatest(data) {
    const fragment = document.createDocumentFragment();
    const article = document.createElement("article")
    const kind = data.kind;
    const name = data.name;
    const title = data.title;
    const abstract = data.abstract;
    const special = data.special;
    const a = document.createElement("a");
    a.className = "image";
    if (special) {
        a.href = "/" + kind + "/" + name + ".html"
    } else {
        a.href = "/" + kind + "/post.html?id=" + name
    }
    a.innerHTML = "<img src=\"https://julian-blog.oss-cn-chengdu.aliyuncs.com/" + kind + "/images/" + name + ".png\"/>";
    article.append(a);
    const p1 = document.createElement("h4");
    p1.innerHTML = title;
    article.append(p1);
    const p2 = document.createElement("p");
    p2.innerHTML = abstract;
    article.append(p2);
    fragment.append(article);
    document.getElementById("mini-posts").append(fragment);
}


//从数据库加载目录
function loadmenu() {
    // 获取当前位置
    const kind = document.location.toString().split("//")[1].split("/")[1];
    // 从CSV读取记录并匹配类别
    const fragment = document.createDocumentFragment();
    const r = Math.random()
    d3.csv("/assets/db/postdata.csv", function (data, row, label) {
        if (row == 0) {
            loadlatest(data);
        }
        if (row == Math.ceil(r * (label[label.length - 1] - 1))) {
            loadlatest(data);
        }
        if (data.kind == kind) {
            post = loadpost(data)
            fragment.append(post);
        }
        document.getElementById("posts").append(fragment);
    });
}