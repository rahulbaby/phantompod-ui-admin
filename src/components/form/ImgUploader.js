import React from 'react';
import { useDropzone } from 'react-dropzone';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import NativeSelect from '@material-ui/core/NativeSelect';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { EmptyList } from 'components/common';
import { getUploadImge } from 'utils/functions';

const UploadDiv = ({ label, children, ...rest }) => (
  <div {...rest} style={{ background: '#409fbd', border: '1px solid #ccc' }}>
    {children}
    <Button variant="text" color="primary" size="large" style={{ color: '#fff', margin: 20 }}>
      <CloudUploadIcon style={{ marginRight: 20 }} />
      {label}
    </Button>
    <Typography
      variant="caption"
      component="div"
      color="textSecondary"
      style={{ padding: 20, color: '#fff', paddingTop: 0 }}
    >
      Drag n drop / Click here to start uploading
    </Typography>
  </div>
);

const Thumbs = (props) => {
  const { files, onRemove, secondary, onSelect, selected } = props;
  const length = files.length;
  return (
    <Grid container spacing={8}>
      {length === 0 && (
        <Grid item xs={12}>
          {' '}
          <EmptyList />{' '}
        </Grid>
      )}
      {files.map((file, i) => (
        <Grid
          item
          xs={3}
          key={i}
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            backgroundColor:
              (selected && selected.name === file.name) || file.product_image_is_main == 1
                ? '#a8c3e0'
                : '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'flex-end',
            border: '1px solid #ccc',
          }}
        >
          <div>
            {file.preview && <img src={file.preview} style={{ width: '100%' }} />}
            {file.product_image_name && (
              <img
                src={getUploadImge(file.product_image_name, 'products')}
                style={{ width: '100%' }}
              />
            )}
            <IconButton onClick={() => onRemove(file)} style={{ color: 'red' }}>
              <DeleteIcon />
            </IconButton>
            {React.isValidElement(secondary) && React.cloneElement(secondary, { file })}
            {onSelect && (
              <Button size="small" onClick={() => onSelect(file)}>
                SELECT
              </Button>
            )}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.forwardRef((props, ref) => {
  const [files, setFiles] = React.useState([]);
  const [deleting, setDeleting] = React.useState([]);
  const [uploaded, setUploaded] = React.useState(props.uploaded || []);
  const [selected, setSelected] = React.useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => {
      setFiles(files);
      props.onDrop && props.onDrop(files);
    },
    onDrop: (files) => {
      let filesAdded = files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setFiles((filesExisting) => [...filesExisting, ...filesAdded]);
    },
  });

  React.useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  React.useImperativeHandle(ref, () => ({
    getData() {
      return { files, selected, deleting };
    },
  }));

  return (
    <React.Fragment>
      <UploadDiv {...getRootProps()} label={props.label}>
        <input {...getInputProps()} />
      </UploadDiv>
      <br />
      <Thumbs
        selected={selected}
        files={[...files, ...uploaded]}
        onRemove={(file) => {
          if (file.product_image_id) {
            setDeleting((deletingPrev) => [...deletingPrev, file.product_image_id]);
            setUploaded((uploadedPrev) =>
              uploadedPrev.filter((x) => x.product_image_id != file.product_image_id),
            );
          } else setFiles(files.filter((x) => x.preview !== file.preview));
        }}
        onSelect={(file) => {
          if (file.product_image_id) {
            setUploaded((uploadedPrev) => {
              let uploadedMod = uploadedPrev.map((x) => {
                x.product_image_is_main = file.product_image_id == x.product_image_id ? 1 : 0;
                return x;
              });
              return uploadedMod;
            });
          } else setSelected(file);
        }}
        secondary={null}
      />
    </React.Fragment>
  );
});
