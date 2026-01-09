import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import DatePicker from 'react-native-date-picker';

type DateInputProps = {
  value?: string; // ISO string
  onChange: (dateISO: string) => void;
  isTime?: boolean;
  maximumDate?: Date;
};

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  isTime = false,
  maximumDate = new Date(),
}) => {
  const [open, setOpen] = useState(false);

  const parsedDate = useMemo(() => {
    const d = value ? new Date(value) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);

  const displayValue = useMemo(() => {
    if (!value) return isTime ? 'Select Time' : 'Select Date';

    return isTime
      ? parsedDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : parsedDate.toLocaleDateString('en-GB'); // DD/MM/YYYY
  }, [value, isTime, parsedDate]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.input} onPress={() => setOpen(true)}>
        <Text style={styles.text}>{displayValue}</Text>
      </Pressable>

      <DatePicker
        modal
        open={open}
        date={parsedDate}
        mode={isTime ? 'time' : 'date'}
        maximumDate={maximumDate}
        minimumDate={new Date(1900, 0, 1)}
        onConfirm={d => {
          setOpen(false);
          onChange(d.toISOString());
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

export default DateInput;
const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },

  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF8E8E',
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  text: {
    fontSize: 15,
    color: '#1C1C1E',
  },
});
