import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = props => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;

  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'userAndAlipayStep/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'userAndAlipayStep/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: 'userAndAlipayStep/submitStepForm',
        payload: { ...data, ...values },
      });
    }
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{
        password: '123456',
      }}
    >
      <Alert
        closable
        showIcon
        message="确认充值后将会打开支付宝进行充值。"
        style={{
          marginBottom: 24,
        }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label="充值金额">
          <Statistic value={amount} suffix="元" />
        </Descriptions.Item>
      </Descriptions>
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Form.Item
        style={{
          marginBottom: 8,
        }}
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ userAndAlipayStep, loading }) => ({
  submitting: loading.effects['userAndAlipayStep/submitStepForm'],
  data: userAndAlipayStep.step,
}))(Step2);
