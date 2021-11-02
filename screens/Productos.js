import React from 'react';
import { StyleSheet, View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import SearchBar from '../components/searchBar';
import Categorias from '../components/Categorias';
import ItemsHome from '../components/ItemsHome';
import { StyledContainer, Background, InnerContainer } from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import Vestidos from '../components/Mujeres/Vestidos';
import Blusas from '../components/Mujeres/Blusas';
import Conjuntos from '../components/Mujeres/Conjuntos';
import ZapatosM from '../components/Mujeres/Zapatos';
import Pantalones from '../components/Hombres/Pantalones';
import Camisas from '../components/Hombres/Camisas';
import Trajes from '../components/Hombres/Trajes';
import ZapatosH from '../components/Hombres/ZapatosH';
import PantalonesN from '../components/Niños/Pantalones';
import CamisasN from '../components/Niños/Camisas';
import TrajesN from '../components/Niños/Trajes';
import ZapatosN from '../components/Niños/Zapatos';
// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
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
            <Categorias />

            <ScrollView>
              <ZapatosN />
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
    fontWeight: 'bold',
    margin: 10,
  },
  searchbar: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  Body: {
    flexDirection: 'row',
  },
});
