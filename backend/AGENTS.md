# AGENTS.md - Backend (Django 5.2 + DRF + SimpleJWT)

## 🔄 前后端协作优化 (2025-01-22 升级)

### UI 渲染性能协作

为配合前端字体清晰度技术，后端需要优化 API 响应结构：

#### 1. 响应数据优化

```python
# 优化课程数据结构，减少前端渲染负担
{
  "status": 200,
  "data": {
    "courses": [...],
    "render_hints": {
      "enable_glassmorphism": True,
      "blur_intensity": "low",  # low/medium/high
      "font_weight_override": 500
    }
  },
  "msg": "success"
}
```

#### 2. 图片资源优化

- 提供多分辨率图片 URL（@1x, @2x, @3x）
- 支持 WebP 格式自动切换
- 预加载关键图片资源

#### 3. 字体兼容性标记

```python
# 在用户信息中包含设备信息
"user_device_hints": {
  "is_windows": True,
  "high_dpi": True,
  "font_rendering": "cleartype"
}
```

### 性能监控协作

- 监控前端 glassmorphism 渲染性能
- 记录字体清晰度用户反馈
- 支持 A/B 测试不同模糊强度配置

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
├── manage.py                     # Django管理脚本
├── uai_backend/                  # Django项目配置
│   ├── settings.py              # 项目设置
│   ├── urls.py                  # 主路由配置
│   ├── wsgi.py                  # WSGI配置
│   └── asgi.py                  # ASGI配置
├── apps/                         # Django应用模块
│   ├── users/                   # 用户系统（已实现）
│   │   ├── models.py           # 用户模型
│   │   ├── serializers.py      # 序列化器
│   │   ├── views.py            # 视图
│   │   ├── urls.py             # 路由
│   │   ├── admin.py            # 管理后台
│   │   └── signals.py          # 信号处理
│   ├── courses/                 # 课程系统
│   │   ├── models.py           # 课程模型
│   │   ├── serializers.py      # 序列化器
│   │   ├── views.py            # 视图
│   │   └── urls.py             # 路由
│   ├── cart/                    # 购物车系统（待开发）
│   ├── orders/                  # 订单系统（待开发）
│   ├── learning/                # 学习记录（待开发）
│   ├── reviews/                 # 评价系统（待开发）
│   ├── system/                  # 系统功能（待开发）
│   └── utils/                   # 通用工具
│       ├── exceptions.py       # 异常处理
│       ├── permissions.py      # 权限类
│       └── mixins.py           # 通用Mixin
├── media/                       # 媒体文件
├── logs/                        # 日志文件
└── requirements.txt             # 依赖包
```

## 🏗 Django 应用模块化设计

### 核心应用（MVP 阶段优先）

1. **`apps.users`** - 用户注册、登录、JWT、个人资料管理
2. **`apps.courses`** - 课程模型、课程列表、课程详情接口
3. **`apps.cart`** - 购物车添加、删除、修改、查看
4. **`apps.orders`** - 订单创建、支付、状态管理

### 增强应用（第二阶段）

5. **`apps.learning`** - 学习进度、学习记录、完成状态
6. **`apps.reviews`** - 课程评价、评分、评论管理

### 系统应用（后期扩展）

7. **`apps.system`** - 操作日志、系统公告、配置管理

## 🔧 开发规范

### Model 模型规范

```python
# apps/courses/models.py
from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    """课程模型"""
    title = models.CharField('课程标题', max_length=200)
    description = models.TextField('课程描述')
    price = models.DecimalField('价格', max_digits=10, decimal_places=2)
    instructor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='讲师'
    )
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    updated_at = models.DateTimeField('更新时间', auto_now=True)
    is_active = models.BooleanField('是否激活', default=True)

    class Meta:
        verbose_name = '课程'
        verbose_name_plural = '课程'
        ordering = ['-created_at']

    def __str__(self):
        return self.title
```

### Serializer 序列化器规范

```python
# apps/courses/serializers.py
from rest_framework import serializers
from .models import Course

class CourseListSerializer(serializers.ModelSerializer):
    """课程列表序列化器"""
    instructor_name = serializers.CharField(
        source='instructor.get_full_name',
        read_only=True
    )

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'price',
            'instructor_name', 'created_at'
        ]
        # 严禁使用 fields = '__all__'

class CourseDetailSerializer(serializers.ModelSerializer):
    """课程详情序列化器"""
    instructor = UserSimpleSerializer(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'price',
            'instructor', 'created_at', 'updated_at'
        ]
```

### ViewSet 视图规范

```python
# apps/courses/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Course
from .serializers import CourseListSerializer, CourseDetailSerializer

class CourseViewSet(viewsets.ModelViewSet):
    """课程视图集"""
    queryset = Course.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseDetailSerializer

    def list(self, request):
        """获取课程列表"""
        courses = self.get_queryset()
        serializer = self.get_serializer(courses, many=True)
        return Response({
            'status': 200,
            'data': serializer.data,
            'msg': '获取成功'
        })

    def retrieve(self, request, pk=None):
        """获取课程详情"""
        try:
            course = self.get_object()
            serializer = self.get_serializer(course)
            return Response({
                'status': 200,
                'data': serializer.data,
                'msg': '获取成功'
            })
        except Course.DoesNotExist:
            return Response({
                'status': 404,
                'data': None,
                'msg': '课程不存在'
            }, status=status.HTTP_404_NOT_FOUND)
