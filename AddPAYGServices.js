import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class AddPAYGServiceScreen extends React.Component
{
  constructor(props){
    super(props)
  }
  render() {

    return (
      <View style={styles.containerMain}>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{

              this.props.navigation.navigate('BailiffIssue',{badgeCount:global.notificationList.length})
            }}>
          <View style={styles.logoBackGround}>
                  <Image source={require('./img/bailiff.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Bailiff Issues</Text>

        </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{
            this.props.navigation.navigate('PCNIssue',{badgeCount:global.notificationList.length})
          }}>
          <View style={styles.logoBackGround}>
            <Image source={require('./img/AddTicket.png')} style={styles.MainScreenIcon}/>

            <Text style={styles.logoText}>PCN Issues</Text>
          </View>
            </TouchableHighlight>
          <TouchableHighlight underlayColor='transparent' onPress={()=>{
              this.props.navigation.navigate('DrivingOffenceIssue',{badgeCount:global.notificationList.length})
            }}>
          <View style={styles.logoBackGround}>
            <Image source={require('./img/driving_offences.png')} style={styles.MainScreenIcon}/>

            <Text style={styles.logoText}>Driving Offences</Text>
          </View>
        </TouchableHighlight>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: 'row',
    flex: 1,
    flexWrap:'wrap',
    justifyContent:'flex-start',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',
    paddingLeft:moderateScale(15),
  },
  logoBackGround: {
    marginLeft: moderateScale(10),
    marginRight:  moderateScale(10),
    marginTop: moderateScale(20),
    width: scale(140),
    height:verticalScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent:'center',
  },
  MainScreenIcon: {
    width: scale(75),
    height:verticalScale( 60),
    justifyContent: 'center',
    alignItems:'center',
    resizeMode:'contain',
    alignSelf: 'center',
  },
  rightArrow: {
    width: scale(20),
    height:verticalScale( 20),
    position: 'absolute',
    top:verticalScale(-10),
    left:scale( 80),
    textAlignVertical:'top',
    resizeMode:'contain',

  },
  logoText: {
    color: 'grey',
    fontSize: moderateScale(18),
    textAlign: 'center',
    fontWeight: 'normal',
  },
});
