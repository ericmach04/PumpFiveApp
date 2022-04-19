import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from "react";

export default function GasDropdown({childToParent}){
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
      onChangeItem={item => console.log(item.label, item.value)}
    />
  );
}

const styles = StyleSheet.create({
    containerStyle: {
        width: 150,
        left: 5,
    }
})