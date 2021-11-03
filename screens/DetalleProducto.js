import React , {useState}from "react";
import { StyleSheet, View, Text, Pressable,ScrollView, Image,TouchableOpacity, TextInput } from "react-native";
import SearchBar from "./../components/searchBar";
import Categorias from "./../components/Categorias";

import ItemsProducto from "./../components/itemsProducto";
import {StyledContainer,Background,InnerContainer} from './../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
const agregarCarrito = async ()=>{
  const articulo = { nombre }
  articulo.id = id;
  articulo.cantidad = cantidad;

  const listaArticulos = [...lista,articulo];
  guardarlista(listaArticulos);
  const datos = JSON.stringfy(listaArticulos);
  await AsyncStorage.setItem('carrito',datos);
}

const Validar = (text,setCanti,cantidad)=>{

  if(cantidad>text){
    setCanti(text)
  }else if(cantidad<text){
    alert('No existe esa cantidad en stock')

  }
}

export default function App({route,navigation}) {

  const [canti,setCanti] = useState(1)
  const {id, nombre,descripcion,imagen,precio,cantidad} =route.params
  console.log(route.params)
  return (
    <Background source={require('./../assets/img/fondo.jpg')}>
    <ScrollView>
    <View style={styles.container}>
      
    
      <View style={styles.Body}>
        <Text style={styles.titulo}>Detalle de Producto</Text>
       <View style={styles.containers}>

      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image source={{uri:imagen}} style={styles.img} />
          
        </View>
          <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 20, textAlign: 'center'}}>{nombre}</Text>
          <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 15, textAlign: 'center' }}>{descripcion} </Text>
          <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 15, textAlign: 'center' }}>${precio} </Text>
          <Text>Cantidad</Text>
          <NumericInput      
       value={canti}
       placeholder='#'
       minValue = {1}
       maxValue = {parseInt(cantidad)}       
       step={1}
       onChange = {(text)=>setCanti(text)}
       onLimitReached ={()=>alert("Elija un valor entre 1 y "+cantidad)}
       
       />
          <TouchableOpacity style={styles.boton} onPress={() => {navigation.navigate('FormCompra')}} ><Text style={styles.textBoton}>Agregar a Carrito</Text></TouchableOpacity>
           <TouchableOpacity style={styles.boton} onPress={() => {navigation.navigate('Productos')}} ><Text style={styles.textBoton}>Regresar</Text></TouchableOpacity>
        
      </View>
      
  
    </View>
      </View>
    </View>
    </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  searchbar: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  titulo:{
    fontSize:25,
    textAlign:'center',
    fontWeight: 'bold',
  },
  Body: {
    flex:1,
    backgroundColor: 'rgba(60,60,60,0.3)',
    width:300,
    marginLeft:35
  },
   containers: {
    flex: 1,
  
  },
  itemContainer: {
    width: '100%',
    height: "80%",
    marginTop: 10,
    
    alignItems: 'center'
  },
  itemContainer2: {
    width: 50,
    height: 50,
    marginTop: 35,
    marginLeft: 0,
    backgroundColor: '#FFF'
  },
  itemContainer3: {
    width: 50,
    height: 50,
    marginTop: 0,
    marginLeft: 105,
    backgroundColor: 'blue'
  },
  itemContainer4: {
    width: 50,
    height: 50,
    marginTop: 0,
    marginLeft: 105,
    backgroundColor: 'red',
  },
  item: {
    backgroundColor: "#fff",
    width: 250,
    height: 250,
    marginTop: 40,
  },
  img: {
    width: 200,
    height: 200,
    marginTop: 25,
    marginLeft: 25,
    marginRight: 20,
  },
  boton:{
    padding: 15,
    backgroundColor: '#6D28D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    height: 60
  },
  textBoton:{
    color: 'white',
    fontSize: 20,
  }
});