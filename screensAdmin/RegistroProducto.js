import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, Platform,ActivityIndicator } from 'react-native';
//El siguiente componente debe ser descargado de la página de expo
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'react-native-elements';
import { Octicons, Fontisto, Ionicons,FontAwesome } from '@expo/vector-icons';

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
  LeftIcons,

  
} from './../components/styles';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
const { darkLight, brand, primary, tertiary, secondary } = Colors;
//Función que contiene el componente para seleccionar imagenes de la galería
//************************************* */
function ImagePickerChoose(props) {
  const [image, setImage] = useState(null);
  const [photoStatus, setPhotoStatus] = useState('No se ha seleccionado ninguna imágen');
  //controla que los permisos para acceder a la galería hayan sido dados
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Lo sentimos, se necesitan permisos para acceder a la galería');
        }
      }
    })();
  }, []);
  //Selecciona una imágen de manera asincrina desde la galeria y cuando se carga
  //manda a llamar a la función parentCallBack para enviarle el uri al componente padre
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setPhotoStatus('')
    }
    //console.log(result)
    props.parentCallBack(result,setImage)
  };
  return (
    <View style={{ marginVertical:12,display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>
      <ImageButton
        
        onPress={pickImage}

      ><Fontisto name="picture" size={25} color={primary} /></ImageButton>
      <Text style={{ fontSize: 12, marginBottom: 20, color: "black" }}>{photoStatus}</Text>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
    </View>
  );
}


//Clase principal
const App =(navigation)=> {
  const [nombre,setNombre] = useState('');
  const [descripcion,setDescripcion] = useState('');
  const [precio,setPrecio] = useState('');
  const [cantidad,setCantidad] = useState('');
  const [categoria,setCategoria]=useState('')
  const [image,setImage] = useState('');
  const [img,setImg] = useState('');
  const [status, setStatus] = useState('');
  const [uploading,setupload] = useState(false)

  const setImageState = (img,setI) => {
    
    setImg(img);
    setImage(img);
  }
  const limpiar = ()=>{
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCantidad('');
    setCategoria('');
    setImage('');
    setImg('');

  }
  

  //función para subir imagen al server, en este caso es un servidor en PHP
  const uploadImage = async () => {
    setupload(true);
    let localUri = image.uri;
    console.log('imprime esto',localUri);
    if (localUri == null || localUri == '' || nombre=='' || cantidad==''||descripcion=='') {
      Alert.alert('Debe completar los campos')
      setupload(false);
    }
    else {
      
      let filename = localUri.split('/').pop();
       return await fetch('https://apiphpdps.000webhostapp.com/registrarProducto.php', {
        method: 'POST',
        body: JSON.stringify({image,name:filename,
          nombre:nombre,
          cantidad:cantidad,
          descripcion:descripcion,
          categoria:categoria,
          precio:precio}
        ),
        header: {
          
          'content-type': 'application/json',
        },
      }).then(res => res.json())
        .then(response => {
          console.log('resultado',response.status);
           if(response.status==1){
            Alert.alert('Registro exitoso')
            setupload(false);
            limpiar();
          }
            
            
        }).catch(error => console.error('Error', error));
    }

  };
  
    return (
                  
      <Background source={require('./../assets/img/fondo.jpg')}>
      <KeyboardAvoidingWrapper>
      <StyledContainer>
      <InnerContainer>
      <PageTitle>Registro de Productos</PageTitle>
          <SubTitle>Acceso Administrador</SubTitle>
          <StyledFormArea>
         
      <Input
       label="Nombre Producto"
       value={nombre}
       placeholder='Camisa'
       labelStyle={{color:'black'}}
       onChangeText = {(text)=>setNombre(text)}
       inputStyle={styles.inputs}
       leftIcon={
        <FontAwesome name="archive" size={24} color="black" />
       }
       />
       <Input
       label="Descripción"
       value={descripcion}
       inputStyle={styles.inputs}
       placeholder='Descripción'
       labelStyle={{color:'black'}}
       multiline={true}
       onChangeText = {(text)=>setDescripcion(text)}
       leftIcon={
       
        <FontAwesome name="align-center" size={24} color="black" />
      
       }
       />
       <Input
       label="Precio de venta"
       value={precio.toString()}
       inputStyle={styles.inputs}
       placeholder='Precio de venta'
       labelStyle={{color:'black'}}
       keyboardType={'numeric'}
       onChangeText = {(text)=>setPrecio(text)}
       leftIcon={
         <View style={{marginLeft:5}}>
        <FontAwesome name="dollar" size={24} color="black" />
        </View>
       }
       />
       <Input
       label="Cantidad"
       value={cantidad.toString()}
       inputStyle={styles.inputs}
       labelStyle={{color:'black'}}
       placeholder='Cantidad'
        keyboardType={'numeric'}
       onChangeText = {(text)=>setCantidad(text)}
       leftIcon={
        <View style={{}}>
        <FontAwesome name="clipboard" size={24} color="black" />
        </View>
       }
       />
       
       <Text style={{fontWeight:'bold',fontSize:16,marginLeft:12}}>Categoria</Text>
        <Picker selectedValue={categoria} style={{}} onValueChange={(text)=>setCategoria(text)}>
            <Picker.Item label="--seleccione un categoria--" value="" />
            <Picker.Item label="Hombres" value="Hombres" />
            <Picker.Item label="Mujeres" value="Mujeres" />
            <Picker.Item label="Niños" value="Niños" />
            <Picker.Item label="Niñas" value="Niñas" />
            <Picker.Item label="Jovenes" value="Jovenes" />
          </Picker>
        
        <Text style={{fontWeight:'bold',fontSize:16,marginLeft:12,marginVertical:6}}>Imagen Producto</Text>
        <ImagePickerChoose parentCallBack={setImageState}></ImagePickerChoose>
       
                  {!uploading && <StyledButton onPress={uploadImage}>
                   <ButtonText>Registrar Producto</ButtonText>
                    
                  </StyledButton>}
                  {uploading && <StyledButton>
                   <ActivityIndicator size="large" color={primary} />
                    
                  </StyledButton>}
        
        <StatusBar style="auto" />
        </StyledFormArea>
      </InnerContainer>
      </StyledContainer>
      </KeyboardAvoidingWrapper>
      </Background>
    );
  

}
export default App

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection:"column",
    backgroundColor: '#fff',
    padding:20,
    justifyContent:"space-between",
    
  },
  inputs:{
    backgroundColor: '#E5E7EB',
    padding: 15,
    
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
    color: '#1F2937',
    
  },
});