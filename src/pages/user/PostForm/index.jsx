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

const PostForm = props => {
  const {submitting} = props;
  const [form] = Form.useForm();
  const [file, setFile] = useState("https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png");
  const [price, setPrice] = useState(0.00);
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
    values.price = price
    dispatch({
      type: 'userAndPostForm/submitRegularForm',
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

  return (
    <PageHeaderWrapper content={<FormattedMessage id="发布成果"/>}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="发布成果"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <AddressOptions/>
          <ClassificationOptions/>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={5} md={10} sm={10} xs={24}>
                <MaturityOptions/>
              </Col>
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
            label={<FormattedMessage id="成果名称"/>}
            name="name"
            rules={[
              {
                required: true,
                message: formatMessage({
                  // id: 'userandpostform.title.required',
                  id: '请填写成果名称',
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
          {/*<FormItem*/}
          {/*  {...formItemLayout}*/}
          {/*  label={<FormattedMessage id="userandpostform.date.label" />}*/}
          {/*  name="date"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: formatMessage({*/}
          {/*        id: 'userandpostform.date.required',*/}
          {/*      }),*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*>*/}
          {/*  <RangePicker*/}
          {/*    style={{*/}
          {/*      width: '100%',*/}
          {/*    }}*/}
          {/*    placeholder={[*/}
          {/*      formatMessage({*/}
          {/*        id: 'userandpostform.placeholder.start',*/}
          {/*      }),*/}
          {/*      formatMessage({*/}
          {/*        id: 'userandpostform.placeholder.end',*/}
          {/*      }),*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</FormItem>*/}
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="简介"/>}
            name="context"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: '请简单的介绍一下你的成果',
                }),
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: '请简单的介绍一下你的成果',
              })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="价格"/>
                {/*<em className={styles.optional}>*/}
                {/*  <FormattedMessage id="userandpostform.form.optional" />*/}
                {/*</em>*/}
              </span>
            }
            name="price"
          >
            <InputNumber
              placeholder={formatMessage({
                id: 'userandpostform.weight.placeholder',
              })}
              min={0.00}
              max={9999999999999.00}
              step={0.01}
              onChange={(value) => setPrice(value)}
            />
            <span className="ant-form-text">￥</span>
          </FormItem>
          {/*<FormItem*/}
          {/*  {...formItemLayout}*/}
          {/*  label={<FormattedMessage id="userandpostform.public.label" />}*/}
          {/*  help={<FormattedMessage id="userandpostform.label.help" />}*/}
          {/*  name="publicType"*/}
          {/*>*/}
          {/*  <div>*/}
          {/*    <Radio.Group>*/}
          {/*      <Radio value="1">*/}
          {/*        <FormattedMessage id="userandpostform.radio.public" />*/}
          {/*      </Radio>*/}
          {/*      <Radio value="2">*/}
          {/*        <FormattedMessage id="userandpostform.radio.partially-public" />*/}
          {/*      </Radio>*/}
          {/*      <Radio value="3">*/}
          {/*        <FormattedMessage id="userandpostform.radio.private" />*/}
          {/*      </Radio>*/}
          {/*    </Radio.Group>*/}
          {/*    <FormItem*/}
          {/*      style={{*/}
          {/*        marginBottom: 0,*/}
          {/*      }}*/}
          {/*      name="publicUsers"*/}
          {/*    >*/}
          {/*      <Select*/}
          {/*        mode="multiple"*/}
          {/*        placeholder={formatMessage({*/}
          {/*          id: 'userandpostform.publicUsers.placeholder',*/}
          {/*        })}*/}
          {/*        style={{*/}
          {/*          margin: '8px 0',*/}
          {/*          display: showPublicUsers ? 'block' : 'none',*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        <Option value="1">*/}
          {/*          <FormattedMessage id="userandpostform.option.A" />*/}
          {/*        </Option>*/}
          {/*        <Option value="2">*/}
          {/*          <FormattedMessage id="userandpostform.option.B" />*/}
          {/*        </Option>*/}
          {/*        <Option value="3">*/}
          {/*          <FormattedMessage id="userandpostform.option.C" />*/}
          {/*        </Option>*/}
          {/*      </Select>*/}
          {/*    </FormItem>*/}
          {/*  </div>*/}
          {/*</FormItem>*/}
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="userandpostform.form.submit"/>
            </Button>
            {/*<Button*/}
            {/*  style={{*/}
            {/*    marginLeft: 8,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <FormattedMessage id="userandpostform.form.save" />*/}
            {/*</Button>*/}
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({loading}) => ({
  submitting: loading.effects['userAndPostForm/submitRegularForm'],
}))(PostForm);
