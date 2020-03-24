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
    <div className={styles.statItem}>
      <Statistic title="成果数" value={8} suffix="/ 1"/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="需求数" value={0}/>
    </div>
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
      currentUser,
      wallet,
      activities,
      projectNotice,
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
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="发出的申请"
              bordered={false}
              extra={<Link to="/">全部申请</Link>}
              loading={projectLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              {projects.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Link to={item.id}>申请费 {item.quote} 元 申请项目《{item.name}》</Link>
                        </div>
                      }
                      description={item.context}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{'申请人' + item.applicantId}</Link>
                      {item.createTime && (
                        <span className={styles.datetime} title={item.createTime}>
                          {moment(item.createTime).fromNow()}
                        </span>
                      )}
                    </div>
                    <div>
                      <Button
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
                      >允许</Button>
                      <Button
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
                      >驳回</Button>
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="申请"
              bordered={false}
              extra={<Link to="/">全部申请</Link>}
              loading={projectLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              {projects.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Link to={item.id}>申请费 {item.quote} 元 申请项目《{item.name}》</Link>
                        </div>
                      }
                      description={item.context}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{'申请人' + item.applicantId}</Link>
                      {item.createTime && (
                        <span className={styles.datetime} title={item.createTime}>
                          {moment(item.createTime).fromNow()}
                        </span>
                      )}
                    </div>
                    <div>
                      <Button
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
                      >允许</Button>
                      <Button
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
                      >驳回</Button>
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              {projects.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Link to={item.id}>申请费 {item.quote} 元 申请项目《{item.name}》</Link>
                        </div>
                      }
                      description={item.context}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{'申请人' + item.applicantId}</Link>
                      {item.createTime && (
                        <span className={styles.datetime} title={item.createTime}>
                          {moment(item.createTime).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
     userAndDashboardWorkplace: {currentUser, projectNotice, activities, radarData, projects, wallet},
     loading,
   }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    projects,
    wallet,
    currentUserLoading: loading.effects['userAndDashboardWorkplace/fetchUserCurrent'],
    projectLoading: loading.effects['userAndDashboardWorkplace/fetchProjectList'],
    activitiesLoading: loading.effects['userAndDashboardWorkplace/fetchActivitiesList'],
  }),
)(DashboardWorkplace);
