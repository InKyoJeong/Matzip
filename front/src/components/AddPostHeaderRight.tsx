import HeaderButton from './HeaderButton';

function AddPostHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
}

export default AddPostHeaderRight;
