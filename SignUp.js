/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
 import {Platform,ActivityIndicator,ScrollView, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight,
   TouchableOpacity,StatusBar,route,Linking} from 'react-native';
 import {createStackNavigator,createAppContainer} from 'react-navigation';
 import { Button } from 'react-native-elements';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
 import PropTypes from 'prop-types';
export default class SignUpScreen extends React.Component
{
  componentDidMount()
  {
    StatusBar.setHidden(true);
  }
  callback(vehcileList) {
        //alert(path);
        this.setState({vehicleList:vehcileList})
        //alert(this.state.vehicleList.length);
  }
  state={
    username:'',
    password:'',
    confirmPassword:'',
    email:'',
    phone:'',
    address:'',
    vehicleList:[],
    referralNumber:'',
    showLoader:false,
  }
  render() {
    return (

      <ScrollView style={styles.containerMain}>
          <StatusBar hidden />
          <ImageBackground style={styles.backGroundImage} source={require('./img/mainbg.png')} >
          <Text style={styles.ResetPasswordText}>SIGNUP</Text>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/user.png')} style={styles.userIcon}/>
              <TextInput placeholderTextColor={'white'}
                value={this.state.username}
                onChangeText={username=>this.setState({username})}
                underlineColorAndroid="transparent" style={styles.input} placeholder="Username" editable={true} />
          </View>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/envelope.png')} style={styles.userIcon}/>
              <TextInput placeholderTextColor={'white'}
                value={this.state.email}
                onChangeText={email=>this.setState({email})}
                underlineColorAndroid="transparent" style={styles.input} placeholder="Email" editable={true} />
          </View>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/phone.png')} style={styles.userIcon}/>
              <TextInput placeholderTextColor={'white'}
                value={this.state.phone}
                onChangeText={phone=>this.setState({phone})}
              underlineColorAndroid="transparent" style={styles.input} placeholder="Phone" editable={true} />
          </View>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/car.png')} style={styles.userIcon}/>
              <TextInput placeholderTextColor={'white'}
                underlineColorAndroid="transparent" style={styles.inputVehicles}
                placeholder="Add Vehicle(s)" editable={false} />
                <TouchableOpacity underlayColor='none'
                   onPress={() => {this.props.navigation.navigate('AddVehicle', { callback: this.callback.bind(this)})}}>
                   <Image source={require('./img/right-arow.png')} style={styles.arrowIcon}/>
              </TouchableOpacity>
          </View>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/direction.png')} style={styles.userIcon}/>
              <TextInput placeholderTextColor={'white'}
                value={this.state.address}
                onChangeText={address=>this.setState({address})}
              underlineColorAndroid="transparent" style={styles.input} placeholder="Enter Address" editable={true} />
          </View>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/lock.png')} style={styles.userIcon}/>
              <TextInput secureTextEntry={true}
                value={this.state.password}
                onChangeText={password=>this.setState({password})}
                placeholderTextColor={'white'} underlineColorAndroid="transparent" style={styles.input} placeholder="Password" editable={true} />


        </View>
          <View style={styles.containerTextBox}>
              <Image source={require('./img/lock.png')} style={styles.userIcon}/>
              <TextInput secureTextEntry={true}
                value={this.state.confirmPassword}
                onChangeText={confirmPassword=>this.setState({confirmPassword})}
                placeholderTextColor={'white'} underlineColorAndroid="transparent" style={styles.input} placeholder="Repeat Password" editable={true} />
          </View>
          <View style={styles.containerTextBox}>
              <TextInput secureTextEntry={true}
                value={this.state.referralNumber}
                onChangeText={referralNumber=>this.setState({referralNumber})}
                placeholderTextColor={'white'} underlineColorAndroid="transparent" style={styles.input} placeholder="Referral Number" editable={true} />
          </View>
          {this.state.showLoader &&
          <View >
            <Text style={styles.loadingText}>  Uploading multimedia files,please wait before clicking submit</Text>
              <ActivityIndicator size='large' color="black" />
          </View>
        }
          <Button title="Sign Up" buttonStyle={{
              backgroundColor: "#E74C3C",
              width: scale(300),
              height: verticalScale(50),
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: scale(30),
              marginTop:moderateScale(30),

              }}
              textStyle={{
                fontSize:moderateScale(20),
                fontWeight: 'bold',
                color:'white'
              }}
              onPress={()=>{
                  this.setState({ showLoader:true });
                const{username,password,email,phone,address,vehicleList,confirmPassword,referralNumber}=this.state
                if(username==''|| password==''|| confirmPassword==''||email==''||phone==''||address=='')
                {
                  this.setState({ showLoader:true });
                      alert('Please enter all the details');
                  return;
                }
                else if(password!=confirmPassword)
                {
                  this.setState({ showLoader:true });
                      alert('Password and Confirm Password do not match');
                  return;
                }
                //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/UserSignUp', {
                fetch(global.APIURL + 'UserSignUp',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'username' : username,
                    'password': password,
                    'email':email,
                    'phone':phone,
                    'address':address,
                    'vehicle':vehicleList,
                    'referred_by_user':referralNumber,
                  })
                }).then((response) => response.json()).then((responseJson) => {
                      //  alert(responseJson);
                      if(responseJson.status)
                      {
                        this.props.navigation.navigate('Success',{typeScreen:'SignUp'})
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
                }}/>
                <TouchableOpacity underlayColor='none' onPress={() => {Linking.openURL('http://www.drivekare.co.uk/terms')}}>
                <Text style={{marginLeft:moderateScale(15),marginTop: moderateScale(20),marginBottom: moderateScale(20)}}>
              <Text style={styles.signUpText1}>By signing up, you agree to the </Text>
                  <Text style={styles.signUpText}>Terms and Conditions</Text>
               <Text style={styles.signUpText1}> for
                   this service.</Text>
          </Text>
        </TouchableOpacity>

            </ImageBackground>


    </ScrollView>

    );
  }
}




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#3598DB',
    resizeMode:'center'
  },
  containerMain: {
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },

  logoBackGround: {
    marginLeft: moderateScale(10),
    marginRight:  moderateScale(10),
    marginTop: moderateScale(20),
    width: scale(160),
    height:verticalScale(150),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },
  backGroundImage: {
    alignItems: 'center',
    backgroundColor: '#3598DB',
    justifyContent: 'center',
    flexGrow: 1,
  },

  signUpText: {
    textAlign: 'center',
    color: 'white',
    marginTop: moderateScale(30),
    fontSize: moderateScale(12),
    textDecorationLine: 'underline'
  },
  signUpText1: {
    textAlign: 'center',
    color: 'white',
    marginTop: moderateScale(30),
    fontSize: moderateScale(12),
  },
  loadingText: {
    textAlign: 'center',
    color: 'white',
    marginTop: moderateScale(30),
    fontSize: moderateScale(12),
    marginBottom: moderateScale(30),
  },
  containerTextBox: {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(1),
    paddingLeft:moderateScale(10),
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
    fontSize: moderateScale(20),
    backgroundColor:'transparent',
    marginBottom: 0,
    height:verticalScale(35),
    textAlignVertical: 'bottom',
    marginTop: 0,


  },
  inputVehicles:
  {
    marginLeft:moderateScale(15),

    paddingBottom: moderateScale(1),
    color: '#ffffff',
    width: scale(230),
    fontSize: moderateScale(20),
    backgroundColor:'transparent',
    marginBottom: 0,
    height:verticalScale(35),
    textAlignVertical: 'bottom',
    marginTop: 0,


  },
  userIcon: {
    width: scale(20),
    height: verticalScale(25),
    resizeMode:'contain',
  },
  arrowIcon: {
    width: scale(15),
    height: verticalScale(15),
    resizeMode:'contain',
  },
  EmailIcon: {
    width: scale(30),
    height: verticalScale(30),
    resizeMode:'contain',
  },

  ResetPasswordText: {
    color: '#FFFFFF',
    fontSize: moderateScale(30),
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    marginBottom: moderateScale(5),
    marginTop: moderateScale(60)
  },

  loginButton:
  {
    color:'black',
    backgroundColor:'#FF0000',
    paddingTop:moderateScale(10),
    paddingBottom:moderateScale(10),
    paddingRight:moderateScale(10),
    paddingLeft:moderateScale(10),
    fontSize: moderateScale(25),
  },

});
