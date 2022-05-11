import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from "react";

const DayDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Basic Service', value: 'basic'},
    {label: 'Premium Service', value: 'premium'},
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

export default DayDropdown;