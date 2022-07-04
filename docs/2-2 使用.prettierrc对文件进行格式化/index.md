# vue3 已经默认安装了 prettier 和 eslint-config-prettier eslint-plugin-prettier 不需要再进行安装

# 关于 window CRLF 报错

https://juejin.cn/post/6844904069304156168

```bash
git config --global core.autocrlf false
# 执行命令之后，重新 clone 项目
```

# 关于修改 .prettierrc 文件之后，其他文件格式化飘红的原因

https://juejin.cn/post/7012160233061482532

- 是因为 vscode 有缓存，重启即可

# VSCode 配置

- search format => format on save
- autosave => on (window) focus change
