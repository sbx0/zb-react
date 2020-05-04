import {InfoCircleOutlined} from '@ant-design/icons';
import {Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip, Row, Col} from 'antd';
import {FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import React, {useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import styles from './style.less';
import AddressOptions from "./components/AddressOptions";
import ClassificationOptions from "./components/ClassificationOptions";
import StandardFormRow from "./components/StandardFormRow";
import MaturityOptions from "./components/MaturityOptions";
import CooperationMethodOptions from "./components/CooperationMethodOptions";
import AttributeOptions from "./components/AttributeOptions";
import UploadAvatar from "@/pages/user/PostForm/components/UploadAvatar";
import {Carousel} from 'antd';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

const TechnicalRequirementsPost = props => {
  const {submitting} = props;
  const [form] = Form.useForm();
  const [file, setFile] = useState("https:\/\/gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png");
  const [budget, setBudget] = useState(0.00);
  const [upload, setUpload] = useState(false);
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const {dispatch} = props;
    values.cover = file
    values.budget = budget
    dispatch({
      type: 'technicalRequirementsPostModel/submitRegularForm',
      payload: {
        values,
      },
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = changedValues => {
    const {publicType} = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

  return (
    <PageHeaderWrapper content={<FormattedMessage id="发布需求"/>}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name={'发布需求'}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <AddressOptions/>
          <ClassificationOptions/>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={5} md={10} sm={10} xs={24}>
                <CooperationMethodOptions/>
              </Col>
            </Row>
          </StandardFormRow>
          <Row gutter={16}>
            <Col xs={6}></Col>
            <Col xs={12}>
              <Carousel>
                <img src={file} width={320}></img>
              </Carousel>
              {
                upload ?
                  <></>
                  :
                  <UploadAvatar file={file} setFile={setFile} setUpload={setUpload}/>
              }
            </Col>
            <Col xs={6}></Col>
          </Row>
          <FormItem
            {...formItemLayout}
            // label={<FormattedMessage id="userandpostform.title.label" />}
            label={<FormattedMessage id="需求名称"/>}
            name="name"
            rules={[
              {
                required: true,
                message: formatMessage({
                  // id: 'userandpostform.title.required',
                  id: '请填写需求名称',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: '简洁明了的名称能使你的成果脱颖而出',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="简介"/>}
            name={'context'}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: '请简单的介绍一下你的需求',
                }),
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: '请简单的介绍一下你的需求',
              })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id={'预算'}/>
              </span>
            }
            name="budget"
          >
            <InputNumber
              placeholder={formatMessage({
                id: 'userandpostform.weight.placeholder',
              })}
              min={0.00}
              max={9999999999999.00}
              step={0.01}
              onChange={(value) => setBudget(value)}
            />
            <span className="ant-form-text">￥</span>
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="userandpostform.form.submit"/>
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({loading}) => ({
  submitting: loading.effects['technicalRequirementsPostModel/submitRegularForm'],
}))(TechnicalRequirementsPost);
