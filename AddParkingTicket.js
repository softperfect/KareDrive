import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
export default class AddParkingTicketScreen extends React.Component
{
  constructor(props,typeTicket){
    super(props)
    const { navigation } = this.props;

    this.state = {typeTicket:navigation.getParam('typeTicket', 'id')};
  }
  render() {

    return (
      <View style={styles.containerMain}>
        <TouchableHighlight underlayColor='transparent'  onPress={()=>{

              this.props.navigation.navigate('ParkingTicketDetails',{typeTicket:this.state.typeTicket,badgeCount:global.notificationList.length})
            }}>
          <View style={styles.logoBackGround}>
            <View style={{marginLeft:0,}} flexDirection="row">
                  <Image source={require('./img/park-tickets-orange_2.png')} style={styles.MainScreenIcon}/>
            </View>
            <Text style={styles.logoText}>Ticket Details</Text>

              </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent'  onPress={()=>{

            this.props.navigation.navigate('ParkingTicketMitigating',{typeTicket:this.state.typeTicket,badgeCount:global.notificationList.length})
          }}>
          <View style={styles.logoBackGround}>
            <View style={{marginLeft:0,}} flexDirection="row">
                  <Image source={require('./img/question_mark_green.png')} style={styles.MainScreenIcon}/>
                    {(  global.isVehicle) && <Image source={require('./img/correct_image.png')} style={styles.rightArrow}/>}

            </View>
            <Text style={styles.logoText}>Mitigating Reasons</Text>
          </View>
        </TouchableHighlight>


        <Button title="SUBMIT" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(350),
            }}
            onPress={()=>{
              global.ticket_id=0;
              global.camera_ticket_id=0;
              if(this.state.typeTicket=='1')
              {
                this.props.navigation.navigate('Success',{typeScreen:'ParkingTicket',badgeCount:global.notificationList.length})
              }
              else {
                this.props.navigation.navigate('Success',{typeScreen:'CameraTicket',badgeCount:global.notificationList.length})
              }
              }}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: 'row',
    flex: 1,
    flexWrap:'wrap',
    justifyContent: 'center',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',

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
