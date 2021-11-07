import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';
import { StyledContainer, Background, InnerContainer } from '../styles';

const DATA = [
  {
    id: '1',
    title: 'Pantalón niño #1',
    precio: '23.99',
    img: 'https://siman.vtexassets.com/arquivos/ids/1528523-1200-auto?v=637607877635500000&width=1200&height=auto&aspect=true',
  },
  {
    id: '2',
    title: 'Pantalón niña #2',
    precio: '17.00',
    img: 'https://siman.vtexassets.com/arquivos/ids/1714379-1200-auto?v=637671807838630000&width=1200&height=auto&aspect=true',
  },
  {
    id: '3',
    title: 'Pantalón niño #3',
    precio: '35.00',
    img: 'https://siman.vtexassets.com/arquivos/ids/1560014-1200-auto?v=637619666654370000&width=1200&height=auto&aspect=true',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Image source={{ uri: item.img }} style={{ width: 100, height: 100, marginTop: 5 }} />
    <Text>{item.title}</Text>
    <Text>${item.precio}</Text>
  </TouchableOpacity>
);

const PantalonesN = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#a6a6a6' : '#fff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} extraData={selectedId} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 570,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    paddingTop: 15,
  },
  titulo: {
    margin: 5,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    width: 150,
    padding: 3,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  separador: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'solid',
    marginRight: 8,
    marginLeft: 8,
  },
  tallas: {
    marginBottom: 2,
    marginLeft: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    fontSize: 13,
    margin: 5,
  },
});
export default PantalonesN;
