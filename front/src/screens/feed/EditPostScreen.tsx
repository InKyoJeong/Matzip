import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import PostForm from '@/components/post/PostForm';
import {feedNavigations} from '@/constants';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.EDIT_POST
>;

function EditPostScreen({route}: EditPostScreenProps) {
  const {location} = route.params;

  return <PostForm isEdit location={location} />;
}

export default EditPostScreen;
