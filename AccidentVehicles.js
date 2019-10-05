import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight,TouchableOpacity} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
//var ImagePicker=require('react-native-image-picker');
class VideoCapture extends React.Component
{
  constructor(props) {
    super(props);
    if(global.isVehicle)
    {
      this.state =global.vehicleData;
    }
    else {
    this.state = {
      cameraType : 'back',
      mirrorMode : false,
      path: null,
    };
    }
  }

  takeVid() {
    const option = {};
    this.camera.capture({
      mode: Camera.constants.CaptureMode.video
    })
    .then((data) => {
      console.log(data);
      this.setState({ path: data.path })
    })
    .catch((err) => console.error(err));
    }

    stopVid(){
      this.camera.stopCapture();
    }

    changeCameraType() {
      if(this.state.cameraType === 'back') {
        this.setState({
          cameraType : 'front',
          mirrorMode : true
        })
      }
      else {
        this.setState({
          cameraType : 'back',
          mirrorMode : false
        })
      }
    }


render() {
return (

    <View style={styles.containerMain}>
          <RNCamera
            style={styles.preview}
            rate={1.0}
            volume={1.0}
            muted={false}
            resizeMode={"cover"}
            onEnd={() => { console.log('Done!') }}
            repeat={true}
            />
        <Text onPress={() => this.setState({ path: null })} > Cancel </Text>
        </View>
)

}
}

