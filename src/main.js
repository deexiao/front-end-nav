const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  { logo: "A", url: "https://www.bilibili.com" },
  { logo: "B", url: "https://www.youtube.com" },
  { logo: "G", url: "https://github.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 正则表达式: 删除 / 开头的内容
};

const render = () => {
  $(".siteList").find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    console.log(index);

    const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>  
    `).insertBefore($("li.last"));

    // 不用 a 标签
    $li.on("click", () => {
      window.open(node.url);
    });

    // 阻止冒泡, "不是冒泡排序"
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("添加的网址是?");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  // stringify 是把对象变成 string
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

// 键盘事件
$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
