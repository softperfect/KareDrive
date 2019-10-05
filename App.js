import React, {Component,Dimensions} from 'react';
import {Platform, AsyncStorage,Vibration,StyleSheet, Text, View,Image,Alert,ImageBackground,TextInput,TouchableHighlight,StatusBar,route} from 'react-native';
import {createStackNavigator,createAppContainer,createDrawerNavigator} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SideMenu} from 'react-native-side-menu';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

//import { DrawerNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import AccidentDetailScreen from './AccidentDetails';
import AccidentDescriptionScreen from './AccidentDescription';
import AccidentVehicleScreen from './AccidentVehicles'
import AccidentInsuranceScreen from './AccidentInsurance'
import AccidentIPeopleScreen from './AccidentPeople'
import AccidentPoliceScreen from './AccidentPolice'
import AccidentDamageScreen from './AccidentDamage'
import SuccessScreen from './SuccessScreen'
import SignUpScreen from './SignUp'
import Drawer from './SideMenu'
import SettingsScreen from './Settings'
import ContactUsScreen from './ContactUs'
import InviteFriendsScreen from './InviteFriends'
import SubscriptionScreen from './Subscription'
import ClaimTrackScreen from './ClaimTrack'
import VideoCapture from './VideoCaptureScreen'
import AddVehicleScreen from './AddVehicle'
import ReminderListScreen from './ReminderList'
import AddReminderScreen from './AddReminder'
import TrackParkingTicketScreen from './TrackParkingTicket'
import AddParkingTicketScreen from './AddParkingTicket'
import ParkingTicketDetailScreen from './ParkingTicketDetails'
import ParkingTicketMitigatingScreen from './ParkingTicketMitigating'
import ProfileScreen from './Profile'
import PaymentDetailScreen from './PaymentDetails'
import MyVehicleScreen from './MyVehicles'
import MyDocumentScreen from './MyDocuments'
import NotificationDetailScreen from './NotificationDetail'
import TrackPAYGCaseScreen from './TrackPAYGCase'
import AddPAYGServiceScreen from './AddPAYGServices'
import PCNIssueScreen from './PCNIssue'
import BailiffissueScreen from './BailiffIssue'
import DrivingOffenceIssueScreen from './DrivingOffenceIssue'
import CarSearchInfoScreen from './CarSearch'
import CarSearchDownloadScreen from './CarSearchDownload'
import CarSearchHistoryScreen from './CarSearchHistory'
import ShowPDFScreen from './ShowPDF'
import NotifService from './NotifyService';
import appConfig from './app.json';
import IconBadge from 'react-native-icon-badge';
const IS_IOS = Platform.OS === 'ios';

