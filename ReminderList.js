import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class ReminderListScreen extends React.Component
{
  constructor(props){
    super(props)
      this.state = {reminderList:[],}
      this.getReminders();
      //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/TrackClaim', {

  }
  getReminders()
  {
    fetch(global.APIURL + 'MyReminders?user_id='+global.useId,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }).then((response) => response.json()).then((responseJson) => {
  if(responseJson.status)
  {

      this.setState({reminderList:responseJson.reminders})
  }
  else {
        alert(responseJson.msg);
  }
}).catch((error) => {
    alert(error);
});
}
removeReminder(reminder_id)
  {
    fetch(global.APIURL + 'RemoveReminder',{
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                      'user_id':global.useId,
                      'reminder_id':reminder_id,
                    })
                  }).then((response) => response.json()).then((responseJson) => {

                          if(responseJson.status)
                        {
                          this.getReminders();
                        }
                        else {
                          alert(responseJson.msg);
                        }
                      })
                      .catch((error) => {
                          alert(error);

                          //you will get error here.
                      });
  }
  render() {
    var reminders=[];
    var intC=0;
    for(let reminder of this.state.reminderList)
    {
      reminders.push(
        <View key={"View" + intC.toString()} flexDirection='row' styles={{marginBottom:0,marginTop:30}}>
        <Text key={"txt" + intC.toString()}  style={styles.headerDate}> Vehicle no :{reminder.vehicle_reg_number} </Text>
        <Button key={"Button" + intC.toString()}  title="REMOVE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(100),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: 10,
            }}
            onPress={()=>this.removeReminder(reminder.remainder_id)}
            />

            </View>)
            intC=intC+1;
    }
    return (
      <ScrollView horizontal={false}  style={styles.containerMain}>
          {reminders}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,


  },
  headerDate: {
    color: '#000000',
    fontSize: 15,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  moderateScale(20),
    alignSelf: 'center',
    width:scale(200),

  },
});
