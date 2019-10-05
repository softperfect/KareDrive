import React, {Component} from 'react';
import {Platform, StyleSheet,Alert, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Stripe from 'react-native-stripe-api';
var CryptoJS=require("crypto-js");
import stripe from 'tipsi-stripe'

export default class SubscriptionScreen extends React.Component
{
  render() {
    return (
      <ScrollView style={styles.containerMain}>
        <Text style={styles.headerDate}>Free User</Text>
          <View flexDirection='row'>
            <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>Accident management</Text>
         </View>
         <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />

         <View flexDirection='row'>
           <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
          <Text style={styles.detailText}>Reminders</Text>
        </View>
        <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
      <View flexDirection='row'>
          <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
          <Text style={styles.detailText}>Vehicle check (pay as you go)</Text>
       </View>
       <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
       <View flexDirection='row'>
         <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
          <Text style={styles.detailText}>Pay As You Go Service</Text>
      </View>
      <Button title="SUBSCRIBE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(300),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(30),
            marginBottom: moderateScale(20),
            marginLeft: moderateScale(10),
            }}
            textStyle={{ fontWeight:'bold'}}
            onPress={()=>{
                  fetch(global.APIURL + 'UpdateUserSubscription',{
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                      'user_id':global.useId,
                      'subscription_type':'PAYG',
                    })
                  }).then((response) => response.json()).then((responseJson) => {
                          if(responseJson.status)
                        {
                          this.props.navigation.navigate('Main')
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


          <Text style={styles.headerDate}>Premium User</Text>
              <View flexDirection='row'>
                <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
                <Text style={styles.detailText}>Accident management</Text>
             </View>
             <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
             <View flexDirection='row'>
               <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
               <Text style={styles.detailText}>Reminders</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
              <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
              <Text style={styles.detailText}>Vehicle check (pay as you go)</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
              <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
              <Text style={styles.detailText}>Pay As You Go Service</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
              <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
              <Text style={styles.detailText}>Parking tickets</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
              <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
              <Text style={styles.detailText}>Camera tickets</Text>
            </View>
            {(  global.userType!="Premium Subscribers") &&
            <Button title="SUBSCRIBE WITH £29.9/M" buttonStyle={{
                backgroundColor: "#3598DB",
                width: scale(320),
                height: verticalScale(50),
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 0,
                marginTop: moderateScale(30),
                marginBottom: moderateScale(20),
                marginLeft: moderateScale(10),
                }}
                textStyle={{ fontWeight:'bold'}}
                  onPress={ ()=>{
                  Alert.alert('Drive Kare' ,'Are you sure to subscribe',[{text:'Cancel',
                  onPress:()=>{},style:'cancel'},{text:'Ok',onPress:()=>{
                    fetch(global.APIURL + 'MyPaymentMethods?user_id='+global.useId,{
                      method: 'GET',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      }
                    }).then((response) => response.json()).then(async (responseJson) => {
                    if(responseJson.status)
                    {
                      if(responseJson.paymentmethods.length>0)
                      {
                          const card_number=responseJson.paymentmethods[0].card_number;
                          const card_cvv=responseJson.paymentmethods[0].card_cvv;
                          const card_holder_name=responseJson.paymentmethods[0].card_holder_name;
                          const ciphertextCardNumber=CryptoJS.AES.decrypt(card_number,'111').toString();
                          const ciphertextCCV=CryptoJS.AES.decrypt(card_cvv,'111').toString();
                          //alert(card_number);
                          const apiKey = 'pk_test_g0X1VygNSc3zd0SOwnJN5Wqa';
                          const apiKey1 = 'sk_test_gVrQ4ctGvD2Yj6Pd72KK8ngB';
                            stripe.setOptions({
                            publishableKey: apiKey
                          })
                          const params = {
                            // mandatory
                            type: 'card',
                              number: card_number,
                            expMonth: 11,
                            expYear: 20,
                            cvc: card_cvv,
                          }
                          const token = await stripe.createSourceWithParams({
                                  type: 'card',
                                  number: card_number,
                                  expMonth: 11,
                                  expYear: 29,
                                  cvc: card_cvv,
                                })
                          //const token = await stripe.stripe.createSourceWithParams(params)
                          //alert(JSON.stringify(token.sourceId));
                          //const client = new Stripe(apiKey);
                        //  const token =  client.createToken({
                        //       number: {ciphertextCardNumber},
                        //       cvc: {ciphertextCCV},
                        //       exp_month: '09',
                        //       exp_year: '18',
                        //    });
                        //    const customer =  client.createCustomer(token.id, 'help@contentbay.co.uk', '313trading@gmail.com', card_holder_name, '');
                        //    const charge =  client.createCharge(2.99 * 100, customer.id, 'Payment example','USD');
                            fetch(global.APIURL + 'UpdateUserSubscription',{
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                'user_id':global.useId,
                                'subscription_type':'Premium Subscribers',
                                'source_id':token.sourceId,
                              })
                            }).then((response) => response.json()).then((responseJson) => {
                                    if(responseJson.status)
                                  {
                                    this.props.navigation.navigate('Main')
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
                    }
                    else {
                        alert(responseJson.msg);
                    }
                    }).catch((error) => {
                    alert(error);
                    });
                  }}])
                }}

                  />
              }
              {(  global.userType=="Premium Subscribers") &&
              <Button title="Cancel" buttonStyle={{
                  backgroundColor: "#3598DB",
                  width: scale(320),
                  height: verticalScale(50),
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 0,
                  marginTop: moderateScale(30),
                  marginBottom: moderateScale(20),
                  }}
                  textStyle={{ fontWeight:'bold'}}
                    onPress={ ()=>{
                    Alert.alert('Drive Kare' ,'Are you sure to cancel',[{text:'Cancel',
                    onPress:()=>{},style:'cancel'},{text:'Ok',onPress:()=>{

                            fetch(global.APIURL + 'CancelUserSubscription',{
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                'user_id':global.useId,

                              })
                            }).then((response) => response.json()).then((responseJson) => {
                                    if(responseJson.status)
                                  {
                                    global.userType='PAYG';
                                    this.props.navigation.navigate('Main')
                                  }
                                  else {
                                    alert(responseJson.msg);
                                  }
                                })
                                .catch((error) => {
                                    alert(error);

                                    //you will get error here.
                                });
                              }}])
                            }}/>
                }
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
    fontSize: 20,
    textAlign:'left',
    fontWeight: 'bold',
    marginLeft :  moderateScale(30),
    marginTop :  moderateScale(20),
    marginBottom:  moderateScale(20),
    width:scale(300),
  },
  detailText: {
    color: '#000000',
    fontSize: 14,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  moderateScale(20),
    marginTop :  moderateScale(3),
    width:scale(300),
  },
  LeftArrowNavigation:
  {
    marginLeft :  moderateScale(30),
    width: scale(20),
    height: verticalScale(22),
    resizeMode:'contain',

  },
  verticleImage:
  {
    marginLeft :  moderateScale(40),
    marginTop :  moderateScale(0),
    width: scale(1),
    height: verticalScale(40),
  },
});
