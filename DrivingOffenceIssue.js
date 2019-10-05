import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet, Text, ScrollView,View,Image,TouchableOpacity,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import ModalPicker from 'react-native-modal-picker';

export default class DrivingOffenceIssueScreen extends React.Component
{

  constructor(props){
    super(props)
    this.state = {offenceTypes:[],ticketTypes:[],mitigatingReason:'',front_url:'' ,front_file_name:'', back_url:'' ,back_file_name:'',vehicle_id:0,ticket_type:'',offenceType:'', showLoader:false,  }
    fetch(global.APIURL + 'DrivingOffenceTypeList',{
    method: 'GET',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json()).then((responseJson) => {
    if(responseJson.status)
    {
        this.setState({offenceTypes:responseJson.drivingoffencetypes})
    }
    else {
      alert(responseJson.msg);
    }
    }).catch((error) => {
      alert(error);
    });

    fetch(global.APIURL + 'TicketTypeList',{
    method: 'GET',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json()).then((responseJson) => {
    if(responseJson.status)
    {
        this.setState({ticketTypes:responseJson.tickettypes})
    }
    else {
      alert(responseJson.msg);
    }
    }).catch((error) => {
      alert(error);
    });
  }
  removePhoto()
  {
    this.setState({front_url:'' })

  //  this.setState({front_file_name:''})
  }
  removePhoto2()
  {
    this.setState({back_url:'' })

  //  this.setState({back_file_name:''})
  }
  async takePhoto() {
    const options = {
      title: 'Take a clear picture of the ticket(Front Side)',
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
      //this.setState({front_file_name:fileName})


    }
  });
  }
  async takePhoto2() {
  const options = {
    title: 'Select Letter',
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
    this.setState({back_url:source })
    var strIndex=source.lastIndexOf('/')+1;
    var fileName=source.substr(strIndex);
    this.setState({back_file_name:fileName })



  }
  });
  }
  render() {
    /*<Dropdown  dropdownOffset={{top:verticalScale(5),left:0}} label='' value='Ticket type' data={this.state.ticketTypes}
      valueExtractor={({tickettype_description})=>tickettype_description} pickerStyle={styles.dropdownText}
      propsExtractor ={ticketType=>this.setState({ticket_type:ticketType.tickettype_description})}
     containerStyle={styles.dropdown}
     inputContainerStyle={{borderBottomColor: 'transparent'}}/>*/
/*
     <TextInput placeholderTextColor={'black'}
     placeholder='Offence type'
       value={this.state.offenceType}
       onChangeText={offenceType=>this.setState({offenceType})}
       underlineColorAndroid="transparent" style={styles.dropdown} editable={true} multiline ={false} />*/

    var imageFrontURL2=[];
    var imageFrontURL=[];

    var intC=0;
    imageFrontURL.push(
      <View key={"View" + intC.toString()}>
      { (this.state.front_url!="") && <Image  key={"img" + intC.toString()} source={{uri:this.state.front_url}} style={styles.userPhoto}/>}

      <TouchableOpacity key={"touch" + intC.toString()} underlayColor='none' onPress={this.takePhoto.bind(this)}>
          <Image key={"imgTouch" + intC.toString()} source={require('./img/plus_icon.png')} style={styles.userIcon}/>
        </TouchableOpacity>
      </View>
    )
    imageFrontURL2.push(
      <View key={"View" + intC.toString()} >
      { (this.state.back_url!="") && <Image key={"img" + intC.toString()}  source={{uri:this.state.back_url}} style={styles.userPhoto}/>}

      <TouchableOpacity key={"touch" + intC.toString()}  underlayColor='none'  onPress={this.takePhoto2.bind(this)}>
          <Image key={"imgTouch" + intC.toString()}  source={require('./img/plus_icon.png')} style={styles.userIcon}/>
        </TouchableOpacity>
      </View>
    )

    var offeceCodeList=[];
    let index = 0;

    offeceCodeList.push({ key:1, section: false, label:'1. s.172 failure to nominate or ëdriver identityí offences'})
    offeceCodeList.push({ key:2, section: false, label:'2. Speeding offences in contravention of 20mph, 30mph, 40mph, 50mph, 60mph and 70mph speed limits'})
    offeceCodeList.push({ key:3, section: false, label:'3. Driving without due care and attention offences ñ Section 3 Road Traffic Act 1988'})
    offeceCodeList.push({ key:4, section: false, label:'4. Using a motor vehicle without there being in force a relevant policy of insurance or permitting someone else to drive without insurance'})
    offeceCodeList.push({ key:5, section: false, label:'5. S.170 Road Traffic Act 1988 Offences ñ failing to stop after an accident or failing to report an accident to the Police within 24 hours of it happening'})
    offeceCodeList.push({ key:6, section: false, label:'6. Driving NOT in accordance with a licence, otherwise known as driving without a licence.'})
    offeceCodeList.push({ key:7, section: false, label:'7. S.2 RTA 1988 ñ dangerous driving offences- one of the most serious road traffic law allegations'})
    offeceCodeList.push({ key:8, section: false, label:'8. Failing to stop at a red light'})
    offeceCodeList.push({ key:9, section: false, label:'9. Drinking & driving related offences.'})
    offeceCodeList.push({ key:10, section: false, label:'10. Mobile phone offences'})

    return (
      <ScrollView horizontal={false} style={styles.containerMain}>

          <ModalPicker
            style={{marginLeft: moderateScale(15),width: scale(320)}}

                      data={offeceCodeList}
                      initValue="Offence type"
                      onChange={(option)=>{
                        this.setState({offenceType:option.label})}}>
                    </ModalPicker>

        <Dropdown dropdownOffset={{top:verticalScale(5),left:0}}
          label='' value='Select vehicle involved' data={global.vehicles}
          valueExtractor={({vehicle_id})=>vehicle_id} pickerStyle={styles.dropdownText}
          labelExtractor={({vehicle_reg_number})=>vehicle_reg_number} pickerStyle={styles.dropdownText}
          onChangeText={(index)=>{this.setState({vehicle_id:index})}}
          propsExtractor ={({vehicle})=>vehicle}
          pickerStyle={styles.dropdownText}
          containerStyle={styles.dropdown}
          inputContainerStyle={{borderBottomColor: 'transparent'}}/>



       <Text style={styles.headerDate}>Mitigating reasons</Text>

         <TextInput placeholderTextColor={'black'}
         placeholder='Write Something'
           value={this.state.mitigatingReason}
           onChangeText={mitigatingReason=>this.setState({mitigatingReason})}
           underlineColorAndroid="transparent" style={styles.input}
           multiline={true}
           editable={true} />

           <View style={styles.containerDetail}>
             <Text style={styles.headerDate}>Take a clear picture of letters (Both Side)</Text>
               <View style={styles.containerPhoto}>
                 <TouchableOpacity underlayColor='none'  onPress={this.removePhoto2.bind(this)}>
                   <Image source={require('./img/delete_icon.png')} style={styles.userDelIcon}/>
                 </TouchableOpacity>
                 {imageFrontURL2}
               </View>
               <View style={styles.containerPhoto}>
                 <TouchableOpacity underlayColor='none'  onPress={this.removePhoto.bind(this)}>
                   <Image source={require('./img/delete_icon.png')} style={styles.userDelIcon}/>
                 </TouchableOpacity>
                 {imageFrontURL}
               </View>
           </View>
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
              marginTop: verticalScale(100),
              marginLeft:scale(0),
              marginBottom: verticalScale(50),

              }}
              textStyle={{fontWeight: 'bold'}}
              onPress={()=>{
                    this.setState({ showLoader:true });
                  const{mitigatingReason,front_url, back_url,vehicle_id,ticket_type,offenceType,back_file_name,front_file_name}=this.state
                  let formData=new FormData();
                  formData.append("user_id",global.useId);
                  formData.append("vehicle_id",vehicle_id);
                  formData.append("offence_type",offenceType);
                  formData.append("ticket_type",ticket_type);
                  formData.append("mitigating_reason",mitigatingReason);
                  if(back_url!='')
                  {
                    formData.append("letter_image",{name:back_file_name,
                    uri:back_url,
                    type:'photo/png'});
                    var url='';
                  }
                  if(front_url!='')
                  {
                    formData.append("letter_image2",{name:front_file_name,
                    uri:front_url,
                    type:'photo/png'});
                    var url='';
                  }
                  var url='';
                  url='ReportDrivingOffences';
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
                          this.props.navigation.navigate('Success',{typeScreen:'DrivingOffence'})
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
  }x
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,
  },
  containerCheckbox: {
    backgroundColor: 'white',
    width: scale(320),
    marginTop: moderateScale(10),
    marginLeft: moderateScale(15),

  },
  containerDetail: {
    backgroundColor: 'white',
    width: scale(320),
    marginTop: moderateScale(10),
    marginLeft: moderateScale(15),

  },
  signUpText: {
    textAlign: 'center',
    color: 'red',
    marginTop: moderateScale(30),
    fontSize: moderateScale(12),
    marginBottom: moderateScale(30),
  },
  containerPhoto: {
    backgroundColor: '#EFEFF4',
    width: scale(280),
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    marginBottom:verticalScale(10),
    alignItems: 'center',

  },
  userIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginTop:moderateScale(20),
    marginBottom:moderateScale(20),
  },
  userPhoto: {
    width: moderateScale(100),
    height: moderateScale(100),
    marginTop:moderateScale(10),
    marginBottom:moderateScale(10),
  },
  userDelIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginTop:moderateScale(5),
    marginBottom:moderateScale(5),
    marginRight: scale(5),
    marginLeft: scale(260),
  },
  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    marginTop: moderateScale(10),
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
  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(12),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(10),
    marginRight:  moderateScale(20),
    marginBottom :  moderateScale(10),
    marginLeft: moderateScale(15),
    fontSize: moderateScale(15)
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
    fontSize: moderateScale(15)
  },
  dropdownArrow:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(40),
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderBottomWidth:  0,
  },
  dropdownText:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(200),
    backgroundColor: 'white',
    borderWidth: 0,
    paddingLeft: moderateScale(10),
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,

  },
});
