import React from 'react';
import HeaderButton from '../common/HeaderButton';

function CalendarHomeHeaderRight(onPress: () => void) {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
}

export default CalendarHomeHeaderRight;
