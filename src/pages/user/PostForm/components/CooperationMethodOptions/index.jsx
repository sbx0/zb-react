import React, {useEffect, useState} from 'react';
import {Card, Col, Form, List, Row, Select, Typography} from 'antd';
import {connect} from "dva";
import TagSelect from "@/pages/ListSearchProjects/components/TagSelect";
import StandardFormRow from "@/pages/ListSearchProjects/components/StandardFormRow";

const FormItem = Form.Item;

const CooperationMethodOptions = (
  {
    dispatch,
    userAndPostForm: {
      cooperationMethodList = [],
    }, loading
  }) => {

  const [fatherIds, setFatherIds] = useState([]);
  useEffect(() => {
    dispatch({
      type: 'userAndPostForm/cooperationMethod',
      payload: {},
    });
  }, []);

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
    <>
      <FormItem {...formItemLayout} label="合作方式" name="cooperationMethod">
        <Select
          placeholder="点击筛选"
          style={{
            maxWidth: 200,
            width: '100%',
          }}
        >
          {
            cooperationMethodList.map((one, index) => (
              <Option key={'cooperationMethod' + index} value={one.value}>{one.name}</Option>
            ))
          }
        </Select>
      </FormItem>
    </>
  );
}

export default connect(({userAndPostForm, loading}) => ({
  userAndPostForm,
  loading: loading.models.userAndPostForm,
}))(CooperationMethodOptions);
