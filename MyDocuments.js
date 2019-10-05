import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView,Text, View,Image,TouchableOpacity,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

export default class MyDocumentScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {vehicleLogList:[], back_url:'' ,back_file_name:'',vehicle_id:0,vehicle_name:null,selectedVehicle:null}
    this.getVehicleLogList();
  }

  getVehicleLogList()
  {
    fetch(global.APIURL + 'MyDocuments?user_id='+global.useId,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }).then((response) => response.json()).then((responseJson) => {
  if(responseJson.status)
  {

      this.setState({vehicleLogList:responseJson.documents})
  }
  else {
        alert(responseJson.msg);
  }
}).catch((error) => {
    alert(error);
});
}
removeVehicleLog(vehicleLog)
  {
    if(vehicleLog.document_id!=0)
    {
    fetch(global.APIURL + 'RemoveUserDocument',{
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                      'user_id':global.useId,
                      'document_id':vehicleLog.document_id,
                    })
                  }).then((response) => response.json()).then((responseJson) => {

                          if(responseJson.status)
                        {

                          //this.getVehicles();
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
                    var index=this.state.vehicleLogList.indexOf(vehicleLog);
                    var array=this.state.vehicleLogList;
                    if(index!==-1)
                    {
                        array.splice(index);
                        this.setState({vehicleLogList:array});
                    }
  }
  async takePhoto() {
    const options = {
      title: 'Upload document',
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
      //this.setState({front_url:source })
      //var strIndex=source.lastIndexOf('/')+1;
      //var fileName=source.substr(strIndex);
      //this.setState({front_file_name:fileName})
      var vName=global.vehicles[this.state.vehicle_name].vehicle_reg_number;
      var array=this.state.vehicleLogList;
      array.push({vehicle_id:this.state.selectedVehicle,document_path:source,document_id:0,vehicle_reg_number:vName});
      this.setState({vehicleLogList:array});

    }
  });
  }
  async takePhoto2() {
    const options = {
      title: 'Upload document',
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
  render() {
    var vehicleLogs=[];
    var intC=0;
    for(let vehicleLog of this.state.vehicleLogList)
    {

      if(vehicleLog.vehicle_id!=0 )
      {
        vehicleLogs.push(
        <View key={"View" + intC.toString()} flexDirection='row' styles={{marginBottom:0,marginTop:10}}>
        <Text key={"txt" + intC.toString()}  style={styles.vehicleName}> {vehicleLog.vehicle_reg_number} </Text>
        <Button key={"Button" + intC.toString()}  title="REMOVE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(100),
            height: verticalScale(40),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: 10,
            }}
            onPress={()=>this.removeVehicleLog(vehicleLog)}
            />

            </View>)
          }
          intC=intC+1;
    }
    return (
  <ScrollView style={styles.containerMain}>
        <Text style={styles.headerDate}>Proof of address</Text>
          <View style={styles.containerDetail}>
             <Text style={styles.uploadEvidencetext}>Upload document</Text>
               <TouchableOpacity underlayColor='none'
                  onPress={this.takePhoto2.bind(this)}>
                  <Image source={require('./img/attach_icon.png')} style={styles.userAttachIcon}/>
                </TouchableOpacity>

              </View>
              <Text style={styles.attachPhotoText}>{this.state.back_file_name}</Text>

      <Text style={styles.headerDate}>Log book</Text>
      <Dropdown dropdownOffset={{top:verticalScale(5),left:0}}
        label='' value='Select Vehicle' data={global.vehicles}
        valueExtractor={({vehicle_id})=>vehicle_id}
        ref="vehcileDropdown"
        inputContainerStyle={{borderBottomColor: 'transparent'}}
        labelExtractor={({vehicle_reg_number})=>vehicle_reg_number} pickerStyle={styles.dropdownText}
        onChangeText={(value,item,index)=>{
        this.setState({selectedVehicle:value,vehicle_name:item})}}
        propsExtractor ={({vehicle})=>vehicle}
        containerStyle={styles.dropdown} />

        <View style={styles.containerDetail}>
           <Text style={styles.uploadEvidencetext}>Upload document</Text>
             <TouchableOpacity underlayColor='none'
                onPress={this.takePhoto.bind(this)}>
                <Image source={require('./img/attach_icon.png')} style={styles.userAttachIcon}/>
              </TouchableOpacity>

            </View>

            {vehicleLogs}
        <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(100),
            marginLeft: scale(0),
            }}
            onPress={()=>{
              const{vehicleLogList, back_url ,back_file_name}=this.state
              let formData=new FormData();
              formData.append("user_id",global.useId);
              if(back_file_name!='')
              {
                formData.append("document_address",{name:back_file_name,
                uri:back_url,
                type:'photo/png'});
              }
              var vehcilesLogs=[];
              var filesLogs=[];

              for(let log of vehicleLogList)
              {
                if(log.document_id==0)
                {
                  //vehcilesLogs.push({vehicle_id:log.vehicle_id})
                  //filesLogs.push({name:'testImage.png',
                  //uri:log.document_path,
                  //type:'image/png'})
                  formData.append("logbook[]",log.vehicle_id);
                  //formData.append("logbook[]['vehicle_id']",log.vehicle_id);

                }
              }
                for(let log of vehicleLogList)
                {
                  if(log.document_id==0)
                  {
                    //vehcilesLogs.push({vehicle_id:log.vehicle_id})
                    //filesLogs.push({name:'testImage.png',
                    //uri:log.document_path,
                    //type:'image/png'})
                    formData.append("document_logbook[]",{name:'testImage.png',
                    uri:log.document_path,
                    type:'image/png'});
                  }
                }

              //formData.append("logbook[]",vehcilesLogs);
              //formData.append("document_logbook[]",filesLogs);
              //alert(JSON.stringify(formData));
              //navigation.getParam('callback')();
              //this.props.navigation.navigate('AccidentDetail')
              //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentPoliceDetail', {
              fetch(global.APIURL + 'AddUserDocument',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: formData
                }).then((response) => response.json()).then((responseJson) => {
                    //alert(JSON.stringify(responseJson));
                        if(responseJson.status)
                      {
                        //global.case_id=responseJson.case_id;
                          this.props.navigation.navigate('ProfileDetails')
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
    </ScrollView>
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
  vehicleName: {
    color: '#000000',
    fontSize: 15,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft : moderateScale(15),
    alignSelf: 'center',
    width:scale(200),
  },
  attachPhotoText: {
    color: 'red',
    fontSize: moderateScale(10),
    textAlign:'center',
    fontWeight: 'normal',
    marginTop:  moderateScale(5),
    marginLeft:  moderateScale(15),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(15),
  },
  containerDetail: {
    backgroundColor: 'white',
    width: scale(320),
    marginTop: 10,
    marginLeft: moderateScale(15),
    flexDirection: 'row',
    height: verticalScale(50),

  },
  userAttachIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginTop:moderateScale(15),
    marginLeft: scale(125),
  },
  headerDate: {
    color: '#000000',
    fontSize: 14,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  20,
    marginTop :  20,
    marginBottom: 0,
    width: scale(320),
  },
  uploadEvidencetext: {
    color: '#000000',
    fontSize: 14,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  10,
    marginTop :  20,
    marginBottom: 0,
    textAlignVertical:'center',
    width: scale(150),
  },
  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
    paddingLeft: moderateScale(15),
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
  },
});
