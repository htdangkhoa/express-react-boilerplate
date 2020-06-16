/* @flow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactMde from 'react-mde';
import { toast } from 'react-toastify';

import Layout from 'components/Layout';
import TagsInput from 'components/TagsInput';
import { makeEmojiHtml } from 'components/MdViewer';

import * as action from './action';

import './styles.scss';

const CreatePost = ({
  route: { title },
  createPost: { post, error },
  createPostAction,
  deleteLocalPostAction,
}) => {
  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }

    return () => {
      deleteLocalPostAction();
    };
  }, [error]);

  const [titlePost, setTitlePost] = useState('');

  const onTitlePostChange = ({ target: { value } }) => setTitlePost(value);

  const [description, setDescription] = useState('');

  const onDescriptionChange = ({ target: { value } }) => setDescription(value);

  const [tags, setTags] = useState([]);

  const onTagsInputChange = (values) => {
    if (values.length > 5) {
      setTags([...tags]);

      return;
    }

    setTags([...values]);
  };

  const [source, setSource] = useState('');

  const [selectedTab, setSelectedTab] = useState('write');

  const onInputChange = (value) => {
    setSource(value);
  };

  const onPublish = () => {
    createPostAction({
      title: titlePost,
      description,
      tags: tags.join(','),
      content: source,
    });
  };

  if (post) {
    return <Redirect to='/' />;
  }

  return (
    <Layout title={title} needLogin className='create__post__container'>
      <input
        className='form-control'
        placeholder='Title'
        value={titlePost}
        onChange={onTitlePostChange}
      />

      <input
        className='form-control'
        placeholder='Description'
        value={description}
        onChange={onDescriptionChange}
      />

      <TagsInput
        className='tags__group'
        inputClassName='tags__input'
        placeholder='Tag your post. Maximum 5 tags. At least 1 tag!'
        value={tags}
        onChange={onTagsInputChange}
        tagComponent={(tag, i) => (
          <div key={i} className='tag__item tag__input__item'>
            <span>{tag}</span>

            <button
              type='button'
              className='ml-1 close'
              aria-label='Close'
              onClick={() => {
                tags.splice(i, 1);

                setTags([...tags]);
              }}>
              <i className='fas fa-sm fa-times'></i>
            </button>
          </div>
        )}
      />

      <ReactMde
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        onChange={onInputChange}
        value={source}
        generateMarkdownPreview={async (markdown) => {
          const html = makeEmojiHtml(markdown);

          return html;
        }}
      />

      <button
        className='btn btn-block btn-primary btn-publish'
        onClick={onPublish}>
        Publish
      </button>
    </Layout>
  );
};

const mapStateToProps = ({ global, postReducer: { createPost } }) => ({
  global,
  createPost,
});

const mapDispatchToProps = {
  createPostAction: action.createPostAction,
  deleteLocalPostAction: action.deleteLocalPostAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
