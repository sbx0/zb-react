import React, {useEffect, useState} from 'react';
import {Card, Col, Form, List, Row, Select, Typography} from 'antd';
import {connect} from "dva";
import TagSelect from "@/pages/ListSearchProjects/components/TagSelect";
import StandardFormRow from "@/pages/ListSearchProjects/components/StandardFormRow";

const FormItem = Form.Item;

const AttributeOptions = (
  {
    dispatch,
    listSearchProjects: {
      attributeList = [],
    }, loading
  }) => {

  const [fatherIds, setFatherIds] = useState([]);
  useEffect(() => {
    dispatch({
      type: 'listSearchProjects/attribute',
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
      <FormItem {...formItemLayout} label="属性" name="attribute">
        <Select
          placeholder="点击选择"
          style={{
            maxWidth: 200,
            width: '100%',
          }}
        >
          {
            attributeList.map((one, index) => (
              <Option key={'attribute' + index} value={one.value}>{one.name}</Option>
            ))
          }
        </Select>
      </FormItem>
    </>
  );
}

export default connect(({listSearchProjects, loading}) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))(AttributeOptions);
