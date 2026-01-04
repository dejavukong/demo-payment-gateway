# 部署到 Vercel 指南

## 方案一：通过 Vercel CLI 部署（推荐）

### 1. 安装 Vercel CLI

```bash
npm install -g vercel
# 或者使用 pnpm
pnpm add -g vercel
```

### 2. 登录 Vercel 账号

```bash
vercel login
```

按照提示完成登录流程。

### 3. 部署项目

在项目根目录执行：

```bash
# 首次部署（测试环境）
vercel

# 部署到生产环境
vercel --prod
```

按照提示进行配置：
- **项目名称**：payment-gateway-merchant-dashboard（或自定义）
- **输出目录**：dist/public（已在 vercel.json 配置）
- **构建命令**：pnpm build（已在 vercel.json 配置）
- **安装命令**：pnpm install（已在 vercel.json 配置）

### 4. 后续更新部署

```bash
# 部署到生产环境
vercel --prod
```

---

## 方案二：通过 Vercel Dashboard 部署

### 1. 推送代码到 Git 仓库

确保你的代码已推送到 GitHub、GitLab 或 Bitbucket：

```bash
git add .
git commit -m "准备部署到 Vercel"
git push origin main
```

### 2. 导入项目到 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New..." → "Project"
3. 选择你的 Git 仓库
4. 点击 "Import"

### 3. 配置项目设置

Vercel 会自动检测到 `vercel.json` 配置文件，但你需要确认以下设置：

#### Build & Development Settings
- **Framework Preset**: Other
- **Build Command**: `pnpm build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`
- **Development Command**: `pnpm dev`

#### Root Directory
- 保持为根目录 `./`

#### Node.js Version
- 推荐使用 **18.x** 或 **20.x**

### 4. 环境变量（如果需要）

如果你的项目使用了环境变量，在 "Environment Variables" 部分添加：

```
VITE_API_URL=https://your-api-url.com
# 添加其他环境变量...
```

### 5. 部署

点击 "Deploy" 按钮，Vercel 会自动：
1. 克隆你的仓库
2. 安装依赖（pnpm install）
3. 构建项目（pnpm build）
4. 部署到全球 CDN

---

## 配置自定义域名

### 在 Vercel Dashboard 中配置

1. 进入你的项目
2. 点击 "Settings" → "Domains"
3. 添加你的自定义域名
4. 按照提示配置 DNS 记录

### DNS 配置示例

在你的域名服务商处添加以下记录：

**A 记录**（推荐）：
```
Type: A
Name: @（或 www）
Value: 76.76.21.21
```

**CNAME 记录**：
```
Type: CNAME
Name: @（或 www）
Value: cname.vercel-dns.com
```

---

## 自动部署设置

### Git 集成自动部署

启用后，每次推送到指定分支都会自动部署：

1. **生产分支**（Production Branch）：`main` 或 `master`
   - 推送到此分支 → 自动部署到生产环境

2. **预览分支**（Preview Branches）：其他分支
   - 推送到其他分支 → 生成预览环境

### 部署钩子（Deploy Hooks）

创建部署钩子以触发手动部署：

1. Settings → Git → Deploy Hooks
2. 创建新的 Deploy Hook
3. 使用 webhook URL 触发部署：

```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/xxx/xxx
```

---

## 性能优化建议

### 1. 启用边缘缓存

Vercel 会自动缓存静态资源，`vercel.json` 中已配置：

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. 图片优化

使用 Vercel Image Optimization：

```jsx
import Image from 'next/image'; // 如果使用 Next.js

// 或者使用 <img> 标签，Vercel 会自动优化
<img src="/images/logo.png" alt="Logo" />
```

### 3. 分析包大小

```bash
pnpm add -D vite-plugin-bundle-analyzer

# 在 vite.config.ts 中添加插件
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ]
}
```

---

## 监控和分析

### Vercel Analytics

在项目中启用 Vercel Analytics：

