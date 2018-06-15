## 项目结构

```
├── config					- 编译配置
│   ├── base.conf.js
│   └── custom.conf.js
├── info.json				- 挂件信息
└── src
    ├── css
    │   ├── base.scss
    │   └── package.scss
    ├── index.html
    ├── index.js
    └── js
        ├── ambient.js
        ├── config.js 		- 控制板参数配置文件（单独打包）
        ├── control.js		- 控制板代码（单独打包）
        └── utils
            ├── const.js
            ├── raf.js
            └── util.js
```

