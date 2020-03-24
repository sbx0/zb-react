import React, {useEffect} from 'react';
import {Card, Carousel, Col, Row, Spin, List, Avatar, Button} from 'antd';
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
        <Col xs={6}></Col>
        <Col xs={12}>
          <Carousel>
            <img alt={one.name} src={one.cover} width={320}/>
          </Carousel>
        </Col>
        <Col xs={6}></Col>
      </Row>
      <Typography style={{
        paddingTop: '20px',
      }}>
        <Row>
          <Col span={24}>
            <Title style={{
              textAlign: 'center',
            }}>{one.name}</Title>
          </Col>
          <Col span={6}>
            <Paragraph style={{
              textAlign: 'center',
            }}>
              时间：{moment(one.postTime).fromNow()}
            </Paragraph>
          </Col>
          <Col span={6}>
            <Paragraph style={{
              textAlign: 'center',
            }}>
              预算：{one.price}￥
            </Paragraph>
          </Col>
          <Col span={6}>
            <Paragraph style={{
              textAlign: 'center',
            }}>
              成熟度：{one.maturity}
            </Paragraph>
          </Col>
          <Col span={6}>
            <Paragraph style={{
              textAlign: 'center',
            }}>
              合作方式：{one.cooperationMethod}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph style={{
              textAlign: 'center',
            }}>
              地区：{one.addressId}
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph style={{
              textAlign: 'center',
            }}>
              分类：{one.classificationId}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Paragraph style={{
              fontSize: '18px',
            }}>
              {one.context}
            </Paragraph>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row style={{paddingTop: 50}}>
          <Col span={5}></Col>
          <Col span={14}>
            <Button
              size={'large'}
              block
              onClick={
                () => {
                  dispatch({
                    type: 'achievement/applyProject',
                    payload: {
                      id: one.id
                    },
                  })
                }}
            >点击发送合作申请</Button>
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
