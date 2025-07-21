# GEMINI.md - Backend (Django 5.2 + DRF + SimpleJWT)

## 🎯 后端技术栈

- **语言**：Python 3.12
- **框架**：Django 5.2
- **API 框架**：Django REST Framework
- **认证**：SimpleJWT（JWT 认证）
- **数据库**：MySQL 8.4.5（开发可用 SQLite）
- **管理后台**：Django Admin
- **CORS 处理**：django-cors-headers

## 📁 项目结构与应用划分

```
backend/
├── apps/                         # Django应用模块
│   ├── users/                   # 用户系统
│   ├── courses/                 # 课程系统
│   ├── cart/                    # 购物车系统
│   ├── orders/                  # 订单系统
│   ├── learning/                # 学习记录
│   ├── reviews/                 # 评价系统
│   └── system/                  # 系统功能
└── uai_backend/                  # Django项目配置
```

## 🔧 开发规范

### Model 模型规范

- **所有模型**必须包含`created_at`和`updated_at`时间戳。
- **外键关系**使用`on_delete=models.CASCADE`或`models.PROTECT`。
- **所有字段**添加`verbose_name`便于 Admin 展示。

### Serializer 序列化器规范

- **严禁使用** `fields = '__all__'`。
- 明确指定序列化的字段。

### ViewSet 视图规范

- 使用 `ModelViewSet` 实现标准的 CRUD 操作。
- 根据 `action` 在 `get_serializer_class` 中返回不同的序列化器。

## 🔐 JWT 认证流程

- **登录接口**：`POST /api/users/auth/login/`
- **注册接口**：`POST /api/users/auth/register/`
- **Token 刷新**：`POST /api/users/auth/refresh/`

## 🌐 API 接口统一规范

### 响应格式标准

```json
{
  "status": <int>,     // HTTP状态码
  "data": <any>,       // 响应数据
  "msg": <string>      // 响应消息
}
```

### URL 路由规范

- 所有 API 接口使用`/api/`前缀。
- 每个 app 的路由写在自己的 `urls.py` 中。

## 🛡 权限与安全

### 权限类定义

- 使用自定义权限类控制对象级别的访问。

### 安全配置要求

- **严禁**在代码中硬编码敏感信息。
- 所有敏感配置使用`.env`文件管理。
- `.env`文件必须加入`.gitignore`。

## 📊 数据库设计规范

- **模型字段规范**: 包含时间戳, 合理设置外键关系, 明确字段属性。
- **数据库迁移规范**: 使用 `makemigrations` 和 `migrate` 管理数据库变更。

## 🧪 测试与调试

- **API 测试**: 使用 Postman 或其他工具测试 API。
- **日志配置**: 在 `settings.py` 中配置日志记录。