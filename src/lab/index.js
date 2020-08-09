import React, { Component, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm, Controller } from 'react-hook-form';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const EditorComponent = () => <Editor />;

export default function App() {
  const [data, setData] = useState({});
  const { register, handleSubmit, watch, errors, control, setValue } = useForm();
  const onSubmit = (data) => setData(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <pre>{JSON.stringify(data)}</pre>
      <Controller
        as={
          <Editor
            wrapperStyle={{ border: '1px solid #ccc' }}
            onContentStateChange={(x) => setValue('HelloWorld', x)}
          />
        }
        name="HelloWorld"
        control={control}
        defaultValue=""
      />
      <input name="example" defaultValue="test" ref={register} />

      <input name="exampleRequired" ref={register} />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
