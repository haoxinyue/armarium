/**
 * Created by Administrator on 2017/8/10.
 */
import React, {Component} from 'react'
import {List, Button, ImagePicker, Progress, Modal,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import $ from 'jquery';


import './listItem.less'
import api from "../../api";

import axios from '../../http'

const ListItem = List.Item;


class ImageUploadField extends Component {

    state = {
        files: [],
        fileValue: '',
        isLoading: false,
        progress: 0
    };

    componentDidMount() {
        const {value = ''} = this.props;

        this.setState({
            files: value ? value.split(',').map((v) => {
                return {url: v}
            }) : [],
            fileValue: value
        });

        this.onImageFileChange = this.onImageFileChange.bind(this);
        this.chooseImage = this.chooseImage.bind(this);
    }

    chooseImage(fromCamera) {
        if (navigator && navigator.camera) {
            const {onChange=()=>{}} = this.props;
            navigator.camera.getPicture(
                 (file) =>{
                    // console.log('Image URI: ' + file);
                    //  this.setState({
                    //      files: [
                    //          ...this.state.files,
                    //          {
                    //              url:`data:image/png;base64,${file}`
                    //          }
                    //      ]
                    //  });
                     this.setState({
                         isLoading: true,
                         progress:0
                     })
                     axios.http.uploadFile(api.baseUrl() + api.fileUpload,file).then((res)=>{
                         console.log("file path:"+res.data);
                         console.log(JSON.stringify(res))
                         this.setState({
                             isLoading:false,
                             files: [
                                 ...this.state.files,
                                 {
                                     url:res.data.data
                                 }
                             ],
                             fileValue:res.data.data
                         });
                         onChange(res.data.data)
                     },()=>{
                         Toast.fail('上传失败，请重试！', 1)
                         this.setState({
                             isLoading: false,
                             progress:0
                         })
                     }).onNotify((res)=>{
                         this.setState({
                             isLoading: true,
                             progress:Math.floor(res.percent*100)
                         })
                     });


                }, function (error) {
                    // console.log('Error: ' + error);
                }, {
                    quality: 80,
                    sourceType: fromCamera ? window.Camera.PictureSourceType.CAMERA : window.Camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: window.Camera.DestinationType.FILE_URI
                    // destinationType: window.Camera.DestinationType.DATA_URL
                }
            )
        }

    }

    onImageFileChange(files, type, index) {

        const {onChange} = this.props;

        let prevValue = this.state.fileValue;

        let fileValue = files ? files.map(f => f.url).join(',') : '';

        this.setState({
            files,
            fileValue
        });

        var lastFile = files.length ? files[files.length - 1] : null;

        $('input[type=file]', this.refs.uploadEl).val(lastFile);

        onChange && onChange(fileValue, prevValue);

    }


    render() {
        const defaultBtn = <Button ref="uploadEl" type="primary" size="small" inline>上传</Button>;
        const {mode = "image", fieldName, uploadButton = defaultBtn, fileLimit = 1} = this.props;

        let uploaderProps = {
            action: api.baseUrl() + api.fileUpload,
            // data: { a: 1, b: 2 },
            // headers: {
            //     Authorization: 'xxxxxxx',
            // },
            name: 'fileUpload',
            // headers:{
            //     'Content-type':'multipart/form-data'
            // },
            multiple: false,
            beforeUpload: (file) => {
                // console.log('beforeUpload', file.name);
            },
            onStart: (file) => {
                // console.log('onStart', file.name);
                // this.refs.inner.abort(file);
            },
            onSuccess: (res) => {

                this.setState({
                    loading: false,
                    files: [
                        ...this.state.files,
                        {
                            url: res.data
                        }
                    ]
                })
            },
            onProgress: (step, file) => {
                console.log('onProgress', Math.round(step.percent), file.name);
                this.setState({
                    loading: true,
                    progress: step.progress
                })
            },
            onError: (err) => {
                // console.log('onError', err);
                this.setState({
                    loading: false,
                    progress: 0
                })
            },
        };


        return (
            <div className={"yl-field-upload"}>
                {
                    fieldName && <input type="hidden" name={fieldName} value={this.state.fileValue}/>
                }


                <ImagePicker
                    style={{
                        "pointer-events":this.state.isLoading?"none":""
                    }}
                    files={this.state.files}
                    onChange={this.onImageFileChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < fileLimit}
                    onAddImageClick={(e) => {
                        e.preventDefault();

                        Modal.operation([
                            {
                                text: '相册', onPress: () => {
                                    this.chooseImage();
                                }
                            },
                            {
                                text: '拍摄', onPress: () => {
                                    this.chooseImage(true);
                                }
                            },
                        ])

                    }}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />


                {/* <Upload
                    ref={(el)=>{this.refs.uploadEl=el;}}
                    {...uploaderProps}
                    className={"am-flexbox am-flexbox-align-center"}
                    component="div"
                    style={{
                        display: this.state.files.length < fileLimit ? 'inline-block' : 'none'
                    }}
                >
                    {uploadButton}
                </Upload>*/}


                <ListItem style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Progress percent={this.state.progress} position="normal" unfilled={false}
                              appearTransition></Progress>
                </ListItem>

            </div>
        )
    }
}

export default ImageUploadField
