import React, {Component} from 'react';
import {Platform, StyleSheet,FlatList, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class NotificationDetailScreen extends React.Component
{
  constructor(props){
    super(props)
  }
  render() {
    var notifications=[];
    var intC=0;
    for(let notification of global.notificationList)
    {
      notifications.push(

        <View key={intC+'v2'} styles={styles.notificationView} flexDirection='row'>
          <Image key={intC+'v21'} source={require('./img/track_1.png')} style={styles.userIcon}/>
          <View key={intC+'v211'} flexDirection='column' styles={{marginBottom:0,marginTop:0}}>
            <Text key={intC+'v222'} style={styles.headerDate}>{notification.notification_heading} </Text>
            <Text key={intC+'v2333'} style={styles.statusText}>{notification.notification_message} </Text>
          </View>
          <Image key={intC+'v23332'} source={require('./img/clock_icon.png')} style={styles.clockIcon}/>
          <Text key={intC+'v2333'} style={styles.hrsText}>{notification.notification_duration} </Text>
        </View>)
      intC=intC+1;
    }
    return (
      <View style={styles.containerMain}>
        {notifications}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,

  },
  notificationView:
  {

    backgroundColor: 'red'
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
  MainScreenIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    width: scale(45),
    height:verticalScale( 45),
    marginTop:moderateScale(20),
    marginLeft: moderateScale(20),
    borderRadius:22.5,
    backgroundColor: 'orange',
    resizeMode: 'contain',
  },
  userIconView: {
    width: scale(45),
    height:verticalScale( 45),
    marginTop:moderateScale(20),
    marginLeft: moderateScale(20),
    borderRadius:50,
    backgroundColor: 'red',
  },
  clockIcon: {
    width: scale(20),
    height:verticalScale( 20),
    marginTop:moderateScale(35),
    marginLeft: moderateScale(20),
  },
  headerDate: {
    color: '#000000',
    fontSize: 20,
    textAlign:'center',
    fontWeight: 'normal',
    marginLeft :  moderateScale(20),
    marginTop :  moderateScale(20),
    marginBottom: moderateScale(5),
    width:scale(170),
  },
  statusText: {
    color: '#000000',
    fontSize: 12,
    textAlign:'center',
    fontWeight: 'normal',
    marginLeft :  moderateScale(20),
    marginTop :  0,
    marginBottom: moderateScale(20),
    width:scale(170),
  },
  hrsText: {
    color: '#000000',
    fontSize: 12,
    textAlign:'center',
    fontWeight: 'normal',
    marginLeft :  moderateScale(10),
    marginTop:moderateScale(35),
    width:scale(40),
  },
});
