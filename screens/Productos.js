import React from "react";
import { StyleSheet, View, Text, Pressable,SafeAreaView,ScrollView } from "react-native";
import SearchBar from "./../components/searchBar";
import Categorias from "./../components/Categorias";

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
  InnerContainers
} from './../components/styles';

import ItemProducto from '../components/ItemProducto'
import { StatusBar } from 'expo-status-bar';
// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
export default function ScreenA({navigation}) {
  
  return (
 <>
      <StatusBar style="auto" />
      <Background source={require('./../assets/img/fondo.jpg')}>
        <View style={styles.container}>
          <View style={styles.searchbar}>
            <SearchBar />
          </View>
          <View style={styles.Body}>
            <ItemProducto navigation={navigation} />
          </View>
        </View>
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
  },
  searchbar: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  Body: {
     flex: 1,
    flexDirection: "row",
  },

});
