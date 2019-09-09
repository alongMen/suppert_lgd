# lgd-home-black

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
# suppert_lgd






cd /private/etc
ls
sudo vim hosts
密码 aa406477923
cat /private/etc/hosts
你按下【i, I, o,O, a, A, r, R】等任何一个字母之后才会进入编辑模式。这时候屏幕的左下方
会出现【INSERT或 REPLACE】的字样，此时才可以进行编辑。而如果要回到一般模式时，
则必须要按下【Esc】即可退出编辑模式。
--------------------- 
http://admin.cslgd.space
cslgdadmin    123123

总后台：
http://total.cslgd.space:8082/system-setting/permission-manage
Admin 123456

Pc-front
http://www.cslgd.space:8082


LGD-new
http://www.cslgd.space:8080
Test123
123123

https://kcaie@dev.azure.com/kcaie/LGD/_git/LGD 源码托管地址


 :wq ：保存后离开



yarn serve
项目仓库地址：

判断是否为当天：
function isToday(str) {
    if (new Date(str).toDateString() === new Date().toDateString()) {
        //今天
        console.log("当天");
    } else if (new Date(str) < new Date()){
        //之前
        console.log("以前的日期");
    }
}
var str = 1474172800000;
isToday(str);
--------------------- 



商后台发布
http://supervisor.cslgd.space      frontDev     Csnet123456.


小黄鸭后台发布：
14:45
103.99.62.157
Administrator
YmsMRImp



商后台     admin.cslgd.site
cslgdadmin    123123
总后台     http://lgd.total.lgdcoms.com:8080/game/game-setting


bug问题：
https://www.tapd.cn/56937888/bugtrace/bugreports/my_view?filter=true&data%5BFilter%5D%5Bstatus%5D%5B0%5D=new&data%5BFilter%5D%5Bstatus%5D%5B1%5D=in_progress&data%5BFilter%5D%5Bstatus%5D%5B2%5D=resolved&data%5BFilter%5D%5Bstatus%5D%5B3%5D=reopened&qksearch=true&perpage=20&page=1
yryu2019@outlook.com


盒子阴影  box-shadow:x   y   blur（模糊度）  spread(内扩充，相当于padding)   color   inset（内阴影）;
例 box-shadow:100px 100px 0px 100px #f00;  box-shadow:0px 0px 50px 0px #f00 inset; 

// for-of遍历Map对象
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (let [key, value] of iterable) {
  console.log(value);
}
//输出 1 2 3

删除.git文件
win+shift+.



Git global setup
git config --global user.name "yryu2019"
git config --global user.email "yryu2019@outlook.com"
Create a new repository
git clone http://gitlab.cslgd.space:30766/cp/cp-admin.git
cd cp-admin
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
Push an existing folder
cd existing_folder
git init
git remote add origin http://gitlab.cslgd.space:30766/cp/cp-admin.git
git add .
git commit -m "Initial commit"
git push -u origin master
Push an existing Git repository
cd existing_repo
git remote rename origin old-origin
git remote add origin http://gitlab.cslgd.space:30766/cp/cp-admin.git
git push -u origin --all
git push -u origin --tags

ssh密钥：
yurongdeMac-mini:.SSH yurong$ cd ~/.ssh
yurongdeMac-mini:.ssh yurong$ cat id_rsa.pub————》
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDFFdexkgxhs/M8Sofbv9gjHSyzlknsq6GnYMO3eN1cb7rm1s8Qf5OSoTb6TLTr3+jn7wQwwTX2EL1yv6PqwfVatT2+Aea2O/vl85MuF0lv4HqfGXwNBKSG88DYzcPpmqsJRod3/GoDlXLu9BvnkxnzpXe9ukwZYkYIem5pO9RlVcsaPSwOpqgASMEMCVKyAQXc7yWJhKQwOYt+IkVsRRFIwveHojEunSIFbmXGeNbCe9NpX3M+emZTxqb05LS1WAsgR7IxqViU8dceSAVcGT59ZyuhsN3z+vecuj+/hFyKMW9Y0UASFNWkE/uB5P/MFeqhOYU1/puGGjciiy2sverp yryu2019@outlook.com



时间：var time = new Date(); // Tue Aug 28 2018 09:16:06 GMT+0800 (中国标准时间)
时间戳：var timestamp = Date.parse(time); // 1535419062000 （Date.parse() 默认不取毫秒，即后三位毫秒为0）
moment转时间：moment(time).valueOf(); // 1535419062126
moment转时间戳：moment(timestamp).format(); // 2018-08-28T09:17:42+08:00


http://39.108.217.122:8002/
hgyx∙hlsjy1
123456


商城用vant，也可以用cube-ui，app用ui-app，react用taro，vue用mpvue

