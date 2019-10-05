import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight,StatusBar,route,ActivityIndicator} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import RNFetchBlob from 'rn-fetch-blob'
import Pdf from 'react-native-pdf';
import {PermissionsAndroid} from 'react-native';

const IS_IOS = Platform.OS === 'ios'

const { config, fs } = RNFetchBlob

import PropTypes from 'prop-types';

export default class CarSearchDownloadScreen extends React.Component
{
  constructor(props,typeScreen){
    super(props)
    this.state = {typeSuccess:props.typeScreen,loading:false};
    const { navigation } = this.props;
    this.pdf = null;
  }
  componentDidMount()
  {
    StatusBar.setHidden(true);

  }

  render() {
    const { navigation } = this.props;
    let source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};

    return (

      <View style={styles.container}>
          <StatusBar hidden />
          <ImageBackground style={styles.backGroundImage} source={require('./img/mainbg.png')} >
            <Text style={styles.Success}>Goodnews! Your report has been generated</Text>

          <Image source={require('./img/app_logo.png')} style={styles.logoImage}/>
            {this.state.loading &&
              <View style={styles.loading}>
          <ActivityIndicator size='large' color="black" />

          </View>
          }
          <Button title="DOWNLOAD NOW" buttonStyle={{
                backgroundColor: "red",
                width: scale(320),
                height: verticalScale(50),
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 0,
                marginTop: moderateScale(100),
                marginBottom: moderateScale(20),
                marginLeft: scale(5),
              }}
              textStyle={{ fontWeight:'bold'}}
                  onPress={()=>{
                    //this.refs.showProgress.animating=true;
                    this.setState({loading:true});
                    const regNumber=navigation.getParam('typeScreen', 'id');
                    const searchType=navigation.getParam('searchType', 'id');
                    fetch(global.APIURL + 'AddCarSearch',{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        'user_id':global.useId,
                        'vehicle_search':regNumber,
                        'search_category':searchType,
                        })
                    }).then((response) => response.json()).then((responseJson) => {

                            if(responseJson.status)
                          {
                            let PictureDir = '';

                            if (IS_IOS) {
                              PictureDir=fs.dirs.DocumentDir; // this is the pictures directory. You can check the available directories in the wiki.
                              let options = {
                              fileCache: true,
                              appendExt:'pdf',
                              path:PictureDir +"/" + regNumber + ".pdf",
                              }
                              config(options).fetch('GET', responseJson.pdf_file_path).then((res) => {
                              // do some magic here

                                //alert('Dowloaded on path ' +  res.path());
                                this.props.navigation.navigate('ShowPDF',{typeScreen:'1',path:res.path()});
                              })

                            }
                            else {
                              PictureDir=fs.dirs.PictureDir;
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
                                  console.log('You can use the camera');
                                  let options = {
                                  fileCache: true,
                                  appendExt:'pdf',
                                  path:PictureDir +"/" + regNumber + ".pdf",
                                  }
                                  config(options).fetch('GET', responseJson.pdf_file_path).then((res) => {
                                  // do some magic here

                                    //alert('Dowloaded on path ' +  res.path());
                                    this.props.navigation.navigate('ShowPDF',{typeScreen:'1',path:res.path()});
                                  })

                                } else {
                                  //console.log('Camera permission denied');
                                  alert("Permission denied")
                                }
                              })

                              } catch (err) {
                                console.warn(err);
                                alert("Error")
                              }
                            }

                          }
                          else {
                            alert(responseJson.msg);
                          }
                        })
                        .catch((error) => {
                            alert(error);

                            //you will get error here.
                        });
                  }}/>

          </ImageBackground>
    </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#3598DB',
    flex: 1,
    alignContent: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pdf:
  {
    width:scale(320)
  },
  backGroundImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },

  logoImage: {
    width: scale(200),
    height: verticalScale(200),
    marginTop: verticalScale(40),
  },


  Success: {
    color: 'white',
    fontSize:20,
    fontWeight: 'bold',
    textAlign:'center',
    fontWeight: 'normal',
    marginTop: verticalScale(40),
  },
  confirmationText: {
    color: 'white',
    fontSize:25,
    textAlign:'center',
    fontWeight: 'normal',
    margin:  5,
  },
});
