import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Badge, Table, Divider, Modal, Button, Tabs, Steps, Icon, Timeline } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Profile/BasicProfile.less';
import styles_1 from './DeviceDetail.less';

import QRCode from 'qrcode.react';
import moment from 'moment';

const TabPane = Tabs.TabPane;

const Step = Steps.Step;

const { Description } = DescriptionList;

@connect(({ device, loading }) => ({
  device,
  loading: loading.effects['device/fetchDetail'],
}))
export default class DeviceDetail extends Component {
  constructor(p) {
    super(p);
    this.state = {
      imageVisible: false,
      imageSrc: null,
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'device/fetchDetail',
      payload: {
        deviceId: match.params.deviceId,
      },
    });

    this.getLineView = this.getLineView.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, match: { params: { deviceId } } } = this.props;
    const { match: { params: { deviceId: NextDeviceId } } } = nextProps;
    if (NextDeviceId && NextDeviceId !== deviceId) {
      dispatch({
        type: 'device/fetchDetail',
        payload: { deviceId: NextDeviceId },
      });
      return true;
    }
    return true;
  }

  showImage(image) {
    this.setState({
      imageVisible: true,
      imageSrc: image,
    });
  }

  hideImage() {
    this.setState({
      imageVisible: false,
    });
  }

  goToEdit() {
    console.log('goToEdit');
    const { dispatch, match: { params: { deviceId } } } = this.props;
    dispatch(routerRedux.push('/device/device-edit/' + deviceId));
  }

  getLineView(lineData) {
    const colorMap = {
      '10': 'green',
      // "20":"",
      '30': 'gold',
      '40': 'blue',
      '50': 'purple',
      '60': 'red',
    };

    return (
      <Timeline.Item color={colorMap[lineData.eventType]}>
        {moment(lineData.eventTime).format('YYYY年MM月DD日')}
        <br />
        {lineData.eventSubject}({lineData.respPersonName})
      </Timeline.Item>
    );
  }

  render() {
    const { device, loading, match } = this.props;
    const { deviceId } = match.params;

    let currentDetail = device.byIds[deviceId] || {};

    let imgStyle = {
      width: 150,
      maxHeight: 200,
      marginBottom: 20,
    };
    let btnEditStyle = {
      position: 'absolute',
      right: 20,
      top: 20,
    };

    let qrCode = currentDetail.qRCode || (currentDetail.deviceId && `[${currentDetail.deviceId}]`);

    let hasImage =
      currentDetail.picture1 ||
      currentDetail.picture2 ||
      currentDetail.picture3 ||
      currentDetail.picture4 ||
      currentDetail.picture5;

    return (
      <PageHeaderLayout title="">
        <Tabs defaultActiveKey="1" type="card1">
          <TabPane tab="设备信息" key="1">
            <Card bordered={false} style={{ position: 'relative', padding: 0 }}>
              <Button
                type="primary"
                title={'编辑'}
                shape="circle"
                icon="edit"
                onClick={this.goToEdit.bind(this)}
                style={btnEditStyle}
              />

              <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
                <Description term="设备ID">{currentDetail.deviceId}</Description>
                <Description term="设备编号">{currentDetail.deviceCode}</Description>
                <Description term="设备名称">{currentDetail.deviceName}</Description>
                <Description term="设备类型">{currentDetail.deviceModel}</Description>
                <Description term="设备描述">{currentDetail.deviceDesc}</Description>
              </DescriptionList>

              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" title="图片" style={{ marginBottom: 32 }}>
                {!hasImage && <span>暂无</span>}

                {currentDetail.picture1 && (
                  <img
                    style={imgStyle}
                    src={currentDetail.picture1}
                    onClick={this.showImage.bind(this, currentDetail.picture1)}
                    alt=""
                  />
                )}
                {currentDetail.picture2 && (
                  <img
                    style={imgStyle}
                    src={currentDetail.picture2}
                    onClick={this.showImage.bind(this, currentDetail.picture2)}
                    alt=""
                  />
                )}
                {currentDetail.picture3 && (
                  <img
                    style={imgStyle}
                    src={currentDetail.picture3}
                    onClick={this.showImage.bind(this, currentDetail.picture3)}
                    alt=""
                  />
                )}
                {currentDetail.picture4 && (
                  <img
                    style={imgStyle}
                    src={currentDetail.picture4}
                    onClick={this.showImage.bind(this, currentDetail.picture4)}
                    alt=""
                  />
                )}
                {currentDetail.picture5 && (
                  <img
                    style={imgStyle}
                    src={currentDetail.picture5}
                    onClick={this.showImage.bind(this, currentDetail.Picture5)}
                    alt=""
                  />
                )}
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" title="状态" style={{ marginBottom: 32 }}>
                <Description term="设备状态">
                  {currentDetail.deviceState == '1' ? '正常' : '故障'}
                </Description>
                <Description term="使用状态">
                  {currentDetail.usageState == '1' ? '正常' : '故障'}
                </Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" title="二维码" style={{ marginBottom: 32 }}>
                <Description term="">
                  {qrCode ? <QRCode size={150} value={qrCode} /> : '暂无'}
                </Description>
              </DescriptionList>
              <DescriptionList size="large" title="条码信息" style={{ marginBottom: 32 }}>
                <Description term="设备编号">{currentDetail.deviceCode}</Description>
                <Description term="资产编号">{currentDetail.assetNo}</Description>
                <Description term="序列号">{currentDetail.serialNumber}</Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" title="部门信息" style={{ marginBottom: 32 }}>
                <Description term="所属医院">{currentDetail.hospital}</Description>
                <Description term="所属部门">{currentDetail.department}</Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />

              <DescriptionList size="large" title="安装验收" style={{ marginBottom: 32 }}>
                <Description term="安装日期">{currentDetail.setupDate}</Description>
                <Description term="验收日期">{currentDetail.acceptDate}</Description>
                <Description term="验收评价">{currentDetail.acceptRemark}</Description>
                <Description term="验收清单">{currentDetail.acceptFile}</Description>
                <Description term="使用日期">{currentDetail.useDate}</Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />

              <DescriptionList size="large" title="入库" style={{ marginBottom: 32 }}>
                <Description term="设备负责人">{currentDetail.deviceOwner}</Description>
                <Description term="采购金额">{currentDetail.purchaseAmount}</Description>
                <Description term="入库日期">{currentDetail.storageDate}</Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />

              <DescriptionList size="large" title="保修" style={{ marginBottom: 32 }}>
                <Description term="保修期结束时间">{currentDetail.maintenanceEndDate}</Description>
                <Description term="合同开始时间">{currentDetail.warrantyBeginDate}</Description>
                <Description term="合同结束时间">{currentDetail.warrantyEndDate}</Description>
                <Description term="合同金额">{currentDetail.warrantyAmount}</Description>
                <br />
                <Description term="合同内容">{currentDetail.warrantyContent}</Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />

              <DescriptionList size="large" title="售后" style={{ marginBottom: 32 }}>
                <Description term="销售供应商名称">{currentDetail.salesSupplier}</Description>
                <Description term="销售供应商联系人">
                  {currentDetail.salesSupplierContact}
                </Description>
                <Description term="销售供应商电话">{currentDetail.salesSupplierPhone}</Description>
                <Description term="销售供应商描述">{currentDetail.salesSupplierDesc}</Description>
                <br />
                <Description term="售后服务供应商名称">
                  {currentDetail.afterSaleProvider}
                </Description>
                <Description term="售后服务供应商工程师">
                  {currentDetail.afterSaleProviderEngineer}
                </Description>
                <Description term="售后服务供应商电话">
                  {currentDetail.afterSaleProviderPhone}
                </Description>
                <Description term="售后服务供应商描述">
                  {currentDetail.afterSaleProviderDesc}
                </Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />

              <DescriptionList size="large" title="其他信息" style={{ marginBottom: 32 }}>
                <Description term="设备厂家">{currentDetail.manufacturer}</Description>
                <Description term="设备产地">{currentDetail.producingPlace}</Description>
                <Description term="设备附件">{currentDetail.accessory}</Description>
              </DescriptionList>

            </Card>
          </TabPane>
          <TabPane tab="历史事件" key="2">
            <Card bordered={false} style={{ padding: 0 }}>
              <Timeline mode={'alternate'}>
                {currentDetail.timeline &&
                  currentDetail.timeline.map(lineData => this.getLineView(lineData))}
              </Timeline>
            </Card>
          </TabPane>
        </Tabs>

        <Modal
          title=""
          visible={this.state.imageVisible}
          onCancel={this.hideImage.bind(this)}
          footer={null}
          width={500}
          bodyStyle={{
            background: 'none',
            padding: 0,
            textAlign: 'center',
          }}
          style={{
            background: 'none',
          }}
        >
          <img
            style={{
              width: '80%',
            }}
            src={this.state.imageSrc}
            onClick={this.hideImage.bind(this)}
            alt=""
          />
        </Modal>
      </PageHeaderLayout>
    );
  }
}
