# react-swipeable-tab

一个可滑动切换，异步加载数据，具有流畅滚动特性的React-Tab组件

### Simple Tab

```js
```

### Multipe Tab

```js
```
### AnimateHeight Tab

```js
```

### Async Loading Tab

```js
```

## API
### &lt;Tabs /&gt;

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>默认值</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>defaultIndex</td>
      <td><code>int</code></td>
      <td>null</td>
      <td>初始化tab的显示面板</td>
    </tr>
    <tr>
      <td>activeIndex</td>
      <td><code>int</code></td>
      <td>null</td>
      <td>当前激活的tab面板的key</td>
    </tr>
    <tr>
      <td>onTabChange</td>
      <td><code>() => tabIndex</code></td>
      <td>null</td>
      <td>
        返回被点击的面板的key<br/>
        你可以使用这个方法更新面板的activeIndex，来切换tab
      </td>
    </tr>
    <tr>
      <td>style</td>
      <td>
        <pre>
<code>{
  backgroundColor: 'red',
  height: '50px
}</code></pre>
      </td>
      <td>object</td>
      <td>
        自定义组件样式
      </td>
    </tr>
    <tr>
      <td>className</td>
      <td>string</td>
      <td>null</td>
      <td>
        设置添加样式类名
      </td>
    </tr>
    <tr>
      <td>swiperMove</td>
      <td>boolean</td>
      <td>true</td>
      <td>
        是否开启滑动切换tab
      </td>
    </tr>
    <tr>
      <td>animate</td>
      <td>boolean</td>
      <td>true</td>
      <td>
        是否开启滑动切换动画特性
      </td>
    </tr>
    <tr>
      <td>showInk</td>
      <td>boolean</td>
      <td>true</td>
      <td>
        顶部tab导航栏当前激活的面板是否底部显示横线标识
      </td>
    </tr>
    <tr>
      <td>inkColor</td>
      <td>string</td>
      <td>'#2A84F8'</td>
      <td>
        顶部tab导航栏当前激活的面板底部横线颜色
      </td>
    </tr>
    <tr>
      <td>activeTabColor</td>
      <td>string</td>
      <td>'#2A84F8'</td>
      <td>
        顶部tab导航栏当前激活的面板文字颜色
      </td>
    </tr>
    <tr>
      <td>panelIscroll</td>
      <td>boolean</td>
      <td>true</td>
      <td>
        tab内容面板是否使用iscroll组件，具有iscroll滚动的特性
      </td>
    </tr>
    <tr>
      <td>threshold</td>
      <td>int</td>
      <td>5</td>
      <td>
        快速切屏的时间阈值系数
      </td>
    </tr>
  </tbody>
</table>
