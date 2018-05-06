/**
 * Created by Administrator on 2017/8/3.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Button,InputItem, Toast ,WingBlank,Tabs,ImagePicker} from 'antd-mobile';
import { changeHeaderRight} from '../../redux/actions'

import './device.less'



class DeviceEdit extends Component {

    state = {
        hasError: false,
        value: '',

        files:[]
    }

    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
        });
    }

    onFileChange = (files, type, index) => {
        // console.log(files, type, index);
        this.setState({
            files,
        });
    }

    save(){
        Toast.info('保存成功');
	}

    componentDidMount() {
		const {dispatch} = this.props;
		dispatch(changeHeaderRight([
			<Button key="0" size="small" type="primary"  onClick={this.save.bind(this)}>保存</Button>
		]))
    }

	render() {
        const tabs = [
            {title: '资产信息', sub: '1'},
            {title: '图片', sub: '2'}
        ];
        let labelLength = 4;



		return(
			<div className="device-edit">

				<Tabs
					tabs={tabs}
					className="detail-tab"
					initialPage={0}
					onChange={(tab, index) => {
                        // console.log('onChange', index, tab);
                    }}
					onTabClick={(tab, index) => {
                        // console.log('onTabClick', index, tab);
                    }}
					renderTab={tab => <span>{tab.title}</span>}
				>
					<div >
						<List className="field-list" renderHeader={() => '编辑'}>
							<WingBlank size="sm">
								<InputItem
									type="phone"
									labelNumber={labelLength}
									placeholder="请输入设备名称"
									error={this.state.hasError}
									onErrorClick={this.onErrorClick}
									onChange={this.onChange}
									value={this.state.value}
								>名称</InputItem>

								<InputItem
									type="phone"
									labelNumber={labelLength}
									placeholder="input your phone"
									error={this.state.hasError}
									onErrorClick={this.onErrorClick}
									value={this.state.value}
								>型号</InputItem>

								<InputItem
									type="phone"
									labelNumber={labelLength}
									placeholder="input your phone"
									error={this.state.hasError}
									onErrorClick={this.onErrorClick}
									value={this.state.value}
								>序列号</InputItem>

								<InputItem
									type="phone"
									labelNumber={labelLength}
									placeholder="input your phone"
									error={this.state.hasError}
									onErrorClick={this.onErrorClick}
									value={this.state.value}
								>品牌</InputItem>
							</WingBlank>

						</List>
					</div>
					<div>
						<List className="field-list" renderHeader={() => '编辑图片'}>
							<div className="block-list">
							<li>
								<div className="detail-block">

									{/*<div className="block-title">*/}
										{/*<span>设备图片</span>*/}
									{/*</div>*/}

									<div className="block-content">
										<ImagePicker
											files={this.state.files}
											onChange={this.onFileChange}
											onImageClick={(index, fs) => console.log(index, fs)}
											selectable={this.state.files.length<=3}
											accept="image/gif,image/jpeg,image/jpg,image/png"
										/>
									</div>
								</div>

							</li>
						</div>
						</List>
					</div>
				</Tabs>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { sidebarStatus } = state.app
	return {
		sidebarStatus
	}
}

export default connect(mapStateToProps)(DeviceEdit)