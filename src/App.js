import React, { Component } from "react";
import {
  Tab,
  Tabs,
  TabList,
  Panel,
  PanelList,
  AsyncPanel
} from "./components/Tabs";
import "./App.css";

const paneListStyle1 = {
  backgroundColor: "#FEA900"
};
const paneListStyle2 = {
  backgroundColor: "#b3dc4a"
};
const paneListStyle3 = {
  backgroundColor: "#6ac0ff"
};
const paneListStyle4 = {
  backgroundColor: "#ff99c0"
};
const paneListStyle5 = {
  backgroundColor: "#99ff66"
};
const paneListStyle6 = {
  backgroundColor: "#D1D1D1"
};
const paneListStyle7 = {
  backgroundColor: "#D1EEEE"
};
const paneListStyle8 = {
  backgroundColor: "#CDCD00"
};
const paneListStyle9 = {
  backgroundColor: "#836FFF"
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1_activeIndex: 0,
      tab2_activeIndex: 0,
      tab3_activeIndex: 0,
      tab4_activeIndex: 0
    };
  }

  onTab1_Change = index => {
    this.setState({
      tab1_activeIndex: index
    });
  };

  onTab2_Change = index => {
    this.setState({
      tab2_activeIndex: index
    });
  };

  onTab3_Change = index => {
    this.setState({
      tab3_activeIndex: index
    });
  };

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
    const {
      tab1_activeIndex,
      tab2_activeIndex,
      tab3_activeIndex,
      tab4_activeIndex
    } = this.state;
    return (
      <div className="App">
        <section>
          <div className="title">Simple Tabs</div>
          <Tabs activeIndex={tab1_activeIndex} onTabChange={this.onTab1_Change}>
            <TabList style={{ height: "40px" }}>
              <Tab>tab1</Tab>
              <Tab>tab2</Tab>
              <Tab>tab3</Tab>
            </TabList>
            <PanelList style={{ height: "100px" }}>
              <Panel style={paneListStyle1}>
                <p>content1</p>
                <p>content1</p>
                <p>content1</p>
                <p>content1</p>
                <p>content1</p>
                <p>content1</p>
                <p>content1</p>
                <p>content1</p>
              </Panel>
              <Panel style={paneListStyle2}>content2</Panel>
              <Panel style={paneListStyle3}>content3</Panel>
            </PanelList>
          </Tabs>
        </section>

        <section>
          <div className="title">Multiple Tabs</div>
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
              <Panel style={paneListStyle1}>content1</Panel>
              <Panel style={paneListStyle2}>content2</Panel>
              <Panel style={paneListStyle3}>content3</Panel>
              <Panel style={paneListStyle4}>content4</Panel>
              <Panel style={paneListStyle5}>content5</Panel>
              <Panel style={paneListStyle6}>content6</Panel>
              <Panel style={paneListStyle7}>content7</Panel>
              <Panel style={paneListStyle8}>content8</Panel>
              <Panel style={paneListStyle9}>content9</Panel>
            </PanelList>
          </Tabs>
        </section>

        <section>
          <div className="title">Async Loading Tabs</div>
          <Tabs activeIndex={tab3_activeIndex} onTabChange={this.onTab3_Change}>
            <TabList style={{ height: "40px" }}>
              <Tab>tab1</Tab>
              <Tab>tab2</Tab>
              <Tab>tab3</Tab>
            </TabList>
            <PanelList style={{ height: "100px" }}>
              <AsyncPanel
                style={paneListStyle1}
                loadContent={this.loadingConetent}
                render={data => <div>{data}</div>}
                renderLoading={() => <div>loading...</div>}
              />
              <AsyncPanel
                style={paneListStyle2}
                loadContent={this.loadingConetent}
                render={data => <div>{data}</div>}
                renderLoading={() => <div>loading...</div>}
              />
              <AsyncPanel
                style={paneListStyle3}
                loadContent={this.loadingConetent}
                render={data => <div>{data}</div>}
                renderLoading={() => <div>loading...</div>}
              />
            </PanelList>
          </Tabs>
        </section>

        <section>
          <div className="title">AnimateHeight Tabs</div>
          <Tabs
            animateHeight={true}
            activeIndex={tab4_activeIndex}
            onTabChange={this.onTab4_Change}
          >
            <TabList style={{ height: "40px" }}>
              <Tab>tab1</Tab>
              <Tab>tab2</Tab>
              <Tab>tab3</Tab>
            </TabList>
            <PanelList style={{ height: "50px" }}>
              <Panel
                minPanelHeight={"50px"}
                style={{ ...paneListStyle1, height: "50px" }}
              >
                content1
              </Panel>
              <Panel
                minPanelHeight={"150px"}
                style={{ ...paneListStyle2, height: "100px" }}
              >
                content1
              </Panel>
              <Panel
                minPanelHeight={"350px"}
                style={{ ...paneListStyle3, height: "150px" }}
              >
                content1
              </Panel>
            </PanelList>
          </Tabs>
        </section>
      </div>
    );
  }
}

export default App;
