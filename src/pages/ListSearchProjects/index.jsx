import {
  Card,
  Col,
  Form,
  List,
  Row,
  Select,
  Typography
} from 'antd';
import React, {
  useEffect,
  useState
} from 'react';
import {
  connect
} from 'dva';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import ClassificationOptions from './components/ClassificationOptions';
import CooperationMethodOptions from './components/CooperationMethodOptions';
import AttributeOptions from './components/AttributeOptions';
import MaturityOptions from './components/MaturityOptions';
import AddressOptions from './components/AddressOptions';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import {
  Pagination
} from 'antd';
import Link from 'umi/link';

const {
  Option
} = Select;
const FormItem = Form.Item;
const {
  Paragraph
} = Typography;

const getKey = (id, index) => `${id}-${index}`;

const ListSearchProjects = ({
                              dispatch,
                              listSearchProjects: {
                                technicalAchievementsList = [],
                                classificationList = [],
                                total
                              },
                              loading
                            }) => {

  const [values, setValues] = useState({
    page: 1,
    size: 20,
    attribute: 'id',
    direction: 'DESC',
  });

  useEffect(() => {
    dispatch({
      type: 'listSearchProjects/fetch',
      payload: {
        values: values
      },
    });
  }, []);

  const cardList = technicalAchievementsList && (
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
      dataSource={technicalAchievementsList}
      renderItem={item => (
        <List.Item>
          <Link to={
            {
              pathname: '/achievement/one',
              query: {
                id: item.id,
                userId: item.userId,
                addressId: item.addressId,
                classificationId: item.classificationId
              }
            }
          }>
            <Card className={styles.card} hoverable cover={<img alt={item.name} src={item.cover}/>}>
              <Card.Meta
                title={<a>{item.name}</a>}
                description={
                  <Paragraph
                    className={styles.item}
                    ellipsis={{
                      rows: 2,
                    }}
                  >
                    {item.context.substr(0, 40).trim() + '...'}
                  </Paragraph>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.postTime).fromNow()}</span>
                <div className={styles.avatarList}>
                  <span>{item.price}￥</span>
                </div>
              </div>
            </Card>
          </Link>
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

  function onShowSizeChange(current, pageSize) {
    values.page = current;
    values.size = pageSize;
    setValues(values);
    dispatch({
      type: 'listSearchProjects/fetch',
      payload: {
        values: values
      },
    });
  }

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={(changedValues, allValues) => {
            dispatch({
              type: 'listSearchProjects/fetch',
              payload: {
                values: Object.assign(values, allValues)
              },
            });
          }}
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
              <Col lg={5} md={10} sm={10} xs={24}>
                <AttributeOptions/>
              </Col>
              <Col lg={5} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="方向" name="direction">
                  <Select
                    placeholder="请选择"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="DESC">降序</Option>
                    <Option value="ASC">升序</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
      <div>
        <Pagination
          showSizeChanger
          onChange={(page, pageSize) => {
            values.page = page;
            values.size = pageSize;
            setValues(values);
            dispatch({
              type: 'listSearchProjects/fetch',
              payload: {
                values: values
              },
            });
          }}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          current={values.page}
          defaultPageSize={values.size}
          total={total}
        />
      </div>
    </div>
  );
};

export default connect(({listSearchProjects, loading}) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))(ListSearchProjects);
