import React from 'react';
import PropTypes from 'prop-types';
import { toArray } from 'react-emoji-render';
import ReactMarkdown from 'react-markdown';

const parseEmojis = (value) => {
  const emojisArray = toArray(value);

  const newValue = emojisArray.reduce((previous, current) => {
    if (typeof current === 'string') {
      return previous + current;
    }
    return previous + current.props.children;
  }, '');

  return newValue;
};

export const MdPreview = ({ source }) => (
  <ReactMarkdown
    source={source}
    escapeHtml={false}
    renderers={{ text: ({ value }) => parseEmojis(value) }}
  />
);

const MdViewer = ({ source = '' }) => {
  return (
    <div className='mde-preview'>
      <div className='mde-preview-content'>
        <MdPreview source={source} />
      </div>
    </div>
  );
};

MdViewer.propTypes = {
  source: PropTypes.string,
};

export default MdViewer;
