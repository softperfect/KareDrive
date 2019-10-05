import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class ContactUsScreen extends React.Component
{
  constructor(props){
    super(props)
    //this.state = {phone:'',sms:'',email:'',address:''}
    this.state = {name:'',email:'',subject:'',message:'',showLoader:false }

    /*fetch(global.APIURL + 'GetContactDetail',{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((responseJson) => {
    if(responseJson.status)
    {
      this.setState({phone:responseJson.contactdetail.call_no})
      this.setState({sms:responseJson.contactdetail.text_no})
      this.setState({email:responseJson.contactdetail.email})
      this.setState({address:responseJson.contactdetail.address})
    }
    else {
        alert(responseJson.msg);
    }
    }).catch((error) => {
    alert(error);
  });*/
  }
/*
<View flexDirection='row'>
  <Text style={styles.headerDate}>CALL</Text>
  <Text style={styles.input}>{this.state.phone}</Text>
</View>
<View flexDirection='row'>
  <Text style={styles.headerDate}>TEXT</Text>
  <Text style={styles.input}>{this.state.sms}</Text>
</View>
<View flexDirection='row'>
  <Text style={styles.headerDate}>EMAIl</Text>
  <Text style={styles.input}>{this.state.email}</Text>
</View>
<View flexDirection='row'>
  <Text style={styles.headerDate}>ADDRESS</Text>
  <Text style={styles.input}>{this.state.address}</Text>
</View>*/

  render() {
    return (
        <ScrollView style={styles.containerMain}>
          <TextInput placeholderTextColor={'black'}
          placeholder='Your Name'
            value={this.state.name}
            onChangeText={name=>this.setState({name})}
            underlineColorAndroid="transparent" style={styles.dropdown} editable={true} multiline ={false} />
        <TextInput placeholderTextColor={'black'}
              placeholder='Your Email'
                value={this.state.email}
                onChangeText={email=>this.setState({email})}
                underlineColorAndroid="transparent" style={styles.dropdown} editable={true} multiline ={false} />
        <TextInput placeholderTextColor={'black'}
              placeholder='Subject'
                value={this.state.subject}
                onChangeText={subject=>this.setState({subject})}
                underlineColorAndroid="transparent" style={styles.dropdown} editable={true} multiline ={false} />
        <TextInput placeholderTextColor={'black'}
               placeholder='Your Message'
                 value={this.state.message}
                 onChangeText={message=>this.setState({message})}
                 underlineColorAndroid="transparent" style={styles.input} editable={true} multiline ={true} />

       {this.state.showLoader &&
         <View >
           <Text style={styles.signUpText}>  Please wait before clicking submit</Text>
             <ActivityIndicator size='large' color="black" />
         </View>
       }
       <Button title="SUBMIT" buttonStyle={{
           backgroundColor: "#3598DB",
           width: scale(320),
           height: verticalScale(50),
           borderColor: "transparent",
           borderWidth: 0,
           borderRadius: 0,
           marginLeft: scale(0),
           marginTop: verticalScale(100),
           }}
           textStyle={{ fontWeight:'bold'}}
             onPress={()=>{
               this.setState({ showLoader:true });
               const{name,email,subject,message,}=this.state
               let formData=new FormData();
               formData.append("user_id",global.useId);
               formData.append("name",name);
               formData.append("email",email);
               formData.append("subject",subject);
               formData.append("message",message);
               var url='';
               url='AddMessage';

               fetch(global.APIURL + url,{
                   method: 'POST',
                   headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'multipart/form-data',
                   },
                   body: formData
               }).then((response) =>
                  response.json()).then((responseJson) => {
                     if(responseJson.status)
                     {
                       this.props.navigation.navigate('Main')
                     }
                     else {
                           this.setState({ showLoader:false });
                       //alert(JSON.stringify(responseJson));
                       alert(responseJson.msg);
                     }
                   })
                   .catch((error) => {
                         this.setState({ showLoader:false });
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
  signUpText: {
    textAlign: 'center',
    color: 'red',
    marginTop: moderateScale(30),
    fontSize: moderateScale(12),
    marginBottom: moderateScale(30),
  },
  headerDate: {
    color: '#000000',
    fontSize: 20,
      alignSelf: 'center',
      textAlign: 'left',
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  moderateScale(15),
    marginTop :  moderateScale(20),
    marginBottom: moderateScale(10),
    width:scale(160),
  },
  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    paddingLeft: moderateScale(10),
    borderBottomColor: 'transparent',
    borderBottomWidth:  0,
    marginLeft: moderateScale(15),
    paddingTop: moderateScale(1),
    paddingBottom: moderateScale(1),
    fontSize: moderateScale(15)
  },
  input:
  {
    paddingTop: moderateScale(1),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(1),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
    marginLeft:  moderateScale(15),
    marginRight:moderateScale(15),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(150),
    textAlignVertical:'top',
    paddingLeft: moderateScale(15),
    fontSize: moderateScale(15)
  }
});
