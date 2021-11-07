import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { StyledContainer, Background, InnerContainer } from './../components/styles';
import Categorias from "./../components/Categorias";
import AsyncStorage from '@react-native-async-storage/async-storage';




const Carrito = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [busqueda, guardarbusqueda] = useState({
    pais: '',
  });
  const [consultar, guardarconsultar] = useState(false);
  const [resultado, guardarresultado] = useState([]);
  const [loading, setLoad]=useState(true);
  const [clave,setClave]=useState()
  const [total,setTotal]=useState(0)
  const [idProducto,setIdProducto]=useState([]);
  const [cant,setCant]=useState([])
useEffect(() => {

    obtenerDatos();

     navigation.addListener('focus',()=>{
      guardarresultado([]);
      obtenerDatos();
    })

  }, [navigation]);



const Item = ({ item, onPress, backgroundColor, textColor,navigation }) => (

  <View  style={[styles.item, backgroundColor]}>
   
   <Image source={{uri:item.img.img.imagen}} style={styles.img} />
    <Text>{item.nom.nombre}</Text>
    <Text>${item.precio.price.precio}</Text>
    <Text>{item.cantidad.canti}</Text>
    
    <TouchableOpacity style={styles.eliminar} onPress={()=>quitarCarrito(item.id.ids.id)}>
    <Text style={styles.txtEliminar}>X</Text>
    </TouchableOpacity>
  </View>
);
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

    const obtenerDatos = async()=>{
      try{
        const nombreStorage = await AsyncStorage.getItem('carrito');
        if(nombreStorage){
          guardarresultado(JSON.parse(nombreStorage));
          console.log("estudio ",resultado);
        }else{
          console.log("esta vacio")
        }
      }catch(error){
        console.log(error)
      }
    }

  const quitarCarrito= async(id)=>{
    try{
        const nombresFiltrados = resultado.filter(item=>item.id.ids.id!==id);
        guardarresultado(nombresFiltrados);
        const datos = JSON.stringify(nombresFiltrados);
        await AsyncStorage.setItem('carrito',datos);

        obtenerDatos();
    }catch(error){
      console.log(error)
    }
}

let totalCantidad=0;
let totalPrecio=0;
let id='';
let qty='';
let articulos=[];
resultado.forEach((item)=>{
  totalCantidad = item.cantidad.canti;
  totalPrecio += parseInt(item.cantidad.canti)*parseFloat(item.precio.price.precio);
  

})

  return (
  <>
    
    <SafeAreaView style={styles.container}>
    <Text style={styles.sectionTitle}>Productos en Carrito</Text>
     {resultado.length>0?(
      <>
      <FlatList data={resultado} 
      renderItem={renderItem} 
       
      extraData={[selectedId,navigation]} keyExtractor={(item) => item.id.ids.id}/>

      <Text style={{fontSize:18}}>Total ${totalPrecio}</Text>
      <TouchableOpacity style={styles.pagar} onPress={() => {navigation.navigate('FormCompra',totalPrecio)}} >
              <Text style={styles.textBoton}>Pagar</Text>
           </TouchableOpacity>
      </>
      ):
              <Text>Sin articulos agregados</Text>
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
export default Carrito;
