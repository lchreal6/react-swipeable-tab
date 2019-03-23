# react-swipeable-tab

一个可滑动切换，异步加载数据，具有流畅滚动特性的React-Tab组件  

参考了[react-tabtab](https://github.com/ctxhou/react-tabtab)提供的组件，在此基础上进行了功能特性的丰富


## 使用

### Simple Tab
一个简单用法的tab

```js
```

### Multipe Tab
多tab导航栏

```js
```
### AnimateHeight Tab
自动调整高度伸缩tab

```js
```

### Async Loading Tab
异步加载内容tab

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
      <td>object</td>
      <td>null</td>
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
    <tr>
      <td>page</td>
      <td>int</td>
      <td>null</td>
      <td>
        屏幕最多显示多少个tab导航面板
      </td>
    </tr>
  </tbody>
</table>

### &lt;TabList /&gt;
用来包裹 &lt;Tab /&gt; 组件

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>默认值</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>style</td>
      <td>object</td>
      <td>null</td>
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
  </tbody>
</table>

### &lt;Tab /&gt;
顶部tab导航栏面板

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>默认值</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>style</td>
      <td>object</td>
      <td>null</td>
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
  </tbody>
</table>

### &lt;PanelList /&gt;
用来包裹 &lt;Panel /&gt; 组件

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>默认值</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>style</td>
      <td>object</td>
      <td>null</td>
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
  </tbody>
</table>

### &lt;Panel /&gt;
内容面板

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>默认值</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>style</td>
      <td>object</td>
      <td>null</td>
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
      <td>panelIscrollOptions</td>
      <td>object</td>
      <td><code>
        {
        fadeScrollbars: true,
      }
        </code></td>
      <td>
        iscroll组件配置
      </td>
    </tr>
  </tbody>
</table>

### &lt;AsyncPanel /&gt;
具有异步加载数据功能的内容面板

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>默认值</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>loadContent </td>
      <td>object</td>
      <td>null</td>
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
      <td>panelIscrollOptions</td>
      <td>object</td>
      <td><code>
        {
        fadeScrollbars: true,
      }
        </code></td>
      <td>
        iscroll组件配置
      </td>
    </tr>
    <tr>
      <td>style</td>
      <td><code>(cb) => cb(error, data)</code>or<code>(cb) => Promise	</code></td>
      <td>null</td>
      <td>
        需要异步加载数据的回调函数
      </td>
    </tr>
    <tr>
      <td>render </td>
      <td><code>(data) => Component	</td>
      <td>null</td>
      <td>
        数据加载完成后渲染的组件
      </td>
    </tr>
    <tr>
      <td>renderLoading  </td>
      <td>() => Component	</td>
      <td>null</td>
      <td>
        在进行数据异步加载时填充的loading组件
      </td>
    </tr>
    <tr>
      <td>renderLoading  </td>
      <td>boolean</td>
      <td>true</td>
      <td>
        加载后是否缓存数据
      </td>
    </tr>
  </tbody>
</table>
