import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import Layout from 'layouts/Main';
import { FormWrapper, FormInput, FormSelect, FormButton, FormResult } from 'components/form';
import { CustomButton } from 'components/common';
import { instance } from 'utils';
import { showMessage } from 'store/messages/actions';

const API = 'user';

const UserForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { register, control, handleSubmit, errors, reset } = useForm();

  const { row } = props;

  const onSubmit = (data) => {
    setLoading(true);
    setResult(null);
    let onEdit = row && row.id > 0;
    let successMessage = "success";
    instance({
      method: 'post',
      url:`user/reset-password` ,
      data,
    }).then((res) => {
      setLoading(false);
      setResult(res);
      if (!res.error) {
        reset();
        props.onSuccess && props.onSuccess();
        props.dispatch(showMessage(successMessage, 'success'));
      }
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={<FormInput label="Existing Password" type="password" />}
        name="oldPassword"
        control={control}
      />
      <Controller
        as={<FormInput label="New Password" type="password" />}
        name="newPassword"
        control={control}
      />
      <br />
      <FormButton loading={loading} />
      <FormResult result={result} />
    </FormWrapper>
  );
};

const mapStateToProps = ({ auth }) => ({
  row: auth.user,
});

export default connect(mapStateToProps)(UserForm);
