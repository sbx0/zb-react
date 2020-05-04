import {Avatar, Card, Col, List, Skeleton, Row, Statistic, Button} from 'antd';
import React, {Component} from 'react';
import {Link} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import moment from 'moment';
import Radar from './components/Radar';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import {serverConfig} from '@/utils/request';

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

const PageHeaderContent = ({currentUser}) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={serverConfig + currentUser.avatar}/>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          你好，
          {currentUser.name}
        </div>
        <div>
          祝你开心每一天！
        </div>
      </div>
    </div>
  );
};

const ExtraContent = ({wallet}) => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="余额" value={wallet}/>
    </div>
    {/*<div className={styles.statItem}>*/}
    {/*  <Statistic title="成果数" value={8} suffix="/ 1"/>*/}
    {/*</div>*/}
    {/*<div className={styles.statItem}>*/}
    {/*  <Statistic title="需求数" value={0}/>*/}
    {/*</div>*/}
  </div>
);

class DashboardWorkplace extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'userAndDashboardWorkplace/init',
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'userAndDashboardWorkplace/clear',
    });
  }

  renderActivities = item => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={serverConfig + item.user.avatar}/>}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const {
      projects = [],
      mys = [],
      applicants = [],
      ings = [],
      regs = [],
      currentUser,
      wallet,
      activities,
      projectNotice,
      mysLoading,
      applicantsLoading,
      ingsLoading,
      regsLoading,
      projectLoading,
      activitiesLoading,
      radarData,
    } = this.props;

    if (!currentUser || !currentUser.userid) {
      return null;
    }

    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser}/>}
        extraContent={<ExtraContent wallet={wallet}/>}
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="收到的申请"
              bordered={false}
              loading={mysLoading}
            >
              <List
                itemLayout="horizontal"
                dataSource={mys}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        onClick={() => {
                          const {dispatch} = this.props;
                          dispatch({
                            type: 'userAndDashboardWorkplace/getHandleProject',
                            payload: {
                              id: item.id,
                              type: 1
                            }
                          });
                        }}
                      >允许</a>,
                      <a
                        onClick={() => {
                          const {dispatch} = this.props;
                          dispatch({
                            type: 'userAndDashboardWorkplace/getHandleProject',
                            payload: {
                              id: item.id,
                              type: 2
                            }
                          });
                        }}
                      >拒绝</a>
                    ]}
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                      title={<a>申请项目《{item.name}》</a>}
                      description={'申请费' + item.quote + '元'}
                    />
                    <div>{moment(item.createTime).fromNow()}</div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="发出的申请"
              bordered={false}
              loading={applicantsLoading}
            >
              <List
                itemLayout="horizontal"
                dataSource={applicants}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        onClick={() => {
                          const {dispatch} = this.props;
                          dispatch({
                            type: 'userAndDashboardWorkplace/getHandleProject',
                            payload: {
                              id: item.id,
                              type: 3
                            }
                          });
                        }}
                      >取消</a>
                    ]}
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                      title={<a>申请费 {item.quote} 元 申请项目《{item.name}》</a>}
                      description={item.context}
                    />
                    <div>{moment(item.createTime).fromNow()}</div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="合作中"
              bordered={false}
              loading={ingsLoading}
            >
              <List
                itemLayout="horizontal"
                dataSource={ings}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        onClick={() => {
                          const {dispatch} = this.props;
                          dispatch({
                            type: 'userAndDashboardWorkplace/getHandleProject',
                            payload: {
                              id: item.id,
                              type: 3
                            }
                          });
                        }}
                      >结束</a>
                    ]}
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                      title={<a>申请费 {item.quote} 元 申请项目《{item.name}》</a>}
                      description={item.context}
                    />
                    <div>{moment(item.createTime).fromNow()}</div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="被拒绝"
              bordered={false}
              loading={regsLoading}
            >
              <List
                itemLayout="horizontal"
                dataSource={regs}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        onClick={() => {
                          const {dispatch} = this.props;
                          dispatch({
                            type: 'userAndDashboardWorkplace/getHandleProject',
                            payload: {
                              id: item.id,
                              type: 3
                            }
                          });
                        }}
                      >删除</a>
                    ]}
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                      title={<a>申请费 {item.quote} 元 申请项目《{item.name}》</a>}
                      description={item.context}
                    />
                    <div>{moment(item.createTime).fromNow()}</div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
     userAndDashboardWorkplace: {
       currentUser,
       projectNotice,
       activities,
       radarData,
       projects,
       mys,
       applicants,
       ings,
       regs,
       wallet
     },
     loading,
   }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    projects,
    mys,
    applicants,
    ings,
    regs,
    wallet,
    mysLoading: loading.effects['userAndDashboardWorkplace/fetchMyList'],
    applicantsLoading: loading.effects['userAndDashboardWorkplace/fetchApplicantList'],
    ingsLoading: loading.effects['userAndDashboardWorkplace/fetchIngList'],
    regsLoading: loading.effects['userAndDashboardWorkplace/fetchRegList'],
    currentUserLoading: loading.effects['userAndDashboardWorkplace/fetchUserCurrent'],
    projectLoading: loading.effects['userAndDashboardWorkplace/fetchProjectList'],
    activitiesLoading: loading.effects['userAndDashboardWorkplace/fetchActivitiesList']
  }),
)(DashboardWorkplace);
