import React from 'react';
import PropTypes from 'prop-types';
import ReactSyntaxHighlighter from 'react-syntax-highlighter';
import github from 'react-syntax-highlighter/dist/cjs/styles/hljs/github';

const CodeBlock = ({ value, language }) => {
  return (
    <ReactSyntaxHighlighter language={language} style={github}>
      {value}
    </ReactSyntaxHighlighter>
  );
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};

export default CodeBlock;
