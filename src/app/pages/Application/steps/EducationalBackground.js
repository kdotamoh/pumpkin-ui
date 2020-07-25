import React from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;
const GetCountries = (disabled) => {
  const countries = useSelector((state) => state.applicationForm.countries);
  return countries.map((country) => {
    return (
      <Option key={country} value={country} disabled={disabled}>
        {country}
      </Option>
    );
  });
};
const GetAcademicStandings = (disabled) => {
  const academicStandings = useSelector(
    (state) => state.applicationForm.academicStandings
  );
  return academicStandings.map((academicStanding) => {
    return (
      <Option
        key={academicStanding}
        value={academicStanding}
        disabled={disabled}
      >
        {academicStanding.replace(/_/g, ' ')}
      </Option>
    );
  });
};
const GetUniversities = (disabled) => {
  const universities = useSelector((state) => state.universities.available);
  if (universities) {
    return universities.map((university) => {
      return (
        <Option
          key={university.code}
          value={university.code}
          disabled={disabled}
        >
          {university.name}
        </Option>
      );
    });
  }
};
const GetMajors = (disabled) => {
  const majors = useSelector((state) => state.majors.available);

  return majors.map((major) => {
    return (
      <Option key={major.code} value={major.code} disabled={disabled}>
        {major.name}
      </Option>
    );
  });
};
export const EducationalBackground = (params) => {
  return (
    <Form
      layout={params.layout}
      form={params.form}
      name="educational-background-form"
      size={params.size}
      onFinish={params.onFinish}
      labelCol={{
        sm: {
          span: 4,
        },
      }}
      labelAlign="left"
    >
      <Form.Item
        name="countryOfStudy"
        label="Country of University"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select allowClear>{GetCountries(params.disabled)}</Select>
      </Form.Item>
      <Form.Item
        name="universityCode"
        label="Name of University"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select your university" allowClear>
          {
            GetUniversities(params.disabled)
            // might have to append other
          }
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.universityName !== currentValues.universityName
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('universityName') === 'OTHER' ? (
            <Form.Item
              name="newUniversity"
              label="If 'other', state name of university"
            >
              <Input disabled={params.disabled} />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item
        name="highSchoolAttended"
        label="Name of High School"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={params.disabled} />
      </Form.Item>
      <Form.Item
        name="courseOfStudyCode"
        label="University Major"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select allowClear>{GetMajors(params.disabled)}</Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.universityMajor !== currentValues.universityMajor
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('courseOfStudyCode') === 'other' ? (
            <Form.Item
              name="newCourseOfStudy"
              label="If 'other', state university major"
            >
              <Input disabled={params.disabled} />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item
        name="academicStanding"
        label="Academic Standing"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select allowClear>{GetAcademicStandings(params.disabled)}</Select>
      </Form.Item>
      <Form.Item
        name="currentGPA"
        label="CGPA"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={params.disabled} />
      </Form.Item>
      <Form.Item
        name="graduationDate"
        label="Expected Graduation Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="date" disabled={params.disabled} />
      </Form.Item>
    </Form>
  );
};
