import React from "react";
import { StyleSheet, View, Text, Pressable,SafeAreaView,ScrollView } from "react-native";
import SearchBar from "./../components/searchBar";
import Categorias from "./../components/Categorias";
import ItemsHome from "./../components/ItemsHome";
import {StyledContainer,Background,InnerContainer} from './../components/styles';
import { StatusBar } from 'expo-status-bar';
// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
export default function ScreenA() {
  return (
<>
    
      <StatusBar style="auto" />
    <Background source={require('./../assets/img/fondo.jpg')}>
    
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <SearchBar />
      </View>
      <View style={styles.Body}>
      <Text>Esto se agrego desde local</Text>
        <Categorias /> 
         
        <ScrollView>  
        <ItemsHome />
        </ScrollView>
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
    flexDirection: "row",
  },

});
