import React from 'react';
import PropTypes from 'prop-types';
import { shortnameToUnicode } from 'emojione';
import ReactHTMLParser from 'react-html-parser';
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
