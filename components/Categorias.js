import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  TouchableOpacity,
  CheckBox,
  ScrollView
} from "react-native";
// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
const DATA = [
  {
    title: "Mujeres",
    data: ["Vestidos", "Blusa", "Conjuntos", "Zapatos"],
  },
  {
    title: "Hombres",
    data: ["Pantalon", "Camisa", "Trajes", "Zapatos"],
  },
  {
    title: "Niños",
    data: ["Pantalon", "Camisa", "Trajes", "Zapatos"],
  },
  {
    title: "Niñas",
    data: ["Vestidos", "Blusa", "Conjuntos", "Zapatos"],
  },
];
const Buscar = async (item,guardarresultado,categoria)=>{
     
      const url = `http://192.168.1.14/APILogin/filtro.php?articulo=`+item+`&categoria=`+categoria;
        console.log(url)
        try {
          const respuesta = await fetch(url);
          const resul = await respuesta.json();
       
          guardarresultado(resul)
           
        } catch (error) {
          console.log(error);
        }
    };

const Categorias = ({guardarresultado}) => {

  return (
    
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categorías</Text>
      <SectionList
        keyExtractor={(item, index) => index.toString()}
        sections={DATA}
        renderItem={({ item,index,section }) => (
       
          <TouchableOpacity style={styles.item} onPress={()=>Buscar(item,guardarresultado,section.title)}>
            <Text style={{ marginRight: 20, fontSize: 12 }}>{item}</Text>
          </TouchableOpacity>
          
        )}
        renderSectionHeader={({ section }) => (
        
          <View style={styles.titulo}>
            <Text style={{ fontSize: 12, fontWeight: "700" }}>
              {section.title}
            </Text>
          </View>
          
        )}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 120,
    
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 10,
    marginVertical:5,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    paddingTop: 15,
  },
  titulo: {
    margin: 5,
    alignItems: "center",
  },
  item: {
    width: "100%",
    height: 20,
    alignItems: "flex-end",
  },
  separador: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderStyle: "solid",
    marginRight: 8,
    marginLeft: 8,
  },
  tallas: {
    marginBottom: 2,
    marginLeft: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    margin: 5,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    fontSize: 13,
    margin: 5,
  },
});
export default Categorias;
