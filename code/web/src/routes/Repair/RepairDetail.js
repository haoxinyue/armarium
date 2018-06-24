import React, {Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import moment from "moment";
import {Card, Timeline, Divider, Modal,Button} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Profile/BasicProfile.less';

const {Description} = DescriptionList;

@connect(({repair, loading}) => ({
  repair,
  loading: loading.effects['repair/fetchDetail'],
}))
export default class RepairDetail extends Component {



  componentDidMount() {
    const {dispatch,match} = this.props;
    dispatch({
      type: 'repair/fetchDetail',
      payload:{
        caseId:match.params.caseId
      }
    });
  }



  shouldComponentUpdate(nextProps, nextState){
    const {dispatch,match:{params:{caseId}}} = this.props;
    const {match:{params:{caseId:NextCaseId}}} = nextProps;
    if (NextCaseId && NextCaseId!==caseId){
      dispatch({
        type: 'repair/fetchDetail',
        payload:{caseId:NextCaseId}
      });
      return true
    }
    return true

  }





  render() {

    const {repair,match} = this.props;
    const { caseId} = match.params;
    const info = repair.byIds[caseId]||{};
    const timeShaft = info.timeShaft||[];

    function getTimeLineItem(data) {

      let statusStr ="";
      switch (data.caseState){
        case 10:
          statusStr ="创建报修";
          break;
        case 20:
          statusStr ="取消报修";
          break;
        case 30:
          statusStr ="开始维修";
          break;
        case 40:
          statusStr ="完成维修";
          break;
        case 50:
          statusStr ="关闭工单";
          break;

      }

      let timeStr = moment(data.createTime).format("YYYY/MM/DD HH:mm:ss");

      return <Timeline.Item>{statusStr} - {timeStr} </Timeline.Item>
    }
    let pending = "";
    switch (info.caseState ){
      case 10:
        pending="等待分配中...";
        break;
      case 20:
        pending=false;
        break;
      case 30:
        pending="维修处理中...";
        break;
      case 40:
        pending="等待关闭中...";
        break;
      case 50:
        pending=false;
        break;
      default:
        pending=false;
        break;
    }

    return (
      <PageHeaderLayout title="">

        <Card bordered={false} style={{position:"relative"}}>
          <DescriptionList size="large" title="报修信息" style={{ marginBottom: 32 }}>
            <Description term="报修人">{info.reporterWeixin||info.reporterUserId}</Description>
            <Description term="设备名称">{info.deviceName}</Description>
            <Description term="所属医院">{info.hospital}</Description>
            <Description term="所属部门">{info.deptName}</Description>
            <Description term="备注">{info.caseRemark}</Description>
          </DescriptionList>
        </Card>

        <Card bordered={false} style={{position:"relative"}}>
          <DescriptionList size="large" title="进度信息" style={{ marginBottom: 32 }}>
          </DescriptionList>
          <Timeline pending={pending}>
            {
              timeShaft.map((d)=>getTimeLineItem(d))
            }
          </Timeline>
        </Card>

      </PageHeaderLayout>
    );
  }
}
