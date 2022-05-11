import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from "react";

const TimeDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '12:00', value: 'noon'},
    {label: '3:30', value: 'threethirty'},
    {label: '4:30', value: 'fourthirty'},
    {label: '5:30', value: 'fivethirty'},
  ]);

  return (
    <DropDownPicker style={styles.containerStyle}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}

const styles = StyleSheet.create({
    containerStyle: {
        width: 150,
        left: 5,
    }
})

export default TimeDropdown;