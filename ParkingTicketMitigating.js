import React, {Component} from 'react';
import {Platform, ActivityIndicator,StyleSheet, Text,TouchableOpacity,ScrollView,View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

export default class ParkingTicketMitigatingScreen extends React.Component
{

  constructor(props,typeTicket){
    super(props)
    const { navigation } = this.props;


    this.state = {typeTicket:navigation.getParam('typeTicket', 'id'),mitigating_reason:'',mitigating_info:'',textLength:0,front_url:'' ,front_file_name:'', back_url:'' ,back_file_name:'',showLoader:false,   }

}
async takePhoto() {
  const options = {
    title: 'Select Evidence',
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
    var strIndex=source.lastIndexOf('/')+1;
    var fileName=source.substr(strIndex);
    this.setState({front_file_name:fileName})


  }
});
}
async takePhoto2() {
  const options = {
    title: 'Select Evidence',
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
    this.setState({back_url:source })
    var strIndex=source.lastIndexOf('/')+1;
    var fileName=source.substr(strIndex);
    this.setState({back_file_name:fileName})


  }
});
}
onChangeText(text)
{
  this.setState({textLength:200-text.length,mitigating_info:text})

}
  render() {
    let mitigationReasons=[{value:'reason1',},{value:'reason2',},{value:'reason3',}]
    return (
      <ScrollView horizontal={false} style={styles.containerMain}>
        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
           value={this.state.mitigating_reason}
           onChangeText={mitigating_reason=>this.setState({mitigating_reason})}
           style={styles.inputReason} placeholder="Add Mitigating reason" editable={true} />
         <Text style={{fontSize:12,color:'black',textAlign: 'right',marginRight:moderateScale(20),marginTop: moderateScale(20), }}>
             Character Left:{this.state.textLength}
           </Text>
         <TextInput placeholderTextColor={'black'}
         placeholder='Provide more information about the reason'
           value={this.state.mitigating_info}
           underlineColorAndroid="transparent" style={styles.input} multiline={true} editable={true} maxLength={200}
           onChangeText={this.onChangeText.bind(this)} />
           <View style={styles.containerDetail}>
              <Text style={styles.headerDate}>Upload evidence</Text>
                <TouchableOpacity underlayColor='none'
                   onPress={this.takePhoto.bind(this)}>
                   <Image source={require('./img/attach_icon.png')} style={styles.userAttachIcon}/>
                 </TouchableOpacity>

        </View>
        <Text style={styles.attachPhotoText}>{this.state.front_file_name}</Text>
          {this.state.showLoader &&
          <View >
            <Text style={styles.signUpText}>  Uploading multimedia files,please wait before clicking submit</Text>
              <ActivityIndicator size='large' color="black" />
          </View>
        }
        <Button title="DONE" buttonStyle={{
              backgroundColor: "#3598DB",
              width: scale(320),
              height: verticalScale(50),
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 0,
              marginTop: verticalScale(220),
              marginLeft:scale(0),

              }}
              textStyle={{fontWeight: 'bold'}}
              onPress={()=>{
                    this.setState({ showLoader:true });
                  const{mitigating_reason,mitigating_info,front_url,front_file_name, back_url,back_file_name,typeTicket}=this.state
                  let formData=new FormData();
                  formData.append("user_id",global.useId);
                  formData.append("mitigating_reason",mitigating_reason);
                  formData.append("mitigating_reason_description",mitigating_info);
                  formData.append("evidence_file",{name:front_file_name,
                  uri:front_url,
                  type:'photo/png'});
                  var url='';

                  if(typeTicket=='1')
                  {
                    url='AddTicketMitigatingReason';
                    formData.append("case_id",global.ticket_id);
                    }
                  else {
                    url='AddTicketMitigatingReason';
                    formData.append("case_id",global.camera_ticket_id);
                    }
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
                          this.props.navigation.navigate('AddParkingTicket',{typeTicket:typeTicket})
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
  attachPhotoText: {
    color: 'red',
    fontSize: moderateScale(10),
    textAlign:'center',
    fontWeight: 'normal',
    marginTop:  moderateScale(5),
    marginLeft:  moderateScale(10),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(10),
  },
  containerDetail: {
    backgroundColor: 'white',
    width: scale(320),
    marginTop: 10,
    marginLeft: moderateScale(15),
    flexDirection: 'row',

  },
  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(15),
    marginLeft:moderateScale(15),
    marginTop: moderateScale(10),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(150),
    textAlignVertical:'top',
    fontSize: moderateScale(14),

  },
  inputReason:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(15),
    marginLeft:moderateScale(15),
    marginTop: moderateScale(20),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(40),
    textAlignVertical:'top',
    fontSize: moderateScale(14),

  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(12),
    textAlign:'left',
    fontWeight: 'normal',
    margin:  moderateScale(20),
    width: scale(200),
    fontSize: moderateScale(14),

  },
  userAttachIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginTop:moderateScale(15),
    marginLeft: scale(50),
  },
});
