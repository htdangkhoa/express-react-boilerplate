import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Converter } from 'showdown';
import { toast } from 'react-toastify';

import Layout from 'components/Layout';
import TagsInput from 'components/TagsInput';

import * as action from './action';

import './styles.scss';

const converter = new Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  omitExtraWLInCodeBlocks: true,
});

const CreatePost = ({
  title,
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
        placeholder='Tag your post'
        value={tags}
        onChange={onTagsInputChange}
        tagComponent={(tag, i) => (
          <Link to={`/tags/${tag}`} key={i} className='tag__item'>
            {tag}
          </Link>
        )}
      />

      <ReactMde
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        onChange={onInputChange}
        value={source}
        generateMarkdownPreview={async (markdown) => {
          const html = await converter.makeHtml(markdown);

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePost);
