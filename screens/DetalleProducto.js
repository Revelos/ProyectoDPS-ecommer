import React , {useState, useEffect}from "react";
import { StyleSheet, View, Text, Pressable,ScrollView, Image,TouchableOpacity, TextInput } from "react-native";
import SearchBar from "./../components/searchBar";
import Categorias from "./../components/Categorias";

import ItemsProducto from "./../components/itemsProducto";
import {StyledContainer,Background,InnerContainer} from './../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'



export default function App({route,navigation}) {

  const [canti,setCanti] = useState(1)
  const [lista,guardarlista]= useState([])
  const [nom,setNombre]= useState('')
  const [ids,setId]= useState('')
  const [img,setImg]=useState('')
  const [price,setPrice]=useState('')
  const [bandera,setBandera] = useState()
  const {id, nombre,descripcion,imagen,precio,cantidad} = route.params
  
  
  useEffect(() => {
       obtenerDatos();
   navigation.addListener('focus',()=>{
      verificarItem({id});
      setNombre({nombre});
      setId({id});
      setPrice({precio});
      setImg({imagen})
      guardarlista('')
      obtenerDatos();
      
    })
   
  }, [navigation,id,nombre,imagen,precio]);

  const agregarCarrito = async ()=>{
    try{
      
      
      const articulo =  {nom} ;
      articulo.id = {ids};
      articulo.cantidad = {canti};
      articulo.precio = {price};
      articulo.img = {img};
      
      //console.log("estudio",articulo);
      const listaArticulos = [...lista,articulo];
      guardarlista(listaArticulos);
      const datos = JSON.stringify(listaArticulos);
     // console.log("AgregarCarrito",lista);
      console.log("Agregar Carrito",datos);
      await AsyncStorage.setItem('carrito', datos);
      setBandera(true);
    }catch(error){
      console.log(error)
    }
  
}

 const quitarCarrito= async(id)=>{
    try{

      obtenerDatos()
        const nombresFiltrados = lista.filter(item=>item.id.ids.id!==id);
        guardarlista(nombresFiltrados);
        const datos = JSON.stringify(nombresFiltrados);
        await AsyncStorage.setItem('carrito',datos);
        setBandera(false);
    }catch(error){
      console.log(error)
    }
}

const verificarItem = (id)=>{
  try{
  obtenerDatos()
  const data = lista.filter(item=>item.id.ids.id===id.id);
  console.log("verificar",data);
  if(data.length>0){
      setBandera(true)
  }else{
       setBandera(false)
       console.log('entra aqui false');
  }
  }catch(error){
      console.log(error)
    }
}


const obtenerDatos = async()=>{
  try{
    const nombreStorage = await AsyncStorage.getItem('carrito');
    console.log("marica",nombreStorage);
    if(nombreStorage!== null){
      guardarlista(JSON.parse(nombreStorage));
      
    }else{
      console.log("esta vacio")
    }
  }catch(error){
    console.log(error)
  }
}

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
          {!bandera? (
               <TouchableOpacity style={styles.agregar} 
          onPress={() => {agregarCarrito()}} >
              <Text style={styles.textBoton}>Agregar a Carrito</Text>
          </TouchableOpacity>
            ):(
               <TouchableOpacity style={styles.quitar} 
          onPress={() => {quitarCarrito(id)}} >
              <Text style={styles.textBoton}>Quitar del Carrito</Text>
          </TouchableOpacity>
            )}
         
           <TouchableOpacity style={styles.agregar} onPress={() => {navigation.navigate('Productos')}} >
              <Text style={styles.textBoton}>Regresar</Text>
           </TouchableOpacity>
        
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
    alignItems: "center",
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
    alignItems: "center",
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
  agregar:{
    padding: 15,
    backgroundColor: '#6D28D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    height: 60
  },
  quitar:{
    padding: 15,
    backgroundColor: 'red',
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
