import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
var CryptoJS=require("crypto-js");

export default class PaymentDetailScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {card_holder_name:'',  card_number:'',cvv_number:''}
    this.getPaymentmethod()
  }
  getPaymentmethod()
  {
    fetch(global.APIURL + 'MyPaymentMethods?user_id='+global.useId,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }).then((response) => response.json()).then((responseJson) => {
  if(responseJson.status)
  {
    if(responseJson.paymentmethods.length>0)
    {
      this.setState({card_holder_name:responseJson.paymentmethods[0].card_holder_name})
      this.setState({card_number:responseJson.paymentmethods[0].card_number})
      this.setState({cvv_number:responseJson.paymentmethods[0].card_cvv})
    }
  }
  else {
        alert(responseJson.msg);
  }
}).catch((error) => {
    alert(error);
});
}
  render() {
    return (
      <View style={styles.containerMain}>
      <Text style={styles.headerDate}>Card Holder Name</Text>
      <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.card_holder_name}
          onChangeText={card_holder_name=>this.setState({card_holder_name})}
          style={styles.input} editable={true} />

      <Text style={styles.headerDate}>Card Number</Text>
      <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
            secureTextEntry={true}
            value={this.state.card_number}
            onChangeText={card_number=>this.setState({card_number})}
            style={styles.input} editable={true} />
      <Text style={styles.headerDate}>CVV</Text>
      <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
              secureTextEntry={true}
              value={this.state.cvv_number}
              onChangeText={cvv_number=>this.setState({cvv_number})}
              style={styles.input} editable={true} />

        <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: verticalScale(200),
            marginLeft: moderateScale(0),
          }}
            onPress={()=>{
                const{card_holder_name,  card_number,cvv_number}=this.state
                const ciphertextCardNumber=CryptoJS.AES.encrypt(card_number,'111').toString();
                const ciphertextCCV=CryptoJS.AES.encrypt(cvv_number,'111').toString();

                  fetch(global.APIURL + 'AddUserPaymentMethod',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'user_id' : global.useId,
                    'card_holder_name':card_holder_name,
                    'card_number':card_number,
                    'card_cvv':cvv_number,
                  })
                }).then((response) => response.json()).then((responseJson) => {
                      //  alert(responseJson);
                      if(responseJson.status)
                      {
                        this.props.navigation.navigate('ProfileDetails')
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
    </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: 'row',
    flex: 1,
    flexWrap:'wrap',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',

  },
  input:
  {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    marginLeft:scale(15),
    marginRight:moderateScale(15),

    color: '#000000',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(50),
  paddingLeft: moderateScale(15),

  },
  headerDate: {
    color: '#000000',
    fontSize: 14,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  scale(20),
    marginTop :  20,
    marginBottom: 0,
    width: scale(300),
  },
});
