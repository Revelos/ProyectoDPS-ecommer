import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainers,
  WelcomeContainer,
  ButtonText,
  Line,
  Background,
  PageTitle1
} from './../components/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Welcome = () => {
  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { email , name, photoUrl, nombre,correo,nacimiento } = storedCredentials;
 console.log(storedCredentials);

  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require('./../assets/img/profile.jpg');

  return (
    <>
      <StatusBar style="auto" />
      <Background source={require('./../assets/img/fondo.jpg')}>
      <InnerContainers>
        <WelcomeImage resizeMode="contain" source={require('./../assets/img/expo-bg4.png')} />

        <WelcomeContainer>
          <PageTitle1>Informacion Personal</PageTitle1>
          <SubTitle welcome={true}>{name || nombre}</SubTitle>
          <SubTitle welcome={true}>{email || correo}</SubTitle>
          <SubTitle welcome={true}>{ nacimiento}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />

            <Line />
           
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainers>
      </Background >
    </>
  );
};

export default Welcome;
