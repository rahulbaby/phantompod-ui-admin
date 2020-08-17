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
  const { register, control, handleSubmit, errors, reset } = useForm(props.row);

  const { row } = props;

  const onSubmit = (data) => {
    setLoading(true);
    setResult(null);
    let successMessage = "success";
    instance({
      method: 'put',
      url:`settings/update` ,
      data,
    }).then((res) => {
      setLoading(false);
      setResult(res);
      if (!res.error) {
        reset();
        props.onSuccess && props.onSuccess();
      }
    });
  };


  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={<FormInput label="No. of days"   />}
        name="trialDayCount"
        control={control}
        defaultValue={row ? row.trialDayCount : ''}
      />
      <Controller
        as={<FormInput label="Pod count" />}
        name="trialPodCount"
        control={control}
        defaultValue={row ? row.trialPodCount : ''}
      />
      <br />
      <FormButton loading={loading} />
      <FormResult result={result} />
    </FormWrapper>
  );
};

export default UserForm