export default class AccidentVehicleScreen extends React.Component
{
  constructor(props){
    super(props)
    if(global.isVehicle)
    {
    this.state =global.vehicleData;
    //alert(this.state.vehicle_text)
  }
    else {
    this.state = {recording:false,processing:false,vehicle_id:0,vehicle_text:'',vehicle_company:'',vehicle_model:'',vehicle_colour:'',manufacture_year:'',vehicle_reg_number:'',videoURL:'',videoFileName:'',}
    }
  }
  componentDidMount()
  {

  }
  callback(path) {
        //alert(path);
        this.setState({videoURL:path})
        var strIndex=path.lastIndexOf('/')+1;
        var fileName=path.substr(strIndex);
        this.setState({videoFileName:fileName})


  }
  async startRecording() {
    const options = {
      title: 'Select DASH CAM RECORDING',
      mediaType:'video',
      storageOptions: {
    skipBackup: true,
    path: 'videos',
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
    source=source.replace('%2F','/')
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    this.setState({videoURL:source })
    var strIndex=source.lastIndexOf('/')+1;
    var fileName=source.substr(strIndex);
    this.setState({videoFileName:fileName})


  }
});
    //this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    //const { uri, codec = "mp4" } = await this.camera.recordAsync();
  //  this.props.navigation.navigate('OpenVideo', { callback: this.callback.bind(this)})
    //imagePicker.open({takePhoto:'Choose Video File',
    //useLastPhoto:false,
    //chooseFromLibrary:true})
  }

  /*stopRecording() {
    this.camera.stopRecording();
  }*/
  render() {
    const { recording, processing } = this.state;

    let make=[{
        value:'Jeep',
    },
    {
        value:'Maruti',
    },
    {
        value:'Honda',
    }]
    let model=[{
        value:'model1',
    },
    {
        value:'model2',
    },
    {
        value:'model3',
    }]
    let color=[{
        value:'Red',
    },
    {
        value:'Black',
    },
    {
        value:'White',
    },
    {
        value:'Silver',
    },
    {
        value:'Golden',
    }]

    let year=[{
        value:'2001',
    },
    {
        value:'2002',
    },
    {
        value:'2003',
    },
    {
        value:'2004',
    },
    {
        value:'2005',
    },
    {
        value:'2006',
    },
    {
        value:'2007',
    },
    {
        value:'2008',
    },
    {
        value:'2009',
    },
    {
        value:'2010',
    },
    {
        value:'2011',
    },
    {
        value:'2012',
    },
    {
        value:'2013',
    },
    {
        value:'2014',
    },
    {
        value:'2015',
    },
    {
        value:'2016',
    },
    {
        value:'2017',
    },
    {
        value:'2018',
    },
    {
        value:'2019',
    },
    {
        value:'2020',
    }

  ]
    return (
      <ScrollView style={styles.containerMain}>

        <Text style={styles.headerDate}>My vehicle details:</Text>
        <Dropdown dropdownOffset={{top:verticalScale(5),left:0}}
          label='' placeholder='Select vehicle involved'
          placeholderTextColor="black"
          value={this.state.vehicle_text}  data={global.vehicles}
          valueExtractor={({vehicle_id})=>vehicle_id} pickerStyle={styles.dropdownText}
          labelExtractor={({vehicle_reg_number})=>vehicle_reg_number} pickerStyle={styles.dropdownText}
          onChangeText={(index,item,item2)=>{
          this.setState({vehicle_id:index,vehicle_text:global.vehicles[item].vehicle_reg_number})}}
          propsExtractor ={({vehicle})=>vehicle}
          pickerStyle={styles.dropdownText}
          containerStyle={styles.dropdown} inputContainerStyle={{borderBottomColor: 'transparent'}}/>

    <View style={styles.containerRecord} flexDirection="row">
            <Text style={styles.headerDate2}>UPLOAD DASH CAM RECORDING</Text>
            <TouchableOpacity
              underlayColor='none'  onPress={this.startRecording.bind(this)}>
              <Image source={require('./img/plus_icon.png')} style={styles.userIcon}/>
            </TouchableOpacity>
          </View>

        <Text style={styles.videoURLText}>{this.state.videoFileName}</Text>
        <Text style={styles.headerDate}>Third party vehicle details:</Text>
        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
            value={this.state.vehicle_company}
            placeholderTextColor="black"

            onChangeText={vehicle_company=>this.setState({vehicle_company})}
            style={styles.input} placeholder="Make" editable={true} />


        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
              value={this.state.vehicle_model}  placeholderTextColor="black"

              onChangeText={vehicle_model=>this.setState({vehicle_model})}
              style={styles.input} placeholder="Model" editable={true} />

      <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
            value={this.state.manufacture_year}  placeholderTextColor="black"

            onChangeText={manufacture_year=>this.setState({manufacture_year})}
            style={styles.input} placeholder="Year of Manufacture" editable={true} />

      <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
            value={this.state.vehicle_colour}  placeholderTextColor="black"

            onChangeText={vehicle_colour=>this.setState({vehicle_colour})}
            style={styles.input} placeholder="Colour" editable={true} />


        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
      value={this.state.vehicle_reg_number}
      onChangeText={vehicle_reg_number=>this.setState({vehicle_reg_number})}
      placeholderTextColor="black"

      style={styles.input} placeholder="Registration Number" editable={true} />


        <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(20),
            marginBottom: moderateScale(30),
            marginLeft:moderateScale(0),
            marginRight:moderateScale(0),
          }}
          textStyle={{ fontWeight:'bold'}}
            onPress={()=>{
              const{vehicle_id,vehicle_company,vehicle_model,vehicle_colour,manufacture_year,vehicle_reg_number,videoURL,videoFileName}=this.state
              global.isVehicle=true;
              global.vehicleData=this.state;
              const navigation = this.props.navigation;
              navigation.getParam('callback')();
                this.props.navigation.navigate('AccidentDetail')

            /*  const navigation = this.props.navigation;
              navigation.getParam('callback')();
              this.props.navigation.navigate('AccidentDetail')*/
              /*let formData=new FormData();
              formData.append("user_id",global.useId);
              formData.append("case_id",global.case_id);
              formData.append("vehicle_id",vehicle_id);
              formData.append("camera_recording",{name:'testImage',
            uri:videoURL,
          type:'video/mp4'});
          formData.append("vehicle_company",vehicle_company);
          formData.append("vehicle_model",vehicle_model);
          formData.append("manufacture_year",manufacture_year);
          formData.append("vehicle_colour",vehicle_colour);
          formData.append("vehicle_reg_number",vehicle_reg_number);
          //alert(JSON.stringify({formData}));
                //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentVehicleInvolved', {
                  fetch(global.APIURL + 'ReportAccidentVehicleInvolved',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body:formData

                }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.status)
                      {
                        //global.case_id=responseJson.case_id;
                        global.isVehicle=true;
                        global.isVehicle=true;
                        const navigation = this.props.navigation;
                        navigation.getParam('callback')();
                        this.props.navigation.navigate('AccidentDetail')
                        //this.props.navigation.navigate('AccidentDetail')
                      }
                      else {
                          alert("server message" + responseJson.msg);
                      }
                    })
                    .catch((error) => {
                        alert(error);

                        //you will get error here.
                    });*/

            }}/>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerRecord:
  {
    justifyContent: 'center'
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#3598DB',
    resizeMode:'stretch'
  },
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,

  },
  userIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginTop:moderateScale(20),
  },
  logoBackGround: {
    marginLeft: moderateScale(15),
    marginRight:  moderateScale(15),
    marginTop: moderateScale(20),
    width: scale(150),
    height: verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },
  backGroundImage: {

    alignItems: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },
  logoImage: {
    width: scale(200),
    height:verticalScale(200),
  },
  MainScreenIcon: {
    width: scale(50),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon:
  {
    padding: moderateScale(10),
  },
  input:
  {
    paddingTop: moderateScale(1),
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(5),
    marginTop: moderateScale(20),
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(40),
    paddingLeft: moderateScale(15),
    fontSize: moderateScale(14),

  },
  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
    paddingLeft: moderateScale(15),
    fontSize: moderateScale(14),
  },
  dropdownArrow:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownText:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
    width: scale(320),
    height: verticalScale(50),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(18),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(10),
    marginLeft:  moderateScale(15),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(10),
  },
  videoURLText: {
    color: 'red',
    fontSize: moderateScale(10),
    textAlign:'center',
    fontWeight: 'normal',
    marginTop:  moderateScale(5),
    marginLeft:  moderateScale(10),
    marginBottom:  moderateScale(0),
    marginRight:  moderateScale(10),
  },
  headerDate2: {
    color: '#000000',
    fontSize: moderateScale(18),
    alignSelf: 'center',
    textAlign:'center',
    fontWeight: 'bold',
    marginLeft:  moderateScale(15),
    marginRight:  moderateScale(10),
    marginBottom: moderateScale(20),
    marginTop:  moderateScale(30),

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
});
