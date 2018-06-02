import React, {Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Card, Badge, Table, Divider, Modal,Button} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Profile/BasicProfile.less';

const {Description} = DescriptionList;


@connect(({user, loading}) => ({
  user,
  loading: loading.effects['user/fetchDetail'],
}))
export default class UserDetail extends Component {

  constructor(p) {
    super(p)
    this.state = {
      imageVisible: false,
      imageSrc: null
    }
  }

  componentDidMount() {
    const {dispatch,match} = this.props;
    dispatch({
      type: 'user/fetchDetail',
      payload:{
        userId:match.params.userId
      }
    });
  }



  shouldComponentUpdate(nextProps, nextState){
    const {dispatch,match:{params:{userId}}} = this.props;
    const {match:{params:{userId:NextUserId}}} = nextProps;
    if (NextUserId && NextUserId!==userId){
      dispatch({
        type: 'device/fetchDetail',
        payload:{userId:NextUserId}
      });
      return true
    }
    return false

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

  goToEdit(){
    const {match:{params:{userId}}} = this.props;
    routerRedux.push("/user/user-edit/"+userId)
  }

  render() {

    const {device, loading,match} = this.props;
    const { DeviceId} = match.params;

    let currentDetail = device.byIds[DeviceId] || {}

    let imgStyle = {
      width: 150,
      maxHeight: 200,
      marginBottom: 20
    }
    let btnEditStyle={
      position:"absolute",
      right:20,
      top:20,

    }

    return (
      <PageHeaderLayout title="">

        <Card bordered={false} style={{position:"relative"}}>
          <Button type="primary" title={"编辑"} shape="circle" icon="edit"
                  onClick={this.goToEdit.bind(this)}
                  style={btnEditStyle}/>

          <DescriptionList size="large" title="基本信息" style={{marginBottom: 32}}>
            <Description term="登录名">{currentDetail.loginName}</Description>
            <Description term="昵称">{currentDetail.displayName}</Description>
            <Description term="手机号">{currentDetail.mobile}</Description>
            <Description term="邮箱">{currentDetail.email}</Description>
          </DescriptionList>

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
