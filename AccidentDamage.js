import React, {Component} from 'react';
import {CameraRoll,Platform,StyleSheet, ScrollView,TouchableOpacity,Text,View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
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
import {captureScreen,captureRef} from "react-native-view-shot";
import ViewShot from "react-native-view-shot";
import RNFetchBlob from 'rn-fetch-blob'
const textURL=require('./obj/truck_color-blue.jpg');
const IS_IOS = Platform.OS === 'ios'
import {PermissionsAndroid} from 'react-native';

import {
  ViroARScene,
  ViroScene,
  ViroImage,
  ViroAmbientLight,
  ViroARPlane,
  ViroMaterials,
  ViroNode,
  ViroUtils,
  ViroQuad,
  ViroSpotLight,
  Viro3DObject,
  ViroText,
  ViroAnimations,
  ViroSceneNavigator,
  ViroARSceneNavigator,
  ViroVRSceneNavigator,
  Viro3DSceneNavigator,
} from 'react-viro';

export default class AccidentDamageScreen extends React.Component
{
  constructor() {
    super();
    if(global.isDamage)
    {
      this.state =global.damageData;
    }
    else {
    this.state = {
      trackingInitialized: false,
      isLoading: false,
      image: '',
      vehicle_Type:'Sedan',
      srcURL:'./obj/truck_color-blue.jpg',
      srcURLObjURL:'./obj/L200-OBJ.obj',
      snapShots:[],
    }
  }
  }
  onCapture = uri => {
    //alert(uri);
    console.log("do something with ", uri);


  }
  componentWillMount () {

  }
  componentDidMount () {

  }
  addImageToImageList = (uri) => {
    let snapShotsList = this.state.snapShots;
    snapShotsList.push(uri);
    this.setState({ snapShots:snapShotsList})
  }
  onModelStart=()=>{
    //alert("Started");
  }
  onModelSuccess=()=>{

    this.refs.mdlView.rotateUp();

  }
  onFileSave = (path) => {
    //alert(path.nativeEvent.path);
    CameraRoll.saveToCameraRoll(path.nativeEvent.path)
    .then(r => {
        //alert(r);
        this.addImageToImageList(r)
        //this.refs.mdlView.clearCheckMark();
      //alert(r)
    })
    .catch(err => console.log('err:', err))
  }
  onGestureRecognizer = (x,y) => {
    this.refs.mdlView.setPlay(false);
    //alert("ok")
    //alert(x.nativeEvent.left);
    /*var tempURL= 'file://' + this.state.srcURL;

    ImageMarker.markImage({
      src:this.state.srcURL!='' ? tempURL:'./model.jpg' ,
      markerSrc:require('./img/app_logo.png'),
        X: x.nativeEvent.left, // left
        Y: x.nativeEvent.top, // top
        scale: 1,
        markerScale: 0.5,
        quality: 100,


      }).then((path) => {
        console.log('====================================');
                //console.log(path);
                alert(path);
                if(path!=null)
                {
                  this.setState({srcURL:path
                  })
                }

          }).catch((err) => {
            alert(err);

      })*/
  }
  render() {
    //alert(this.state.srcURL);
    //const textURL=this.state.srcURL;
    //alert(textURL);
    var imageList=[];
    var intI=0;
    for(let snapShot of this.state.snapShots)
    {
      imageList.push(

            <Image key={'ViewImg' + intI} source={{uri:snapShot}} style={styles.snapshot}/>)
          intI=intI+1
    }
var tempURL= '';
var tempObjURL='';
var scale1=1;
//alert(this.state.vehicle_Type)
if(this.state.vehicle_Type=='Hatchback')
{
  tempURL= 'https://github.com/test8git/test3dmodal/blob/master/car.obj?raw=true';
  tempObjURL='https://github.com/test8git/test3dmodal/blob/master/car.png?raw=true';
  if (IS_IOS) {
    scale1=1;
  }
  else {
      scale1=3;
  }
}
else if(this.state.vehicle_Type=='Sedan')
{
     tempURL= 'https://github.com/test8git/test3dmodal/blob/master/lexus.obj?raw=true';
     tempObjURL='https://github.com/test8git/test3dmodal/blob/master/lexus.jpg?raw=true';
     if (IS_IOS) {
       scale1=1;
    }
    else {
      scale1=3;

    }
}
else if(this.state.vehicle_Type=='Truck')
{
  tempURL= 'https://github.com/test8git/test3dmodal/blob/master/L200_OBJ.obj?raw=true';
  tempObjURL='https://github.com/test8git/test3dmodal/blob/master/truck_color_blue.jpg?raw=true';
  if (IS_IOS) {
    scale1=1;
  }
  else {
   scale1=3;
 }
}
else {
  tempURL= 'https://github.com/test8git/test3dmodal/blob/master/Jeep_Renegade_2016.obj?raw=true';
  tempObjURL='https://github.com/test8git/test3dmodal/blob/master/car_jeep_ren.jpg?raw=true';
  if (IS_IOS) {
    scale1=1;
  }
  else {
    scale1=3;
  }
}
//alert(tempURL);
  //const textURL=require('./obj/model.jpg');
  let iOSModal;
   iOSModal =   <ViewShot ref="viewShot">

      <ModelView ref="mdlView"
      source={{
        //zip:'https://github.com/test8git/test3dmodal/blob/master/Mercedes_sedan.zip?raw=true'
        //model: 'https://github.com/test8git/test3dmodal/blob/master/L200_OBJ.obj?raw=true',
        //texture: 'https://github.com/test8git/test3dmodal/blob/master/truck_color_blue.jpg?raw=true'
        model: tempURL,
        texture: tempObjURL
      }}
  style={styles.modelView}
  onGestureRecognizer={this.onGestureRecognizer}
  onLoadModelStart={this.onModelStart}
  onLoadModelSuccess={this.onModelSuccess}
scale={scale1}/>
</ViewShot>;
const androidModal = <ViewShot ref="viewShot">

  <ModelView ref="mdlView"
  source={{
    //zip:'https://github.com/test8git/test3dmodal/blob/master/Mercedes_sedan.zip?raw=true'
    //model: 'https://github.com/test8git/test3dmodal/blob/master/L200_OBJ.obj?raw=true',
    //texture: 'https://github.com/test8git/test3dmodal/blob/master/truck_color_blue.jpg?raw=true'
    model: tempURL,
    texture: tempObjURL
  }}
style={styles.modelView}
onGestureRecognizer={this.onGestureRecognizer}
scale={scale1}/>
</ViewShot>;
//alert(tempURL);

let modalView;
        if (IS_IOS) {
            modalView = iOSModal
        } else {
            //alert(require('./obj/L200-OBJ.obj'));
            modalView = androidModal
        }


    return (


      <ScrollView>
        <Text style={styles.vehicleType}>Select vehicle type</Text>

          <Dropdown  dropdownOffset={{top:verticalScale(15),left:0}} label='' value='Sedan' data={global.vehicleTypes}
          onChangeText={vehicle_Type=>{
            if (IS_IOS) {
            }
            else {


              this.refs.mdlView.removeCheckMark();

            }
            this.setState({vehicle_Type});

        }
        }
          containerStyle={styles.dropdown} inputContainerStyle={{borderBottomColor: 'transparent'}}/>
        {this.state.vehicle_Type=='Hatchback' && <ViewShot ref="viewShot">

          <ModelView ref="mdlView"
          source={{
            //zip:'https://github.com/test8git/test3dmodal/blob/master/Mercedes_sedan.zip?raw=true'
            //model: 'https://github.com/test8git/test3dmodal/blob/master/L200_OBJ.obj?raw=true',
            //texture: 'https://github.com/test8git/test3dmodal/blob/master/truck_color_blue.jpg?raw=true'
            model: tempURL,
            texture: tempObjURL
          }}
        style={styles.modelView}
        onGestureRecognizer={this.onGestureRecognizer}
        onFileSave={this.onFileSave}
        scale={scale1}/>
        </ViewShot>}
        {this.state.vehicle_Type=='Sedan' && <ViewShot ref="viewShot">

          <ModelView ref="mdlView"
          source={{
            //zip:'https://github.com/test8git/test3dmodal/blob/master/Mercedes_sedan.zip?raw=true'
            //model: 'https://github.com/test8git/test3dmodal/blob/master/L200_OBJ.obj?raw=true',
            //texture: 'https://github.com/test8git/test3dmodal/blob/master/truck_color_blue.jpg?raw=true'
            model: tempURL,
            texture: tempObjURL
          }}
        style={styles.modelView}
        onGestureRecognizer={this.onGestureRecognizer}
        onFileSave={this.onFileSave}
        onLoadModelSuccess={this.onModelSuccess}
        scale={scale1}/>
        </ViewShot>}
        {this.state.vehicle_Type=='SUV' && <ViewShot ref="viewShot">

          <ModelView ref="mdlView"
          source={{
            //zip:'https://github.com/test8git/test3dmodal/blob/master/Mercedes_sedan.zip?raw=true'
            //model: 'https://github.com/test8git/test3dmodal/blob/master/L200_OBJ.obj?raw=true',
            //texture: 'https://github.com/test8git/test3dmodal/blob/master/truck_color_blue.jpg?raw=true'
            model: tempURL,
            texture: tempObjURL
          }}
        style={styles.modelView}
        onGestureRecognizer={this.onGestureRecognizer}
        onFileSave={this.onFileSave}
        scale={scale1}/>
        </ViewShot>}
        {this.state.vehicle_Type=='Truck' && <ViewShot ref="viewShot">

          <ModelView ref="mdlView"
          source={{
            //zip:'https://github.com/test8git/test3dmodal/blob/master/Mercedes_sedan.zip?raw=true'
            //model: 'https://github.com/test8git/test3dmodal/blob/master/L200_OBJ.obj?raw=true',
            //texture: 'https://github.com/test8git/test3dmodal/blob/master/truck_color_blue.jpg?raw=true'
            model: tempURL,
            texture: tempObjURL
          }}
        style={styles.modelView}
        onGestureRecognizer={this.onGestureRecognizer}
        onFileSave={this.onFileSave}
        scale={scale1}/>
        </ViewShot>}

          <TouchableOpacity onPress={() => {
            /*  captureScreen({format:"jpg",
              quality:0.8}).then(uri => {
                  //alert(uri);
                  //this.addImageToImageList(uri)
                  //this.refs.mdlView.clearCheckMark();
                CameraRoll.saveToCameraRoll(uri)
                .then(r => {
                    //alert(r);
                    this.addImageToImageList(r)
                    this.refs.mdlView.clearCheckMark();
                  //alert(r)
                })
                .catch(err => console.log('err:', err))


              })*/
               if (IS_IOS) {
            this.refs.viewShot.capture().then(uri => {
                //alert(uri);
                //this.addImageToImageList(uri)
                //this.refs.mdlView.clearCheckMark();
              CameraRoll.saveToCameraRoll(uri)
              .then(r => {
                  //alert(r);
                  this.addImageToImageList(r)
                  this.refs.mdlView.clearCheckMark();
                //alert(r)
              })
              .catch(err => console.log('err:', err))


            })
          }
          else {

            try {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: 'DriveKare App Storage Permission',
                  message:
                    'DriveKare App needs access to your storage ' +
                    'to download the file',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              ).then((granted)=>
            {
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.refs.mdlView.clearCheckMark();

              } else {
                //console.log('Camera permission denied');
                alert("Permission denied")
              }
            })

            } catch (err) {
              console.warn(err);
              alert(err)
            }

          }
            }}>
            <Image source={require('./img/correct_icon_with_circle.png')} style={styles.userIcon}/>

          </TouchableOpacity>
          <ScrollView horizontal={true} style={styles.ImageList}>
          {imageList}
</ScrollView>
          <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(20),
            marginLeft:moderateScale(0),
            marginRight:moderateScale(0),
          }}
            textStyle={{ fontWeight:'bold'}}
            onPress={()=>{
             if (IS_IOS) {
             }
             else {
               this.refs.mdlView.removeCheckMark();
             }
              const{trackingInitialized,
              isLoading,
              image,
              vehicle_Type,
              srcURL,
              snapShots,}=this.state
              global.isDamage=true;
              const navigation = this.props.navigation;
              navigation.getParam('callback')();
              global.damageData=this.state;
              this.props.navigation.navigate('AccidentDetail')

              //this.props.navigation.navigate('AccidentDetail')
              //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentPeopleInvolved', {
            /*  let formData=new FormData();
              formData.append("user_id",global.useId);
              formData.append("case_id",global.case_id);
              formData.append("vehicle_type",vehicle_Type);
              formData.append("vehicle_owner",'my vehicles');
              var intI=0;
              for(let snapShot of this.state.snapShots)
              {
                formData.append("damage_image[]",{name:'testImage.png',
                uri:snapShot,
                type:'image/png'});
                    intI=intI+1
              }
                //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentVehicleInvolved', {



              fetch(global.APIURL + 'ReportAccidentDamages',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:formData
                }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.status)
                      {
                        //global.case_id=responseJson.case_id;
                        navigation.getParam('callback')();
                        this.props.navigation.navigate('AccidentDetail')
                      }
                      else {
                        alert(responseJson.msg);
                      }
                    })
                    .catch((error) => {
                        alert(error);

                        //you will get error here.
                    });

              //this.refs.viewShot.capture().then(uri => {
                //alert(uri);
                //console.log("do something with ", uri);
            //  })
              /*captureScreen({
          format: "jpg",
          quality: 0.8
        })
        .then(
          uri =>{
            //alert(uri);
            this.setState({
            image: uri
          })

            console.log("Image saved to", uri)},
          error => console.error("Oops, snapshot failed", error)
        );*/

            }}/>
        </ScrollView>


    );

  }

}



