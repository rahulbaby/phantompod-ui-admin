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
        as={<FormInput label="Stripe product ID" />}
        name="productPriceId"
        control={control}
        defaultValue={row.productPriceId||""}
      />
      <Controller
        as={<FormInput label="Stripe product name" />}
        name="productName"
        control={control}
        defaultValue={row.productName||""}
      />
      <Controller
        as={<FormInput label="Product period (days)" />}
        name="productPeriod"
        control={control}
        defaultValue={row.productPeriod||""}
      />
      <br />
      <FormButton loading={loading} />
      <FormResult result={result} />
    </FormWrapper>
  );
};
export default UserForm
