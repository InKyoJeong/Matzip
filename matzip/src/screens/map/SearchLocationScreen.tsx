import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import SearchInput from '@/components/map/SearchInput';
import useUserLocation from '@/hooks/useUserLocation';
import useSearchLocation from '@/hooks/useSearchLocation';
import SearchRegionResult from '@/components/map/SearchRegionResult';

function SearchLocationScreen() {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const {userLocation} = useUserLocation();
  const {regionInfo} = useSearchLocation(searchKeyword, userLocation);

  const handleSubmitKeyword = () => {
    setSearchKeyword(keyword);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        value={keyword}
        onChangeText={setKeyword}
        onSubmit={handleSubmitKeyword}
        placeholder="검색할 장소를 입력해주세요."
      />
      <SearchRegionResult regionInfo={regionInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
});

export default SearchLocationScreen;
