import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

import {colors} from '@/constants';
import {MarkerColor} from '@/types';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: MarkerColor;
  score?: number;
}

const colorHex = {
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
};

function CustomMarker({
  coordinate,
  color,
  score = 5,
  ...props
}: CustomMarkerProps) {
  const markerView = (
    <View style={styles.container}>
      <View style={[styles.marker, {backgroundColor: colorHex[color]}]}>
        <View style={[styles.eye, styles.leftEye]} />
        <View style={[styles.eye, styles.rightEye]} />
        {score > 3 && <View style={[styles.mouth, styles.good]} />}
        {score === 3 && <View style={styles.soso} />}
        {score < 3 && <View style={[styles.mouth, styles.bad]} />}
      </View>
    </View>
  );

  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    transform: [{rotate: '45deg'}],
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: colors.BLACK,
  },
  eye: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    transform: [{rotate: '45deg'}],
    borderTopColor: 'rgba(255,255,255 / 0.01)',
    borderBottomColor: 'rgba(255,255,255 / 0.01)',
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  good: {
    transform: [{rotate: '225deg'}],
    marginLeft: 5,
    marginTop: 5,
    borderRightColor: 'rgba(255,255,255 / 0.01)',
    borderLeftColor: colors.BLACK,
  },
  soso: {
    marginLeft: 13,
    marginTop: 13,
    width: 8,
    height: 8,
    borderLeftColor: colors.BLACK,
    borderLeftWidth: 1,
    transform: [{rotate: '45deg'}],
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: 'rgba(255,255,255 / 0.01)',
    borderLeftColor: colors.BLACK,
  },
});

export default CustomMarker;
