import React, {useEffect} from 'react';
import {Card, Col, Form, List, Row, Select, Typography} from 'antd';
import {connect} from "dva";
import TagSelect from "@/pages/ListSearchProjects/components/TagSelect";
const FormItem = Form.Item;

const ClassificationOptions = ({dispatch, listSearchProjects: {classificationList = []}, loading}) => {
  useEffect(() => {
    dispatch({
      type: 'listSearchProjects/classification',
      payload: {},
    });
  }, []);

  return (<FormItem name="category">
    <TagSelect expandable>
      {
        classificationList.map((one, index) => (
          <TagSelect.Option key={'category' + index} value={one.value}>{one.name}</TagSelect.Option>))
      }
    </TagSelect>
  </FormItem>);
}

export default connect(({listSearchProjects, loading}) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))(ClassificationOptions);
