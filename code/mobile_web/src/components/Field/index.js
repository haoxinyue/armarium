/**
 * Created by zhouzechen on 2018/5/8.
 */

import {List, Input, Checkbox, Radio, Picker, DatePicker} from 'antd-mobile';

const {InputItem} = Input;
const {CheckboxItem} = Checkbox;
const {RadioItem} = Radio;


const Field = (props) => {

    /*
    * props:
    * {
    *   type: 'checkbox' ,
    *   name: '',
    *   initialValue:true,
    *   desc: '',
    *   options: {}
    * }
    * {
    *   type: 'text' ,
    *   name: '',
    *   initialValue:1,
    *   desc: '',
    *   options: {}
    * }
    * {
    *   type: 'date' ,
    *   name: '',
    *   initialValue:moment(),
    *   desc: '',
    *   options: {
    *       format:"YYYY/MM/DD"
    *   }
    * }
    * {
    *   type: 'select' ,
    *   name: '',
    *   desc: '',
    *   initialValue:1,
    *   options: {
    *       data:[
    *           {
    *               id:1,
    *               text:'t1'
    *           }
    *       ]
    *   }
    * }
    * */

    const {form, type, name, desc, initialValue, rules, options = {}} = props;
    const {getFieldProps, validateFields} = form;


    switch (type) {
        case 'text': {
            const fProps = getFieldProps(name, {
                initialValue,
                rules
            });
            return <InputItem
                {...fProps}
                placeholder={options.placeholder || `请输入${desc}`}
                extra={options.extra}>{desc}</InputItem>;
        }
        case 'checkbox':
            return <List renderHeader={() => desc}>
                {options.items && options.items.map(i => {
                    const fProps = getFieldProps(i.name, {
                        initialValue: i.initialValue,
                        rules:i.rules
                    });
                    return <CheckboxItem key={i.value} checked={fProps.value === i.value}
                                         onChange={() => fProps.onChange(i.value)}>
                        {i.label}
                    </CheckboxItem>
                })}
            </List>;
        case 'radio': {
            const fProps = getFieldProps(name, {
                initialValue,
                rules
            });
            return <List renderHeader={() => desc}>
                {options.items && options.items.map(i => (
                    <RadioItem key={i.value} checked={fProps.value === i.value}
                               onChange={() => fProps.onChange(i.value)}>
                        {i.label}
                    </RadioItem>
                ))}
            </List>;
        }
        case 'select': {
            const fProps = getFieldProps(name, {
                initialValue,
                rules
            });
            return <Picker
                {...fProps}
                data={options.data || []}
                title={`请选择${desc}`}
                cascade={false}
                extra={options.extra}
            >
                <List.Item arrow="horizontal">{desc}</List.Item>
            </Picker>
        }
        case 'date': {
            const fProps = getFieldProps(name, {
                initialValue,
                rules
            });
            return <DatePicker
                {...options}
                {...fProps}
            >
                <List.Item arrow="horizontal">{desc}</List.Item>
            </DatePicker>
        }
        default:
            return <div>未知类型</div>

    }


};

export default Field