import React, { Component } from 'react';
import logo from './logo.svg';
import {
  Tab,
  Tabs,
  TabList,
  Panel,
  PanelList,
  AsyncPanel,
} from './components/Tabs';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tab1_activeIndex: 0,
      tab2_activeIndex: 0,
      tab3_activeIndex: 0
    }
  }

  onTab1_Change = (index) => {
    this.setState({
      tab1_activeIndex: index
    })
  }

  onTab2_Change = (index) => {
    this.setState({
      tab2_activeIndex: index
    })
  }

  onTab3_Change = (index) => {
    this.setState({
      tab3_activeIndex: index
    })
  }

  loadingConetent = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('content');
      }, 2000)
    })
  }

  render() {
    const { tab1_activeIndex, tab2_activeIndex, tab3_activeIndex } = this.state;
    return (
      <div className="App">
        <Tabs activeIndex={tab1_activeIndex} onTabChange={this.onTab1_Change}>
          <TabList style={{height: '40px'}}>
            <Tab>tab1</Tab>
            <Tab>tab2</Tab>
            <Tab>tab3</Tab>
          </TabList>
          <PanelList>
            <Panel>content1</Panel>
            <Panel>content2</Panel>
            <Panel>content3</Panel>
          </PanelList>
        </Tabs>
        <Tabs activeIndex={tab2_activeIndex} onTabChange={this.onTab2_Change} page={5}>
          <TabList style={{height: '40px'}}>
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
          <PanelList>
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
        <Tabs activeIndex={tab3_activeIndex} onTabChange={this.onTab3_Change}>
          <TabList style={{height: '40px'}}>
            <Tab>tab1</Tab>
            <Tab>tab2</Tab>
            <Tab>tab3</Tab>
          </TabList>
          <PanelList>
            <AsyncPanel
              loadContent={this.loadingConetent}
              render={data => (<div>{data}</div>)}
              renderLoading={() => <div>loading</div>}
            ></AsyncPanel>
            <AsyncPanel
              loadContent={this.loadingConetent}
              render={data => (<div>{data}</div>)}
              renderLoading={() => <div>loading</div>}
            ></AsyncPanel>
            <AsyncPanel
              loadContent={this.loadingConetent}
              render={data => (<div>{data}</div>)}
              renderLoading={() => <div>loading</div>}
            ></AsyncPanel>
          </PanelList>
        </Tabs>
      </div>
    );
  }
}

export default App;
