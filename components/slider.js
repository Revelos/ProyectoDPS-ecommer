import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { StyledContainer, Background, InnerContainer } from '../components/styles';

const { width } = Dimensions.get('window');
const height = width * 0.6;
const images = [
  'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5405645/pexels-photo-5405645.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1619655/pexels-photo-1619655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4271568/pexels-photo-4271568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

export default class Slider extends React.Component {
  state = {
    active: 0,
  };

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };
  render() {
    return (
      <>
      
        <View style={style.container}>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={this.change}
            scrollEventThrottle={0}
            showsHorizontalScrollIndicator={false}
            style={style.scroll}
          >
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={style.image} />
            ))}
          </ScrollView>
          <View style={style.pagination}>
            {images.map((i, k) => (
              <Text key={k} style={k == this.state.active ? style.pagingActiveText : style.pagingText}>
                ⬤
              </Text>
            ))}
          </View>
        </View>
      </>
    );
  }
}

const style = StyleSheet.create({
  container: { marginTop: 50, width, height },
  scroll: { width, height },
  image: { width, height, resizeMode: 'cover' },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' },
  pagingText: { fontSize: width / 30, color: '#888', margin: 3 },
  pagingActiveText: { fontSize: width / 30, color: '#fff', margin: 3 },
});
