import {Card, Col, Form, List, Row, Select, Typography} from 'antd';
import React, {useEffect} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import ClassificationOptions from './components/ClassificationOptions';
import AddressOptions from './components/AddressOptions';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const {Option} = Select;
const FormItem = Form.Item;
const {Paragraph} = Typography;

const getKey = (id, index) => `${id}-${index}`;

const ListSearchProjects = (
  {
    dispatch,
    listSearchProjects: {
      list = [],
      classificationList = [],
    },
    loading
  }) => {
  useEffect(() => {
    dispatch({
      type: 'listSearchProjects/fetch',
      payload: {
        count: 8,
      },
    });
  }, []);
  const cardList = list && (
    <List
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 24,
        xl: 4,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover}/>}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph
                  className={styles.item}
                  ellipsis={{
                    rows: 2,
                  }}
                >
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={() => {
            // 表单项变化时请求数据
            // 模拟查询表单生效
            dispatch({
              type: 'listSearchProjects/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <AddressOptions/>
          <ClassificationOptions/>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="作者" name="author">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="lisa">王昭君</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="good">优秀</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default connect(({listSearchProjects, loading}) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))(ListSearchProjects);
