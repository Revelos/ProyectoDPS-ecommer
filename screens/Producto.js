import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import SearchBar from './../components/searchBar';
import Categorias from './../components/Categorias';
import ItemsHome from './../components/ItemsHome';
import ItemsProducto from './../components/itemsProducto';
import { StyledContainer, Background, InnerContainer } from './../components/styles';
export default function App({ navigation }) {
  return (
    <Background source={require('./../assets/img/fondo.jpg')}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.searchbar}>
            <SearchBar />
          </View>

          <View style={styles.Body}>
            <Text style={styles.titulo}>Detalle de Producto</Text>
            <ItemsProducto navigation={navigation} />
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
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Body: {
    flex: 1,
    backgroundColor: 'rgba(60,60,60,0.3)',
    width: 300,
    marginLeft: 35,
  },
});
