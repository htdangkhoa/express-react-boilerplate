import React from 'react';
import PropTypes from 'prop-types';
import ReactHTMLParser from 'react-html-parser';
import { toArray } from 'react-emoji-render';
import { Converter } from 'showdown';

const converter = new Converter({
  omitExtraWLInCodeBlocks: true,
  noHeaderId: false,
  parseImgDimensions: true,
  simplifiedAutoLink: true,
  literalMidWordUnderscores: true,
  strikethrough: true,
  tables: true,
  tablesHeaderId: false,
  ghCodeBlocks: true,
  tasklists: true,
  smoothLivePreview: true,
  prefixHeaderId: false,
  disableForced4SpacesIndentedSublists: false,
  ghCompatibleHeaderId: true,
  smartIndentationFix: false,
});

converter.setFlavor('github');

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

const makeEmojiHtml = (source) => parseEmojis(converter.makeHtml(source));

const MdViewer = ({ source = '' }) => {
  return (
    <div className='mde-preview'>
      <div className='mde-preview-content'>
        <>{ReactHTMLParser(makeEmojiHtml(source))}</>
      </div>
    </div>
  );
};

MdViewer.propTypes = {
  source: PropTypes.string,
};

export { converter, makeEmojiHtml };

export default MdViewer;
