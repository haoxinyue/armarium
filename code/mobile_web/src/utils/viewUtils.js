import React from 'react'
import {
    List,
    Button,
    InputItem,
    TextareaItem,
    Toast,
    WingBlank,
    WhiteSpace,
    Tabs,
    ImagePicker,
    Picker,
    Switch
} from 'antd-mobile';

import UploadField from '../components/ImageUploadField';

const FieldSelector = props => (
    <div className="am-list-item am-input-item am-list-item-middle field-item" onClick={props.onClick}>
        <div className="am-list-line">
            <div className="am-input-label am-input-label-5">{props.children}</div>
            <div className="am-input-control"><span className="am-input-extra">{props.extra}</span></div>
        </div>
    </div>
);

export function getFieldEle(field, value) {

    const {
        onChange = () => {
        }
    } = field

    if (field.options && field.options.length) {
        return <Picker
            className="field-item"
            data={field.options}
            title={field.name}
            cascade={false}
            extra={field.desc}

            value={value}
            onChange={onChange.bind(field)}
        >
            <FieldSelector>{field.name}</FieldSelector>
        </Picker>
    } else if (field.type === "textArea") {
        return <TextareaItem
            className="field-item"
            type={field.type}
            rows={3}
            // labelNumber={labelLength}
            placeholder={field.desc}
            onChange={field.onChange.bind(field)}
            value={value}
        >{field.name}</TextareaItem>
    } else if (field.type === "imageUpload") {
        return <UploadField mode="image"
                            onChange={field.onChange.bind(field)}
                            value={value}/>;
    } else if (field.type === "fileUpload") {
        return <UploadField mode="file"
                            onChange={field.onChange.bind(field)}
                            value={value}/>;
    }


    return <InputItem
        className="field-item"
        type={field.type}
        placeholder={field.desc}
        onChange={onChange.bind(this, field)}
        value={value}
    >{field.name}</InputItem>
}
