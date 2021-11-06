import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Tflite from 'tflite-react-native';

let tflite = new Tflite();
var modelFile = 'models/model.tflite';
var labelsFile = 'models/labels.txt';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognitions: null,
      source: null,
    };
    tflite.loadModel({ model: modelFile, labels: labelsFile }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }

  selectGalleryImage() {
    const options = {};
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User Cancelled Image Picker');
      } else if (response.error) {
        console.log('Image Picker Error');
      } else if (response.customButton) {
        console.log('User pressed Custom Button');
      } else {
        console.log('Successfully opened library');
        this.setState({
          source: { uri: response.uri },
        });
        tflite.runModelOnImage({
          path: responsepath,
          imageMean: 128,
          imageStd: 128,
          threshold: 0.05,
        }),
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(res[res.length - 1]);
              this.setState({ recognitions: res[res.length - 1] });
            }
          };
      }
    });
  }

  render() {
    return (
      <LinearGradient
        colors={['#748cab', '#3e5c76']}
        style={styles.linearGradient}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Find the Breed</Text>
          <Text style={styles.subtitle}>Python Neural Network</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('./assets/dog.png')}
              style={styles.dogImage}></Image>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Camera Roll"
              buttonStyle={styles.button}
              containerStyle={{ margin: 5 }}
              titleStyle={{ fontSize: 20 }}
              onPress={this.selectGalleryImage.bind(this)}></Button>
            <Button
              title="Take a Photo"
              buttonStyle={styles.button}
              containerStyle={{ margin: 5 }}
              titleStyle={{ fontSize: 20 }}></Button>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 57,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  buttonContainer: {
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dogImage: {
    width: 250,
    height: 250,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  titleContainer: {
    marginTop: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
