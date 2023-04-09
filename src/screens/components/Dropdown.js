import React from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';

export default function Dropdown({ defaultText, listItems, onSelectAction }) {
  return (
    <SelectDropdown
      buttonStyle={styles.item}
      buttonTextStyle={styles.dropdownBtnTxtStyle}
      defaultButtonText={defaultText}
      rowTextStyle={{ color: 'dimgray', fontSize: 16 }}
      dropdownOverlayColor="rgba(0, 0, 0, 0.1)"
      dropdownStyle={{
        position: 'relative',
        width: '35%',
        color: 'dimgray',
        borderRadius: 8,
        marginTop: -12,
      }}
      rowStyle={{
        backgroundColor: '#FAF8F1',
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        paddingVertical: 8,
        paddingHorizontal: 16,
      }}
      renderDropdownIcon={(isOpened) => {
        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'gray'} size={18} />;
      }}
      data={listItems}
      onSelect={(categoryName) => {
        onSelectAction(categoryName);
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'lightgray',
    paddingHorizontal: 16,
    backgroundColor: '#FAF8F1',
    width: '40%',
    height: 34,
    top: 8,
    left: 4,
  },
  dropdownBtnTxtStyle: { color: 'dimgray', fontWeight: 'semibold', textAlign: 'left', fontSize: 16 },
});
