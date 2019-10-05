import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight,TouchableOpacity} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'


export default class AddReminderScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {vehicle_id:'0',mot_exp_date:"2019-01-01",road_tax_exp_date:"2019-01-01",insurance_exp_date:"2019-01-01",}

  }
  componentDidMount()
  {

  }



  render() {

    return (
      <ScrollView horizontal={false} style={styles.containerMain}>
        <Dropdown dropdownOffset={{top:verticalScale(5),left:0}}
          label='' value='Select Vehicle' data={global.vehicles}
          valueExtractor={({vehicle_id})=>vehicle_id} pickerStyle={styles.dropdownText}
          labelExtractor={({vehicle_reg_number})=>vehicle_reg_number} pickerStyle={styles.dropdownText}
          containerStyle={styles.dropdown}
          onChangeText={(index)=>{this.setState({vehicle_id:index})}}
          propsExtractor ={({vehicle})=>vehicle} inputContainerStyle={{borderBottomColor: 'transparent'}}/>
          <Text style={styles.headerDate}>MOT Expiry Date</Text>
          <DatePicker
            style={{width: scale(335),marginTop:moderateScale(20),
            marginBottom :moderateScale(30),}}
         mode="date"
         placeholder="MOT Expiry date"
         date={this.state.mot_exp_date}
         format="YYYY-MM-DD"
         placeholderTextColor='black'
         minDate="2016-05-01"
         maxDate="2099-06-01"
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         value={this.state.mot_exp_date}
         onDateChange={(date)=>{this.setState({mot_exp_date:date})}}
         customStyles={{
           dateInput: {
             marginLeft:moderateScale(15),
               width:scale(300),
             height:verticalScale(50),
             borderColor:'transparent',
             backgroundColor:'white',
             textAlign:'left',
             justifyContent: 'flex-start',
             alignItems: 'flex-start',
             paddingTop: moderateScale(15),
             paddingLeft: moderateScale(15),
             fontfamily: "Montserrat",
         },
           dateIcon: {
             position: 'absolute',
             left: scale(285),
             top: scale(2),
             marginLeft: 0,
             backgroundColor:'#FC3AE3',
             height:verticalScale(32),
             width:scale(40),
             resizeMode:'contain',
             borderRadius:moderateScale(20),
           }}}
         />
         <Text style={styles.headerDate}>Road Tax Expiry Date</Text>
        <DatePicker
             style={{width: scale(335),marginTop:moderateScale(20),
             marginBottom :moderateScale(30)}}
        mode="date"
        placeholder="Road Tax Expiry date"
        date={this.state.road_tax_exp_date}
        format="YYYY-MM-DD"
        placeholderTextColor='black'
        minDate="2016-05-01"
        maxDate="2099-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        value={this.state.road_tax_exp_date}
        onDateChange={(date)=>{this.setState({road_tax_exp_date:date})}}
        customStyles={{dateInput:{
          marginLeft:moderateScale(15),
          width:scale(300),
          height:verticalScale(50),
          borderColor:'transparent',
          backgroundColor:'white',
          textAlign:'left',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingTop: moderateScale(15),
          paddingLeft: moderateScale(15),
          fontfamily: "Montserrat",
        },
        dateIcon: {
          position: 'absolute',
          left: scale(290),
          top: scale(2),
          marginLeft: 0,
          backgroundColor:'#ffbf37',
          height:verticalScale(32),
          width:scale(40),
          resizeMode:'contain',
          borderRadius:moderateScale(20),
        }}}
        />
        <Text style={styles.headerDate}>Insurance Expiry Date</Text>
        <DatePicker
          style={{width: scale(335),marginTop:moderateScale(20),
          marginBottom :moderateScale(30),}}
       mode="date"
       placeholder="Insurance Expiry date"
       date={this.state.insurance_exp_date}
       format="YYYY-MM-DD"
       placeholderTextColor='black'
       minDate="2016-05-01"
       maxDate="2099-06-01"
       confirmBtnText="Confirm"
       cancelBtnText="Cancel"
       value={this.state.insurance_exp_date}
       onDateChange={(date)=>{this.setState({insurance_exp_date:date})}}
       customStyles={{dateInput: {
         marginLeft:moderateScale(15),
       width:scale(300),
         height:verticalScale(50),
         borderColor:'transparent',
         backgroundColor:'white',
         textAlign:'left',
         justifyContent: 'flex-start',
         alignItems: 'flex-start',
         paddingTop: moderateScale(15),
         paddingLeft: moderateScale(15),
         fontfamily: "Montserrat",
       },
       dateIcon: {
         position: 'absolute',
         left: scale(285),
         top: scale(2),
         marginLeft: 0,
         backgroundColor:'#fc6c3a',
         height:verticalScale(32),
         width:scale(40),
         resizeMode:'contain',
         borderRadius:moderateScale(20),
       }}}
       />
        <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(70),
            marginBottom: moderateScale(30),
            marginLeft:moderateScale(0),
            marginRight:moderateScale(0),

          }}
          textStyle={{fontWeight: 'bold',fontfamily: "Montserrat",}}
            onPress={()=>{
              const{vehicle_id,mot_exp_date,road_tax_exp_date,insurance_exp_date,}=this.state
                fetch(global.APIURL + 'AddReminder',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'user_id':global.useId,
                    'vehicle_id':vehicle_id,
                    'mot_expiry_date' : mot_exp_date,
                    'road_tax_expiry_date' : road_tax_exp_date,
                    'insurancs_expiry_date' : insurance_exp_date,
                  })
                }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.status)
                      {
                        //global.case_id=responseJson.case_id;
                        this.props.navigation.navigate('ReminderManagent')
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
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,


  },
  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    marginRight:moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
    paddingLeft: moderateScale(15),
    fontSize: moderateScale(14),
},
  dropdownArrow:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(40),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownText:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(200),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(16),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(20),
    marginLeft:  moderateScale(15),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(10),
  },
});
