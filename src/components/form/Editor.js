import React, { Component, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default ({ name, onChange, defaultValue, ...rest }) => {
  //const contentState = convertFromRaw(defaultValue);
  return (
    <Editor
      initialContentState={{
        entityMap: defaultValue && defaultValue.entityMap ? defaultValue.entityMap : {},
        blocks: defaultValue && defaultValue.blocks ? defaultValue.blocks : [],
      }}
      wrapperStyle={{ border: '1px solid #ccc' }}
      onContentStateChange={onChange}
    />
  );
};
