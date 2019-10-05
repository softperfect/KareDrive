import React, {Component} from 'react';
import {Platform, StyleSheet,ScrollView, Text, View,Image,ImageBackground,TextInput,TouchableHighlight,StatusBar,route} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import RNFetchBlob from 'rn-fetch-blob'
import Pdf from 'react-native-pdf';

const IS_IOS = Platform.OS === 'ios'

const { config, fs } = RNFetchBlob

import PropTypes from 'prop-types';

export default class ShowPDFScreen extends React.Component
{
  constructor(props,typeScreen){
    super(props)
    this.state = {typeSuccess:props.typeScreen};
    const { navigation } = this.props;
    this.pdf = null;
  }
  componentDidMount()
  {
    StatusBar.setHidden(true);

  }
  render() {
    const { navigation } = this.props;
    const searchType=navigation.getParam('path', 'id');
    //salert(searchType);
    let source = {uri:'file://' + searchType,cache:true};

    return (

      <ScrollView style={styles.containerMain}>
          <StatusBar hidden />
          <Pdf ref={(pdf) => {
                this.pdf = pdf;
            }}
              source={source}
               scale={2}
              style={{width:scale(320),height:verticalScale(500),marginLeft: moderateScale(20)}}
              onLoadComplete={(numberOfPages,filePath)=>{

              }}
              onError={(error)=>{
                alert(error);
              }}
              />
          <Button title="DONE" buttonStyle={{
                backgroundColor: "red",
                width: scale(320),
                height: verticalScale(50),
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 0,
                marginTop: moderateScale(40),
                marginBottom: moderateScale(20),
                marginLeft: scale(5),
              }}
                  onPress={()=>{
                    const regNumber=navigation.getParam('typeScreen', 'id');
                    if(regNumber=="1")
                    {
                      this.props.navigation.navigate('CarSearchManagement');
                    }
                    else {
                      this.props.navigation.navigate('CarSearchHistory');
                    }
                  }}/>
    </ScrollView>

    );
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
  pdf:
  {
    width:scale(320)
  },
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,
  },
  backGroundImage: {
    alignItems: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },

  logoImage: {
    width: 200,
    height: 200,
    marginTop: '30%',
  },


  Success: {
    color: 'white',
    fontSize:35,
    fontWeight: 'bold',
    textAlign:'center',
    fontWeight: 'normal',
    marginTop:  10,
  },
  confirmationText: {
    color: 'white',
    fontSize:25,
    textAlign:'center',
    fontWeight: 'normal',
    margin:  5,
  },
});
