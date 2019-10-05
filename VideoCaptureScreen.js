import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight,TouchableOpacity} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { RNCamera } from 'react-native-camera';


export default class VideoCapture extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      cameraType : 'back',
      mirrorMode : false,
      path: null,
    };
  }

  takeVid = async function (camera)    {
      try {
        const data = await camera.recordAsync();
        console.log('Path to image: ' + data.uri);
        const navigation = this.props.navigation;
        navigation.getParam('callback')(data.uri);
        navigation.navigate('AccidentVehicle');

      } catch (err) {
        // console.log('err: ', err);
      }
    }

  /*takeVid() {
    const option = {};
    if(this.camera)
    {
      this.camera.capture()
      .then((data) => {
      console.log(data);
      //this.setState({ path: data.path })
      const navigation = this.props.navigation;
      navigation.getParam('callback')(data.path);
      navigation.navigate('AccidentVehicle');
      })
      .catch((err) => console.error(err));
    }
    }*/

    stopVid(camera){
    camera.stopRecording();
    }

    changeCameraType() {
      if(this.state.cameraType === 'back') {
        this.setState({
          cameraType : 'front',
          mirrorMode : true
        })
      }
      else {
        this.setState({
          cameraType : 'back',
          mirrorMode : false
        })
      }
    }


render() {
return (

    <View style={styles.containerMain}>

      <RNCamera
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
              >
                {({ camera, status }) => {
                  return (
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                      <TouchableOpacity onPress={() => this.takeVid(camera)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> START </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.stopVid(camera)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> STOP </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              </RNCamera>

             </View>
)

}
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#3598DB',
    resizeMode:'stretch'
  },
  containerMain: {
    flexDirection: 'row',
    flex: 1,
    flexWrap:'wrap',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',

  },
  userIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginTop:moderateScale(20),
  },
  logoBackGround: {
    marginLeft: moderateScale(15),
    marginRight:  moderateScale(15),
    marginTop: moderateScale(20),
    width: scale(150),
    height: verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },
  backGroundImage: {

    alignItems: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },
  welcome: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    margin: moderateScale(10),
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: moderateScale(5),
  },
  logoImage: {
    width: scale(200),
    height:verticalScale(200),
  },
  MainScreenIcon: {
    width: scale(50),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon:
  {
    padding: moderateScale(10),
  },
  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(20),
    marginLeft:moderateScale(20),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(40),


  },
  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownArrow:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
    width: scale(320),
    height: verticalScale(40),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownText:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
    width: scale(320),
    height: verticalScale(200),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(18),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(10),
    marginLeft:  moderateScale(10),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(10),
  },
  headerDate2: {
    color: '#000000',
    fontSize: moderateScale(18),

    textAlign:'center',
    fontWeight: 'bold',
    marginLeft:  moderateScale(20),
    marginRight:  moderateScale(10),
    marginBottom: moderateScale(20),
    marginTop:  moderateScale(30),

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
});
