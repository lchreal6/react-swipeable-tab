import React, {Component} from 'react';
import classNames from 'classnames';
import './index.scss';

export default class Tab extends Component {
  
  shouldComponentUpdate(nextProps) {
    // if(nextProps.active) {
    //   return true;
    // }
    // return false;
    return true
  }

  handleTabClick = () => {
    const { tabIndex, handleTabChange, onClick } = this.props;
    if(onClick) {
      onClick(tabIndex);
    } else {
      handleTabChange(tabIndex);
    }
  }

  render() {
    const { tabWidthPerCent, className, style, active, activeTabColor } = this.props;
    const tabWrapperStyle = {
      width: `${tabWidthPerCent}%`,
      color: `${active ? (activeTabColor || '#2A84F8') : ''}`,
      ...style,
    }
    const cls = classNames('pp-tab', className, {
      'active': active,
    })
    return (
      <div className={cls} style={tabWrapperStyle} onClick={this.handleTabClick}>
        {(this.props.renderTab && this.props.renderTab()) || this.props.children}
      </div>
    )
  }
}