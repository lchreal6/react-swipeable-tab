import React, {Component} from 'react';
import classNames from 'classnames';
import IscrollProbe from '../../Iscroll-Probe/Iscroll-probe';
import './index.scss';

export default class Panel extends Component {

  panel = null;

  static defaultProps = {
    panelIscroll: true,
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.active) {
      if(nextProps.scrollDirection !== this.props.scrollDirection) {
        if (nextProps.scrollDirection === 'vertical') {
          this.props.myIscroll.current && this.props.myIscroll.current.iscroll.enable()
        } else {
          this.props.myIscroll.current && this.props.myIscroll.current.iscroll.disable();
        }
      }
      return true;
    }
    return false;
  }

  componentDidUpdate(nextProps) {
    if(nextProps.activeIndex !== this.props.activeIndex) {
      this.props.updateHeight && this.props.updateHeight();
    }
  }

  render() {
    const { panelWidthPerCent, className, style, panelIscroll, panelIscrollOptions } = this.props;
    const panelStyle = {
      width: `${panelWidthPerCent}%`,
      ...style,
    }
    const cls = classNames('react-swipeable-tab-panel', className);
    const options = {
      eventPassthrough: 'horizontal',
    }
    if(panelIscroll) {
      return (
        <div className={cls} style={panelStyle} ref={this.props.panelRef}>
            <IscrollProbe
            options={panelIscrollOptions || options}
              ref= {this.props.myIscroll}
              iscrollChildrenStyle = {{
                minHeight: panelIscrollOptions && panelIscrollOptions.bounce === false? '100%' : '100.5%',
              }}
              loadMore={this.props.loadMore}
            >
            <div ref={ e => this.childrenWrapper = e}>
              {this.props.children}
            </div>
            </IscrollProbe>
        </div>
      )
    }
    return (
      <div className={cls} style={panelStyle} ref={this.props.panelRef}>
          {this.props.children}
      </div>
    )
  }
}