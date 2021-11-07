import React, { useState, useContext,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

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
  PageTitle1
} from './../components/styles';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary, tertiary } = Colors;

// icon
import { Octicons, Ionicons } from '@expo/vector-icons';

// Datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Signup = ({ route,navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [resultado, guardarresultado] = useState([]);
  const [totalprice, settotal] = useState('');
  // Actual value to be sent
  const [dob, setDob] = useState();
  const totalPrecio = route.params;  
  
  useEffect(() => {

    obtenerDatos();

     navigation.addListener('focus',()=>{
      obtenerDatos();
      
    })

  }, [navigation]);

  const obtenerDatos = async()=>{
      try{
        const nombreStorage = await AsyncStorage.getItem('carrito');
        if(nombreStorage){
          guardarresultado(JSON.parse(nombreStorage));
         
        }else{
          console.log("esta vacio")
        }
      }catch(error){
        console.log(error)
      }
    }
    const limpiarCarrito = async()=>{
      try{
        await AsyncStorage.removeItem('carrito');
        return true;
      }catch(error){
      return false;
  }
    }
    // credentials context
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
   const { id_usuario,email , name, photoUrl, nombre, correo } = storedCredentials;
   
  // Form handling
  const handleSignup = (credentials, setSubmitting) => {
    obtenerDatos()
    
    //const listaArticulos = [...resultado,credentials,totalPrecio];
    handleMessage(null);
    const url = 'https://apiphpdps.000webhostapp.com/factura.php';
    axios
      .post(url, {listaArticulos:resultado,usuario:credentials,total:totalPrecio},{headers:{ 'Content-Type':'application/json'}})
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        console.log(response)
        let eliminar =  AsyncStorage.removeItem('carrito');
        if(eliminar){
          alert("La compra fue registrada con exito")
          navigation.navigate('MisCompras')
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('Error. Verifica tu red y intenta de nuevo');
        console.log(error.toJSON());
      });
  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };


  return (
    <Background source={require('./../assets/img/fondo.jpg')}>
    <KeyboardAvoidingWrapper>
      <StyledContainer>
      
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Formulario de Compra</PageTitle>
          <SubTitle>Ingrese sus datos</SubTitle>


          <Formik
            initialValues={{ name: nombre, email: correo, direccion: '', tarjeta: '', password: '',id:id_usuario}}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, dateOfBirth: dob };
              if (
                values.email == '' ||
                values.password == '' ||
                values.name == '' ||
                values.dateOfBirth == '' ||
                values.confirmPassword == ''
              ) {
                handleMessage('Complete todos los campos');
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nombre Completo"
                  placeholder="Juan Perez"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  icon="person"
                  editable={false}
                />
                <MyTextInput
                  label="Correo Electronico"
                  placeholder="juanperez@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                  editable={false}
                />
                <MyTextInput
                  label="Direccion de Entrega"
                  placeholder="Calle 3, Avenida Sur, San Marcos"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('direccion')}
                  onBlur={handleBlur('direccion')}
                  value={values.direccion}
                  icon="location"
                />
                <MyTextInput
                  label="Tajeta de Credito"
                  placeholder="XXX-XXXX-XXX"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('tarjeta')}
                  onBlur={handleBlur('tarjeta')}
                  value={values.tarjeta}
                  icon="credit-card"
                />
                <MyTextInput
                  label="Contraseña"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Comprar Ahora</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
    </Background>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color='black' />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {!isDate && <StyledTextInput {...props} />}
    </View>
  );
};

export default Signup;
