> create-react-app .

//这句命令出现config 和 scripts 目录；
// config 目录下 webpack-config.(dev|prod).js 配置less使用；
// scripts 目录下，start.js 修改端口，等配置；
> cnpm run eject  


> cnpm run start //启动服务器；


// src 目录下放置源码；
// src --> assets 放置静态文件；
// src --> components 防止组建目录；建议组建名称与文件名称相等；大写字母开头；
// src --> util  //防止工具函数目录；
// src --> less  //放置less文件 目录；
// src --> data  // mock的数据；
// src --> config  //源码文件的配置文件防止目录；

// public 目录，防止静态文件， 引入的时候，引入这的文件， 不会被webpack压缩；

      
> cnpm run build    //命令打包；

# 启动 服务器方法 1
> cnpm install serve -g   //安装serve这个全局包；

> serve -s build //，启动服务；  遇到坑，开发的时候，在webpack.config.dev.js 配置了使用less ；但是在 webpack.config.prod.js 没有配置好， 然后打包运行，发现没有样式；

# 方法2 
## 我在build 目录下用 express 搭建了一个小型服务器，可以
> cd build 

> node app.js   //就能启动了=> http://localhost:8082  就能看到效果了


