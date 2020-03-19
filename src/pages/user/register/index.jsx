import {AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined} from '@ant-design/icons';
import {Alert, Checkbox} from 'antd';
import React, {useState} from 'react';
import {Link} from 'umi';
import {connect} from 'dva';
import RegisterFrom from './components/Register';
import styles from './style.less';

const {Tab, Email, UserName, Password, Mobile, Captcha, Submit} = RegisterFrom;

const RegisterMessage = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Register = props => {
  const {userRegister = {}, submitting} = props;
  const {status, type: registerType} = userRegister;
  const [autoRegister, setAutoRegister] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = values => {
    const {dispatch} = props;
    dispatch({
      type: 'login/register',
      payload: {...values},
    });
  };

  return (
    <div className={styles.main}>
      <RegisterFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="邮箱注册">
          {status === 'error' && registerType === 'account' && !submitting && (
            <RegisterMessage content="账户或密码错误"/>
          )}
          <Email
            name="email"
            placeholder="邮箱"
            rules={[
              {
                required: true,
                message: '请输入邮箱!',
              },
            ]}
          />
          <UserName
            name="name"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号注册">
          {status === 'error' && registerType === 'mobile' && !submitting && (
            <RegisterMessage content="验证码错误"/>
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <Submit loading={submitting}>注册</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/login">
            已有账号
          </Link>
        </div>
      </RegisterFrom>
    </div>
  );
};

export default connect(({register, loading}) => ({
  userRegister: register,
  submitting: loading.effects['login/register'],
}))(Register);
