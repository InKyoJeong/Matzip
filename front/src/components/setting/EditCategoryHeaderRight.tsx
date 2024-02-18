import React from 'react';
import HeaderButton from '../common/HeaderButton';

function EditCategoryHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="저장" onPress={onSubmit} />;
}

export default EditCategoryHeaderRight;