var {FBLogin,FBLoginManager}=require('react-native-facebook-login');
//import HomeScreen from './app/Component/HomeScreen'
//import Login from './app/Component/Login'
const instructions = Platform.select({
  ios: '',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
//const SideMenu = require('react-native-side-menu');

class HomeScreen extends React.Component
{
  componentDidMount()
  {
    //StatusBar.setHidden(true);
  }

  state={
    username:'',
    password:'',
  }
  doLogin()
  {

  }
  getNotifications()
  {

  }
  render() {
    return (

      <View style={styles.container}>
          <ImageBackground style={styles.backGroundImage} source={require('./img/mainbg.png')} >
          <Image source={require('./img/app_logo.png')} style={styles.logoImage}/>
          <Text style={styles.SloganText}>Login</Text>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/user.png')} style={styles.userIcon}/>
              <TextInput  placeholderTextColor={'white'}
                value={this.state.username}
                onChangeText={username=>this.setState({username})}
                underlineColorAndroid="transparent" style={styles.input} placeholder="Username" editable={true} />
          </View>
          <View style={styles.containerTextBox}>
          <Image source={require('./img/lock.png')} style={styles.userIcon}/>
          <TextInput secureTextEntry={true} placeholderTextColor={'white'}
            value={this.state.password}
            onChangeText={password=>this.setState({password})}
            underlineColorAndroid="transparent" style={styles.input} placeholder="Password" editable={true} />
          </View>
          <Button title="Login" buttonStyle={{
              backgroundColor: "#DC5042",
              width: scale(300),
              height: verticalScale(50),
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius:moderateScale(30),
              marginTop:moderateScale(30),
            }}
              textStyle={{
                fontSize:moderateScale(20),
                fontWeight: 'bold',
                color:'white'
              }}
              onPress={()=>{
                const{username,password}=this.state
                //global.case_id=111
                //this.props.navigation.navigate('Main')
                //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/UserLogin', {
                var deviceType="";
                if(IS_IOS)
                {
                  deviceType="IOS"
                }
                else {
                  deviceType="ANDROID"
                }
                fetch(global.APIURL + 'UserLogin', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'username' : username,
                    'password': password,
                    'device_id': global.device_id,
                    'device_type': deviceType
                  })
                }).then((response) =>

                //alert(response);

                response.json()).then((responseJson) => {
                       //alert(responseJson);
                      if(responseJson.status)
                      {
                        _retrieveData = async () => {
                          try {
                            const value = await AsyncStorage.getItem('count');
                            if (value !== null) {
                              // We have data!!
                                global.isPushNotification=value;
                            }
                            else {
                              global.isPushNotification='false';

                            }
                          } catch (error) {
                            // Error retrieving data
                          }
                        };
                          global.useId=responseJson.userdata.user_id
                          global.vehicles=responseJson.userdata.vehicles
                          global.userName=responseJson.userdata.first_name
                          global.email=responseJson.userdata.email
                          global.phone=responseJson.userdata.phone
                          global.occupation=responseJson.userdata.occupation
                          global.address=responseJson.userdata.address
                          global.profilePicture=responseJson.userdata.profile_picture
                          global.referralNumber=responseJson.userdata.referral_number
                          global.userType=responseJson.userdata.subscription_type
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

                          AsyncStorage.getItem("isVibrate").then(value=>{
                            if(value!=null)
                            {
                              if(value=='false')
                              {
                                global.isVibrate=false;
                              }
                              else {
                                global.isVibrate=true;
                              }
                            }
                            }
                          )
                          AsyncStorage.getItem("isPush").then(value=>{
                            if(value!=null)
                            {
                              if(value=='false')
                              {
                                global.isPush=false;
                              }
                              else {
                                global.isPush=true;
                              }
                            }
                            }
                          )
                          fetch(global.APIURL + 'UserNotifications?user_id='+global.useId,{
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            }
                        }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.status)
                        {
                            global.notificationList=responseJson.notifications;
                            global.notificationCount=global.notificationList.length;
                            this.props.navigation.navigate('Main',{badgeCount:global.notificationList.length})

                          //alert(responseJson.notifications.length);
                          //  alert(global.notificationList.length);
                            //alert(global.notificationList.length.toString());

                        }
                        else {
                          this.props.navigation.navigate('Main',{badgeCount:global.notificationList.length})

                              //alert(responseJson.msg);
                        }
                        }).catch((error) => {
                          this.props.navigation.navigate('Main',{badgeCount:global.notificationList.length})

                          //alert("notofication" + error);
                        });


                      }
                      else {
                        alert("User Name or password not correct");
                      }
                    })
                    .catch((error) => {
                        alert("Catch" + error);
                        //this.props.navigation.navigate('Main')

                        //you will get error here.
                    });
                }}/>
            <View flexDirection="row">
              <View style={styles.connectLine}/>
              <Text style={styles.connectText}>or connect via</Text>
              <View style={styles.connectLineRight}/>
            </View >
          <Button title="Facebook" buttonStyle={{
                backgroundColor: "rgba(92, 99,216, 1)",
                width: scale(300),
                height:verticalScale( 50),
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius:moderateScale( 30),
                marginTop:moderateScale(10),

                }}
                textStyle={{
                  fontSize:moderateScale(20),
                  fontWeight: 'bold',
                  color:'white'
                }}
                onPress={()=>{
                  FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native

                  FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
                    if (!error) {
                      console.log("Login data: ", data);
                    } else {
                      console.log("Error: ", error);
                    }
})
                }}
            />

          <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('ForgotPassword',{badgeCount:global.notificationList.length})}}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableHighlight>
            <View flexDirection="row">
                <Text style={styles.NotMember}>Not a Member ?</Text>
                  <TouchableHighlight onPress={()=>{ this.props.navigation.navigate('SignUp')}}>
                  <Text style={styles.SignUp}>Sign up Now</Text>
                </TouchableHighlight>
            </View >
        </ImageBackground>

    </View>

    );
  }
}