```bash
pnpm add @vercel/analytics
```

```jsx
// 在 main.tsx 或 App.tsx 中
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Vercel Speed Insights

```bash
pnpm add @vercel/speed-insights
```

```jsx
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      <YourApp />
      <SpeedInsights />
    </>
  );
}
```

---

## 常见问题

### 1. 部署失败：Build Command 错误

**问题**：构建命令找不到或执行失败

**解决方案**：
- 确认 `vercel.json` 中的 `buildCommand` 正确
- 检查 `package.json` 中的 `build` 脚本
- 查看 Vercel 构建日志，找到具体错误信息

### 2. 404 错误：页面刷新后找不到

**问题**：SPA 路由在刷新后返回 404

**解决方案**：
已在 `vercel.json` 中配置 `rewrites`，将所有请求重定向到 `index.html`：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. 环境变量未生效

**问题**：环境变量在构建或运行时无法访问

**解决方案**：
- 在 Vercel Dashboard → Settings → Environment Variables 中添加
- 注意 Vite 环境变量必须以 `VITE_` 开头才能在前端访问
- 重新部署项目以应用新的环境变量

### 4. 构建时间过长

**问题**：部署时间超过预期

**解决方案**：
- 优化依赖：移除未使用的包
- 使用 pnpm 替代 npm（已配置）
- 启用 Vercel 构建缓存（默认启用）
- 考虑拆分大型组件为懒加载模块

### 5. pnpm 相关错误

**问题**：Vercel 不支持 pnpm 或找不到 pnpm-lock.yaml

**解决方案**：
已在 `package.json` 中配置 `packageManager`：
```json
{
  "packageManager": "pnpm@10.4.1+sha512..."
}
```

Vercel 会自动检测并使用 pnpm。

---

## 回滚部署

如果新部署出现问题，可以快速回滚：

### 通过 Dashboard 回滚

1. 进入项目 → Deployments
2. 找到之前的成功部署
3. 点击 "..." → "Promote to Production"

### 通过 CLI 回滚

```bash
# 查看部署历史
vercel ls

# 回滚到指定部署
vercel rollback [deployment-url]
```

---

## 成本和限制

### Hobby 免费计划

- ✅ 100 GB 带宽/月
- ✅ 无限项目
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 边缘函数（Serverless Functions）
- ❌ 不支持商业用途

### Pro 计划 ($20/月)

- ✅ 1 TB 带宽/月
- ✅ 高级分析
- ✅ 密码保护
- ✅ 支持商业用途
- ✅ 优先支持

---

## 安全最佳实践

1. **启用环境变量加密**
   - 敏感数据存储在 Vercel Environment Variables
   - 不要在代码中硬编码密钥

2. **配置安全头**
   在 `vercel.json` 中添加：
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-XSS-Protection",
             "value": "1; mode=block"
           }
         ]
       }
     ]
   }
   ```

3. **定期更新依赖**
   ```bash
   pnpm update --latest
   ```

---

## 有用的命令

```bash
# 查看部署列表
vercel ls

# 查看部署详情
vercel inspect [deployment-url]

# 查看部署日志
vercel logs [deployment-url]

# 删除部署
vercel remove [deployment-url]

# 查看项目信息
vercel project ls

# 设置环境变量
vercel env add [name]

# 查看环境变量
vercel env ls
```

---

## 参考资源

- [Vercel 官方文档](https://vercel.com/docs)
- [Vercel CLI 文档](https://vercel.com/docs/cli)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#vercel)
- [pnpm 在 Vercel 上的使用](https://vercel.com/docs/concepts/deployments/build-step#package-managers)

---

**部署成功后，你的应用将可以通过以下方式访问：**

- **自动生成的 URL**：`https://your-project-name.vercel.app`
- **自定义域名**：`https://your-domain.com`（需要配置）

**预计部署时间**：2-5 分钟（首次部署可能需要更长时间）
