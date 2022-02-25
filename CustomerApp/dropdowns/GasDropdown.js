import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from "react";

const GasDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Regular', value: 'regular'},
    {label: 'Premium', value: 'premium'},
    {label: 'Diesel', value: 'diesel'},
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

export default GasDropdown;