class ResetPasswordScreen extends React.Component
{
  componentDidMount()
  {
    //StatusBar.setHidden(true);
  }
  state={
    password:'',
    confirm_password:'',
  }
  render() {
    return (

      <View style={styles.container}>
          <ImageBackground style={styles.backGroundImage} source={require('./img/mainbg.png')} >
          <Image source={require('./img/app_logo.png')} style={styles.logoImageResetPassword}/>
          <Text style={styles.ResetPasswordText}>Reset your password?</Text>
          <Text style={styles.ResetPasswordDetail}>Kindly enter your new password below to reset</Text>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/lock.png')} style={styles.userIcon}/>
              <TextInput secureTextEntry={true} placeholderTextColor={'white'}
                value={this.state.password}
                onChangeText={password=>this.setState({password})}
              underlineColorAndroid="transparent" style={styles.input} placeholder="New password" editable={true} />
          </View>
          <View style={styles.containerTextBox}>
          <Image source={require('./img/lock.png')} style={styles.userIcon}/>
          <TextInput secureTextEntry={true} placeholderTextColor={'white'}
            value={this.state.confirm_password}
            onChangeText={confirm_password=>this.setState({confirm_password})}
           underlineColorAndroid="transparent" style={styles.input} placeholder="Confirm password" editable={true} />
          </View>
          <Button title="RESET" buttonStyle={{
              backgroundColor: "#FF0000",
              width: scale(300),
              height: verticalScale(50),
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 0,
              marginTop:moderateScale(30),
              marginLeft:moderateScale(10),
              marginBottom:moderateScale(100),

              }}
              textStyle={{ fontWeight:'bold'}}
              onPress={()=>{
                const{password,confirm_password}=this.state

                fetch(global.APIURL + 'ChangeUserPassword',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'user_id' : global.useId,
                    'password':password,
                    'confirm_password':confirm_password,
                  })
                }).then((response) => response.json()).then((responseJson) => {
                      //  alert(responseJson);
                      if(responseJson.status)
                      {
                        this.props.navigation.navigate('Success',{typeScreen:'ChangePassword'})
                      }
                      else {
                        alert(responseJson.msg);
                        //alert("User Name or password not correct");
                      }
                    })
                    .catch((error) => {
                        alert(error);
                        this.props.navigation.navigate('Main')

                        //you will get error here.
                    });
              }}/>
                </ImageBackground>
    </View>

    );
  }
}

class ForgotPasswordScreen extends React.Component
{
  componentDidMount()
  {
    //StatusBar.setHidden(true);
  }
  state={
    email:'',
  }
  render() {
    return (

      <View style={styles.container}>
          <ImageBackground style={styles.backGroundImage} source={require('./img/mainbg.png')} >
          <Image source={require('./img/app_logo.png')} style={styles.logoImageResetPassword}/>
          <Text style={styles.ResetPasswordText}>Forgot your password?</Text>
          <Text style={styles.ResetPasswordDetail}>Kindly enter your email address below to reset the password</Text>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/envelope.png')} style={styles.EmailIcon}/>
              <TextInput placeholderTextColor={'white'}
                value={this.state.email}
                onChangeText={email=>this.setState({email})}

                underlineColorAndroid="transparent" style={styles.input} placeholder="Email" editable={true} />
          </View>

          <Button title="SEND" buttonStyle={{
              backgroundColor: "#FF0000",
              width: scale(300),
              height:verticalScale(50),
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 0,
              marginTop:moderateScale(60),
              marginBottom:moderateScale(110),

            }}
              textStyle={{ fontWeight:'bold'}}
              onPress={()=>{

                const{email}=this.state
                if(email=='')
                {
                  alert('Please enter the Email Address');
                  return;
                }
                //('http://192.168.137.13:8080/DriveKareAdmin/api.php/ForgotPassword', {
                fetch(global.APIURL + 'ForgotPassword',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'email' : email
                  })
                }).then((response) => response.json()).then((responseJson) => {
                      //  alert(responseJson);
                      if(responseJson.status)
                      {
                        this.props.navigation.navigate('Success',{typeScreen:'ForgotPassword'})
                      }
                      else {
                        alert(responseJson.msg);
                        //alert("User Name or password not correct");
                      }
                    })
                    .catch((error) => {
                        alert(error);
                        this.props.navigation.navigate('Main')

                        //you will get error here.
                    });
                }}/>

                </ImageBackground>
    </View>

    );
  }
}




