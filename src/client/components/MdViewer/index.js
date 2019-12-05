import React from 'react';
import PropTypes from 'prop-types';
import { shortnameToUnicode } from 'emojione';
import ReactHTMLParser from 'react-html-parser';
import { Converter } from 'showdown';

const converter = new Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  omitExtraWLInCodeBlocks: true,
  smartIndentationFix: true,
});

converter.setFlavor('github');

const MdViewer = ({ source = '' }) => {
  return (
    <div className='mde-preview'>
      <div className='mde-preview-content'>
        <>{ReactHTMLParser(converter.makeHtml(shortnameToUnicode(source)))}</>
      </div>
    </div>
  );
};

MdViewer.propTypes = {
  source: PropTypes.string,
};

export { shortnameToUnicode, converter };

export default MdViewer;
