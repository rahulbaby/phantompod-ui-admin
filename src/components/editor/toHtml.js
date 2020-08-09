import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default (title) => {
  const contentState = convertFromRaw({
    entityMap: title.blocks || {},
    blocks: title.blocks || [],
  });
  const editorState = EditorState.createWithContent(contentState);
  let __html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  return <div dangerouslySetInnerHTML={{ __html }} />;
};
