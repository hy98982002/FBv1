# GEMINI.md - UAI MVP 教育平台项目总览

## 🎯 项目概述

- **项目名称**：UAI MVP 教育平台
- **架构模式**：前后端分离
- **开发周期**：4-8 周快速交付版本
- **项目目标**：在线教育平台 MVP，支持课程管理、用户注册、购物车、订单系统

## 🛠 技术栈总览

### 前端技术栈

- **框架**：Vue 3 + Vite + TypeScript
- **UI 框架**：Bootstrap 5.3.6（静态使用，不引入 Ant Design）
- **状态管理**：Pinia
- **HTTP 请求**：Axios（统一封装）
- **路由**：Vue Router
- **编程风格**：Composition API（禁用 Options API）

### 后端技术栈

- **语言**：Python 3.12
- **框架**：Django 5.2
- **API**：Django REST Framework
- **认证**：SimpleJWT
- **数据库**：MySQL 8.4.5（开发环境可用 SQLite）
- **管理后台**：Django Admin

## 📁 项目结构约定

```
UAIEDU_PROJECT/
├── frontend/                      # Vue 3 前端项目
│   ├── src/
│   │   ├── views/                # 页面级组件
│   │   ├── components/           # 可复用组件
│   │   ├── api/                  # Axios封装
│   │   ├── store/                # Pinia状态管理
│   │   ├── router/               # Vue Router配置
│   │   ├── utils/                # 工具函数
│   │   └── types/                # TypeScript类型定义
│   └── GEMINI.md                 # 前端开发规范
├── backend/                       # Django 后端项目
│   ├── apps/                     # Django应用模块
│   │   ├── users/                # 用户系统
│   │   ├── courses/              # 课程系统
│   │   ├── cart/                 # 购物车
│   │   ├── orders/               # 订单系统
│   │   ├── learning/             # 学习记录
│   │   ├── reviews/              # 评价系统
│   │   └── system/               # 系统功能
│   └── GEMINI.md                 # 后端开发规范
└── GEMINI.md                     # 项目总览（本文件）
```

## 🔄 前后端接口规范

### API 设计原则

- **统一前缀**：所有 API 接口使用`/api/`前缀
- **RESTful 风格**：遵循 REST API 设计规范
- **JWT 认证**：请求头格式`Authorization: Bearer <token>`

### 统一响应格式

```json
{
  "status": <int>,     // HTTP状态码
  "data": <any>,       // 响应数据
  "msg": <string>      // 响应消息
}
```

## 🔐 安全与权限

### 权限控制（MVP 阶段）

- 使用 Django 内置`is_staff`字段进行基础权限控制
- JWT token 用于用户身份验证
- 暂不实现复杂 RBAC 系统（预留扩展能力）

### 安全要求

- **严禁**在代码中硬编码敏感信息（密码、密钥、数据库连接等）
- 所有敏感配置使用`.env`文件管理
- 确保`.env`文件已加入`.gitignore`
- 上传代码前必须进行安全检查

## 🔧 .env 文件管理规则

- **`backend/.env`**: 包含 Django 秘钥, MySQL 数据库信息, JWT 配置等后端专用配置。
- **`frontend/.env`**: 包含 `VITE_API_BASE_URL` 等前端专用配置，变量必须以 `VITE_` 开头。
- **`.env.example`**: 项目必须提供对应的 `.env.example` 模板文件供参考。

## 🚀 开发环境

- **前端开发服务器**：http://localhost:5173
- **后端开发服务器**：http://localhost:8000
- **数据库**：本地 MySQL 或 SQLite
- **跨域配置**：后端配置 CORS 允许前端域名访问

## ⚡ MVP 阶段优先级

### 核心功能（第一优先级）

1. 用户注册/登录系统
2. 课程展示与详情
3. 购物车功能
4. 基础订单流程

### 增强功能（第二优先级）

1. 学习进度记录
2. 课程评价系统
3. 用户个人中心

### 扩展功能（后期版本）

1. 完整 RBAC 权限系统
2. 管理后台升级
3. 支付集成
4. 推荐系统

## 📝 开发流程

1. **需求分析**：明确功能需求和技术方案
2. **接口设计**：前后端协商 API 接口规范
3. **并行开发**：前后端同步开发，使用 mock 数据
4. **集成测试**：前后端联调测试
5. **部署上线**：生产环境部署和监控

## 💡 最佳实践提醒

- 优先使用现有组件和模式，避免重复造轮子
- 所有新功能开发前先查看相关 GEMINI.md 规范
- 遇到技术难题优先查阅项目内的技术文档
- 保持代码风格一致性，定期进行代码 review
- 重要功能变更需要更新相应的 GEMINI.md 文档