import React from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;
const GetCountries = () => {
  const countries = useSelector((state) => state.applicationForm.countries);
  return countries.map((country) => {
    return (
      <Option key={country} value={country}>
        {country}
      </Option>
    );
  });
};
const GetAcademicStandings = () => {
  const academicStandings = useSelector(
    (state) => state.applicationForm.academicStandings
  );
  return academicStandings.map((academicStanding) => {
    return (
      <Option key={academicStanding} value={academicStanding}>
        {academicStanding}
      </Option>
    );
  });
};
const GetUniversities = () => {
  const universities = useSelector(
    (state) => state.universities.availableUniversities
  );
  if (universities) {
    return universities.map((university) => {
      return (
        <Option key={university.code} value={university.code}>
          {university.name}
        </Option>
      );
    });
  }
};
const GetUniversityMajors = () => {
  const universityMajors = useSelector(
    (state) => state.universities.availableUniversityMajors
  );

  return universityMajors.map((universityMajor) => {
    return (
      <Option key={universityMajor.code} value={universityMajor.code}>
        {universityMajor.name}
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
      labelCol={{
        sm: {
          span: 4,
        },
      }}
      labelAlign="left"
    >
      <Form.Item
        name="universityName"
        label="Name of University"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select your university" allowClear>
          {GetUniversities()}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.universityName !== currentValues.universityName
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('universityName') === 'other' ? (
            <Form.Item
              name="otherUniversity"
              label="If 'other', state name of university"
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        name="universityCountry"
        label="Country of University"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select allowClear>{GetCountries()}</Select>
      </Form.Item>

      <Form.Item
        name="highSchoolName"
        label="Name of High School"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="universityMajor"
        label="University Major"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select allowClear>{GetUniversityMajors()}</Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.universityMajor !== currentValues.universityMajor
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('universityMajor') === 'other' ? (
            <Form.Item
              name="otherUniversityMajor"
              label="If 'other', state university major"
            >
              <Input />
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
        <Select allowClear>{GetAcademicStandings()}</Select>
      </Form.Item>
      <Form.Item
        name="cgpa"
        label="CGPA"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
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
        <Input type="date" />
      </Form.Item>
    </Form>
  );
};