const styles = StyleSheet.create({
  modelView: {
    marginTop:moderateScale(20),
    width: '100%',
    height:verticalScale(300),
    zIndex: 0,
    },
  containerMain: {
    flexDirection: 'row',
    flex: 1,
    flexWrap:'wrap',
    justifyContent: 'center',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',

  },
  vehicleType: {
    color: '#000000',
    fontSize: moderateScale(12),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(30),
    marginLeft:  moderateScale(15),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(15),
  },
  snapshot:
  {
    height: verticalScale(100),
    width: scale(100,)
  },
  ImageList: {
    flexDirection: 'row',
    marginLeft: moderateScale(15),
    flexWrap:'wrap',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',
    height:verticalScale(100),
    width: scale(320),
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
  userIcon: {
    width: scale(30),
    height:scale( 30),
    left: scale(280),
    //marginBottom: moderateScale(0),
},
  preview: {
    width: scale(320),
    height:verticalScale(300),
    position: 'absolute',
    top:verticalScale(0),
    left:scale( 0),
    textAlignVertical:'top',
    resizeMode:'contain',
    opacity:.5,
    zIndex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  touchButton:
  {
    zIndex: 1,
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
    marginTop: moderateScale(5),
    marginBottom: moderateScale(20),
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    width: scale(300),
    height: verticalScale(30),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownArrow:
  {
    marginTop: moderateScale(5),
    marginLeft: moderateScale(15),
    height: verticalScale(40),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownText:
  {
    marginTop: moderateScale(5),
    marginLeft: moderateScale(15),
    width: scale(160),
    height: verticalScale(60),
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
