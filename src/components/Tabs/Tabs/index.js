import React, { Component } from 'react';
import classNames from 'classnames';
import './index.scss'

export default class Tabs extends Component {

  static defaultProps = {
    onTabChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultIndex: 0,
      panelOffsetXPercent: this.getActiveIndex(props),
      activeIndex: this.getActiveIndex(props),
    };
  }

  getActiveIndex(props) {
    const { activeIndex, defaultIndex } = props;
    if(activeIndex) {
      return activeIndex;
    }
    if(defaultIndex) {
      return defaultIndex;
    }
    return 0;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      })
    }
  }

  handleTabChange = (index) => {
    const { onTabChange } = this.props;
    onTabChange && onTabChange(index);
  }

  handlePanelScroll = (event) => {
    const { panelOffsetXPercent } = event;
    this.setState({
      panelOffsetXPercent,
    })
  }

  render() {
    const { children, className, style, ...extraProps} = this.props;
    const { activeIndex, panelOffsetXPercent } = this.state;
    const props = {
      activeIndex,
      panelOffsetXPercent,
      handleTabChange: this.handleTabChange,
      handlePanelScroll: this.handlePanelScroll,
      ...extraProps,
    }
    const cls = classNames('react-swipeable-tab-tabs', className)
    return (
      <div className={cls} style={style}>
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, props);
          })
        }
      </div>
    )
  }
}

Tabs.defaultProps = {
  swiperMove: true,
  animate: true,
  showInk: true,
  animateHeight: false,
  activeIndex: 0,
  inkColor: '#2A84F8',
  activeTabColor: '#2A84F8',
  threshold: 5,
}