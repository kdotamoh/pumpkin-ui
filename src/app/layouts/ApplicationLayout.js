import * as React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const { Content } = Layout;
export const ApplicationLayout = (props) => (
  <div>
    <Layout className="application-layout__container">
      <div className="application-layout__hero">Apply Now</div>
      <Content className="application-layout__content">
        {props.children}
      </Content>
    </Layout>
  </div>
);

ApplicationLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
