import useLegendStorage from '@/hooks/useLegendStorage';
import React from 'react';
import {CompoundOption} from '../common/CompoundOption';

interface MapLegendOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function MapLegendOption({isVisible, hideOption}: MapLegendOptionProps) {
  const {isVisible: isVisibleLegend, set} = useLegendStorage();

  const handlePressShow = () => {
    set(true);
    hideOption();
  };

  const handlePressHide = () => {
    set(false);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button
            onPress={handlePressShow}
            isChecked={isVisibleLegend}>
            표시하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressHide}
            isChecked={!isVisibleLegend}>
            숨기기
          </CompoundOption.Button>
        </CompoundOption.Container>

        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default MapLegendOption;
