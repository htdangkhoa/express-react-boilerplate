/* @flow */
import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Row,
  Col,
} from 'reactstrap';
import ReactAutosizeTextarea from 'react-autosize-textarea';
import ReactMarkdown from 'react-markdown';
import CodeBlock from 'components/CodeBlock';
import styles from './styles.scss';

const CommentBox = () => {
  const [activeTab, setActiveTab] = useState('tab-write');

  const [source, setSource] = useState('');

  const onInputChange = (event) => {
    setSource(event.target.value);
  };

  const onChangeTab = (id: 'tab-write' | 'tab-preview') => setActiveTab(id);

  return (
    <div className={styles.commentBox}>
      <h5>Comments</h5>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === 'tab-write' ? 'active' : null}
            onClick={() => onChangeTab('tab-write')}>
            Write
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'tab-preview' ? 'active' : null}
            onClick={() => onChangeTab('tab-preview')}>
            Preview
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='tab-write'>
          <Row>
            <Col>
              <FormGroup>
                <ReactAutosizeTextarea
                  rows={5}
                  className='form-control'
                  placeholder='Write a response...'
                  onChange={onInputChange}
                  value={source}
                />
              </FormGroup>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId='tab-preview'>
          <ReactMarkdown source={source} renderers={{ code: CodeBlock }} />
        </TabPane>

        <button className='btn btn-primary'>Post Comment</button>
      </TabContent>
    </div>
  );
};

export default CommentBox;
