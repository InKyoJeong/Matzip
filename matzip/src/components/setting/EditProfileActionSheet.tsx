import React from 'react';
import {ActionSheet} from '../common/ActionSheet';

interface EditProfileActionSheetProps {
  isVisible: boolean;
  onChangeImage: () => void;
  hideAction: () => void;
}

function EditProfileActionSheet({
  isVisible,
  onChangeImage,
  hideAction,
}: EditProfileActionSheetProps) {
  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={onChangeImage}>
            앨범에서 사진선택
          </ActionSheet.Button>
        </ActionSheet.Container>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
}

export default EditProfileActionSheet;
