import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { StyledContainer, Background, InnerContainer } from './../components/styles';
import Categorias from "./../components/Categorias";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';



const Compras = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [busqueda, guardarbusqueda] = useState({
    pais: '',
  });
  const [consultar, guardarconsultar] = useState(false);
  const [resultado, guardarresultado] = useState([]);
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const { id_usuario,email , name, photoUrl, nombre, correo } = storedCredentials;
 
  
useEffect(() => {

    const consultarProducto = async () => {
     
      const url = `https://apiphpdps.000webhostapp.com/misCompras.php?id=`+id_usuario;
      
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
         
          guardarresultado(resultado);
         
        } catch (error) {
          console.log(error);
        }
    };
    navigation.addListener('focus',()=>{
      
      consultarProducto();
    })
    
      consultarProducto();
    
    
  }, [navigation]);


const Item = ({ item, onPress, backgroundColor, textColor,navigation }) => (

  <View  style={[styles.item, backgroundColor]}>
   
  
    <Text>{item.id}</Text>
    <Text>${item.total}</Text>
    <Text>Fecha: {item.fecha}</Text>
  </View>
);
  const renderItem = ({ item }) => {
        const backgroundColor = item.id_cliente === selectedId ? '#a6a6a6' : '#fff';
        const color = item.id_cliente === selectedId ? 'white' : 'black';
        
        return (
              <Item
            item={item}
            onPress={() => {setSelectedId(item.id_cliente)}}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
            navigation={ navigation }
          />
            
           
          
        );
      };

  return (
  <>
    
    <SafeAreaView style={styles.container}>
    <Text style={styles.sectionTitle}>Mis compras registradas</Text>
     {resultado.length>0?(
      <>
      <FlatList data={resultado} 
      renderItem={renderItem} 
       
      extraData={[selectedId,navigation]} keyExtractor={(item) => item.id}/>

      
      
      </>
      ):
              <Text>No ha realizado ninguna compra</Text>
            }
    </SafeAreaView>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,   
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    flex:1
  },
  descripcion:{
    display:'flex',
    flexDirection:'column'
  },
  textBoton:{
    color: 'white',
    fontSize: 20,
  },
  pagar:{
    padding: 15,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 15,
    height: 60
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    paddingTop: 15,
  },
  img: {
    width: 70,
    height: 80,
    
  },
  titulo: {
    margin: 5,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    width: 300,
    padding: 3,
    marginVertical: 10,
    borderRadius: 5,
    
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems: 'center',
  },
  eliminar:{
    width:30,
    backgroundColor:'red',
    borderRadius:6
  },
  txtEliminar:{
    textAlign:'center',
    fontWeight:'bold',
    color:'white'
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
export default Compras;