const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#3598DB',
    flex: 1,
    alignContent: 'center',
  },
  containerMain: {
    flexDirection: 'row',
    flexGrow:  1,
    flexWrap:'wrap',
    justifyContent:'center',
    backgroundColor: '#E7F2FB',
    resizeMode:'stretch',
  },
  containerMainCarSearch: {
    flexDirection: 'row',
    flexGrow:  1,
    flexWrap:'wrap',
    justifyContent:'flex-start',
    backgroundColor: '#E7F2FB',
    resizeMode:'stretch',
    paddingLeft:scale(15),


  },
  logoBackGroundCarSearch: {
    marginLeft: scale(10),
    marginRight:  moderateScale(10),
    marginTop: moderateScale(20),
    width: scale(140),
    height:verticalScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent:'center',

  },
  logoBackGround: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    marginTop: moderateScale(20),
    width: scale(140),
    height:verticalScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },
  backGroundImage: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },
  logoImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginTop:moderateScale(20),
  },
  logoImageResetPassword:
  {
    width: moderateScale(150),
    height: moderateScale(150),
    marginTop:verticalScale(20),
  },

  MainScreenIcon: {
    width: scale(75),
    height:verticalScale( 60),
    justifyContent: 'center',
    alignItems:'center',
    resizeMode:'contain',
  },
  MainScreenIconCar: {
    width:scale( 75),
    height: verticalScale(60),
    justifyContent: 'center',
    alignItems:'center',
    resizeMode:'contain',
  },
  searchIcon:
  {
    padding: 10,
  },
  containerTextBox: {
    paddingTop: moderateScale(10),
    paddingRight:moderateScale( 10),
    paddingBottom: moderateScale(1),
    paddingLeft: moderateScale(10),
    marginTop: moderateScale(10),
    flexDirection: 'row',
    width: scale(300),
    borderBottomColor:'white',
    borderBottomWidth:moderateScale(1),
    alignContent: 'center',
  },
  input:
  {
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),
    paddingBottom: moderateScale(1),
    color: '#ffffff',
    width: scale(270),
    fontSize: moderateScale(18),
    backgroundColor:'transparent',
    marginBottom: 0,
    height:verticalScale(35),
    textAlignVertical: 'bottom',
    marginTop: 0,


  },
  userIcon: {
    width: scale(20),
    height:scale( 25),
    //marginBottom: moderateScale(0),
},
  EmailIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode:'contain',
  },
  SloganText: {
    color: '#FFFFFF',
    fontSize: moderateScale(45),
    textAlign: 'center',
    fontWeight: 'bold',
    margin:moderateScale(15),
  },
  ResetPasswordText: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  ResetPasswordDetail: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: 10,
    marginLeft: 10,
    marginRight : 10,
    marginBottom: 30,
  },
  punchLine: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  connectLine: {
    borderTopWidth: scale(1),
    borderTopColor: 'white',
    width: scale(70),
    marginLeft:moderateScale(20),
    marginRight:moderateScale(5),
    marginTop:moderateScale(20),
  },
  connectLineRight: {
    borderTopWidth: scale(1),
    borderTopColor: 'white',
    width: scale(70),
    marginLeft:moderateScale(5),
    marginRight:moderateScale(20),
    marginTop:moderateScale(20),
  },
  connectText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop:moderateScale( 11),
  },
  forgotPassword: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop:20,
  },
  NotMember: {
    color: '#FFFFFF',
    fontSize:moderateScale( 18),
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop:10,
  },
  SignUp:
  {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    textAlign: 'center',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: 'white',
    fontWeight: 'bold',
    marginLeft:moderateScale(5),
    marginTop:10,
  },
  logoText: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  loginButton:
  {
    color:'black',
    backgroundColor:'#FF0000',
    paddingTop:10,
    paddingBottom:10,
    paddingRight:10,
    paddingLeft:10,
  },
  LeftNavigation: {
    width: scale(50),
    height:verticalScale( 50),
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:moderateScale(10),
  },
  RightNavigation: {
    width: scale(20),
    height: verticalScale(20),
    justifyContent: 'center',
    alignItems:'center',
    marginRight:moderateScale(15),
  },
  LeftArrowNavigation: {
    width: scale(20),
    height: verticalScale(20),
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:moderateScale(10),
  },
  headerTitleStyle:{
    height: verticalScale(50),
    width: scale(320),
  },
  headerTextStyle:
  {
    fontWeight:"400",
    color:"white",
    fontSize:moderateScale(18),
    textAlign:'center',
    width:'100%',
    fontFamily:"Montserrat"

  }
});



