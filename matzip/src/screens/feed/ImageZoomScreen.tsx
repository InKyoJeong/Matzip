import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import useGetPost from '@/hooks/queries/useGetPost';
import {FeedStackParamList} from '@/types/navigation';
import ImageCarousel from '@/components/common/ImageCarousel';

type Props = StackScreenProps<FeedStackParamList, 'ImageZoom'>;

function ImageZoomScreen({route}: Props) {
  const {id, index} = route.params;
  const {data: post} = useGetPost(id);

  return <ImageCarousel images={post?.imageUris ?? []} pressedIndex={index} />;
}

export default ImageZoomScreen;
