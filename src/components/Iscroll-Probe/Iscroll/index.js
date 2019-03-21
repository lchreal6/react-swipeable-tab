import React from 'react';
import './index.scss';

export default (Iscroll) => {
  return class IScroll extends React.Component {
    /**
         * Creates an instance of IScroll.
         * @author zhangfan
         * @param   {object}    options                 [option]    default: {
                                                                        scrollbars: true,
                                                                        mouseWheel: true,
                                                                        interactiveScrollbars: true,
                                                                        shrinkScrollbars: 'scale',
                                                                        fadeScrollbars: true,
                                                                        preventDefault: false,
                                                                        scrollbarClass: 'pp-scrollbar',
                                                                        probeType: 1,
                                                                    }
         * @param   {string}    skinClass               [option]    default: ''
         * @param   {string}    pullTips                [option]    default: `网页由 ${window.location.host} 提供`
         * @param   {boolean}   refreshPage             [option]    default: false（refreshPage必须引入probe版本）
         * @param   {number}    refreshPageThreshold    [option]    default: 60
         * @param   {function}  loadMore                [option]    default: function(){}
         * @memberof IScroll
         */
    constructor(props) {
      super(props);
      this.id = Math.floor(Math.random() * 1000000000);
      this.pullTips = this.props.pullTips || ``;
      this.refreshPage = typeof this.props.refreshPage === 'undefined' ? false : !!this.props.refreshPage;
      this.refreshPageThreshold = this.props.refreshPageThreshold || 60;
      this.loadMore = typeof this.props.loadMore !== 'function' ? function() {} : this.props.loadMore;
      this.refreshPageFun = typeof this.props.refreshPageFun !== 'function' ? function() {} : this.props.refreshPageFun;
      this.state = {
        pullTips: this.pullTips
      }
    }
    
    componentDidMount() {
      let self = this;
      let dom = document.getElementById(`${this.id}`)
      let options = this.props.options || {};
      options = Object.assign({
        scrollbars: false,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        preventDefault: false,
        scrollbarClass: 'pp-scrollbar',
        probeType: 1
      }, options);
      self.iscroll = new Iscroll(dom, options);
      setTimeout(()=>{
        self.iscroll.refresh();
      }, 200);

      self.iscroll.on('scroll', () => {
        let refreshTips = self.refreshPage ? '松手刷新页面' : self.state.pullTips;
        if (self.iscroll.y > self.refreshPageThreshold && refreshTips !== self.state.pullTips) {
          self.setState({
            pullTips: refreshTips
          })
        } else if (self.iscroll.y < self.refreshPageThreshold && self.state.pullTips !== self.pullTips) {
          self.setState({
            pullTips: self.pullTips
          })
        }
      });

      self.iscroll.on('scrollEnd', () => {
        if (self.iscroll.wrapperHeight - self.iscroll.y >= self.iscroll.scrollerHeight && self.iscroll.wrapperHeight < self.iscroll.scrollerHeight) {
          if (typeof self.loadMore === 'function') {
            self.loadMore();
          }
        }
      })
    
      if (this.refreshPage) {
        self.iscroll.wrapper.addEventListener('touchend', () => {
          if (self.iscroll.y > self.refreshPageThreshold) {
            if(self.refreshPageFun){
              self.refreshPageFun();
            }else{
              window.location.reload();
              window.location.href = window.location.href;
            }
          }
        })
      }
    }
    
    render() {
      return (
        <div id={this.id} className={`pp-iscroll-wrap ${this.props.skinClass || ''}`} style={this.props.skinStyle}>
          <div className='pp-iscroll' style={this.props.iscrollChildrenStyle}>
            {this.props.children}
          </div>
          {
            this.pullTips ?
              <div className="pp-iscroll-pull-tips">{this.state.pullTips}</div>
              : null
          }
        </div>
      );
    }
  }
};