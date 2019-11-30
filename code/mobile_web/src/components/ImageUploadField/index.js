/**
 * Created by Administrator on 2017/8/10.
 */
import React, {Component} from 'react'
import {List, Button, ImagePicker, Progress, Modal, Toast} from 'antd-mobile'
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

    componentWillReceiveProps(nextProps, nextState) {
        const {value = ''} = this.props;
        const {value: nextValue = ''} = nextProps;
        if (value !== nextValue) {
            this.setState({
                files: nextValue ? nextValue.split(',').map((v) => {
                    return {url: v}
                }) : [],
                fileValue: nextValue
            });
        }

    }

    chooseImage(fromCamera) {
        if (navigator && navigator.camera) {
            const {
                onChange = () => {
                }
            } = this.props;
            navigator.camera.getPicture(
                (file) => {
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
                        progress: 0
                    })
                    axios.http.uploadFile(api.baseUrl() + api.fileUpload, file).then((res) => {
                        console.log("file path:" + res.data);
                        console.log(JSON.stringify(res))
                        this.setState({
                            isLoading: false,
                            files: [
                                ...this.state.files,
                                {
                                    url: res.data.data
                                }
                            ],
                            fileValue: res.data.data
                        });
                        onChange(res.data.data)
                    }, () => {
                        Toast.fail('上传失败，请重试！', 1)
                        this.setState({
                            isLoading: false,
                            progress: 0
                        })
                    }).onNotify((res) => {
                        this.setState({
                            isLoading: true,
                            progress: Math.floor(res.percent * 100)
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
        const {editable = true} = this.props;
        const defaultBtn = <Button ref="uploadEl" type="primary" size="small" inline>上传</Button>;
        const {mode = "image", fieldName, uploadButton = defaultBtn, fileLimit = 1} = this.props;


        return (
            <div className={"yl-field-upload"}>
                {
                    fieldName && <input type="hidden" name={fieldName} value={this.state.fileValue}/>
                }


                <ImagePicker
                    style={{
                        "pointer-events": this.state.isLoading ? "none" : ""
                    }}
                    files={this.state.files}
                    onChange={this.onImageFileChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={editable && this.state.files.length < fileLimit}
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


                <ListItem style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Progress percent={this.state.progress} position="normal" unfilled={false}
                              appearTransition></Progress>
                </ListItem>

            </div>
        )
    }
}

export default ImageUploadField
