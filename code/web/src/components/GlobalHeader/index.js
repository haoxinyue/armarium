import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link ,routerRedux} from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  onNoticeItemClick(item){
    if (item.link){
      this.props.dispatch(routerRedux.push(item.link));
    }
  }

  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      notices = []
    } = this.props;
    const defaultAvatar = "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png";
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {/*<Menu.Item >*/}
          {/*<Icon type="user" />个人中心*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item >*/}
          {/*<Icon type="setting" />设置*/}
        {/*</Menu.Item>*/}
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
         {/* <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="搜索"
            dataSource={[]/*['搜索提示一', '搜索提示二', '搜索提示三']*!/
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />*/}
          {/*<Tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>*/}
          <NoticeIcon
            className={styles.action}
            count={notices.length}
            onItemClick={(item, tabProps) => {
              //console.log(item, tabProps); // eslint-disable-line
              this.onNoticeItemClick.bind(this)(item)

            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData['tongzhi']}
              title="通知"
              emptyText="暂无新通知"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['xiaoxi']}
              title="消息"
              emptyText="暂无新消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['daiban']}
              title="待办"
              emptyText="暂无待办事项"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>
          {currentUser.displayName ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar||defaultAvatar} />
                <span className={styles.name}>{currentUser.displayName}({currentUser.roleName})</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
