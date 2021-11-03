import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import { StyledContainer, Background, InnerContainer } from './styles';
import Categorias from "./Categorias";
const DATA = [
  {
    id: '1',
    title: 'Traje #1',
    precio: '23.99',
    img: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: '2',
    title: 'Traje #2',
    precio: '17.00',
    img: 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: '3',
    title: 'Traje #3',
    precio: '35.00',
    img: 'https://images.pexels.com/photos/3778560/pexels-photo-3778560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor,navigation }) => (

  <TouchableOpacity onPress={() => {navigation.navigate('DetalleProducto',item)}} style={[styles.item, backgroundColor]}>
    <Image source={{ uri: item.imagen }} style={{ width: 100, height: 100, marginTop: 5 }} />
    <Text>{item.nombre}</Text>
    <Text>{item.categoria}</Text>
    <Text>${item.precio}</Text>
  </TouchableOpacity>
);

const Trajes = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [busqueda, guardarbusqueda] = useState({
    pais: '',
  });
  const [consultar, guardarconsultar] = useState(false);
  const [resultado, guardarresultado] = useState([]);
  const [loading, setLoad]=useState(true);
  const [clave,setClave]=useState()

useEffect(() => {

    const consultarProducto = async () => {
     
      const url = `http://192.168.1.14/APILogin/obtener.php`;
    
        try {
          const respuesta = await fetch(url);
          const resul = await respuesta.json();
          //console.log(resul);
          guardarresultado(resul);
           
        } catch (error) {
          console.log(error);
        }
    };
    
    
      consultarProducto();
    
    
  }, [consultar,navigation]);

  
      const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#a6a6a6' : '#fff';
        const color = item.id === selectedId ? 'white' : 'black';
        
        return (
         
         
              <Item
            item={item}
            onPress={() => {setSelectedId(item.id)}}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
            navigation={ navigation }
          />
            
           
          
        );
      };

  return (
  <>
    <Categorias guardarresultado={guardarresultado}/>
    <SafeAreaView style={styles.container}>
     {resultado.length>0?(
      <FlatList data={resultado} renderItem={renderItem} keyExtractor={(resultado) => resultado.id} extraData={[selectedId,navigation]} />
      ):
              <Text>Sin articulos disponibles</Text>
            }
    </SafeAreaView>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 220,
    
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    flex:1
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
export default Trajes;
