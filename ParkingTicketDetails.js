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
import { Picker } from 'react-native-picker-dropdown';
import ModalPicker from 'react-native-modal-picker';
export default class ParkingTicketDetailScreen extends React.Component
{

  constructor(props,typeTicket){
    super(props)
    const { navigation } = this.props;

    this.state = {typeTicket:navigation.getParam('typeTicket', 'id'),offeneCodes:[],issueAuth:[],ticketTypes:[],ticket_issue_date:"2019-01-01",vehicle_id:0,ticket_type:'',ticket_number:'',offene_code:'',
    issuing_auth:'',front_url:'' ,front_file_name:'', back_url:'' ,back_file_name:'',reason:'',offence_guaranteed:false,language:'',offene_text:'', ticket_type_other:'',isEditable:false,showLoader:false,  }
    this.onValueChange = this.handleValueChange.bind(this)

    fetch(global.APIURL + 'OffenceCodeList',{
    method: 'GET',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json()).then((responseJson) => {
    if(responseJson.status)
    {
        this.setState({offeneCodes:responseJson.offence})
    }
    else {
      alert(responseJson.msg);
    }
  }).catch((error) => {
      alert("Offence Code Error" + error);
  });

  fetch(global.APIURL + 'IssuingAuthorityList',{
  method: 'GET',
  headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }).then((response) => response.json()).then((responseJson) => {
  if(responseJson.status)
  {
      this.setState({issueAuth:responseJson.authorities})
  }
  else {
    alert(responseJson.msg);
  }
  }).catch((error) => {
    alert(error);
  });
  if(this.state.typeTicket=='1')
  {
    this.state.ticketTypes=  [{
          tickettype_description:'Through Post',
      },{
          tickettype_description:'Attached on windscreen',
      }];
  }
  else {
  this.state.ticketTypes=  [{
        tickettype_description:'Red Light',
    },{
        tickettype_description:'Speeding',
    },{
        tickettype_description:'Any Other',
    }];

  }
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
    maxWidth:1200,
    maxHeight:1200,
    cameraType:'back',
    storageOptions: {
    skipBackup: true,
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
    //source=source.replace(/%2F/g,'/')

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //source=  Platform.OS === 'android' ? 'file://' + source : source
    //alert(source);
    this.setState({front_url:source })
    var strIndex=source.lastIndexOf('/')+1;
    var fileName=source.substr(strIndex);
    //this.setState({front_file_name:fileName})


  }
});
}
async takePhoto2() {
  const options = {
    title: 'Take a clear picture of the ticket(Back Side)',
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
    //this.setState({back_file_name:fileName})


  }
});
}
handleValueChange(offene_code) {
    this.setState({ offene_code:offene_code })
  }
  render() {
    //let ticketTypes=[{value:'Type1',},{value:'Type2',},{value:'Type3',}]
    //let issueAuth=[{  value:'Private',},{value:'Council',},{  value:'Police',},{  value:'TFL',}]
    var imageFrontURL=[];
    var imageFrontURL2=[];
    var intC=0;
    imageFrontURL.push(
      <View key={"View" + intC.toString()} >
      { (this.state.front_url!="") && <Image key={"img" + intC.toString()}  source={{uri:this.state.front_url}} style={styles.userPhoto}/>}

      <TouchableOpacity key={"Touch" + intC.toString()}  underlayColor='none'  onPress={this.takePhoto.bind(this)}>
          <Image key={"imgTouch" + intC.toString()}  source={require('./img/plus_icon.png')} style={styles.userIcon}/>
        </TouchableOpacity>
      </View>
    )
    imageFrontURL2.push(
      <View key={"2View" + intC.toString()}  >
      { (this.state.back_url!="") && <Image key={"2img" + intC.toString()}  source={{uri:this.state.back_url}} style={styles.userPhoto}/>}

      <TouchableOpacity key={"2Touch" + intC.toString()}  underlayColor='none'  onPress={this.takePhoto2.bind(this)}>
          <Image key={"2imgTouch" + intC.toString()}  source={require('./img/plus_icon.png')} style={styles.userIcon}/>
        </TouchableOpacity>
      </View>
    )

    var offeceCodeList=[];
    let index = 0;

    for(let offenceCode1 of this.state.offeneCodes)
    {
      offeceCodeList.push({ key:offenceCode1.offence_code, section: false, label: '(' + offenceCode1.offence_code +')'  + offenceCode1.offence_description })
      //offeceCodeList.push(
      //  <Picker.Item label={offenceCode1.offence_description + '(' + offenceCode1.offence_code +')'} value={offenceCode1.offence_code} />);
    }


    return (
      <ScrollView horizontal={false} style={styles.containerMain}>
        <Text style={styles.offenceCodeText}>When was the ticket issued</Text>
        <DatePicker
         style={{width: scale(335),marginTop:verticalScale(20)}}
         mode="date"
         date={this.state.ticket_issue_date}
         placeholder="When was ticket issued?"
         placeholderTextColor='black'
         placeholderTextAlign='left'
         format="YYYY-MM-DD"
         minDate="2000-01-01"
         maxDate="2099-12-31"
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         value={this.state.ticket_issue_date}
         onDateChange={(date)=>{this.setState({ticket_issue_date:date})}}
         customStyles={{
           dateInput: {
             marginLeft: moderateScale(15),
             width:scale(300),
             height:verticalScale(50),
             borderColor:'transparent',
             backgroundColor:'white',
             justifyContent: 'flex-start',
             alignItems: 'flex-start',
             paddingTop: moderateScale(15),
             paddingLeft: moderateScale(15),
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
           }

           // ... You can check the source to find the other keys.
         }}
       />
       <Dropdown dropdownOffset={{top:verticalScale(5),left:0}}
         label='' value='Select vehicle involved' data={global.vehicles}
         valueExtractor={({vehicle_id})=>vehicle_id} pickerStyle={styles.dropdownText}
         labelExtractor={({vehicle_reg_number})=>vehicle_reg_number} pickerStyle={styles.dropdownText}
         onChangeText={(index)=>{this.setState({vehicle_id:index})}}
         propsExtractor ={({vehicle})=>vehicle}
         pickerStyle={styles.dropdownText}
         containerStyle={styles.dropdown} inputContainerStyle={{borderBottomColor: 'transparent'}}/>
       <Dropdown  dropdownOffset={{top:verticalScale(5),left:0}} label='' value='Ticket type'
         data={this.state.ticketTypes}
         valueExtractor={({tickettype_description})=>tickettype_description}
         pickerStyle={styles.dropdownText}
         propsExtractor ={ticketType=>ticketType}
         onChangeText={(tickettype_description)=>{
           this.setState({ticket_type:tickettype_description})}}
           containerStyle={styles.dropdown} inputContainerStyle={{borderBottomColor: 'transparent'}}/>

           {this.state.typeTicket!='1' &&
           <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
            value={this.state.ticket_type_other}
            onChangeText={ticket_type_other=>this.setState({ticket_type_other:ticket_type_other})}
            style={styles.input} placeholder="Other Ticket Type" editable={(this.state.ticket_type=='Any Other')} />}

        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
           value={this.state.ticket_number}
           onChangeText={ticket_number=>this.setState({ticket_number})}
           style={styles.input} placeholder="Ticket number" editable={true} />

         {this.state.typeTicket!='1' &&   <TextInput placeholderTextColor={'black'}
           placeholder='Offence Code'
             value={this.state.offene_code}
             onChangeText={offene_code=>this.setState({offene_code:offene_code})}
             underlineColorAndroid="transparent" style={styles.inputOffence} multiline={true} editable={true} />
         }

        {this.state.typeTicket=='1' &&   <ModalPicker
                     data={offeceCodeList}
                     initValue="Offence Code"
                     style={{marginLeft: moderateScale(15),width: scale(320)}}
                     onChange={(option)=>{
                        this.setState({offence_guaranteed:!this.state.offence_guaranteed})
                        this.setState({offene_text:option.label,offene_code:option.key})}}>





                 </ModalPicker>}
      {this.state.typeTicket=='1' &&  <View style={styles.containerCheckbox}>
          <CheckBox containerStyle={{backgroundColor: 'transparent',borderColor: 'transparent'}}  style={{width: scale(180),marginLeft: moderateScale(5),backgroundColor: 'red'}}title="Offence Guaranteed"
           checked={this.state.offence_guaranteed}
           />
        </View>}
        <Dropdown  dropdownOffset={{top:verticalScale(5),left:0}} label='' value='Issuing Authority' data={this.state.issueAuth}
           valueExtractor={({authority_name})=>authority_name} pickerStyle={styles.dropdownText}
           propsExtractor ={issueAuth=>this.setState({issuing_auth:issueAuth.authority_name})}
          containerStyle={styles.dropdown} inputContainerStyle={{borderBottomColor: 'transparent'}}/>

   <View style={styles.containerDetail}>
         <Text style={styles.headerDate}>Take a clear picture of the ticket (Front Side)</Text>
           <View style={styles.containerPhoto}>
             <TouchableOpacity underlayColor='none' onPress={this.removePhoto.bind(this)}>
               <Image source={require('./img/delete_icon.png')} style={styles.userDelIcon}/>
             </TouchableOpacity>
             {imageFrontURL}


           </View>
       </View>
       <View style={styles.containerDetail}>
         <Text style={styles.headerDate}>Take a clear picture of the ticket (Back Side)</Text>
           <View style={styles.containerPhoto}>
             <TouchableOpacity underlayColor='none'  onPress={this.removePhoto2.bind(this)}>
               <Image source={require('./img/delete_icon.png')} style={styles.userDelIcon}/>
             </TouchableOpacity>
             {imageFrontURL2}
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
              marginTop: verticalScale(50),
              marginBottom: verticalScale(100),
              marginLeft:scale(0),
              marginRight:scale(0),
              }}
              textStyle={{fontWeight: 'bold'}}
              onPress={()=>{
                    this.setState({ showLoader:true });
                  const{ticket_issue_date,vehicle_id,ticket_type,ticket_number,offene_code,
                    issuing_auth,front_url, back_url,offence_guaranteed,typeTicket,ticket_type_other,}=this.state

                  let formData=new FormData();
                  formData.append("user_id",global.useId);
                  formData.append("vehicle_id",vehicle_id);
                  formData.append("ticket_date",ticket_issue_date);
                    if(typeTicket!='1' && ticket_type=='Any Other')
                  {

                    formData.append("ticket_type",ticket_type_other);
                  }
                  else {
                    formData.append("ticket_type",ticket_type);
                  }
                  formData.append("ticket_number",ticket_number);
                  formData.append("offence_code",offene_code);
                  formData.append("issuing_authority",issuing_auth);
                  formData.append("is_offence_guaranteed",offence_guaranteed);
                  formData.append("mitigating_reason",'test');
                  if(front_url!='')
                  {
                    formData.append("front_image",{name:'testImage',
                    uri:front_url,
                    type:'photo/png'});
                  }
                  if(back_url!='')
                  {
                    formData.append("back_image",{name:'testImage',
                    uri:back_url,
                    type:'photo/png'});
                    var url='';
                  }
                  if(typeTicket=='1')
                  {
                    url='AddParkingTicketDetail';
                  }
                  else {
                    url='AddCameraTicketDetail';
                  }
                  fetch(global.APIURL + url,{
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'multipart/form-data',
                      },
                      body: formData
                  }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.status)
                        {
                          if(typeTicket=='1')
                          {
                            global.ticket_id=responseJson.case_id;
                          }
                          else {
                            global.camera_ticket_id=responseJson.case_id;
                          }
                          this.props.navigation.navigate('AddParkingTicket',{typeTicket:typeTicket})
                        }
                        else {
                              this.setState({ showLoader:false });
                          alert(responseJson.msg);
                        }
                      })
                      .catch((error) => {
                            this.setState({ showLoader:false });
                          alert("cactch error" + error);

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
  containerCheckbox: {
    backgroundColor: 'white',
    width: scale(320),
    marginTop: moderateScale(10),
    marginLeft: moderateScale(0),
    backgroundColor: 'transparent',
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
    paddingTop: moderateScale(5),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(5),
    paddingLeft: moderateScale(15),
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),

    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(40),
    textAlignVertical: 'top',
    fontSize: moderateScale(14),
  },
  inputOffence:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    marginLeft:moderateScale(15),
    marginTop: moderateScale(20),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(150),
    textAlignVertical:'top',

  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(14),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(10),
    marginLeft:  moderateScale(15),
    marginRight:  moderateScale(20),
    marginBottom :  moderateScale(10),
  },
  offenceCodeText: {
    color: '#000000',
    fontSize: moderateScale(12),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(10),
    marginLeft:  moderateScale(15),
    marginRight:  moderateScale(20),
    fontSize: moderateScale(14),
  },
  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
    paddingLeft: moderateScale(10),
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
    paddingLeft: moderateScale(10),
    fontSize: moderateScale(14),

  },
  picker: {
   alignSelf:'center',
   backgroundColor: 'white',
   paddingHorizontal: moderateScale(20),
   paddingVertical: moderateScale(20),
   marginTop: moderateScale(10),
   marginBottom: moderateScale(10),
   marginLeft: moderateScale(15),
   marginRight: moderateScale(10),
    borderRadius: moderateScale(10),
 },
 pickerText: {
   color: 'black',
 }
});
