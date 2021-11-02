import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome, Octicons } from "@expo/vector-icons";
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
} from './styles';
const { darkLight, brand, primary } = Colors;
const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Encuentra tu nuevo conjunto..."
      />



      <FontAwesome
        name="search"
        size={24}
        color="black"
        style={{ marginRight: 5 }}
      />
    </View>
  );
};

const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View>
      <RightIcon >
        <Octicons name={icon} size={30} color={brand} />
      </RightIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
export default SearchBar;
