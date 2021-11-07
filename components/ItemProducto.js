import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity, TextInput, Keyboard,TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import { StyledContainer, Background, InnerContainer } from './styles';
import Categorias from "./Categorias";

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
     
      const url = `https://apiphpdps.000webhostapp.com/obtener.php`;
    
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
         navigation.addListener('focus',()=>{
      consultarProducto();
    })

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

      const consultarProductos = async () => {
     
      const url = `https://apiphpdps.000webhostapp.com/filtro.php?filtro=`+clave;
    
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          //console.log('filtro',resultado,clave);
          guardarresultado(resultado);
          setLoad(false);
        } catch (error) {
          console.log(error);
        }
    };

  return (
  <>
  
  <View style={styles.container2}>
  
      <TextInput
        style={styles.inputStyle}
        value={clave}
        placeholder="Encuentra tu nuevo conjunto..."
        onKeyPress={()=>consultarProductos()}
        onChangeText = {(text)=>setClave(text)}
      />
      
      <FontAwesome
        name="search"
        size={24}
        color="black"
        style={{ marginRight: 5 }}
      />
    </View>
 
    <View style={styles.items}>
    <Categorias guardarresultado={guardarresultado}/>
    <SafeAreaView style={styles.container}>
     {resultado.length>0?(
      <FlatList data={resultado} renderItem={renderItem} initialNumToRender={7} extraData={[selectedId,navigation]} keyExtractor={(resultado) => resultado.id} />
      ):
              <Text>Sin articulos disponibles</Text>
            }
    </SafeAreaView>
    </View>
    
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
  items:{
    display:"flex",
    flexDirection:"row",
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
   container2: {
    width: "95%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop:10
  },
  inputStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    margin: 5,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 16,
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
