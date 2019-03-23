import React, {Component} from 'react';
import classNames from 'classnames';
import './index.scss';


function getAngle(angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(angx, angy) {
  var result = 0;

  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
  }

  var angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
      result = 1;
  } else if (angle > 45 && angle < 135) {
      result = 2;
  } else if ((angle >= 165 && angle <= 180) || (angle >= -180 && angle < -165)) {
      result = 3;
  } else if (angle >= -15 && angle <= 15) {
      result = 4;
  }

  return result;
}

export default class PanelList extends Component {

  constructor(props) {
    super(props);
    const { children, activeIndex } = props;
    this.childrenCount = React.Children.count(children);
    const panelWidthPerCent = 100 / this.childrenCount;
    const panelWrapperPerCent = 100 * this.childrenCount;
    const panelWrapperTranslation = activeIndex * panelWidthPerCent;
    this.state = {
      panelWidthPerCent,
      panelWrapperPerCent,
      panelWrapperTranslation,
      scrolling: false,
      heightLatest: 0,
      scrollDirection: '',
    }
  }

  componentDidMount() {
    this.panelListWidth = this.panelListRef.getBoundingClientRect().width;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeIndex !== this.props.activeIndex) {
      const { activeIndex } = nextProps;
      const { panelWidthPerCent } = this.state;
      const panelWrapperTranslation = activeIndex * panelWidthPerCent;
      this.setState({
        panelWrapperTranslation,
      })
    }
  }

  toucheMovePanel = (moveDistancePercent) => {
    let { panelWrapperTranslation } = this.state;
    panelWrapperTranslation += moveDistancePercent;

    this.setState({
      panelWrapperTranslation,
    })
  }

  updateHeight = () => {
    if(this.panelRef.current !== null) {
      const currentPanel = this.panelRef.current;
      const child = currentPanel.children[0]
      if(child.offsetHeight !== undefined && this.state.heightLatest !== child.offsetHeight) {
        this.setState({
          heightLatest: child.offsetHeight,
        }, () => {
          this.props.updatePanelListHeightCallback && this.props.updatePanelListHeightCallback();
        })
      }
    }
  }

  handleTouchStart = (event) => {
    const { activeIndex, onTouchStart } = this.props;
    this.orignalX = event.changedTouches[0].pageX;
    this.orignalY = event.changedTouches[0].pageY;
    this.selectedIndex = activeIndex;
    this.vx = 0;
    this.setState({
      pageX: this.orignalX,
      pageY: this.orignalY,
      scrolling: true,
      offsetX: 0,
      scrollDirection: '',
    })
  }

  handleTouchMove = (event) => {
    const { activeIndex, swiperMove, onTouchVerticalMove } = this.props;
    let { pageX, pageY, panelWidthPerCent, scrollDirection } = this.state;
    const moveX = event.changedTouches[0].pageX;
    const moveY = event.changedTouches[0].pageY;
    const offsetX = moveX - pageX;
    const offsetY = moveY - pageY
    // 向上或向下滑动
    if(scrollDirection === 'vertical' || ((getDirection(offsetX, offsetY) === 1 || getDirection(offsetX, offsetY) === 2) && scrollDirection === '') || !swiperMove) {
      this.setState({
        pageX: moveX,
        pageY: moveY,
        scrollDirection: 'vertical',
      })
      onTouchVerticalMove && onTouchVerticalMove(offsetY);
    } else {
      this.vx = this.vx * 0.5 + (offsetX) * 0.5;
      const movePercent = offsetX / this.panelListWidth * 100;
      const maxTranslation = panelWidthPerCent * ( this.childrenCount - 1 );
      const previousTranslation = activeIndex * panelWidthPerCent;
      const tippingPoint = panelWidthPerCent * 0.3;
      let panelWrapperTranslation = this.state.panelWrapperTranslation - movePercent;
      if (panelWrapperTranslation < 0) {
        panelWrapperTranslation = 0;
      } else if (panelWrapperTranslation > maxTranslation) {
        panelWrapperTranslation = maxTranslation;
      }
      this.selectedIndex = activeIndex;
      if (panelWrapperTranslation < previousTranslation - tippingPoint) {
        this.selectedIndex = activeIndex - 1;
      } else if (panelWrapperTranslation > previousTranslation + tippingPoint) {
        this.selectedIndex = activeIndex + 1;
      }

      this.setState({
        panelWrapperTranslation,
        pageX: moveX,
        pageY: moveY,
        offsetX,
        scrollDirection: 'horizontal',
      })
    }
    event.preventDefault();
  }

  handleTouchEnd = (event) => {
    const { panelWidthPerCent } = this.state;
    this.endTime = new Date().getTime();
    const { handleTabChange, activeIndex } = this.props;
    if (this.selectedIndex === activeIndex) {
      if(this.vx < -this.props.threshold && activeIndex !== this.childrenCount - 1) {
        this.selectedIndex++;
      } else if (this.vx > this.props.threshold && activeIndex !==0) {
        this.selectedIndex--;
      }
    }

    const panelWrapperTranslation = this.selectedIndex * panelWidthPerCent;
    this.setState({
      panelWrapperTranslation,
      pageX: null,
      pageY: null,
      scrolling: false,
      scrollDirection: 'vertical',
    }, () => {
      if(activeIndex !== this.selectedIndex) {
        handleTabChange(this.selectedIndex)
      }
    })
  }

  renderPanel = () => {
    const self = this;
    const { children, activeIndex, panelIscroll, animateHeight, panelIscrollOptions, onTouchVerticalMove } = this.props;
    const { panelWidthPerCent, scrollDirection, scrolling } = this.state;
    const props = {
      activeIndex,
      panelIscroll,
      scrollDirection,
      scrolling,
      panelIscrollOptions,
      onTouchVerticalMove
    }
    return React.Children.map(children, (child, index) => {
      let panelRef = null;
      if(index === activeIndex && animateHeight) {
        this.panelRef = React.createRef();
        panelRef = this.panelRef;
        props.updateHeight = this.updateHeight;
      }
      self[`panelIscroll-${index}`] = React.createRef();

      return React.cloneElement(child, {
        key: index,
        tabIndex: index,
        active: index === activeIndex,
        panelWidthPerCent,
        panelRef: panelRef,
        myIscroll: self[`panelIscroll-${index}`],
        ...props,
      })
    })
  }

  createTransition(property, options) {
    const { duration, easeFunction, delay } = options;
    return `${property} ${duration} ${easeFunction} ${delay}`;
  }

  render() {
    const { panelWrapperPerCent, panelWrapperTranslation, scrolling, heightLatest } = this.state;
    const { className, style, minPanelHeight, animate } = this.props;
    const cls = classNames('pp-panelList', className);
    const springConfig = {
      duration: '0.35s',
      easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
      delay: '0s',
    }
    let transition;
    let WebkitTransition;
    const transitionProperty = animate? 'all' : 'none';
    if(scrolling) {
      transition = `${transitionProperty} 0s ease 0s`;
      WebkitTransition = `${transitionProperty} 0s ease 0s`;
    } else {
      transition = this.createTransition(transitionProperty, springConfig);
      WebkitTransition = this.createTransition(transitionProperty, springConfig);
    }

    const panelWrapperStyle = {
      width: `${panelWrapperPerCent}%`,
      transform: 'translateX(-' + panelWrapperTranslation + '%)',
      WebkitTransform: 'translateX(-' + panelWrapperTranslation + '%)',
      transition,
      WebkitTransition,
      ...style,
    }

    if (heightLatest !== 0) {
      panelWrapperStyle.height = heightLatest;
    }

    if(this.props.minPanelHeight) {
      panelWrapperStyle.minHeight = minPanelHeight;
    }

    return (
      <div ref={(e) => {this.panelListRef = e}} className={cls} style={panelWrapperStyle} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
        {this.renderPanel()}
      </div>      
    )
  }
}