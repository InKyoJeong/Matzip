import React from 'react';
import HeaderButton from '../common/HeaderButton';

function EditProfileHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="완료" onPress={onSubmit} />;
}

export default EditProfileHeaderRight;
