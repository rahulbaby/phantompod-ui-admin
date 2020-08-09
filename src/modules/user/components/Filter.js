import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import FormControl from '@material-ui/core/FormControl';

import { FormWrapper, FormInput, FormSelect, FormButton, FormResult } from 'components/form';
import { CustomButton } from 'components/common';
import { instance } from 'utils';

const API = 'user';

const UserForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { register, control, handleSubmit, errors, reset } = useForm();

  const { row } = props;

  const onSubmit = (data) => {
    let where = {};
    Object.keys(data).map((x) => {
      if (data[x]) where[x] = data[x];
    });
    props.onSuccess && props.onSuccess(where);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={<FormInput label="Email" />}
        name="email"
        control={control}
        defaultValue={row ? row.phone : ''}
      />

      <Controller
        as={<FormInput label="Name" />}
        name="name"
        control={control}
        defaultValue={row ? row.name : ''}
      />
      <Controller
        as={
          <FormSelect
            label="Status"
            options={Object.keys(props.statusRows).map(x=> props.statusRows[x] )}
            valKey={`statusId`}
            labelKey={`statusLabel`}
            style={{ width: 200 }}
          />
        }
        name="status"
        control={control}
        defaultValue={row ? row.status : ''}
      />

      <FormButton loading={loading} label="FILTER" size={`large`} />
    </FormWrapper>
  );
};

const mapStateToProps = ({ items }) => ({
  statusRows: items.rows.userAccountStatus,
});

export default connect(mapStateToProps)(UserForm);
