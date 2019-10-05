import React, {Component} from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {Platform, TouchableOpacity,StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';


export default class ProfileScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {front_url:'',front_file_name:'',userName:global.userName,email:global.email,phone:global.phone,occupation:global.occupation,address:global.address}

  }
  async updateUserName()
  {
    const usrName=this.state.userName;
    let formData=new FormData();
    formData.append("user_id",global.useId);
    formData.append("first_name",usrName);
    formData.append("last_name",'test1');

    fetch(global.APIURL + 'UpdateUserName',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: formData
    }).then((response) =>
       response.json()).then((responseJson) => {
          if(responseJson.status)
          {
            global.userName=usrName;
            //alert("Done");
            //this.props.navigation.navigate('AddParkingTicket')
          }
          else {
            //alert(JSON.stringify(responseJson));
            alert(responseJson.msg);
          }
        })
        .catch((error) => {
            alert(error);

            //you will get error here.
        });
  }
  async updateEmail()
  {
    const email=this.state.email;

    let formData=new FormData();
    formData.append("user_id",global.useId);
    formData.append("email",email);

    fetch(global.APIURL + 'UpdateUserEmailId',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: formData
    }).then((response) =>
       response.json()).then((responseJson) => {
          if(responseJson.status)
          {
            //alert("Done");
            global.email=email;
            //this.props.navigation.navigate('AddParkingTicket')
          }
          else {
            //alert(JSON.stringify(responseJson));
            alert(responseJson.msg);
          }
        })
        .catch((error) => {
            alert(error);

            //you will get error here.
        });
  }
  async updatePhone()
  {
    const phone=this.state.phone;

    let formData=new FormData();
    formData.append("user_id",global.useId);
    formData.append("phone",phone);

    fetch(global.APIURL + 'UpdateUserPhoneNumber',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: formData
    }).then((response) =>
       response.json()).then((responseJson) => {
          if(responseJson.status)
          {
            //alert("Done");
            global.phone=phone;
            //this.props.navigation.navigate('AddParkingTicket')
          }
          else {
            //alert(JSON.stringify(responseJson));
            alert(responseJson.msg);
          }
        })
        .catch((error) => {
            alert(error);

            //you will get error here.
        });
  }
  async updateUserOccupation()
  {
    const occupation=this.state.occupation;

    let formData=new FormData();
    formData.append("user_id",global.useId);
    formData.append("occupation",occupation);

    fetch(global.APIURL + 'UpdateUserOccupation',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: formData
    }).then((response) =>
       response.json()).then((responseJson) => {
          if(responseJson.status)
          {
            global.occupation=occupation;
          //  alert("Done");
            //this.props.navigation.navigate('AddParkingTicket')
          }
          else {
            //alert(JSON.stringify(responseJson));
            alert(responseJson.msg);
          }
        })
        .catch((error) => {
            alert(error);

            //you will get error here.
        });
      }
    async updateAddress()
    {
      const address=this.state.address;

      let formData=new FormData();
      formData.append("user_id",global.useId);
      formData.append("address",address);

      fetch(global.APIURL + 'UpdateUserLocation',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: formData
      }).then((response) =>
         response.json()).then((responseJson) => {
            if(responseJson.status)
            {
              global.address=address;
            //  alert("Done");
              //this.props.navigation.navigate('AddParkingTicket')
            }
            else {
              //alert(JSON.stringify(responseJson));
              alert(responseJson.msg);
            }
          })
          .catch((error) => {
              alert(error);

              //you will get error here.
          });
  }
  async takePhoto() {
    const options = {
      title: 'Select Picture',
      mediaType:'photo',
      storageOptions: {
    skipBackup: true,
    path: 'photo',
  },
  };
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      var  source = response.uri ;
      //source=source.replace('%2F','/')
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.setState({front_url:source })
      global.profilePicture=source
      var strIndex=source.lastIndexOf('/')+1;
      var fileName=source.substr(strIndex);
      this.setState({front_file_name:fileName})
      let formData=new FormData();
      formData.append("user_id",global.useId);
      formData.append("profile_picture",{name:fileName,
      uri:source,
      type:'photo/png'});

      fetch(global.APIURL + 'UpdateUserProfilePicture',{
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
              alert("Done");
              //this.props.navigation.navigate('AddParkingTicket')
            }
            else {
              //alert(JSON.stringify(responseJson));
              alert(responseJson.msg);
            }
          })
          .catch((error) => {
              alert(error);

              //you will get error here.
          });

    }
  });
  }
  render() {
    var imageFrontURL=[];
    var intC=0;
    imageFrontURL.push(
      <View key={"View" + intC.toString()} style={styles.backGroundImage}>

          { (global.profilePicture!="") &&
            <ImageBackground  key={"imgBack" + intC.toString()} source={{uri:global.profilePicture}} style={styles.profileImage} >
          <TouchableOpacity key={"Touch" + intC.toString()} underlayColor='none'
             onPress={this.takePhoto.bind(this)}>
             <Image key={"img" + intC.toString()} source={require('./img/update_profile.png')} style={styles.userAttachIcon}/>
           </TouchableOpacity>
         </ImageBackground>}
    </View>

    )
    return (
      <ScrollView style={styles.containerMain}>

            {imageFrontURL}

            <Text style={styles.textField}>User Name</Text>
            <View style={styles.containerDetail}>

        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          style={styles.input}  editable={true} value={this.state.userName}
          onChangeText={(text)=>this.setState({userName:text})}
          onBlur={
            this.updateUserName.bind(this)}
          />
          <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
          </View>
          <Text style={styles.textField}>Email</Text>

            <View style={styles.containerDetail}>
            <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.email}
          onChangeText={(text)=>this.setState({email:text})}
          onBlur={this.updateEmail.bind(this)} style={styles.input} editable={true} />
          <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
          </View>
          <Text style={styles.textField}>Phone Number</Text>
              <View style={styles.containerDetail}>
            <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.phone}
          onChangeText={(text)=>this.setState({phone:text})}
          onBlur={this.updatePhone.bind(this)} style={styles.input}  editable={true} />
          <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
          </View>
          <Text style={styles.textField}>Occupation</Text>
          <View style={styles.containerDetail}>
            <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.occupation}
          onChangeText={(text)=>this.setState({occupation:text})}
          onBlur={this.updateUserOccupation.bind(this)} style={styles.input} editable={true} />
          <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
          </View>
          <Text style={styles.textField}>Address</Text>
          <View style={styles.containerDetail}>

           <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
            value={this.state.address}
            onChangeText={(text)=>this.setState({address:text})}
            onBlur={this.updateAddress.bind(this)} style={styles.input} editable={true} style={styles.input}  editable={true} />
            <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
            </View>

       <View style={styles.containerDetail}>
          <Text style={styles.headerDate}>Change Password</Text>
            <TouchableOpacity underlayColor='none'
               onPress={()=>{ this.props.navigation.navigate('ResetPassword',{badgeCount:global.notificationList.length})}}>
               <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
             </TouchableOpacity>
      </View>
       <View style={styles.containerDetail}>
          <Text style={styles.headerDate}>Payment details</Text>
            <TouchableOpacity underlayColor='none'
               onPress={()=>{ this.props.navigation.navigate('PaymentDetails',{badgeCount:global.notificationList.length})}}>
               <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
             </TouchableOpacity>
      </View>
       <View style={styles.containerDetail}>
          <Text style={styles.headerDate}>My vehicles</Text>
            <TouchableOpacity underlayColor='none'
               onPress={()=>{ this.props.navigation.navigate('MyVehicles',{badgeCount:global.notificationList.length})}}>
               <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
             </TouchableOpacity>
      </View>
      <View style={styles.containerDetailLast}>
         <Text style={styles.headerDate}>My documents</Text>
           <TouchableOpacity underlayColor='none'
              onPress={()=>{ this.props.navigation.navigate('MyDocuments',{badgeCount:global.notificationList.length})}}>
              <Image source={require('./img/expand_right_arrow.png')} style={styles.expandIcon}/>
            </TouchableOpacity>
      </View>

    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerDetail: {
    backgroundColor: 'white',
    width: scale(320),
    marginTop:verticalScale( 10),
    marginLeft:moderateScale(15),
    flexDirection: 'row',
  },
  containerDetailLast: {
    backgroundColor: 'white',
    width: scale(320),
    marginTop:verticalScale( 10),
    marginLeft:moderateScale(15),
    flexDirection: 'row',
    marginBottom: moderateScale(50),
  },
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,

  },
  textField: {
    color: '#000000',
    fontSize: moderateScale(12),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(10),
    marginLeft:  moderateScale(15),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(10),
  },
  backGroundImage: {
    alignItems: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },
  profileImage: {
    width: scale(200),
    height: verticalScale(200),
  },
  input:
  {
    paddingTop: moderateScale(5),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(5),
    paddingLeft: moderateScale(15),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    color: '#000000',
    width: scale(260),
    backgroundColor:'white',
    height:verticalScale(30),


  },
  userAttachIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: scale(135),
    marginTop: verticalScale(135),
  },
  expandIcon:
  {
    width: moderateScale(8),
    height: moderateScale(8),
    marginLeft: scale(45),
    marginTop: verticalScale(21),
    marginBottom: verticalScale(15),
  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(12),
    textAlign:'left',
    fontWeight: 'normal',
    margin:  moderateScale(15),
    width: scale(230),
  },
});
