import React, {Component} from 'react';
import classNames from 'classnames';
import IscrollProbe from '../../Iscroll-Probe/Iscroll-probe';
import './index.scss';

export default class TabList extends Component {
  constructor(props) {
    super(props);
    const { children, page } = props;
    const childrenCount = React.Children.count(children);
    if(page & childrenCount > page) {
      this.tabPageCount = page
    } else {
      this.tabPageCount = childrenCount
    }
    const tabPageWidthPerCent = 100 / this.tabPageCount;
    const tabWidthPerCent = 100 / childrenCount
    const tabWrapperPerCent = tabPageWidthPerCent * childrenCount;
    const inkWidthPerCent = tabWidthPerCent * 0.2  
    const inkMarginLeftPerCent =  (tabWidthPerCent - inkWidthPerCent) / 2; 
    this.state = {
      tabWidthPerCent,
      inkWidthPerCent,
      inkMarginLeftPerCent,
      tabWrapperPerCent,
    }
  }

  componentDidMount() {
    this.iscroll = this.myIscroll.iscroll;

    const scroller = this.iscroll.scroller;
    const childrenCount = React.Children.count(this.props.children);
    const diffCount = childrenCount - this.props.page;
    const scrollerWidth = scroller.getBoundingClientRect().width;
    const tabWidth = scrollerWidth / childrenCount
    const midNum = this.chk(this.tabPageCount)? Math.floor(this.tabPageCount / 2 ) : Math.floor(this.tabPageCount / 2 ) + 1;
    this.tabScrollParams = {
      childrenCount,
      midNum,
      diffCount,
      tabWidth,
    }
    this.firstHandleTabSroll(this.props, this.tabScrollParams);
  }

  componentWillReceiveProps(nextProps) {
    this.handleTabScroll(this.props, nextProps);
  }

  /**
   * @description 判断奇偶数
   * @param {number}} numb 传入的数字
   * @returns
   */
  chk(numb){
    if(numb%2 === 0)  
     {  
        return true;  
     }else{  
        return false;  
     } 
  }

  handleTabScroll = (props, nextProps) => {
    const { midNum, diffCount, tabWidth, childrenCount } = this.tabScrollParams;
    if(!props.page ||　props.page　>= childrenCount) return;
    if(props.activeIndex !== nextProps.activeIndex) {
      if(nextProps.activeIndex > props.activeIndex) {
        if(nextProps.activeIndex + 1 > midNum && nextProps.activeIndex + 1 <= midNum + diffCount ) {
          this.iscroll.scrollTo(-tabWidth * (nextProps.activeIndex + 1 - midNum), 0, 200);
        } else {
          (nextProps.activeIndex + 1 > midNum) && this.iscroll.scrollTo(-tabWidth * diffCount, 0, 200);
        }
      } else {
        const reverseNum = childrenCount - nextProps.activeIndex - 1;
        if(reverseNum + 1 > midNum && reverseNum + 1 <= midNum + diffCount ) {
          this.iscroll.scrollTo(-tabWidth * (nextProps.activeIndex + 1 - midNum), 0, 200);
        } else {
          (reverseNum + 1 > midNum) && this.iscroll.scrollTo(0, 0, 200);
        }
      }
    }
  }

  firstHandleTabSroll = (props) => {
    const { midNum, diffCount, tabWidth, childrenCount } = this.tabScrollParams;
    if(!props.page ||　props.page　>= childrenCount) return;
    if(props.activeIndex + 1 > midNum && props.activeIndex + 1 <= midNum + diffCount ) {
      this.iscroll.scrollTo(-tabWidth * (props.activeIndex + 1 - midNum), 0, 0);
    } else {
      (props.activeIndex + 1 > midNum) && this.iscroll.scrollTo(-tabWidth * diffCount, 0, 0);
    }
  }

  renderTab = () => {
    const{ children, activeIndex, handleTabChange, activeTabColor } = this.props;
    const { tabWidthPerCent } = this.state;
    const props = {
      handleTabChange,
      activeIndex,
      activeTabColor,
    }
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        key: index,
        tabIndex: index,
        active: index === activeIndex,
        tabWidthPerCent,
        ...props,
      })
    })
  }

  render() {
    const { className, style, activeIndex, inkColor, showInk } = this.props;
    const { inkWidthPerCent, inkMarginLeftPerCent,tabWidthPerCent, tabWrapperPerCent } = this.state;
    const inkTranslation = activeIndex * tabWidthPerCent + inkMarginLeftPerCent;
    const inkStyle = {
      width: `${inkWidthPerCent}%`,
      marginLeft: `${inkTranslation}%`,
      WebkitTransitionProperty: 'all',
      transitionProperty: 'all',
      backgroundColor: `${inkColor || '#2A84F8'}`,
    }
    const cls = classNames('pp-tabList', className);
    const options = {
      scrollX:true, 
      scrollY:false, 
      useTransform: false, 
    }
    return (
      <div className={cls} style={style}>
        <IscrollProbe 
          options = {options}
          ref= {((e) => {
            this.myIscroll = e
          })}
          iscrollChildrenStyle={{
            width: `${tabWrapperPerCent}%`,
            height: '100%',
          }}
        >
          {this.renderTab()}
          {showInk && <div className="ink" style={inkStyle}></div>}
        </IscrollProbe>
      </div>
    )
  }
}