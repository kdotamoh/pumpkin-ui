import React from 'react';
import PropTypes from 'prop-types';

export default function SummaryBadgeComponent(props) {
  /* eslint-disable default-case */
  const getBadgeColor = () => {
    switch (props.type) {
      case 'success': {
        return '#52c41a';
      }
      case 'warning': {
        return '#faad14';
      }
      case 'danger': {
        return '#ff4d4f';
      }
      case 'primary': {
        return '#1890ff';
      }
    }
  };
  /* eslint-enable default-case */

  const badgeStyle = {
    margin: 'auto',
    marginRight: 8,
    fontSize: 10,
    padding: '4px 12px',
    borderRadius: 20,
    backgroundColor: props.isActive ? '#fff' : getBadgeColor(),
    color: props.isActive ? '#000' : '#fff',
    opacity: props.isActive ? 1 : 0.8,
    fontWeight: 'bold',
  };

  const headerStyle = {
    border: '#d9d9d9 1px solid',
    display: 'flex',
    marginRight: 16,
    width: 200,
    height: 32,
    borderRadius: 2,
    backgroundColor: props.isActive ? '#294999' : '',
  };

  const titleStyle = {
    margin: 'auto',
    marginLeft: 8,
    fontSize: 12,
    color: props.isActive ? '#fff' : '',
  };

  return (
    <div style={headerStyle}>
      <span style={titleStyle}>{props.title}</span>
      <span style={badgeStyle}>{props.count}</span>
    </div>
  );
}

SummaryBadgeComponent.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};
