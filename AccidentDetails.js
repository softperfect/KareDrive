import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight,ActivityIndicator} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class AccidentDetailScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {case_id:global.case_id,isVehicle:global.isVehicle,  isInsurace:global.isInsurace,showLoader:false}
  //  this.setState({case_id:global.case_id})
    //this.setState({isVehicle:global.isVehicle})
    //this.setState({isInsurace:global.isInsurace})
  }
  setCaseId = () => {
    this.setState({ case_id:global.case_id})
  }
  setVehicle = () => {
    this.setState({ isVehicle:global.isVehicle})
  }
  setInsurance = () => {
    this.setState({ isInsurace:global.isInsurace})
  }
  setPeople= () => {
    this.setState({ isPeople:global.isPeople})
  }
  setPolice = () => {
    this.setState({ isPolice:global.isPolice})
  }
  setDamage = () => {
    this.setState({ isDamage:global.isDamage})
  }
  render() {

    return (
      <View style={styles.containerMain}>
        <TouchableHighlight underlayColor='transparent'  onPress={()=>{
            if(global.case_id==0)
            {
              this.props.navigation.navigate('AccidentDescription', { callback: this.setCaseId.bind(this),badgeCount:global.notificationList.length})
            }
            else {
              alert("Accident description already entered");
            }}}>
          <View style={styles.logoBackGround}>
            <View style={{marginLeft:0,}} flexDirection="row">
                  <Image source={require('./img/notes_pink.png')} style={styles.MainScreenIcon}/>
                  {(  global.isDescription) && <Image source={require('./img/done_tick.png')} style={styles.rightArrow}/>}
            </View>
            <Text style={styles.logoText}>Description</Text>

              </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{
          if(global.case_id>=0)
          {
            this.props.navigation.navigate('AccidentVehicle', { callback: this.setVehicle.bind(this),badgeCount:global.notificationList.length})
          }
          else {
            alert("Plese first enter description");
          }}}>
          <View style={styles.logoBackGround}>
            <View style={{marginLeft:0,}} flexDirection="row">
                  <Image source={require('./img/AccidentVehicle.png')} style={styles.MainScreenIcon}/>
                    {(  global.isVehicle) && <Image source={require('./img/done_tick.png')} style={styles.rightArrow}/>}

            </View>
            <Text style={styles.logoText}>Vehicle Involved</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{
          if(global.case_id>=0)
          {
            this.props.navigation.navigate('AccidentInsurance', { callback: this.setInsurance.bind(this),badgeCount:global.notificationList.length})
          }
          else {
            alert("Plese first enter description");
          }}}>
          <View style={styles.logoBackGround}>
            <View style={{marginLeft:0,}} flexDirection="row">
                  <Image source={require('./img/insurancs_detail.png')} style={styles.MainScreenIcon}/>
                    {(  global.isInsurace) && <Image source={require('./img/done_tick.png')} style={styles.rightArrow}/>}

            </View>
              <Text style={styles.logoText}>Insurance Details</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{
          if(global.case_id>=0)
          {
            this.props.navigation.navigate('AccidentPeople', { callback: this.setPeople.bind(this),badgeCount:global.notificationList.length})
          }
          else {
            alert("Plese first enter description");
          }}}>
        <View style={styles.logoBackGround}>
          <View style={{marginLeft:0,}} flexDirection="row">
                <Image source={require('./img/layer_12_360.png')} style={styles.MainScreenIcon}/>
                  {(  global.isPeople) && <Image source={require('./img/done_tick.png')} style={styles.rightArrow}/>}

          </View>
            <Text style={styles.logoText}>People Involved</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='transparent' onPress={()=>{
        if(global.case_id>=0)
        {
          this.props.navigation.navigate('AccidentPolice', { callback: this.setPolice.bind(this),badgeCount:global.notificationList.length})
        }
        else {
          alert("Plese first enter description");
        }}}>
        <View style={styles.logoBackGround}>
          <View style={{marginLeft:0,}} flexDirection="row">
                <Image source={require('./img/police.png')} style={styles.MainScreenIcon}/>
                  {(  global.isPolice) && <Image source={require('./img/done_tick.png')} style={styles.rightArrow}/>}

          </View>
            <Text style={styles.logoText}>Police</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='transparent' onPress={()=>{
        if(global.case_id>=0)
        {
          this.props.navigation.navigate('AccidentDamage', { callback: this.setDamage.bind(this),badgeCount:global.notificationList.length})
        }
        else {
          alert("Plese first enter description");
        }}}>
        <View style={styles.logoBackGround}>
          <View style={{marginLeft:0,}} flexDirection="row">
                <Image source={require('./img/car_damages.png')} style={styles.MainScreenIcon}/>
                  {(  global.isDamage) && <Image source={require('./img/done_tick.png')} style={styles.rightArrow}/>}

          </View>

            <Text style={styles.logoText}>Damages</Text>
        </View>
      </TouchableHighlight>
      {this.state.showLoader &&
      <View >
        <Text style={styles.signUpText}>  Uploading multimedia files,please wait before clicking submit</Text>
          <ActivityIndicator size='large' color="black" />
      </View>
    }
        <Button title="SUBMIT" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(300),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(50),
            }}
            textStyle={{ fontWeight:'bold'}}
                onPress={()=>{
                  this.setState({ showLoader:true });
              if(global.isDescription && global.isVehicle && global.isDamage && global.isPolice && global.isPeople && global.isInsurace)
              {
                let formData=new FormData();
                formData.append("user_id",global.useId);
                formData.append("case_datetime",global.descriptionData.datetime);
                formData.append("description",global.descriptionData.description);
                formData.append("address",global.descriptionData.address);
                formData.append("vehicle_id",global.vehicleData.vehicle_id);
                if(global.vehicleData.videoURL!='')
                {
                  formData.append("camera_recording",{name:'testImage',
                  uri:global.vehicleData.videoURL,
                  type:'video/mp4'});
                }
                formData.append("third_party_vehicle_company",global.vehicleData.vehicle_company);
                formData.append("third_party_vehicle_model",global.vehicleData.vehicle_model);
                formData.append("third_party_manufacture_year",global.vehicleData.manufacture_year);
                formData.append("third_party_vehicle_colour",global.vehicleData.vehicle_colour);
                formData.append("third_party_vehicle_reg_number",global.vehicleData.vehicle_reg_number);
                formData.append("user_ins_agency",global.insuranceData.ins_user_name);
                formData.append("user_ins_type",global.insuranceData.ins_user_type);
                formData.append("user_ins_expiry",global.insuranceData.datetime_user_exp);
                formData.append("thirdparty_ins_agency",global.insuranceData.ins_third_name);
                formData.append("thirdparty_ins_type",global.insuranceData.ins_third_type);
                formData.append("thirdparty_ins_expiry",global.insuranceData.datetime_third_exp);
                formData.append("third_party_driver_is_owner",global.peopleData.driver_is_owner);
                formData.append("third_party_full_name",global.peopleData.full_name);
                formData.append("third_party_address",global.peopleData.address);
                formData.append("third_party_phone",global.peopleData.phone);
                formData.append("third_party_car_reg_number",global.peopleData.car_reg_number);
                /*for(let witness of global.peopleData.witness)
                {
                  formData.append("witness[]",JSON.stringify({full_name:witness.full_name,
                  address:witness.address,
                  phone:witness.phone}));
                }
                for(let casualty of global.peopleData.casualty)
                {
                  formData.append("casualty[]",JSON.stringify({full_name:casualty.full_name,
                  address:casualty.address,
                  phone:casualty.phone}));
                }*/
                //formData.append("witness",global.peopleData.witness);
                //formData.append("casualty",global.peopleData.casualty);
                formData.append("police_full_name",global.policeData.full_name);
                formData.append("police_collar_number",global.policeData.collar_number);
                formData.append("police_station_name",global.policeData.police_station_name);
                formData.append("police_crime_ref_number",global.policeData.crime_ref_number);
                formData.append("damage_vehicle_type",global.damageData.vehicle_Type);
                formData.append("damage_vehicle_owner",'my vehicles');
                for(let snapShot of global.damageData.snapShots)
                {
                  formData.append("damage_image[]",{name:'testImage.png',
                  uri:snapShot,
                  type:'image/png'});
                }
                //alert(JSON.stringify(formData))
                fetch(global.APIURL + 'ReportAccidentSubmit',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                }).then((response) => response.json()).then((responseJson) => {
                    //alert(JSON.stringify(responseJson))

                      if(responseJson.status)
                      {
                        global.case_id=responseJson.case_id;
                        fetch(global.APIURL + 'ReportAccidentPeopleInvolved',{
                              method: 'POST',
                              headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                              'user_id':global.useId,
                              'case_id':global.case_id,
                              'full_name' : global.peopleData.full_name,
                              'address' : global.peopleData.address,
                              'phone' : global.peopleData.phone,
                              'car_reg_number':global.peopleData.car_reg_number,
                              'driver_is_owner':global.peopleData.driver_is_owner,
                              'witness' : global.peopleData.witness,
                              'casualty':global.peopleData.casualty,
                            })
                          }).then((response) => response.json()).then((responseJson) => {
                                  if(responseJson.status)
                                {
                                  global.isDescription=false;
                                  global.isVehicle=false;
                                  global.isInsurace=false;
                                  global.isPeople=false;
                                  global.isPolice=false;
                                  global.isDamage=false;
                                  global.descriptionData={};
                                  global.insuranceData={};
                                  global.peopleData={};
                                  global.policeData={};
                                  global.vehicleData={};
                                  global.damageData={};
                                  //this.props.navigation.navigate('AccidentDetail')
                                  this.props.navigation.navigate('Main')
                                }
                                else {
                                  this.setState({ showLoader:false });
                                  alert(responseJson.msg);
                                }
                              })
                              .catch((error) => {
                                this.setState({ showLoader:false });

                                  alert(error);

                                  //you will get error here.
                              })


                      }
                      else {
                        this.setState({ showLoader:false });

                        alert(responseJson.msg);
                      }
                    })
                    .catch((error) => {
                      this.setState({ showLoader:false });

                        alert(error);

                        //you will get error here.
                    });
                }
                else {
                  this.setState({ showLoader:false });

                  alert("Please enter all details");
                }
              }}/>
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
  containerMain: {
    flexDirection: 'row',
    flex: 1,
    flexWrap:'wrap',
    justifyContent: 'center',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',

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
  backGroundImage: {

    alignItems: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },
  welcome: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    margin: moderateScale(10),
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: moderateScale(5),
  },
  logoImage: {
    width: scale(200),
    height: verticalScale(200),
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
  searchIcon:
  {
    padding: moderateScale(10),
  },
  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: 0,
    marginTop: moderateScale(20),
    color: '#ffffff',
    width: scale(300),
    backgroundColor:'transparent',


  },
  SloganText: {
    color: '#FFFFFF',
    fontSize: moderateScale(45),
    textAlign: 'center',
    fontWeight: 'bold',
    margin: moderateScale(20),
  },
  signUpText: {
    textAlign: 'center',
    color: 'red',
    marginTop: moderateScale(30),
    fontSize: moderateScale(12),
    marginBottom: moderateScale(30),
  },
  punchLine: {
    color: '#FFFFFF',
    fontSize: moderateScale(24),
    textAlign: 'center',
    fontWeight: 'normal',
  },
  logoText: {
    color: 'grey',
    fontSize: moderateScale(18),
    textAlign: 'center',
    fontWeight: 'normal',
  },
});
