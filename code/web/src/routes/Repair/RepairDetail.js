import React, {Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
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

  constructor(p) {
    super(p)
    this.state = {
      imageVisible: false,
      imageSrc: null
    }
  }

  componentDidMount() {
    const {dispatch,match} = this.props;
    // dispatch({
    //   type: 'repair/fetchDetail',
    //   payload:{
    //     repairId:match.params.repairId
    //   }
    // });
  }



  shouldComponentUpdate(nextProps, nextState){
    const {dispatch,match:{params:{repairId}}} = this.props;
    const {match:{params:{repairId:NextRepairId}}} = nextProps;
    if (NextRepairId && NextRepairId!==repairId){
      // dispatch({
      //   type: 'repair/fetchDetail',
      //   payload:{repairId:NextRepairId}
      // });
      return true
    }
    return true

  }

  showImage(image) {
    this.setState({
      imageVisible: true,
      imageSrc: image
    })
  }

  hideImage() {
    this.setState({
      imageVisible: false
    })
  }



  render() {

    const {repair, loading,match} = this.props;
    const { repairId} = match.params;


    return (
      <PageHeaderLayout title="">

        <Card bordered={false} style={{position:"relative"}}>
          <Timeline>
            <Timeline.Item>创建报修 2015-09-01</Timeline.Item>
            <Timeline.Item>初步排除异常 2015-09-01</Timeline.Item>
            <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
            <Timeline.Item>异常正在修复 2015-09-01</Timeline.Item>
            <Timeline.Item>修复完成 2015-09-02</Timeline.Item>
          </Timeline>

        </Card>

        <Modal
          title=""
          visible={this.state.imageVisible}
          onCancel={this.hideImage.bind(this)}
          footer={null}
          width={500}
          bodyStyle={{
            background: 'none',
            padding: 0,
            textAlign: 'center'
          }}
          style={{
            background: 'none',
          }}
        >
          <img style={
            {
              width: "80%"
            }
          } src={this.state.imageSrc} onClick={this.hideImage.bind(this)} alt=""/>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
