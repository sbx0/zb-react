import React, {useEffect, useState} from 'react';
import {Card, Col, Form, List, Row, Select, Typography} from 'antd';
import {connect} from "dva";
import TagSelect from "@/pages/ListSearchProjects/components/TagSelect";
import StandardFormRow from "@/pages/ListSearchProjects/components/StandardFormRow";

const FormItem = Form.Item;

const MaturityOptions = (
  {
    dispatch,
    technicalRequirementsPostModel: {
      maturityList = [],
    }, loading
  }) => {

  const [fatherIds, setFatherIds] = useState([]);
  useEffect(() => {
    dispatch({
      type: 'technicalRequirementsPostModel/maturity',
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
      <FormItem {...formItemLayout} label="成熟度" name="maturity">
        <Select
          placeholder="点击筛选"
          style={{
            maxWidth: 200,
            width: '100%',
          }}
        >
          {
            maturityList.map((one, index) => (
              <Option key={'maturity' + index} value={one.value}>{one.name}</Option>
            ))
          }
        </Select>
      </FormItem>
    </>
  );
}

export default connect(({technicalRequirementsPostModel, loading}) => ({
  technicalRequirementsPostModel,
  loading: loading.models.technicalRequirementsPostModel,
}))(MaturityOptions);
