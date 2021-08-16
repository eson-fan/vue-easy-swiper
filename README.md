# vue-easy-swiper

PC端轮播图

功能：

- 循环滚动
- 

## 安装

```
npm install -S vue-easy-imagepreview
```

## 使用

### 函数形式

```
import ImagePreview from 'vue-easy-imagepreview'

//ImagePreview.show(options | [])

ImagePreview.show([
  'https://img01.yzcdn.cn/vant/apple-1.jpg',
  'https://img01.yzcdn.cn/vant/apple-2.jpg'
])
或者
ImagePreview.show({
  images: [
    'https://img01.yzcdn.cn/vant/apple-1.jpg',
    'https://img01.yzcdn.cn/vant/apple-2.jpg'
  ]
})
```

### 组件形式

```
//在vue组件中使用

import ImagePreview from 'vue-easy-imagepreview'

<image-preview :images="images"></image-preview>
```

### Vue插件形式

```
import ImagePreview from 'vue-easy-imagepreview'

Vue.use(ImagePreview)

//组件中使用
this.$preview(options | [])
```

## Options

| 参数      | 说明             | 类型                    | 可选值     | 默认值 |
| --------- | ---------------- | ----------------------- | ---------- | ------ |
| images    | 要预览的图片地址 | array                   | --         | [ ]    |
| close     | 关闭时的回调     | function: ()=>{}        | --         | --     |
| change    | 图片切换时的回调 | function: (index) => {} | --         | --     |
| loop      | 是否循环滑动     | boolean                 | true/false | true   |
| showIndex | 是否显示指示器   | boolean                 | true/false | true   |
| maxZoom   | 最大放大倍数     | number                  | --         | 3      |
| minZoom   | 最小缩小倍数     | number                  | --         | 0.5    |
| index     | 从第几个开始显示 | number                  | --         | 1      |

## slot

| 参数               | 说明                     |
| ------------------ | ------------------------ |
| placeholderLoading | 图片加载中时的显示视图   |
| placeholderFail    | 图片加载失败时的显示视图 |
| Index              | 指示器视图               |

## Event

| 参数   | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| close  | 关闭时的回调     | --       |
| change | 图片切换时的回调 | index    |