class MainScreen extends React.Component
{
  render() {
    return (
      <View style={styles.containerMain}>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('AccidentManagement',{badgeCount:global.notificationList.length})}}>
          <View style={styles.logoBackGround}>
            <Image source={require('./img/car-collision_green.png')} style={styles.MainScreenIconCar}/>
            <Text style={styles.logoText}>Report Accident</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('ReminderManagent',{badgeCount:global.notificationList.length})}}>
          <View style={styles.logoBackGround}>
              <Image source={require('./img/reminder.png')} style={styles.MainScreenIcon}/>
              <Text style={styles.logoText}>My Reminders</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{
          if(global.userType=='Premium Subscribers')
          {
              this.props.navigation.navigate('ParkingManagement',{badgeCount:global.notificationList.length})

            }
            else {

              alert("Please subscribe to Premium User");
            }}}>
          <View style={styles.logoBackGround}>
            <Image source={require('./img/park-tickets-red.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Parking Tickets</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{
          if(global.userType=='Premium Subscribers')
          {
              this.props.navigation.navigate('CameraTicketManagement',{badgeCount:global.notificationList.length})
            }
            else {
              alert("Please subscribe to Premium User");


            }}}>
          <View style={styles.logoBackGround}>
            <Image source={require('./img/camera_ticket.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Camera Tickets</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('PAYGManagement',{badgeCount:global.notificationList.length})}}>
          <View style={styles.logoBackGround}>
            <Image source={require('./img/payg.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Pay As You Go</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('CarSearchManagement',{badgeCount:global.notificationList.length})}}>
          <View style={styles.logoBackGround}>
            <Image source={require('./img/car_search.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Car Search</Text>
          </View>
        </TouchableHighlight>
    </View>
    );
  }
}

class AccidentManagementScreen extends React.Component
{
  render() {
    return (
      <View style={styles.containerMain}>
      <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('AccidentDetail',{badgeCount:global.notificationList.length})}}>
        <View style={styles.logoBackGround}>
            <Image source={require('./img/car-collision_green.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Report Accident</Text>
        </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('TrackClaim',{badgeCount:global.notificationList.length})}}>
          <View style={styles.logoBackGround}>
            <Image source={require('./img/track_claim.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Track Claims</Text>
        </View>
      </TouchableHighlight>
    </View>
    );
  }
}
class ReminderScreen extends React.Component
{
  render() {
    return (
      <View style={styles.containerMain}>
      <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('ReminderList',{badgeCount:global.notificationList.length})}}>
          <View style={styles.logoBackGround}>
              <Image source={require('./img/reminder.png')} style={styles.MainScreenIcon}/>
              <Text style={styles.logoText}>My Reminders</Text>
          </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('AddReminder',{badgeCount:global.notificationList.length})}}>
        <View style={styles.logoBackGround}>
            <Image source={require('./img/calendar-with-a-clock-tim-green.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Add Reminder</Text>
        </View>
      </TouchableHighlight>
      </View>
    );
  }
}
class ParkingScreen extends React.Component
{
  render() {
    return (
      <View style={styles.containerMain}>

        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('AddParkingTicket',{typeTicket:'1',badgeCount:global.notificationList.length})}}>
        <View style={styles.logoBackGround}>
            <Image source={require('./img/AddTicket.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Add Tickets</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('TrackParkingTicket',{typeTicket:'1',badgeCount:global.notificationList.length})}}>
          <View style={styles.logoBackGround}>
              <Image source={require('./img/claim__1_.png')} style={styles.MainScreenIcon}/>
              <Text style={styles.logoText}>Track Tickets</Text>
          </View>
        </TouchableHighlight>
    </View>
    );
  }
}
class CameraTicketScreen extends React.Component
{
  render() {
    return (
      <View style={styles.containerMain}>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('AddParkingTicket',{typeTicket:'2',badgeCount:global.notificationList.length})}}>
        <View style={styles.logoBackGround}>
            <Image source={require('./img/camera_ticket.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Add Tickets</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('TrackParkingTicket',{typeTicket:'2',badgeCount:global.notificationList.length})}}>
          <View style={styles.logoBackGround}>
              <Image source={require('./img/track_claim_orange.png')} style={styles.MainScreenIcon}/>
              <Text style={styles.logoText}>Track Tickets</Text>
          </View>
        </TouchableHighlight>
    </View>
    );
  }
}
class PAYGScreen extends React.Component
{
  render() {
    return (
      <View style={styles.containerMain}>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('AddPAYService',{badgeCount:global.notificationList.length})}}>

        <View style={styles.logoBackGround}>
            <Image source={require('./img/payg.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>PAYG Services</Text>
        </View>
      </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('TrackPAYGCase',{badgeCount:global.notificationList.length})}}>
        <View style={styles.logoBackGround}>
            <Image source={require('./img/track_claim_orange.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Track Cases</Text>
        </View>
      </TouchableHighlight>
    </View>
    );
  }
}
class CarSearchScreen extends React.Component
{
  render() {
    return (
      <View style={styles.containerMainCarSearch}>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{
            this.props.navigation.setParams({title:'SILVER SEARCH'})
             this.props.navigation.navigate('CarSearchInfoManagement',{typeScreen:'1',title:'SILVER SEARCH',badgeCount:global.notificationList.length})}}>

        <View style={styles.logoBackGroundCarSearch}>
            <Image source={require('./img/silver_search.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Silver Search</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='transparent' onPress={()=>{
          this.props.navigation.setParams({title:'GOLD SEARCH'})
            this.props.navigation.navigate('CarSearchInfoManagement',{typeScreen:'2',title:'GOLD SEARCH',badgeCount:global.notificationList.length})

        }}>

        <View style={styles.logoBackGroundCarSearch}>
            <Image source={require('./img/gold_search.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Gold Search</Text>
        </View>
      </TouchableHighlight>

<TouchableHighlight underlayColor='transparent' onPress={()=>{ this.props.navigation.navigate('CarSearchHistory',{badgeCount:global.notificationList.length})}}>
    <View style={styles.logoBackGroundCarSearch}>
            <Image source={require('./img/search_history.png')} style={styles.MainScreenIcon}/>
            <Text style={styles.logoText}>Search History</Text>
        </View>
      </TouchableHighlight>
        </View>
    );
  }
}




const AppNavigator=createStackNavigator(
  {
    Home :
    {
      screen: HomeScreen,
      navigationOptions :{ header: null,
        }
      },
      Main:
      { screen:MainScreen,
        navigationOptions :({navigation})=>({ title: "WHAT HELP YOU NEED?",
          headerStyle:{
            backgroundColor:"#3598DB",
            width:'100%',
            height:verticalScale(60),
            textAlign:'center',
          },
          headerLeft:<Image source={require('./img/app_logo.png')} style={styles.LeftNavigation} />,
          headerRight:<TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
            <IconBadge
            MainElement={
              <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
            }
            BadgeElement={
              <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
            }
            IconBadgeStyle={
              {
                width:scale(10),
                height:verticalScale(15),
                marginTop:-10,
                marginRight:  0,
                backgroundColor: '#FF0000'}
              }
              Hidden={false}/>
          </TouchableHighlight>
          ,
          titleStyle:
          {
            textAlign:'center',
          },
          headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //fontFamily:"Montserrat"
          },
          })


      },
      AccidentManagement:
      {
        screen:AccidentManagementScreen,
        navigationOptions :({navigation})=>({ title: "ACCIDENT MANAGEMENT",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          }
        })
      },
      ReminderManagent:
      {
        screen:ReminderScreen,
        navigationOptions :({navigation})=>({ title: "MY REMINDERS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
        fontWeight:"400",
        color:"white",
        fontSize:moderateScale(18),
        textAlign:'center',
        width:'100%',
        //fontFamily:"Montserrat"
          },
        })
      },
      ReminderList:
      {
        screen:ReminderListScreen,
        navigationOptions :({navigation})=>({ title: "VIEW REMINDERS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          fontFamily:"Montserrat"
          },
        })
      },
      AddReminder:
      {
        screen:AddReminderScreen,
        navigationOptions :({navigation})=>({ title: "ADD REMINDERS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      ParkingManagement:
      {
        screen:ParkingScreen,
        navigationOptions :({navigation})=>({ title: "PARKING TICKETS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        titleStyle:
        {
          textAlign:'center',
        },
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //  fontFamily:"Montserrat"
            },
          })
      },
      TrackParkingTicket:
      {
        screen:TrackParkingTicketScreen,
        navigationOptions :({navigation})=>({ title: "TRACK TICKET",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      AddParkingTicket:
      {
        screen:AddParkingTicketScreen,
        navigationOptions :({navigation})=>({ title: "ADD TICKET",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      ParkingTicketDetails:
      {
        screen:ParkingTicketDetailScreen,
        navigationOptions :({navigation})=>({ title: "TICKET DETAILS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
        //  fontFamily:"Montserrat"
          },
        })
      },
      ParkingTicketMitigating:
      {
        screen:ParkingTicketMitigatingScreen,
        navigationOptions :({navigation})=>({ title: "MITIGATING REASONS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
        //  fontFamily:"Montserrat"
          },
        })
      },
      ProfileDetails:
      {
        screen:ProfileScreen,
        navigationOptions :({navigation})=>({ title: "",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      PaymentDetails:
      {
        screen:PaymentDetailScreen,
        navigationOptions :({navigation})=>({ title: "PAYMENT DETAILS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      MyVehicles:
      {
        screen:MyVehicleScreen,
        navigationOptions :({navigation})=>({ title: "MY VEHICELS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      MyDocuments:
      {
        screen:MyDocumentScreen,
        navigationOptions :({navigation})=>({ title: "MY DOCUMENTS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      CameraTicketManagement:
      {
        screen:CameraTicketScreen,
        navigationOptions :({navigation})=>({ title: "CAMERA TICKETS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
        //  fontFamily:"Montserrat"
          },
        })
      },
      PAYGManagement:
      {
        screen:PAYGScreen,
        navigationOptions :({navigation})=>({ title: "PAYG SERVICES",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      TrackPAYGCase:
      {
        screen:TrackPAYGCaseScreen,
        navigationOptions :({navigation})=>({ title: "TRACK CASE",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      AddPAYService:
      {
        screen:AddPAYGServiceScreen,
        navigationOptions :({navigation})=>({ title: "ADD CASE",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      BailiffIssue:
      {
        screen:BailiffissueScreen,
        navigationOptions :({navigation})=>({ title: "BAILIFF ISSUES",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      DrivingOffenceIssue:
      {
        screen:DrivingOffenceIssueScreen,
        navigationOptions :({navigation})=>({ title: "DRIVING OFFENCES",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },

      PCNIssue:
      {
        screen:PCNIssueScreen,
        navigationOptions :({navigation})=>({ title: "PCN ISSUES",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      CarSearchManagement:
      {
        screen:CarSearchScreen,
        navigationOptions :({navigation})=>({ title: "CAR SEARCH",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      CarSearchInfoManagement:
      {
        screen:CarSearchInfoScreen,
        navigationOptions :({navigation})=>({ title: navigation.state.params.title,
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
        //  fontFamily:"Montserrat"
          },
        })
      },
      CarSearchDownload:
      {
        screen:CarSearchDownloadScreen,
        navigationOptions :({navigation})=>({ title: "",
          headerTransparent:true,
        headerStyle:{
          backgroundColor:"transparent",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      CarSearchHistory:
      {
        screen:CarSearchHistoryScreen,
        navigationOptions :({navigation})=>({ title: "SEARCH HISTORY",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      ShowPDF:
      {
        screen:ShowPDFScreen,
        navigationOptions :({navigation})=>({ title: "",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation}/>
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
      titleStyle:
      {
        textAlign:'center',
      },
      headerTitleStyle:{
          fontWeight:"400",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          //fontFamily:"Montserrat"
          },
        })
      },
      AccidentDetail:
      {
        screen:AccidentDetailScreen,
        navigationOptions :({navigation})=>({ title: "REPORT AN ACCIDENT",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        titleStyle:
        {
          textAlign:'center',
        },
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //  fontFamily:"Montserrat"
            },
          })
      },
      AccidentDescription :
      {
        screen:AccidentDescriptionScreen,
        navigationOptions :({navigation})=>({ headerTitle: "DESCRIPTION",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //  fontFamily:"Montserrat"
            },
          })
      },
      AccidentVehicle :
      {
        screen:AccidentVehicleScreen,
        navigationOptions :({navigation})=>({ headerTitle: "VEHICLE INVOLVED",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //  fontFamily:"Montserrat"
            },
          })
      },
      AccidentInsurance:
      {
        screen:AccidentInsuranceScreen,
        navigationOptions :({navigation})=>({ headerTitle: "INSURANCE DETAILS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
        //    fontFamily:"Montserrat"
            },
          })
      },
      AccidentPeople :
      {
        screen:AccidentIPeopleScreen,
        navigationOptions :({navigation})=>({ headerTitle: "PEOPLE INVOLVED",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
        //    fontFamily:"Montserrat"
            },
          })
      },
      AccidentPolice :
      {
        screen:AccidentPoliceScreen,
        navigationOptions :({navigation})=>({ headerTitle: "POLICE DETAILS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //  fontFamily:"Montserrat"
            },
          })
      },
      AccidentDamage :
      {
        screen:AccidentDamageScreen,
        navigationOptions :({navigation})=>({ headerTitle: "DAMAGES",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //  fontFamily:"Montserrat"
            },
          })
      },
      OpenVideo :
      {
        screen:VideoCapture,
      },
      ResetPassword:
      {
        screen:ResetPasswordScreen,
        navigationOptions :({navigation})=>({ headerTitle: "",
        headerTransparent:true,
        headerStyle:{
          backgroundColor:"transparent",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //  fontFamily:"Montserrat"
            },
          })
      },
      ForgotPassword:
      {
        screen:ForgotPasswordScreen,
        navigationOptions :({navigation})=>({ headerTitle: "",
        headerTransparent:true,
        headerStyle:{
            backgroundColor:"transparent",
          width:'100%',
          height:verticalScale(60),
          textAlign:'center',
          width:'100%',
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
          //  fontFamily:"Montserrat"
            },
          })
      },
      Settings:
      {
        screen:SettingsScreen,
        navigationOptions :({navigation})=>({ headerTitle: "SETTINGS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
        //    fontFamily:"Montserrat"
            },
          })
      },
      ContactUs:
      {
        screen:ContactUsScreen,
        navigationOptions :({navigation})=>({ headerTitle: "CONTACT US",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
        //    fontFamily:"Montserrat"
            },
          })
      },
      NotificationDetail:
      {
        screen:NotificationDetailScreen,
        navigationOptions :({navigation})=>({ headerTitle: "NOTIFICATIONS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
        //    fontFamily:"Montserrat"
            },
          })
      },
      TrackClaim:
      {
        screen:ClaimTrackScreen,
        navigationOptions :({navigation})=>({ headerTitle: "TRACK CLAIMS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
        //    fontFamily:"Montserrat"
            },
          })
      },
      InviteFriend:
      {
        screen:InviteFriendsScreen,
        navigationOptions :({navigation})=>({ headerTitle: "INVITE A FRIEND",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
        //    fontFamily:"Montserrat"
            },
          })
      },
      Subscription:
      {
        screen:SubscriptionScreen,
        navigationOptions :({navigation})=>({ headerTitle: "SUBSCRIPTIONS",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerRight:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.openDrawer() }}>
          <IconBadge
          MainElement={
            <Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>
          }
          BadgeElement={
            <Text   style={{color:'#FFFFFF'}} >{navigation.state.params.badgeCount}</Text>
          }
          IconBadgeStyle={
            {
              width:scale(10),
              height:verticalScale(15),
              marginTop:-10,
              marginRight:  0,
              backgroundColor: '#FF0000'}
            }
            Hidden={false}/>
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
        //    fontFamily:"Montserrat"
            },
          })
      },
      SignUp:
      {
        screen:SignUpScreen,
        navigationOptions :{ header: null,
        }
      },
      AddVehicle :
      {
        screen:AddVehicleScreen,
        navigationOptions :({navigation})=>({ headerTitle: "ADD VEHICLE",
        headerStyle:{
          backgroundColor:"#3598DB",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:
        <TouchableHighlight  underlayColor='transparent' onPress={()=>{navigation.goBack()}}>
        <Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />
        </TouchableHighlight>,
        headerTitleStyle:{
            fontWeight:"400",
            color:"white",
            fontSize:moderateScale(18),
            textAlign:'center',
            width:'100%',
      //      fontFamily:"Montserrat"
            },
          })
      },
      Success:
      {
        screen:SuccessScreen,
        navigationOptions :{ headerTitle: "",
        headerTransparent:true,
        headerStyle:{
            backgroundColor:"transparent",
          width:'100%',
          height:verticalScale(60),
        },
        headerLeft:<Image source={require('./img/arrow-left.png')} style={styles.LeftArrowNavigation} />,
        headerRight:<Image source={require('./img/menu_2.png')} style={styles.RightNavigation}/>,
        headerTitleStyle:{
          fontWeight:"bold",
          color:"white",
          fontSize:moderateScale(18),
          textAlign:'center',
          width:'100%',
          },
        }
      },
  }
)
class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}
const RootNavigator = createDrawerNavigator ({
  A: { screen: AppNavigator },
}, {
  // set content of side bar
  contentComponent: (props) => <Drawer ref={(ref) => this._drawer = ref}
                type="overlay" style={{width:300}} navigation={props.navigation} {...props} />
});
const AppContainer=createAppContainer(RootNavigator);
type Props = {};
/*const drawernav = DrawerNavigator({
  Item1: {
      screen: AppNavigator,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: 100,
});*/

export default class App extends React.Component {
  componentDidMount()
  {
    //StatusBar.setHidden(true);
  }
  constructor(props) {
    super(props);
    this.state = {
          senderId: appConfig.senderID
        };

      this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    if(!IS_IOS)
    {
      this.notif.configure(this.onRegister.bind(this), this.onNotif.bind(this), this.state.senderId);
    }
  }
  onRegister(token) {
    //alert("Registered !", JSON.stringify(token));
    console.log(token);
    global.device_id=token.token;
    //alert(global.device_id)
  //  this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    if(global.isPush)
    {
      Alert.alert(notif.title, notif.message);
    }
    if(global.isVibrate)
    {
      const DURATION = 10000;
      const PATTERN = [1000, 2000, 3000];

      Vibration.vibrate(DURATION);
    }

    fetch(global.APIURL + 'UserNotifications?user_id='+global.useId,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((responseJson) => {
      if(responseJson.status)
      {
        global.notificationList=responseJson.notifications;
        global.notificationCount=global.notificationList.length;

    //alert(responseJson.notifications.length);
    //  alert(global.notificationList.length);
      //alert(global.notificationList.length.toString());

    }
    else {

        //alert(responseJson.msg);
      }
    }).catch((error) => {

    //alert("notofication" + error);
  });
  }
  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }
  render()
  {
    //const menu = <SideMenu navigator={AppNavigator}/>;


//return(
      //<Menu/>
        //    )
    return <AppContainer />;
  }
}
