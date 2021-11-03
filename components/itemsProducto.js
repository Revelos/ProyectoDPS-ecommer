import React from "react";
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import FormCompra from "./../screens/FormCompra"
import {StyledContainer,Background,InnerContainer} from './../components/styles';
const itemProducto = ({navigation}) => {

  return (
    
    <View style={styles.container}>

      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image source={require("./../assets/img/camisa1.jpg")} style={styles.img} />
          <View style={styles.itemContainer2}>
            <View style={styles.itemContainer3}>
              <View style={styles.itemContainer4}>
              </View>
            </View>
          </View>
        </View>
          <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 60, textAlign: 'center'}}>Camisa #1</Text>
          <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 15, textAlign: 'center' }}>Hermosa camisa con estampado Red Devils </Text>
          <TouchableOpacity style={styles.boton} onPress={() => {navigation.navigate('FormCompra')}} ><Text style={styles.textBoton}>Comprar</Text></TouchableOpacity>
        
      </View>
      
  
    </View>

    
   
  );
};

const styles = StyleSheet.create({
  container: {
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
 export default itemProducto;
