import React from 'react';
import type {StackScreenProps} from '@react-navigation/stack';

import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import ImageCarousel from '@/components/common/ImageCarousel';
import useDetailPostStore from '@/store/useDetailPostStore';
import {feedNavigations} from '@/constants';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

function ImageZoomScreen({route}: ImageZoomScreenProps) {
  const {index: pressedIndex} = route.params;
  const {detailPost} = useDetailPostStore();

  return (
    <ImageCarousel
      images={detailPost?.images ?? []}
      pressedIndex={pressedIndex}
    />
  );
}

export default ImageZoomScreen;
