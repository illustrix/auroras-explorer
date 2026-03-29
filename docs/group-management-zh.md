# 群组管理

## 概述

群组管理允许用户创建、编辑和选择 FIO 群组。用户可以将其 FIO 群组链接到平台，启用群组级工具，如合约跟踪、成员管理、价格监控和生产计划。

## 架构

### 文件结构

```
src/
├── routes/group/
│   ├── index.tsx                          # /group/ - 群组列表页面路由
│   └── {-$groupId}/
│       ├── route.tsx                      # /group/:groupId - 带群组选择器回退的布局
│       ├── contracts/index.tsx
│       ├── members/index.tsx
│       ├── plan/index.tsx
│       └── price-watch/index.tsx
├── components/
│   ├── pages/group/
│   │   ├── group-list-page.tsx            # 主要群组列表页面
│   │   └── management/
│   │       ├── group-card.tsx             # 带有工具链接的单个群组卡片
│   │       ├── group-empty-state.tsx      # 用户没有群组时的空状态
│   │       ├── group-form-dialog.tsx      # 创建/编辑群组对话框（TanStack Form）
│   │       └── group-selector.tsx         # 用于没有 groupId 的路由的内联群组选择器
│   ├── common/breadcrumb/
│   │   └── app-breadcrumb.tsx             # 应用范围的面包屑导航
│   └── auth/require-auth.tsx              # 身份验证守卫（RequireAuth, RequireGroupAuth）
├── hooks/
│   └── use-navigates.tsx                  # 导航项目（useNavigates, useGroupTools）
└── lib/query/
    └── group.ts                           # 查询钩子（myGroupsQuery 等）
```

### 数据流

```
FIO API ──> POST /api/group ──> groups 表（内部 ID: typeid）
                                user_groups 表（group_id = fioGroupId）

GET /api/my/groups ──> user_groups（按用户名） ──> groups（按 id） ──> 客户端
```

- `groups.id`：由 `typeid` 生成的内部 ID（例如 `group_xxxxxxxxxxxx`）
- `groups.fio_group_id`：FIO 群组 ID（例如 `873386`），用于 URL
- `user_groups.group_id`：引用 FIO 群组 ID，而不是内部 ID
- URL 路由使用 `fioGroupId` 作为 `groupId` 参数

## 群组列表页面

**路由：** `/group/`

显示当前用户所属的所有群组。每个群组卡片显示：
- 群组名称和 FIO 群组 ID
- 所有群组工具的快速链接（成员、合约、价格监控、计划）
- 编辑按钮（悬停时可见）

"新建群组" 按钮打开创建对话框。

**身份验证：** 包装在 `RequireAuth` 中 — 需要登录但不需要特定的群组成员身份。

## 群组表单对话框

**组件：** `GroupFormDialog`

使用 `@tanstack/react-form` 和 `onSubmit` 验证器。字段：

| 字段 | 类型 | 说明 |
|-------|------|-------|
| 群组名称 | 文本 | 必填 |
| FIO 群组 ID | 文本 | 必填；编辑时禁用 |
| 使用我的 FIO API 令牌 | 复选框 | 切换令牌输入可见性 |
| FIO API 令牌 | 文本 | 当 "使用我的令牌" 未选中时必填 |

调用 `POST /api/group` 进行验证：
1. FIO API 令牌有效（通过 FIO API）
2. 当前用户是 FIO 群组的管理员
3. 插入或更新群组（按 `fio_group_id` 冲突）

对话框在父组件中由 `editingGroup?.id` 键控，因此在切换群组时会重置状态。

## 群组选择器

**组件：** `GroupSelector`

当 `groupId` 缺失或为占位符值 `_` 时，在 `/group/:groupId/*` 路由上内联显示。

**工作原理：**

1. 侧边栏导航链接在当前未选择群组时（即用户不在群组路由上）使用占位符 `groupId` `_`
2. `route.tsx` 中的路由布局检查 `groupId === '_'` 并渲染 `GroupSelector` 而不是子路由
3. `GroupSelector` 检测用户打算访问的群组工具（通过 `useMatchRoute`）并将可用群组列为按钮
4. 点击群组导航到带有正确 `groupId` 的预期工具
5. 提供 "前往群组列表" 链接用于管理群组

## 面包屑

**组件：** `AppBreadcrumb`（在 `SiteHeader` 中渲染）

面包屑结构因路由类型而异：

**群组子路由**（例如 `/group/873386/contracts/`）：
```
群组 > 群名称 > 群组合约
```
- "群组" 链接到 `/group/`
- 群组名称链接到 `/group/:groupId/members/`
- 当前工具名称是活动（不可点击）页面

**非群组路由**（例如 `/shipment/`）：
```
运输
```

路由标签从 `useNavigates()` 和 `useGroupTools()` 派生 — 不维护单独的标签映射。群组名称通过匹配 `fioGroupId` 从 `myGroupsQuery` 缓存中解析。

## 导航集成

**文件：** `src/hooks/use-navigates.tsx`

导出两个钩子：
- `useGroupTools()`：返回带有参数化 URL 的群组工具项目（`/group/{-$groupId}/members/` 等）
- `useNavigates()`：返回所有导航项目（explorer 工具 + 群组工具），由侧边栏和面包屑使用

侧边栏（`NavMain`）将当前路由参数中的 `groupId` 传递给所有链接。当没有可用的 `groupId` 时，它使用 `_` 作为占位符，这会在导航时触发群组选择器。