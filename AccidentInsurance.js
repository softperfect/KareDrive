import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView,View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class AccidentInsuranceScreen extends React.Component
{
  constructor(props){
    super(props)
    if(global.isInsurace)
    {
      this.state =global.insuranceData;
    }
    else {
    this.state = {datetime_user_exp:"2019-01-01",ins_user_name:'',  ins_user_type:'',datetime_third_exp:"2019-01-01",ins_third_name:'',  ins_third_type:'',}
    }
  }
  render() {
    return (
      <ScrollView style={styles.containerMain}>
        <Text style={styles.headerDate}>My insurance details:</Text>
        <TextInput placeholderTextColor={'black'}
          value={this.state.ins_user_name}
          onChangeText={ins_user_name=>this.setState({ins_user_name})}
          underlineColorAndroid="transparent" style={styles.input}
          placeholder="Insurance Agency" editable={true} />
          <TextInput placeholderTextColor={'black'}
            value={this.state.ins_user_type}
            onChangeText={ins_user_type=>this.setState({ins_user_type})}
            underlineColorAndroid="transparent" style={styles.input} placeholder="Type of Insurance" editable={true} />
          <Text style={styles.expiryDate}>Policy Expiry Date</Text>

        <DatePicker
            style={{width: scale(335),marginTop:20,
            marginBottom :30,}}
         mode="date"
         placeholder="Expiry date"
         date={this.state.datetime_user_exp}
         format="YYYY-MM-DD"
         placeholderTextColor='black'
         minDate="2016-05-01"
         maxDate="2099-06-01"
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         value={this.state.datetime_user_exp}
         onDateChange={(date)=>{this.setState({datetime_user_exp:date})}}
         customStyles={{
            dateInput: {
              marginLeft: moderateScale(15),
              width:scale(300),
              height:verticalScale(50),
              borderColor:'transparent',
              backgroundColor:'white',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingTop: moderateScale(15),
paddingLeft: moderateScale(15),
              },
            dateIcon: {
              position: 'absolute',
              left: scale(285),
              top: scale(2),
              marginLeft: 0,
              backgroundColor:'#ffbf37',
              height:verticalScale(32),
              width:scale(40),
              resizeMode:'contain',
              borderRadius:scale(20),

            }}}
         />

        <Text style={styles.headerDate}>Third Party Insurance:</Text>
        <TextInput placeholderTextColor={'black'}
          value={this.state.ins_third_name}
          onChangeText={ins_third_name=>this.setState({ins_third_name})}
          underlineColorAndroid="transparent" style={styles.input} placeholder="Insurance Agency" editable={true} />
        <TextInput placeholderTextColor={'black'}
          value={this.state.ins_third_type}
          onChangeText={ins_third_type=>this.setState({ins_third_type})}
          underlineColorAndroid="transparent" style={styles.input} placeholder="Type of Insurance" editable={true} />
          <Text style={styles.expiryDate}>Policy Expiry Date</Text>

        <DatePicker
            style={{width: scale(335),marginTop:20,
            marginBottom :20,}}
              mode="date"
         placeholder="Expiry date"
         placeholderTextColor='black'
         placeholderTextAlign='left'
         date={this.state.datetime_third_exp}
         format="YYYY-MM-DD"
         minDate="2016-05-01"
         maxDate="2099-06-01"
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         value={this.state.datetime_third_exp}
         onDateChange={(date)=>{this.setState({datetime_third_exp:date})}}

         customStyles={{
            dateInput: {
              marginLeft: moderateScale(15),
              width:scale(300),
              height:verticalScale(50),
              borderColor:'transparent',
              backgroundColor:'white',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingTop: moderateScale(15),
              paddingLeft: moderateScale(15),
            },
            dateIcon: {
              position: 'absolute',
              left: scale(285),
              top: scale(2),
              marginLeft: 0,
              backgroundColor:'#ffbf37',
              height:verticalScale(32),
              width:scale(40),
              resizeMode:'contain',
              borderRadius:moderateScale(20),
              borderRadius:scale(20),
            }}}
         />
        <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: verticalScale(20),
            marginBottom:  moderateScale(30),
            marginLeft:moderateScale(0),
            marginRight:moderateScale(0),
          }}
            textStyle={{ fontWeight:'bold'}}
              onPress={()=>{
              const{datetime_user_exp,ins_user_name,  ins_user_type,datetime_third_exp,ins_third_name,ins_third_type}=this.state
              global.isInsurace=true;
              const navigation = this.props.navigation;
                navigation.getParam('callback')();
              global.insuranceData=this.state;
              this.props.navigation.navigate('AccidentDetail')

              //this.props.navigation.navigate('AccidentDetail')
            //  alert(datetime_user_exp);
            //  alert(ins_user_name);
            // alert(ins_user_type);
            //  alert(datetime_third_exp);
            //  alert(ins_third_name);
            //  alert(ins_third_type);
              //alert(global.useId);
              //alert(global.case_id);
              //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentInsuranceDetail', {
              /*fetch(global.APIURL + 'ReportAccidentInsuranceDetail',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'user_id':global.useId,
                    'case_id':global.case_id,
                    'user_ins_agency' : ins_user_name,
                    'user_ins_type' : ins_user_type,
                    'user_ins_expiry' : datetime_user_exp,
                    'thirdparty_ins_agency' : ins_third_name,
                    'thirdparty_ins_type' : ins_third_type,
                    'thirdparty_ins_expiry' : datetime_third_exp,

                  })
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
                    });*/
            }}/>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,

  },
  logoBackGround: {
    marginLeft: moderateScale(15),
    marginRight:  moderateScale(15),
    marginTop: moderateScale(20),
    width: scale(150),
    height: verticalScale(100),
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
    margin: moderateScale(10),
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(5),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),
    color: '#000000',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(50),
    paddingLeft: moderateScale(15),
    fontSize: moderateScale(14),


  },
  headerDate: {
    color: '#000000',
    fontSize: 18,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  moderateScale(15),
    marginTop :  moderateScale(20),
    marginBottom: 0,
  },
  expiryDate: {
    color: '#000000',
    fontSize: moderateScale(12),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(10),
    marginLeft:  moderateScale(15),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(15),
  },
});
