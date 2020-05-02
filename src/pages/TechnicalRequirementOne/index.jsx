import React, {useEffect} from 'react';
import {Card, Carousel, Col, Row, Spin, List, Avatar} from 'antd';
import {connect} from 'dva';
import {Typography, Divider} from 'antd';
import styles from "@/pages/ListSearchProjects/style.less";
import moment from "moment";
import {MessageOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';
import UploadAvatar from "@/pages/user/PostForm/components/UploadAvatar";
import Link from "umi/link";

const {Title, Paragraph, Text} = Typography;

const TechnicalAchievementOne = ({
                                   technicalRequirementsOneModel: {
                                     one,
                                     relative
                                   }, loading, location, dispatch
                                 }) => {

  useEffect(() => {
    dispatch({
      type: 'technicalRequirementsOneModel/getOne',
      payload: {
        id: location.query.id
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'technicalRequirementsOneModel/getRelative',
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
                    结束时间：{moment(one.endTime).fromNow()}
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
                    预算：{one.budget}￥
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
        <Row>
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
                <List.Item
                  key={item.id}
                  extra={
                    <img
                      width={272}
                      alt={item.name}
                      src={item.cover}
                      onClick={
                        () => {
                          dispatch({
                            type: 'technicalRequirementsOneModel/getOne',
                            payload: {
                              id: item.id
                            },
                          })
                        }
                      }
                    />
                  }
                >
                  <List.Item.Meta
                    title={item.name}
                  />
                  {item.context.substr(0,200)+'...'}
                </List.Item>
              )}
            />
          </Col>
          <Col span={2}></Col>
        </Row>
      </Typography>
    </div>
};

export default connect(({technicalRequirementsOneModel, loading}) => ({
  technicalRequirementsOneModel,
  loading: loading.models.technicalRequirementsOneModel,
}))(TechnicalAchievementOne);
