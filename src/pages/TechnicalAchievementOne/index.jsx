import React, {useEffect, useState} from 'react';
import {Form, Carousel, Col, Row, Spin, List, Avatar, Button, Modal, InputNumber, Input} from 'antd';
import {connect} from 'dva';
import {Typography, Divider} from 'antd';
import styles from "@/pages/ListSearchProjects/style.less";
import moment from "moment";
import {MessageOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';
import UploadAvatar from "@/pages/user/PostForm/components/UploadAvatar";
import Link from "umi/link";

const {Title, Paragraph, Text} = Typography;

const TechnicalAchievementOne = ({
                                   achievement: {
                                     one,
                                     relative
                                   }, loading, location, dispatch
                                 }) => {

  const [visible, setVisible] = useState(false);
  const [payMoney, setPayMoney] = useState(100);
  const [payContext, setPayContext] = useState("");

  useEffect(() => {
    dispatch({
      type: 'achievement/getOne',
      payload: {
        id: location.query.id
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'achievement/getRelative',
      payload: {
        userId: 0,
        page: 1,
        size: 5,
        attribute: 'id',
        direction: 'DESC',
        addressId: location.query.addressId,
        classificationId: location.query.classificationId,
      }
    });
  }, []);


  const IconText = ({icon, text}) => (
    <span>
      {React.createElement(icon, {style: {marginRight: 8}})}
      {text}
    </span>
  );


  const handleOk = e => {
    console.log(e);
    dispatch({
      type: 'achievement/applyProject',
      payload: {
        id: one.id,
        quote: payMoney,
        context: payContext
      },
    });
    setVisible(false)
  };

  function onChange(value) {
    setPayMoney(value);
  }

  function onChangeContext(value) {
    setPayContext(value.target.value);
  }

  const handleCancel = e => {
    console.log(e);
    setVisible(false)
  };

  return loading ?
    <div style={{
      paddingTop: 100,
      textAlign: 'center',
    }}>
      <Spin size="large"/>
    </div>
    :
    <div>
      <Row gutter={16}>
        <Col xs={8}>
          <Carousel>
            <img alt={one.name} src={one.cover} width={100}/>
          </Carousel>
        </Col>
        <Col xs={16}>
          <Row>
            <Col xs={24}>
              <Title style={{
                textAlign: 'center',
              }}>
                {one.name}
              </Title>
            </Col>
            <Col xs={24}>
              <Row>
                <Col xs={6}>
                  <Title level={3} style={{
                    textAlign: 'center',
                  }}>
                    时间：{moment(one.postTime).fromNow()}
                  </Title>
                </Col>
                <Col xs={6}>
                  <Title level={3} style={{
                    textAlign: 'center',
                  }}>
                    成熟度：{one.maturity}
                  </Title>
                </Col>
                <Col xs={6}>
                  <Title level={3} style={{
                    textAlign: 'center',
                  }}>
                    合作方式：{one.cooperationMethod}
                  </Title>
                </Col>
                <Col xs={6}>
                  <Title level={2} style={{
                    textAlign: 'right',
                  }}>
                    预算：{one.price}￥
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Row>
                <Col xs={12}>
                  <Title level={3} style={{
                    textAlign: 'center',
                  }}>
                    地区：{one.addressId}
                  </Title>
                </Col>
                <Col xs={12}>
                  <Title level={3} style={{
                    textAlign: 'center',
                  }}>
                    分类：{one.classificationId}
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Paragraph style={{
                fontSize: '19px',
              }}>
                {one.context}
              </Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
      <Typography style={{
        paddingTop: '20px',
      }}>
        <Row style={{paddingTop: 50}}>
          <Col span={5}></Col>
          <Col span={14}>
            <Button
              size={'large'}
              block
              onClick={
                () => {
                  setVisible(true);
                }}
            >点击发送合作申请</Button>
            <Modal
              title="确认"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div style={{'textAlign': 'center'}}>
                <Paragraph style={{
                  fontSize: 18,
                }}>
                  你需要付款才能提交申请
                </Paragraph>
                <Paragraph style={{
                  fontSize: 15,
                }}>
                  只有申请被接受付款才会生效，否则将会在7天后退回您的账户。
                </Paragraph>
                <Paragraph style={{
                  fontSize: 15,
                }}>
                  金额：
                  <InputNumber min={100} max={one.price} defaultValue={3} onChange={onChange} block addonAfter="元"/>
                </Paragraph>
                <Input addonBefore={"留言"} onChange={onChangeContext}/>
              </div>
            </Modal>
          </Col>
          <Col span={5}></Col>
        </Row>
        <Row style={{paddingTop: 150}}>
          <Col span={2}></Col>
          <Col span={20}>
            <Paragraph style={{
              fontSize: '18px',
            }}>
              相似项目：
            </Paragraph>
          </Col>
          <Col span={2}></Col>
          <Col span={2}></Col>
          <Col span={20}>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={relative}
              renderItem={item => (
                item.id !== one.id ?
                  <List.Item
                    key={item.id}
                    onClick={
                      () => {
                        dispatch({
                          type: 'achievement/getOne',
                          payload: {
                            id: item.id
                          },
                        })
                      }
                    }
                  >
                    <List.Item.Meta
                      title={item.name}
                    />
                    {item.context.substr(0, 100) + '...'}
                  </List.Item>
                  : <></>
              )}
            />
          </Col>
          <Col span={2}></Col>
        </Row>
      </Typography>
    </div>
};

export default connect(({achievement, loading}) => ({
  achievement,
  loading: loading.models.achievement,
}))(TechnicalAchievementOne);
