import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image } from 'react-native';
import { StyledContainer, Background, InnerContainer } from './../components/styles';
import Slider from '../components/slider';
import SearchBar from './../components/searchBar';

export default function App({ navigation }) {
  return (
    <Background source={require('./../assets/img/fondo.jpg')}>
      <View style={styles.container}>
        <View style={styles.searchbar}>
          <SearchBar />
        </View>
        <Text style={styles.titulo}>BIENVENIDO A NUESTRA TIENDA EN LINEA</Text>
        <Slider />
        <Text style={styles.subtitulo}>Aqui encontrarás: </Text>
        <View style={styles.secciones}>
          <View style={styles.seccion}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://images.pexels.com/photos/5490974/pexels-photo-5490974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
            />
            <Text>Ropa</Text>
          </View>
          <View style={styles.seccion}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://images.pexels.com/photos/6220653/pexels-photo-6220653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
            />
            <Text>Zapatos</Text>
          </View>
          <View style={styles.seccion}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
            />
            <Text>Trajes</Text>
          </View>
          <View style={styles.seccion}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
            />
            <Text>Mucho más</Text>
          </View>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
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
  subtitulo: {
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secciones: {
    width: '100%',
    height: 180,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seccion: {
    flex: 1,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  img: {
    width: 85,
    height: 85,
    margin: 9,
    resizeMode: 'cover',
  },
});
