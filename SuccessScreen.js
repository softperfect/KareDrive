import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight,StatusBar,route} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import PropTypes from 'prop-types';

export default class SuccessScreen extends React.Component
{
  constructor(props,typeScreen){
    super(props)
    this.state = {typeSuccess:props.typeScreen};
  }
  componentDidMount()
  {
    StatusBar.setHidden(true);


    setTimeout(()=>{
      const { navigation } = this.props;
      if(navigation.getParam('typeScreen', 'id')=='ParkingTicket')
      {
          this.props.navigation.navigate('ParkingManagement')
      }
      else if(navigation.getParam('typeScreen', 'id')=='CameraTicket')
      {
          this.props.navigation.navigate('CameraTicketManagement')
      }
      else if(navigation.getParam('typeScreen', 'id')=='BailifIssue')
      {
          this.props.navigation.navigate('PAYGManagement')
      }
      else if(navigation.getParam('typeScreen', 'id')=='DrivingOffence')
      {
          this.props.navigation.navigate('PAYGManagement')
      }

      else if(navigation.getParam('typeScreen', 'id')=='PCNIssueCase')
      {
          this.props.navigation.navigate('PAYGManagement')
      }
      else
      {
      this.props.navigation.navigate('Home')
      }
    },2000)
  }
  render() {
    const { navigation } = this.props;

    return (

      <View style={styles.container}>
          <StatusBar hidden />
          <ImageBackground style={styles.backGroundImage} source={require('./img/mainbg.png')} >
          <Image source={require('./img/app_logo.png')} style={styles.logoImage}/>
          <Text style={styles.Success}>Success</Text>
          {(navigation.getParam('typeScreen', 'id')=='ForgotPassword') &&
            <Text style={styles.confirmationText}>Reset email sent</Text>
          }
          {(navigation.getParam('typeScreen', 'id')=='SignUp') &&
            <Text style={styles.confirmationText}>Successful</Text>
          }
          {(navigation.getParam('typeScreen', 'id')=='ChangePassword') &&
            <Text style={styles.confirmationText}>Password Changed</Text>
          }
          {(navigation.getParam('typeScreen', 'id')=='ParkingTicket') &&
            <Text style={styles.confirmationText}>Ticket submitted</Text>
          }
          {(navigation.getParam('typeScreen', 'id')=='CameraTicket') &&
            <Text style={styles.confirmationText}>Ticket submitted</Text>
          }
          {(navigation.getParam('typeScreen', 'id')=='PCNIssueCase') &&
            <Text style={styles.confirmationText}>
              Case Received
              Someone will be in contact with you
            </Text>
          }
          {(navigation.getParam('typeScreen', 'id')=='BailifIssue') &&
            <Text style={styles.confirmationText}>
              Case Received
              Someone will be in contact with you
            </Text>
          }
          {(navigation.getParam('typeScreen', 'id')=='DrivingOffence') &&
            <Text style={styles.confirmationText}>
              Case Received
              Someone will be in contact with you
            </Text>
          }


          </ImageBackground>
    </View>

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
