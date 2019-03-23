# react-swipeable-tab

一个可滑动切换，异步加载数据，具有流畅滚动特性的 React-Tab 组件

参考了[react-tabtab](https://github.com/ctxhou/react-tabtab)提供的组件，在此基础上进行了功能特性的丰富

## 使用

### Simple Tab

一个简单用法的 tab

```js
import React, { Component } from "react";
import { Tab, Tabs, TabList, Panel, PanelList } from "react-swipeable-tab";

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1_activeIndex: 0
    };
  }
  onTab1_Change = index => {
    this.setState({
      tab1_activeIndex: index
    });
  };

  render() {
    const { tab1_activeIndex } = this.state;
    return (
      <Tabs activeIndex={tab1_activeIndex} onTabChange={this.onTab1_Change}>
        <TabList style={{ height: "40px" }}>
          <Tab>tab1</Tab>
          <Tab>tab2</Tab>
          <Tab>tab3</Tab>
        </TabList>
        <PanelList style={{ height: "100px" }}>
          <Panel>
            <p>content1</p>
            <p>content1</p>
            <p>content1</p>
            <p>content1</p>
            <p>content1</p>
            <p>content1</p>
            <p>content1</p>
            <p>content1</p>
          </Panel>
          <Panel>content2</Panel>
          <Panel>content3</Panel>
        </PanelList>
      </Tabs>
    );
  }
}
```

### Multipe Tab

多 tab 导航栏

```js
import React, { Component } from "react";
import { Tab, Tabs, TabList, Panel, PanelList } from "react-swipeable-tab";

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab2_activeIndex: 0
    };
  }
  onTab2_Change = index => {
    this.setState({
      tab2_activeIndex: index
    });
  };

  render() {
    const { tab2_activeIndex } = this.state;
    return (
      <Tabs
        activeIndex={tab2_activeIndex}
        onTabChange={this.onTab2_Change}
        page={5}
      >
        <TabList style={{ height: "40px" }}>
          <Tab>tab1</Tab>
          <Tab>tab2</Tab>
          <Tab>tab3</Tab>
          <Tab>tab4</Tab>
          <Tab>tab5</Tab>
          <Tab>tab6</Tab>
          <Tab>tab7</Tab>
          <Tab>tab8</Tab>
          <Tab>tab9</Tab>
        </TabList>
        <PanelList style={{ height: "100px" }}>
          <Panel>content1</Panel>
          <Panel>content2</Panel>
          <Panel>content3</Panel>
          <Panel>content4</Panel>
          <Panel>content5</Panel>
          <Panel>content6</Panel>
          <Panel>content7</Panel>
          <Panel>content8</Panel>
          <Panel>content9</Panel>
        </PanelList>
      </Tabs>
    );
  }
}
```

### AnimateHeight Tab

自动调整高度伸缩 tab

```js
import React, { Component } from "react";
import { Tab, Tabs, TabList, Panel, PanelList } from "react-swipeable-tab";

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab3_activeIndex: 0
    };
  }
  onTab3_Change = index => {
    this.setState({
      tab3_activeIndex: index
    });
  };

  render() {
    const { tab3_activeIndex } = this.state;
    return (
      <Tabs
        animateHeight={true}
        activeIndex={tab3_activeIndex}
        onTabChange={this.onTab3_Change}
      >
        <TabList style={{ height: "40px" }}>
          <Tab>tab1</Tab>
          <Tab>tab2</Tab>
          <Tab>tab3</Tab>
        </TabList>
        <PanelList style={{ height: "50px" }}>
          <Panel minPanelHeight={"50px"} style={{ height: "50px" }}>
            content1
          </Panel>
          <Panel minPanelHeight={"150px"} style={{ height: "100px" }}>
            content1
          </Panel>
          <Panel minPanelHeight={"350px"} style={{ height: "150px" }}>
            content1
          </Panel>
        </PanelList>
      </Tabs>
    );
  }
}
```

### Async Loading Tab

异步加载内容 tab

```js
import React, { Component } from "react";
import { Tab, Tabs, TabList, Panel, PanelList } from "react-swipeable-tab";

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab4_activeIndex: 0
    };
  }
  onTab4_Change = index => {
    this.setState({
      tab4_activeIndex: index
    });
  };
  loadingConetent = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("content");
      }, 2000);
    });
  };

  render() {
    const { tab4_activeIndex } = this.state;
    return (
      <Tabs activeIndex={tab4_activeIndex} onTabChange={this.onTab4_Change}>
        <TabList style={{ height: "40px" }}>
          <Tab>tab1</Tab>
          <Tab>tab2</Tab>
          <Tab>tab3</Tab>
        </TabList>
        <PanelList style={{ height: "100px" }}>
          <AsyncPanel
            loadContent={this.loadingConetent}
            render={data => <div>{data}</div>}
            renderLoading={() => <div>loading...</div>}
          />
          <AsyncPanel
            loadContent={this.loadingConetent}
            render={data => <div>{data}</div>}
            renderLoading={() => <div>loading...</div>}
          />
          <AsyncPanel
            loadContent={this.loadingConetent}
            render={data => <div>{data}</div>}
            renderLoading={() => <div>loading...</div>}
          />
        </PanelList>
      </Tabs>
    );
  }
}
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

顶部 tab 导航栏面板

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
