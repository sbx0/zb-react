import React, {useEffect, useState} from 'react';
import {Card, Col, Form, List, Row, Select, Typography} from 'antd';
import {connect} from "dva";
import TagSelect from "@/pages/ListSearchProjects/components/TagSelect";
import StandardFormRow from "@/pages/ListSearchProjects/components/StandardFormRow";

const FormItem = Form.Item;

const ClassificationOptions = (
  {
    dispatch,
    technicalRequirementsListModel: {
      technicalClassificationFatherList = [],
      technicalClassificationSonList = []
    }, loading
  }) => {
  const [fatherIds, setFatherIds] = useState([]);
  useEffect(() => {
    dispatch({
      type: 'technicalRequirementsListModel/technicalClassificationFather',
      payload: {},
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'technicalRequirementsListModel/technicalClassificationSons',
      payload: {
        fatherIds: fatherIds
      },
    });
  }, [fatherIds]);

  return (
    <>
      <StandardFormRow
        title="所属大类"
        block
        style={{
          paddingBottom: 11,
        }}
      >
        <FormItem name="classificationFather" getValueFromEvent={(values) => {
          setFatherIds(values);
          return values;
        }}>
          <TagSelect expandable>
            {
              technicalClassificationFatherList.map((one, index) => (
                <TagSelect.Option key={'classificationFather' + index} value={one.value}>{one.name}</TagSelect.Option>))
            }
          </TagSelect>
        </FormItem>
      </StandardFormRow>
      {
        fatherIds.length > 0 ?
          <StandardFormRow
            title="所属小类"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <FormItem name="classificationSon">
              <TagSelect expandable>
                {
                  technicalClassificationSonList.map((one, index) => (
                    <TagSelect.Option key={'classificationSon' + index} value={one.value}>{one.name}</TagSelect.Option>))
                }
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          :
          <></>
      }
    </>
  );
}

export default connect(({technicalRequirementsListModel, loading}) => ({
  technicalRequirementsListModel,
  loading: loading.models.technicalRequirementsListModel,
}))(ClassificationOptions);