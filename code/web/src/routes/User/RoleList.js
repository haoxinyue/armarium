import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import { Transfer } from 'antd';

import styles from './TableList.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

class SettingForm extends React.Component {
  state = {
    source: [],
    selections: [],
  };

  constructor(props) {
    super(props);
    this.okHandle = this.okHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterOption = this.filterOption.bind(this);
  }

  componentDidMount(props) {
    let selections = [];

    let source = [];
    (this.props.role.users || []).forEach(u => {
      source.push({
        key: u.userId,
        title: u.displayName || u.loginName,
      });
      if (u.isSelected) {
        selections.push(u.userId);
      }
    });

    this.setState({
      selections,
      source,
    });
  }

  componentWillUpdate(props) {
    let selections = [];

    let source = [];
    (this.props.role.users || []).forEach(u => {
      source.push({
        key: u.userId,
        title: u.displayName || u.loginName,
      });
      if (u.isSelected) {
        selections.push(u.userId);
      }
    });

    if (JSON.stringify(source) !== JSON.stringify(this.state.source)) {
      this.setState({
        source,
        selections,
      });
    }
  }

  okHandle() {
    this.props.handleSave(this.state.selections);
  }

  handleChange = targetKeys => {
    this.setState({
      selections: [].concat(targetKeys),
    });
  };

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };

  render() {
    const { role, modalVisible } = this.props;

    return (
      <Modal
        title={`设置角色【${role.roleName}】的用户`}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={this.props.handleModalVisible}
      >
        <Transfer
          dataSource={this.state.source}
          showSearch
          filterOption={this.filterOption}
          targetKeys={this.state.selections}
          titles={['待选', '已选']}
          onChange={this.handleChange}
          render={item => item.title}
        />
      </Modal>
    );
  }
}

@connect(({ role, user, loading }) => ({
  role,
  user,
  loading: loading.models['role/fetch'],
}))
@Form.create()
export default class RoleList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    settingModalVisible: false,
    currentSettingRole: {},
  };

  componentWillUpdate(props, prevProps) {
    let roleId = this.state.currentSettingRole.roleId;
    if (roleId && props.role && props.role && props.role.byIds[roleId]) {
      let prevUsers = JSON.stringify(this.state.currentSettingRole.users || []);
      let nowUsers = JSON.stringify(props.role.byIds[roleId].users || []);
      if (prevUsers !== nowUsers) {
        let currentSettingRole = Object.assign({}, this.state.currentSettingRole);
        currentSettingRole.users = props.role.byIds[roleId].users || [];
        this.setState({
          currentSettingRole,
        });
      }
    }
    return true;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'role/fetch',
      payload: params,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'role/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSettingModalVisible = flag => {
    console.log('handleSettingModalVisible flag :' + flag);
    this.setState({
      settingModalVisible: false,
    });
  };

  handleSaveSetting(data) {
    const { user = {} } = this.props;
    const currentUserId = user.currentUser && user.currentUser.userId;
    this.props
      .dispatch({
        type: 'role/setRoleUsers',
        payload: {
          roleId: this.state.currentSettingRole.roleId,
          users: data,
          creater: currentUserId,
        },
      })
      .then(
        () => {
          message.success('设置成功');
          this.setState({
            settingModalVisible: false,
          });
        },
        () => {
          message.success('设置失败，请稍后再试');
        }
      );
  }

  showSetting(role) {
    var deepClone = obj => {
      var proto = Object.getPrototypeOf(obj);
      return Object.assign({}, Object.create(proto), obj);
    };

    this.setState({
      currentSettingRole: deepClone(role),
      settingModalVisible: true,
    });

    this.props.dispatch({
      type: 'role/fetchRoleUsers',
      payload: {
        roleId: role.roleId,
      },
    });
  }

  render() {
    const { role, loading } = this.props;
    const { selectedRows, settingModalVisible, currentSettingRole } = this.state;

    let list = [];
    role.list.forEach(id => {
      list.push(role.byIds[id]);
    });
    list.sort((a, b) => a.roleId - b.roleId);
    let data = {
      list,
      pagination: role.pagination,
    };

    const columns = [
      {
        title: '角色ID',
        dataIndex: 'roleId',
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
      },
      {
        title: '操作',
        render: val => (
          <Fragment>
            <a onClick={this.showSetting.bind(this, val)}>设置</a>
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    const settingMethods = {
      handleSave: this.handleSaveSetting.bind(this),
      handleModalVisible: this.handleSettingModalVisible.bind(this),
    };

    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              rowKey={'RoleId'}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <SettingForm
          {...settingMethods}
          modalVisible={settingModalVisible}
          role={currentSettingRole}
        />
      </PageHeaderLayout>
    );
  }
}
