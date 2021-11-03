import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, Platform,ScrollView,ActivityIndicator,TextInput } from 'react-native';
//El siguiente componente debe ser descargado de la página de expo
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'react-native-elements';
import { Octicons, Fontisto, Ionicons, FontAwesome } from '@expo/vector-icons';
import SearchBar from "./../components/searchBar";
import {
  StyledContainer,
  PageTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  SubTitle,
  Colors,
  Background,
  ImageButton,
  DeleteButton
  
} from './../components/styles';

import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const { darkLight, brand, primary, tertiary, secondary } = Colors;


  

//Clase principal
const App =({navigation})=> {
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
          const resultado = await respuesta.json();
          guardarresultado(resultado);
           setLoad(false);
        } catch (error) {
          console.log(error);
        }
    };
    navigation.addListener('focus',()=>{
      console.log(consultar);
      consultarProducto();
    })
    console.log(consultar);
      consultarProducto();
    
    
  }, [consultar,navigation]);
  
  

    const consultarProducto = async () => {
     
      const url = `http://192.168.1.14/APILogin/filtro.php?filtro=`+clave;
    
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
  const Eliminar = async(id)=>{
  
     
      const url = `http://192.168.1.14/APILogin/eliminarProducto.php?id=`+id;
    console.log(url);
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          
           console.log(resultado);
           guardarconsultar('false');
           
        } catch (error) {
          console.log(error);
        }
    };

    return (
             
      <Background source={require('./../assets/img/fondo.jpg')}>
      <KeyboardAvoidingWrapper>
      
      <StyledContainer>
      <InnerContainer>
       <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        value={clave}
        placeholder="Encuentra tu nuevo conjunto..."
        onKeyPress={()=>consultarProducto()}
        onChangeText = {(text)=>setClave(text)}
      />



      <FontAwesome
        name="search"
        size={24}
        color="black"
        style={{ marginRight: 5 }}
      />
    </View>
       {!loading && (<View style={styles.tab}>
      {resultado.length>0 ? resultado.map(item=> {
          
          return(<View key={item.id} style={styles.indi}>
          
          <Image 
            style={{ width: 100, height: 100}}
            source={{ uri: item.imagen }}
            />
            <View style={styles.info}>
            <Text style={styles.titulo}>{item.nombre}</Text>
          <Text >$ {item.precio}</Text>
             <Text >{item.categoria}</Text>
          </View>
        
        <DeleteButton onPress={()=>{Eliminar(item.id) 
          guardarconsultar('true')}}><Fontisto name="trash" size={15} color={primary} /></DeleteButton>
           </View>)
           
      }):<Text>No existe registro</Text>}
     

    </View>)}
     {loading &&(<ActivityIndicator size="large" color={primary} />)}
     <StatusBar style="auto" />
      </InnerContainer>
      </StyledContainer>
      </KeyboardAvoidingWrapper>
      </Background>

    );
  

}
export default App

const styles = StyleSheet.create({
  tab:{
    
    display: "flex",
    flexDirection: "column",
    marginHorizontal:20,
   flexWrap:"wrap"
    
  
  },
  info:{
    width:100,
     display:"flex",
    flexDirection: "column",
    justifyContent:"space-evenly",
    
    padding:8
    
    
  },
   searchbar: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  indi:{
    display:"flex",
    flexDirection: "row",
    alignItems:"center",
    height:150,
    padding:15,
    marginVertical:5,
    backgroundColor:'rgba(255,255,255,0.8)',
    borderRadius:5,
    flexWrap:"nowrap"
    
  },
  titulo:{
    color: 'black',
    fontWeight:"bold",
    fontSize:17
    
  },
  container: {
    width: "95%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
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
})