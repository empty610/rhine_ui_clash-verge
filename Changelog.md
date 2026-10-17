## v2.5.9

<details>
<summary><strong> 🐞 修复问题 </strong></summary>

- 修复通过 URL 导入订阅时，即使导入的订阅并非当前使用的订阅，也会重新加载当前配置的问题
- 修复「首页」网站测速失败后卡片一直显示测试中的问题

**🐧 Linux**

- Linux：修复 deb/rpm 安装包错误包含多余的 `frontend-contract` 可执行文件，导致下游重新打包失败的问题

</details>

<details>
<summary><strong> ✨ 新增功能 </strong></summary>


</details>

<details>
<summary><strong> 🚀 优化改进 </strong></summary>

- 优化 Rhine Edition 首页圆盘的光影动画，并显示实时上下行速度
- 新增 Rhine Edition 页面切换时的轻微淡出淡入动画，并遵循系统的减少动态效果设置

**🖥️ Windows**

- Windows 系统代理默认绕过 `*.local` 域名，访问局域网设备的 `.local` 主机名时不再经过代理

</details>
