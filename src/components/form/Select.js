import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default (props) => {
  const { options, valKey, labelKey, label, ...rest } = props;
  let optionsArr = {};

  if (options)
    options.map((x) => {
      if (typeof x === 'object') optionsArr[x[valKey || 'id']] = x[labelKey || valKey || 'name'];
      else optionsArr[x] = x;
    });

  return (
    <FormControl variant="outlined">
      <InputLabel>{label || 'select'}</InputLabel>
      <Select {...rest}>
        <MenuItem value="" key={`none`}>
          <em>-SELECT-</em>
        </MenuItem>
        {Object.keys(optionsArr).map((x) => (
          <MenuItem value={x} key={x.toString()}>
            {optionsArr[x]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
