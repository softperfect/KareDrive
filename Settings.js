import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class SettingsScreen extends React.Component
{
  constructor(props){
    super(props)
      this.state = {isPush:true,isVibrate:true,isAuto:true}
      AsyncStorage.getItem("AutoStart").then(value=>{
        if(value!=null)
        {
          if(value=='false')
          {
            this.setState({isAuto:false})
        }
        }
        }
      )
      AsyncStorage.getItem("isVibrate").then(value=>{
        if(value!=null)
        {
          if(value=='false')
          {
          this.setState({isVibrate:false})
          }
        }
        }
      )
      AsyncStorage.getItem("isPush").then(value=>{
        if(value!=null)
        {
          if(value=='false')
          {
            this.setState({isPush:false})
          }
        }
        }
      )
    }
  render() {
    return (
        <View style={styles.containerMain}>
          <View style={styles.containerTextBox}>
            <View flexDirection='row'>
            <Text style={styles.headerDate}>VIBRATE</Text>
            <ToggleSwitch isOn={this.state.isVibrate} onColor="red" offColor="green" lable='' size='small'
              onToggle={(isOn)=>{
                global.isVibrate=isOn;
                AsyncStorage.setItem("isVibrate",isOn.toString());
                this.setState({isVibrate:isOn})}}/>
          </View>
          <Text style={styles.input}>Vibrate when notification received</Text>
          </View>
          <View style={styles.containerTextBox}>
        <View flexDirection='row'>
          <Text style={styles.headerDate}>PUSH NOTIFICATIONS</Text>
          <ToggleSwitch onToggle={(isOn)=>{
              global.isPush=isOn;
                AsyncStorage.setItem("isPush",isOn.toString());
                this.setState({isPush:isOn})}} isOn={this.state.isPush} onColor="red" offColor="green" lable='' size='small'/>
        </View>
        <Text style={styles.input}>Receive push notification on your phone</Text>
        </View>
        <View style={styles.containerTextBox}>
        <View flexDirection='row'>
          <Text style={styles.headerDate}>AUTO-RUN</Text>
          <ToggleSwitch onToggle={(isOn)=>{
                AsyncStorage.setItem("AutoStart",isOn.toString());
                this.setState({isAuto:isOn})}} isOn={this.state.isAuto}  onColor="red" offColor="green" lable='' size='small'/>
        </View>
        <Text style={styles.input}>Receive push notification on your phone</Text>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: 'column',
    flex: 1,
    flexWrap:'wrap',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',

  },
  containerTextBox: {
      flexDirection: 'column',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginTop: moderateScale(20),
    borderBottomColor:'grey',
    borderBottomWidth:.5,
  },
  input:
  {
    paddingBottom: 10,
    marginTop: 1,
    marginBottom: moderateScale(10),
    color: '#000000',
    width: scale(320),
    marginLeft :  moderateScale(15),
    marginRight:moderateScale(15),

    backgroundColor:'transparent',
    height:scale(50),

  },
  headerDate: {
    color: '#000000',
    fontSize: 20,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  moderateScale(15),
    marginTop :  moderateScale(20),
    marginBottom:moderateScale(10),
    width:scale(260),
  },
});
