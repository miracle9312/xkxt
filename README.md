## xkxt

VueBlog是一个轻量级的博客应用

### 本地运行

安装[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)数据库和[Node.js](https://nodejs.org/en/)环境。

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:3000
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

### 全局配置

全局配置文件`/server/config/index.js`

默认用户名：q，默认密码：q

```javascript
export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'qq22337383@gmail.com',
    nickname: 'VueBlog',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'vueblog'
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'vueblog',
    port: 27017,
    username: '',
    password: ''
  },
  production: {
    host: '198.13.32.165',
    domain: 'https://www.86886.wang'
  },
  app: {
    host: '127.0.0.1',
    port: 3000,
    routerBaseApi: 'api'
  }
}

```

### 开源协议

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
