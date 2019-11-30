import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import './styles.scss';

const TagsInput = ({
  className,
  inputClassName,
  placeholder = 'Enter your tag',
  value = [],
  tagComponent,
  onChange,
}) => {
  const [tags, setTags] = useState(value);

  const [val, setVal] = useState('');

  const onInputKeyDown = async ({ keyCode, target }) => {
    if (keyCode === 13 && target.value) {
      const newTags = [...tags, target.value];

      setTags(newTags);

      setVal('');

      onChange(newTags);
    }
  };

  const onInputChange = ({ target }) => setVal(target.value);

  return (
    <ul className={className}>
      {tags.map((tag, i) => tagComponent(tag, i))}

      <input
        className={inputClassName}
        placeholder={placeholder}
        value={val}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
      />
    </ul>
  );
};

TagsInput.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.array,
  tagComponent: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

export default TagsInput;
