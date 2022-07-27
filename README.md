### translate-local

技术方案

1. 使用 zu1k/deepl 镜像，启动本地翻译服务
   https://hub.docker.com/r/zu1k/deepl
   后续可以考虑使用 node package：deeplx https://www.npmjs.com/package/deeplx
2. 使用 pb、turndown 将剪贴板内的内容转化为 markdown 文件
3. 调用 deepl 翻译对应文件，更新结果内容为中英间隔，并打开该文件

#### 后续优化

1. ✅ 翻译内容截取
2. ✅ 调用时间增加延时
3. ✅ 增加更多参数，如源语言、目标语言输入
4. todo 增加 prettier eslint 校验等
5. todo 增加 changelog
6. 研究 node cmj、esm 等的区别
7. todo 增加 ts 校验等；tsx、zx 插件使用接入？
