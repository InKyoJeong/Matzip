import {createContext, PropsWithChildren, ReactNode, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import {colors} from '@/constants/colors';

interface ActionSheetContextValue {
  onPressOutSide?: (event: GestureResponderEvent) => void;
}

const ActionSheetContext = createContext<ActionSheetContextValue | undefined>(
  undefined,
);

interface ActionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideAction: () => void;
  animationType?: ModalProps['animationType'];
}

function ActionMain({
  children,
  isVisible,
  animationType = 'slide',
  hideAction,
  ...props
}: ActionMainProps) {
  const onPressOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideAction();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType}
      onRequestClose={hideAction}
      {...props}>
      <ActionSheetContext value={{onPressOutSide}}>
        {children}
      </ActionSheetContext>
    </Modal>
  );
}

function Background({children}: PropsWithChildren) {
  const actionSheetContext = useContext(ActionSheetContext);

  return (
    <SafeAreaView
      style={styles.actionBackground}
      onTouchEnd={actionSheetContext?.onPressOutSide}>
      {children}
    </SafeAreaView>
  );
}

function Container({children}: PropsWithChildren) {
  return <View style={styles.actionContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

function Button({
  children,
  isDanger = false,
  isChecked = false,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.actionButtonPressed,
        styles.actionButton,
      ]}
      {...props}>
      <Text style={[styles.actionText, isDanger && styles.dangerText]}>
        {children}
      </Text>

      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors.BLUE_500} />
      )}
    </Pressable>
  );
}

function Title({children}: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.border} />;
}

export const ActionSheet = Object.assign(ActionMain, {
  Container,
  Button,
  Title,
  Divider,
  Background,
});

const styles = StyleSheet.create({
  actionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  actionContainer: {
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  actionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  actionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors.RED_500,
  },
  titleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  border: {
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
});
