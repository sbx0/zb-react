import React, {useEffect, useState} from 'react';
import {Card, Col, Form, List, Row, Select, Typography} from 'antd';
import {connect} from "dva";
import TagSelect from "@/pages/ListSearchProjects/components/TagSelect";
import StandardFormRow from "@/pages/ListSearchProjects/components/StandardFormRow";

const FormItem = Form.Item;

const AddressOptions = (
  {
    dispatch,
    userAndPostForm: {
      addressFatherList = [],
      addressSonList = []
    }, loading
  }) => {
  const [fatherIds, setFatherIds] = useState([]);
  useEffect(() => {
    dispatch({
      type: 'userAndPostForm/addressFather',
      payload: {},
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'userAndPostForm/addressSons',
      payload: {
        fatherIds: fatherIds
      },
    });
  }, [fatherIds]);

  return (
    <>
      <StandardFormRow
        title="省份"
        block
        style={{
          paddingBottom: 11,
        }}
      >
        <FormItem name="addressFather" getValueFromEvent={(values) => {
          setFatherIds(values);
          return values;
        }}>
          <TagSelect expandable>
            {
              addressFatherList.map((one, index) => (
                <TagSelect.Option key={'addressFather' + index} value={one.value}>{one.name}</TagSelect.Option>))
            }
          </TagSelect>
        </FormItem>
      </StandardFormRow>
      {
        fatherIds.length > 0 ?
          <StandardFormRow
            title="市区"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <FormItem name="addressSon">
              <TagSelect expandable>
                {
                  addressSonList.map((one, index) => (
                    <TagSelect.Option key={'addressSon' + index} value={one.value}>{one.name}</TagSelect.Option>))
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

export default connect(({userAndPostForm, loading}) => ({
  userAndPostForm,
  loading: loading.models.userAndPostForm,
}))(AddressOptions);