```

## 🔐 JWT 认证流程

### 认证接口规范

- **注册接口**：`POST /api/users/auth/register/`
- **登录接口**：`POST /api/users/auth/login/`
- **Token 刷新**：`POST /api/users/auth/refresh/`
- **登出接口**：`POST /api/users/auth/logout/`
- **用户信息**：`GET /api/users/profile/`

### JWT Token 处理

```python
# apps/users/views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class CustomTokenObtainPairView(TokenObtainPairView):
    """自定义登录视图"""

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            return Response({
                'status': 200,
                'data': {
                    'access': response.data['access'],
                    'refresh': response.data['refresh'],
                    'user_info': {
                        'id': request.user.id,
                        'username': request.user.username,
                        'email': request.user.email
                    }
                },
                'msg': '登录成功'
            })
        return Response({
            'status': 400,
            'data': None,
            'msg': '登录失败'
        }, status=400)
```

## 🌐 API 接口统一规范

### 响应格式标准

```python
# apps/utils/exceptions.py
from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    """自定义异常处理器"""
    response = exception_handler(exc, context)

    if response is not None:
        custom_response_data = {
            'status': response.status_code,
            'data': None,
            'msg': '请求失败'
        }

        if hasattr(response.data, 'detail'):
            custom_response_data['msg'] = response.data['detail']
        elif isinstance(response.data, dict):
            # 处理表单验证错误
            errors = []
            for field, messages in response.data.items():
                if isinstance(messages, list):
                    errors.extend(messages)
                else:
                    errors.append(str(messages))
            custom_response_data['msg'] = '; '.join(errors)

        response.data = custom_response_data

    return response
```

### URL 路由规范

```python
# apps/courses/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

# uai_backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('apps.users.urls')),
    path('api/', include('apps.courses.urls')),
    path('api/', include('apps.cart.urls')),
    path('api/', include('apps.orders.urls')),
]
```

## 🔧 Django Admin 配置

```python
# apps/courses/admin.py
from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'instructor', 'price', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at', 'instructor']
    search_fields = ['title', 'description']
    list_editable = ['is_active', 'price']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('基本信息', {
            'fields': ('title', 'description', 'instructor')
        }),
        ('价格设置', {
            'fields': ('price',)
        }),
        ('状态管理', {
            'fields': ('is_active',)
        }),
        ('时间信息', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
```

## 🛡 权限与安全

### 权限类定义

```python
# apps/utils/permissions.py
from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    """只有所有者才能修改"""

    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return obj.user == request.user

class IsInstructorOrReadOnly(BasePermission):
    """只有讲师才能修改课程"""

    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return obj.instructor == request.user
```

### 安全配置要求

```python
# uai_backend/settings.py
import os
from decouple import config

# 敏感信息必须使用环境变量
SECRET_KEY = config('SECRET_KEY', default='your-secret-key')
DEBUG = config('DEBUG', default=False, cast=bool)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='3306'),
    }
}

# CORS配置
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

## 📊 数据库设计规范

### 模型字段规范

- **所有模型**必须包含`created_at`和`updated_at`时间戳
- **外键关系**使用`on_delete=models.CASCADE`或`models.PROTECT`
- **字符串字段**必须设置`max_length`
- **必填字段**明确设置`null=False, blank=False`
- **所有字段**添加`verbose_name`便于 Admin 展示

### 数据库迁移规范

```bash
# 创建迁移文件
python manage.py makemigrations apps_name

# 应用迁移
python manage.py migrate

# 查看迁移状态
python manage.py showmigrations
```

## 🧪 测试与调试

### API 测试流程

参考项目根目录的`postman-testing-guide-for-user-authentication.md`

### 日志配置

```python
# uai_backend/settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

## 📝 代码注释与文档

### 模型注释规范

```python
class Course(models.Model):
    """
    课程模型

    Fields:
        title: 课程标题
        description: 课程描述
        price: 课程价格
        instructor: 授课讲师
        created_at: 创建时间
        updated_at: 更新时间
        is_active: 是否激活
    """
    pass
```

### API 文档注释

```python
def create_order(self, request):
    """
    创建订单

    Args:
        request: HTTP请求对象

    Returns:
        Response: 包含订单信息的响应

    Raises:
        ValidationError: 当订单数据无效时
    """
    pass
```

## 🚀 部署与优化

### 生产环境配置

- 使用`gunicorn`作为 WSGI 服务器
- 配置`nginx`作为反向代理
- 启用数据库连接池
- 配置 Redis 缓存
- 设置日志轮转

### 性能优化建议

- 使用`select_related`和`prefetch_related`优化数据库查询
- 为频繁查询的字段添加数据库索引
- 使用缓存减少数据库访问
- API 分页处理大量数据
- 异步处理耗时任务
