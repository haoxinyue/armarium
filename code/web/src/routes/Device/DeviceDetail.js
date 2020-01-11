import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Card, Badge, Table, Divider, Modal, Button, Tabs, Steps, Icon, Timeline} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Profile/BasicProfile.less';
import styles_1 from './DeviceDetail.less';

import {UsageStateNames, DeviceStateNames, AttachmentTypes} from '../../utils/constants';

import QRCode from 'qrcode.react';
import moment from 'moment';

const TabPane = Tabs.TabPane;

const Step = Steps.Step;

const {Description} = DescriptionList;

@connect(({device, loading}) => ({
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
    const {dispatch, match} = this.props;
    dispatch({
      type: 'device/fetchDetail',
      payload: {
        deviceId: match.params.deviceId,
      },
    });

    this.getLineView = this.getLineView.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {dispatch, match: {params: {deviceId}}} = this.props;
    const {match: {params: {deviceId: NextDeviceId}}} = nextProps;
    if (NextDeviceId && NextDeviceId !== deviceId) {
      dispatch({
        type: 'device/fetchDetail',
        payload: {deviceId: NextDeviceId},
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
    const {dispatch, match: {params: {deviceId}}} = this.props;
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
        <br/>
        {lineData.eventSubject}({lineData.respPersonName})
      </Timeline.Item>
    );
  }

  render() {
    const {device, loading, match} = this.props;
    const {deviceId} = match.params;

    let currentDetail = device.byIds[deviceId] || {};

    let imgStyle = {
      width: 150,
      maxHeight: 200,
      marginBottom: 20,
    };
    let btnEditStyle = {
      // position: 'absolute',
      right: 40,
      zIndex: 20,
      float: 'right',

      // top: 20,
    };

    const getAttachTypeName = function (type) {
      // ：1.用户手册 2.操作手册 3.维护手册 99.其他

      return AttachmentTypes[type] || '未知';
    };

    // currentDetail.accessories =[
    //   {
    //     name:"员工手册",
    //     typeName:getAttachTypeName(1),
    //     path:"http://www.baidu.com",
    //   },
    //   {
    //     name:"操作手册2",
    //     typeName:getAttachTypeName(2),
    //     path:"http://www.baidu.com",
    //   },
    // ]

    let qrCode = currentDetail.qRCode || (currentDetail.deviceId && `[${currentDetail.deviceId}]`);

    let hasImage =
      currentDetail.picture1 ||
      currentDetail.picture2 ||
      currentDetail.picture3 ||
      currentDetail.picture4 ||
      currentDetail.picture5;

    function formatDate(v) {
      if (v) {
        return moment(v).format('YYYY/MM/DD')
      }
    }

    currentDetail.nextInspectionDate = formatDate(currentDetail.nextInspectionDate);
    currentDetail.nextMaintenanceDate = formatDate(currentDetail.nextMaintenanceDate);
    currentDetail.nextMeteringDate = formatDate(currentDetail.nextMeteringDate);

    return (
      <PageHeaderLayout title="" className={'device-detail'}>
        <Button
          type="primary"
          title={'编辑'}
          shape="circle"
          icon="edit"
          onClick={this.goToEdit.bind(this)}
          style={btnEditStyle}
        />
        <Tabs defaultActiveKey="1" type="card1">
          <TabPane tab="基本信息" key="1">
            <Card bordered={false} style={{position: 'relative', padding: 0}}>
              <DescriptionList size="large" title="基本信息" style={{marginBottom: 32}}>
                <Description term="设备ID">{currentDetail.deviceId}</Description>
                <Description term="设备编号">{currentDetail.deviceCode}</Description>
                <Description term="设备名称">{currentDetail.deviceName}</Description>
                <Description term="设备类型">{currentDetail.deviceModel}</Description>
                <Description term="设备描述">{currentDetail.deviceDesc}</Description>
              </DescriptionList>

              <Divider style={{marginBottom: 32}}/>
              <DescriptionList size="large" title="状态" style={{marginBottom: 32}}>
                <Description term="设备状态">
                  {DeviceStateNames[currentDetail.deviceState]}
                </Description>
                <Description term="使用状态">
                  {UsageStateNames[currentDetail.usageState]}
                </Description>
              </DescriptionList>
              <Divider style={{marginBottom: 32}}/>
              <DescriptionList size="large" title="二维码" style={{marginBottom: 32}}>
                <Description term="">
                  {qrCode ? <QRCode size={150} value={qrCode}/> : '暂无'}
                </Description>
              </DescriptionList>

              <Divider style={{marginBottom: 32}}/>
              <DescriptionList size="large" title="部门信息" style={{marginBottom: 32}}>
                <Description term="所属医院">{currentDetail.hospital}</Description>
                <Description term="所属部门">{currentDetail.department}</Description>
              </DescriptionList>
              <Divider style={{marginBottom: 32}}/>
            </Card>
            <Card bordered={false} style={{padding: 0}}>
              <DescriptionList size="large" title="条码信息" style={{marginBottom: 32}}>
                <Description term="设备编号">{currentDetail.deviceCode}</Description>
                <Description term="资产编号">{currentDetail.assetNo}</Description>
                <Description term="序列号">{currentDetail.serialNumber}</Description>
              </DescriptionList>

              <DescriptionList size="large" title="安装验收" style={{marginBottom: 32}}>
                <Description term="安装日期">{currentDetail.setupDate}</Description>
                <Description term="验收日期">{currentDetail.acceptDate}</Description>
                <Description term="验收评价">{currentDetail.acceptRemark}</Description>
                <Description term="验收清单">{currentDetail.acceptFile}</Description>
                <Description term="使用日期">{currentDetail.useDate}</Description>
              </DescriptionList>
              <Divider style={{marginBottom: 32}}/>

              <DescriptionList size="large" title="入库" style={{marginBottom: 32}}>
                <Description term="设备负责人">{currentDetail.deviceOwner}</Description>
                <Description term="采购金额">{currentDetail.purchaseAmount}</Description>
                <Description term="入库日期">{currentDetail.storageDate}</Description>
              </DescriptionList>
              <Divider style={{marginBottom: 32}}/>

              <DescriptionList size="large" title="保修" style={{marginBottom: 32}}>
                <Description term="保修期结束时间">{currentDetail.maintenanceEndDate}</Description>
                <Description term="合同开始时间">{currentDetail.warrantyBeginDate}</Description>
                <Description term="合同结束时间">{currentDetail.warrantyEndDate}</Description>
                <Description term="合同金额">{currentDetail.warrantyAmount}</Description>
                <br/>
                <Description term="合同内容">{currentDetail.warrantyContent}</Description>
              </DescriptionList>
              <Divider style={{marginBottom: 32}}/>

              <DescriptionList size="large" title="售后" style={{marginBottom: 32}}>
                <Description term="销售供应商名称">{currentDetail.salesSupplier}</Description>
                <Description term="销售供应商联系人">
                  {currentDetail.salesSupplierContact}
                </Description>
                <Description term="销售供应商电话">{currentDetail.salesSupplierPhone}</Description>
                <Description term="销售供应商描述">{currentDetail.salesSupplierDesc}</Description>
                <br/>
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
              <Divider style={{marginBottom: 32}}/>

              <DescriptionList size="large" title="其他信息" style={{marginBottom: 32}}>
                <Description term="设备厂家">{currentDetail.manufacturer}</Description>
                <Description term="设备产地">{currentDetail.producingPlace}</Description>
                <Description term="设备附件">{currentDetail.accessory}</Description>
              </DescriptionList>
            </Card>
          </TabPane>
          {/* <TabPane tab="资产信息" key="2">

          </TabPane>*/}
          <TabPane tab="图片信息" key="3">
            <Card bordered={false} style={{padding: 0}}>
              <DescriptionList size="large" title="图片" style={{marginBottom: 32}}>
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
            </Card>
          </TabPane>
          <TabPane tab="设备附件" key="4">
            <Card bordered={false} style={{padding: 0}}>
              {(currentDetail.accessories || []).map(att => (
                <DescriptionList
                  size="small"
                  title={getAttachTypeName(att.attachmentType)}
                  style={{marginBottom: 32}}
                >
                  <Description term="">
                    <a title={'点击下载'} href={att.filePath} target="_blank">
                      {att.attachmentName}（点击下载）
                    </a>
                  </Description>
                </DescriptionList>
              ))}
            </Card>
          </TabPane>
          <TabPane tab="检测设置" key="5">
            <Card bordered={false} style={{padding: 0}}>
              <DescriptionList size="large" title="强检设备" style={{marginBottom: 32}}>
                <Description term="是否需要">
                  {currentDetail.force_inspection == 1 ? '是' : '否'}
                </Description>
              </DescriptionList>
              <DescriptionList size="large" title="巡检" style={{marginBottom: 32}}>
                <Description term="是否需要">
                  {currentDetail.needInspection == 1 ? '是' : '否'}
                </Description>
                <Description term="开始时间">
                  {currentDetail.needInspection == 1
                    ? `${currentDetail.nextInspectionDate}`
                    : '-'}
                </Description>
                <Description term="巡检间隔">
                  {currentDetail.needInspection == 1
                    ? `${currentDetail.inspectionInterval}天`
                    : '无'}
                </Description>
              </DescriptionList>
              <DescriptionList size="large" title="保养" style={{marginBottom: 32}}>
                <Description term="是否需要">
                  {currentDetail.needMaintain == 1 ? '是' : '否'}
                </Description>

                <Description term="开始时间">
                  {currentDetail.needMaintain == 1
                    ? `${currentDetail.nextMaintenanceDate}`
                    : '-'}
                </Description>
                <Description term="保养间隔">
                  {currentDetail.needMaintain == 1
                    ? `${currentDetail.maintenanceInterval}天`
                    : '无'}
                </Description>
              </DescriptionList>
              <DescriptionList size="large" title="计量" style={{marginBottom: 32}}>
                <Description term="是否需要">
                  {currentDetail.needMetering == 1 ? '是' : '否'}
                </Description>

                <Description term="开始时间">
                  {currentDetail.needMetering == 1
                    ? `${currentDetail.nextMeteringDate}`
                    : '-'}
                </Description>
                <Description term="计量间隔">
                  {currentDetail.needMetering == 1 ? `${currentDetail.meteringInterval}天` : '无'}
                </Description>
              </DescriptionList>
            </Card>
          </TabPane>
          <TabPane tab="历史记录" key="6">
            <Card bordered={false} style={{padding: 0}}>
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
