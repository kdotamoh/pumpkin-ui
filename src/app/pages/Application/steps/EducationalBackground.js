import React from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getApplicationFormUniversities } from 'app/store/actions/application-form-actions';

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
  const universities = useSelector(
    (state) => state.applicationForm.universities
  );
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
  const majors = useSelector((state) => state.applicationForm.majors);

  return majors.map((major) => {
    return (
      <Option key={major.code} value={major.code} disabled={disabled}>
        {major.name}
      </Option>
    );
  });
};

export const EducationalBackground = (params) => {
  const dispatch = useDispatch();
  return (
    <Form
      layout={params.layout}
      form={params.form}
      name="educational-background-form"
      size={params.size}
      onFinish={params.onFinish}
      // labelCol={{
      //   sm: {
      //     span: 4,
      //   },
      // }}
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
        <Select
          allowClear
          onSelect={(country) =>
            dispatch(getApplicationFormUniversities(country))
          }
        >
          {GetCountries(params.disabled)}
        </Select>
      </Form.Item>
      <Form.Item
        name="universityCode"
        label="Name of University"
        // rules={[
        //   {
        //     required: true,
        //   },
        // ]}
      >
        <Select placeholder="Select your university" allowClear>
          {
            GetUniversities(params.disabled)
            // might have to append other
          }
        </Select>
      </Form.Item>

      <small>
        If your university is not listed above, state the name of your school
        here. Otherwise, leave this field blank.
      </small>
      <Form.Item name="newUniversity">
        <Input disabled={params.disabled} />
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
        label="Name of Senior High School"
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
        name="gpa"
        label="GPA (eg: 3.4)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" step="0.01" min="0" disabled={params.disabled} />
      </Form.Item>
      <Form.Item
        name="out_of"
        label="Out of (eg: 4.0)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" step="0.01" min="0" disabled={params.disabled} />
      </Form.Item>

      <small>
        <span style={{ color: 'red' }}>
          Please use the calendar drop-down to the right.
        </span>
        <br />
        Choose an approximate date if you&apos;re unsure of your exact
        graduation date.
      </small>
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

      <Form.Item
        name="academicReference"
        label="Academic reference's name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={params.disabled} />
      </Form.Item>

      <Form.Item
        name="academicReferenceEmail"
        label="Academic reference's email address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="email" disabled={params.disabled} />
      </Form.Item>

      <small>Please include their country code (eg: 233243456789)</small>
      <Form.Item
        name="academicReferencePhone"
        label="Academic reference's phone number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" step="0.01" min="0" disabled={params.disabled} />
      </Form.Item>
    </Form>
  );
};
