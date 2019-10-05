import React, {Component} from 'react';
import {Platform,StyleSheet, TouchableOpacity,Text,View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
//import {Switch} from 'react-native-customisable-switch';
import {ModelView} from 'react-native-3d-model-view';
import PropTypes from 'prop-types';
import ImageMarker from "react-native-image-marker";
//import {ModelView, ModelTypes} from 'react-native-3d-model-view';
import { Manager, ARManager } from 'react-native-3d-model-view';
import {captureScreen} from "react-native-view-shot";

export default class AccidentDamageScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {switch1Value:false,loading: true,srcURL:require('./obj/Hamburger.png'),srcURL1:require('./obj/Hamburger.png'),}

  }
  state = {
    arSupported: false
  }

  componentDidMount () {
    Manager.clearDownloadedFiles()
    ARManager.checkIfARSupported(supported => {
      alert(supported);
      this.setState({ arSupported: supported })
    })
  }

  render() {
    togglePlay = () => {
   const { isPlaying } = this.state
   isPlaying ? this.modelView.stopAnimation() : this.modelView.startAnimation()
 }

 sliderValueChange = value => {
   const { isPlaying } = this.state
   this.modelView.setProgress(value)
 }

 onLoadModelStart = () => {
   this.setState({ message: 'Loading model...'})
   console.log('[react-native-3d-model-view]:', 'Load model start.')
 }

 onLoadModelSuccess = () => {
   this.setState({ message: 'Loading model success!'})
   console.log('[react-native-3d-model-view]:', 'Load model success.')
 }

 onLoadModelError = (error) => {
   this.setState({ message: 'Loading model error :('})
   console.log('[react-native-3d-model-view]:', 'Load model error.')
 }

 onAnimationStart = () => {
   this.setState({isPlaying: true})
 }

 onAnimationStop = () => {
   this.setState({isPlaying: false})
 }

 onAnimationUpdate = event => {
   this.setState({animationProgress: event.nativeEvent.progress})
 }
    return (

      <View style={styles.containerMain}>
          <Dropdown dropdownOffset={{top:verticalScale(5),left:0}}
          label='' value='Vehicle Type' data={global.vehicles}
          valueExtractor={({vehicle_model})=>vehicle_model} pickerStyle={styles.dropdownText}
          containerStyle={styles.dropdown} propsExtractor ={vehicle=>this.setState({vehicle_id:vehicle.vehicle_id})}/>
        /*<TouchableOpacity onPress={() => {

          captureScreen({
            format: "jpg",
            quality: 0.8
          })
          .then(
            uri => {console.log("Image saved to", uri),
            alert(uri);
            this.setState({
              srcURL1:uri.file
            })}
          );*/
                //this.refs.viewShot.capture().then(uri => {


                        /*  <Button title="DONE" buttonStyle={{
                            backgroundColor: "#3598DB",
                            width: scale(300),
                            height: verticalScale(50),
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 0,
                            marginTop: verticalScale(220),
                            marginLeft:scale(10),

                            }}
                            onPress={()=>{
                              //global.case_id=1111;

                              const{datetime,description,address}=this.state
                              /*const navigation = this.props.navigation;
                              navigation.getParam('callback')();
                              this.props.navigation.navigate('AccidentDetail')*/
                              //const dateTime =this.state.datetime;
                              //alert(datetime);
                              //alert(description);
                              //alert(address);
                              //alert(global.useId);
                              //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentDescription', {
                                /*fetch(global.APIURL + 'ReportAccidentDescription',{
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                    'user_id':global.useId,
                                    'case_datetime' : datetime,
                                    'description': description,
                                    'address':address
                                  })
                                }).then((response) => response.json()).then((responseJson) => {
                                      if(responseJson.status)
                                      {
                                        global.case_id=responseJson.case_id;
                                        const{datetime,description,address}=this.state
                                        const navigation = this.props.navigation;
                                        navigation.getParam('callback')();
                                        //this.props.navigation.navigate('AccidentDetail')
                                        this.props.navigation.navigate('AccidentDetail')
                                      }
                                      else {
                                        alert(responseJson.msg);
                                      }
                                    })
                                    .catch((error) => {
                                        alert(error);

                                        //you will get error here.
                                    });*/
                            //  }}/>


            /*ImageMarker.markImage({
              src:uri,
              markerSrc:{uri:require('./img/attach_icon.png')},
                X: 100, // left
                Y: 150, // top
                scale: 1,
                markerScale: 0.5,
                quality: 100,
              }).then((path) => {
                console.log('====================================');
                        console.log(path);
                        console.log('====================================');
                        alert("k");
                        this.setState({

                          srcURL: Platform.OS === 'android' ? 'file://' + path : path,
                          show: true
                        })
                        //alert(this.state.srcURL);
                  }).catch((err) => {
                    alert(err+uri);

              })*/
      //console.log("do something with ", uri);
    /* }} style={styles.photoButton}>
      <View>
        <ModelView
          source={{
          model: require('./obj/Hamburger.obj'),
          texture:this.state.srcURL
          }}
          style={styles.modelView}
        scale={1}/>
    </View>
  </TouchableOpacity>
    */
      <Viro3DObject source={require('./obj/Hamburger.obj')}
                            position={[-0.0, -5.5, -1.15]}
                            materials={["Hamburger"]}
                            type="OBJ" />

        <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: 350,
            height: 50,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: 10,
            }}
            onPress={()=>{

            }}/>
    </View>
    );
  }


  /*state = {
    message: ''
  }

  arView = null

  snapshot = () => {
    alert("on snapshot");
    this.arView.getSnapshot(false)
    .then(event => console.log(event))
    .catch(error => console.log(error))
  }

  onLoadModelStart = () => {
    alert('onLoadModelStart')
    console.log('[react-native-3d-model-view]:', 'Load model start.')
  }

  onLoadModelSuccess = () => {
    alert('onLoadModelSuccess')
    console.log('[react-native-3d-model-view]:', 'Load model success.')
  }

  onLoadModelError = () => {
  alert('onLoadModelError')
  console.log('[react-native-3d-model-view]:', 'Load model error.')
  }

  onStart = () => {
    alert('onStart')

    console.log('[react-native-3d-model-view]:', 'AR - Session started.')
  }

  onSurfaceFound = () => {
    alert('onSurfaceFound')
  console.log('[react-native-3d-model-view]:', 'AR - Planar surface found.')
  }

  onSurfaceLost = () => {
    alert('onSurfaceLost')
  console.log('[react-native-3d-model-view]:', 'AR - Planar surface lost.')
  }

  onSessionInterupted = () => {
    alert('onSessionInterupted')
    console.log('[react-native-3d-model-view]:', 'AR - Session interupted.')
  }

  onSessionInteruptedEnded = () => {
    alert('onSessionInteruptedEnded')
    console.log('[react-native-3d-model-view]:', 'AR - Session interupted ended.')
  }

  onPlaceObjectSuccess = () => {
    alert('onPlaceObjectSuccess')
  console.log('[react-native-3d-model-view]:', 'AR - Place object success!')
  }

  onPlaceObjectError = () => {
    alert('onPlaceObjectError')

    console.log('[react-native-3d-model-view]:', 'AR - Place object error.')
  }

  onTrackingQualityInfo = (event) => {
    alert('onTrackingQualityInfo')
    this.setState({ message: event.nativeEvent.presentation })
    console.log('[react-native-3d-model-view]:', 'AR -', event.nativeEvent.id, event.nativeEvent.presentation, event.nativeEvent.recommendation)
  }

  render () {
    const {message} = this.state
    return <View style={styles.container}>
      <ARModelView
        ref={arView => { this.arView = arView }}
        style={styles.modelView}
        source={{zip:require('./obj/Stormtrooper.zip')}}
        scale={.2}
        onLoadModelStart={this.onLoadModelStart}
        onLoadModelSuccess={this.onLoadModelSuccess}
        onLoadModelError={this.onLoadModelError}
        onStart={this.onStart}
        onSurfaceFound={this.onSurfaceFound}
        onSurfaceLost={this.onSurfaceLost}
        onSessionInterupted={this.onSessionInterupted}
        onSessionInteruptedEnded={this.onSessionInteruptedEnded}
        onPlaceObjectSuccess={this.onPlaceObjectSuccess}
        onPlaceObjectError={this.onPlaceObjectError}
        onTrackingQualityInfo={this.onTrackingQualityInfo} />
      <Text style={[styles.controlItem, styles.message]}>{message}</Text>
      <TouchableOpacity onPress={() => { this.arView.restart() }} style={styles.restartButton}>
        <Text style={styles.controlItem}>Restart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.snapshot} style={styles.photoButton}>
        <Text style={styles.controlItem}>Take photo</Text>
      </TouchableOpacity>
    </View>
  }*/
}



const styles = StyleSheet.create({
  modelView: {
    width: '100%',
    height:300,
    },
  containerMain: {
    flexDirection: 'row',
    flex: 1,
    flexWrap:'wrap',
    justifyContent: 'center',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',

  },
  logoBackGround: {
    marginLeft: 15,
    marginRight:  15,
    marginTop: 20,
    width: 150,
    height: 100,
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  MainScreenIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon:
  {
    padding: 10,
  },
  input:
  {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginTop: 20,
    color: '#ffffff',
    width: 300,
    backgroundColor:'transparent',


  },
  SloganText: {
    color: '#FFFFFF',
    fontSize: 45,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
  },
  punchLine: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  logoText: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
    width: scale(160),
    height: verticalScale(30),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownArrow:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
    width: scale(160),
    height: verticalScale(40),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownText:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
    width: scale(160),
    height: verticalScale(200),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  controlItem: {
    color: 'black',
    backgroundColor: '#eee',
    textAlign: 'center',
    fontSize: 14,
    padding: 10
  },
  message: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  restartButton: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  photoButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20
  }
});
