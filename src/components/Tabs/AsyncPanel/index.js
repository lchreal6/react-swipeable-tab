import React, {Component} from 'react';
import Panel from '../Panel';

/**
 * @description 异步加载panel内容组件
 * @author lch
 * @export
 * @class AsyncPanel
 * @extends {Component}
 */
export default class AsyncPanel extends Component {

  static defaultProps = {
    cache: true,
    panelIscroll: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {},
    }
    this.myIscroll = this.props.myIscroll;
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.active) {
      if(nextProps.scrollDirection !== this.props.scrollDirection) {
        if (nextProps.scrollDirection === 'vertical') {
          this.iscroll && this.iscroll.enable()
        } else {
          this.iscroll &&　this.iscroll.disable();
        }
      }
      if(nextProps.scrolling) {
        return false;
      }
      return true;
    }
    return false;
  }

  componentDidMount() {
    if(this.props.active) {
      this.loadPanel();
    }
    this.iscroll = this.myIscroll.current && this.myIscroll.current.iscroll;
  }

  loadMore = () => {
    if(this.props.loadMore) {
      const promise = this.props.loadMore();
      if(!!promise && typeof promise.then !== 'undefined') {
        promise.then(
          (data) => this.callback(null, data),
          (err) => this.callback(err)
        );
      }
    }
  }

  componentDidUpdate() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.loadPanel();
    }
  }

  renderCallback() {
    this.props.updateHeight && this.props.updateHeight();
  }

  callback = (err, data) => {
    if(err) {
      console.log('React-Tabtab async panel error:', err);
    }
    if(this.props.cache) {
      this.cacheData = data;
    }
    this.setState({
      isLoading: false,
      data: data,
    }, () => {
      setTimeout(() => {
        this.iscroll && this.iscroll.refresh();
      }, 200);
      this.renderCallback();
    })
  }

  refreshIscroll = () => {
    this.iscroll && this.iscroll.refresh();
  }

  loadPanel = () => {
    const { loadContent, cache } = this.props;
    const { isLoading } = this.state;

    if(this.promise && !this.cacheData) {
      return;
    }

    if(cache && this.cacheData) {
      this.setState({
        isLoading: false,
        data: this.cacheData,
      }, () => {
        this.renderCallback()
      });
      return;
    }

    this.promise = loadContent(this.callback);
    if (this.promise) {
      this.promise.then(
        (data) => this.callback(null, data),
        (err) => this.callback(err)
      );
    }
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
    }
  }

  render() {
    const { isLoading, data } = this.state;
    const { renderLoading, render } = this.props;
    let content = null;
    if(isLoading) {
      content = renderLoading();
    } else {
      content = render(data);
    }
    return (
      <Panel {...this.props} myIscroll={this.myIscroll} loadMore={this.loadMore} panelRef={this.props.panelRef}>
        {content}
      </Panel>
    )
  }
}