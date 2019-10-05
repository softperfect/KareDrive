import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet, Text,TouchableOpacity,ScrollView,View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

export default class BailiffissueScreen extends React.Component
{

  constructor(props){
    super(props)
    this.state = {bailifCodes:[],bailifIssues:[],letters:[],bailifIssue:'',info1:'',info2:'',showLoader:false,   }
    fetch(global.APIURL + 'BailiffIssueList',{
    method: 'GET',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json()).then((responseJson) => {
    if(responseJson.status)
    {
        this.setState({bailifCodes:responseJson.bailiffissues})
    }
    else {
      alert(responseJson.msg);
    }
    }).catch((error) => {
      alert(error);
    });

    this.state.bailifIssues=  [{
          bailifIssue_description:'Car clamped',
      },{
          bailifIssue_description:'Unfair charges',
      },{
          bailifIssue_description:'Bailiff letters',
      },{
          bailifIssue_description:'Take bailiff to court',
      }];
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
    var strIndex=source.lastIndexOf('/')+1;
    var fileName=source.substr(strIndex);

    var array=this.state.letters;

    array.push({url:source,name:fileName});
    this.setState({letters:array});


  }
});
}
  render() {
    var lettersName=[];
    var intC=0;
    for(let letter of this.state.letters)
    {


        lettersName.push(
        <View key={"View" + intC.toString()} flexDirection='row' styles={{marginBottom:0,marginTop:10}}>
        <Text key={"txtView" + intC.toString()} style={styles.vehicleName}> {letter.name} </Text>

            </View>)
            intC=intC+1;
        }


      return (
      <ScrollView horizontal={false} style={styles.containerMain}>

        <Dropdown  dropdownOffset={{top:verticalScale(5),left:0}} label='' value='Bailif Issues' data={this.state.bailifIssues}
          valueExtractor={({bailifIssue_description})=>bailifIssue_description} pickerStyle={styles.dropdownText}
          propsExtractor ={bailif_Issue=>this.setState({bailifIssue:bailif_Issue.bailifIssue_description})}
         containerStyle={styles.dropdown} inputContainerStyle={{borderBottomColor: 'transparent'}}
         />


       <Text style={styles.headerDate}>Provide brief background of the case</Text>

         <TextInput placeholderTextColor={'black'}
         placeholder='i received a summon on..'
           value={this.state.info1}
           onChangeText={info1=>this.setState({info1})}
           underlineColorAndroid="transparent" style={styles.input} editable={true} multiline ={true} />

         <Text style={styles.headerDate}>What action have you taken so far</Text>

             <TextInput placeholderTextColor={'black'}
             placeholder='i have..'
               value={this.state.info2}
               onChangeText={info2=>this.setState({info2})}
               underlineColorAndroid="transparent" style={styles.input} editable={true} multiline={true} />

                <Text style={styles.headerDate2}>UPLOAD LETTERS</Text>
                       <View style={styles.containerPhoto}>
                         <TouchableOpacity
                           underlayColor='none'  onPress={this.takePhoto2.bind(this)}>
                           <Image source={require('./img/plus_icon.png')} style={styles.userIcon}/>
                         </TouchableOpacity>


                       </View>



              {lettersName}
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
              marginLeft:moderateScale(0),
              marginRight:moderateScale(0),
              marginBottom: verticalScale(50),

              }}
              textStyle={{fontWeight:'bold'}}
              onPress={()=>{
                    this.setState({ showLoader:true });
                  const{letters,bailifIssue,info1,info2}=this.state
                  let formData=new FormData();
                  formData.append("user_id",global.useId);
                  formData.append("bailiff_issue",bailifIssue);
                  formData.append("description",info1);
                  formData.append("action_taken_description",info2);
                  for(let log of letters)
                  {
                    formData.append("case_letter[]",{name:log.name,
                    uri:log.url,
                    type:'image/png'});
                  }
                  var url='';
                  url='ReportBailiffIssue';

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
                          this.props.navigation.navigate('Success',{typeScreen:'BailifIssue'})
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

  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    marginRight:moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
    paddingLeft: moderateScale(10),
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
  signUpText: {
    textAlign: 'center',
    color: 'red',
    marginTop: moderateScale(30),
    fontSize: moderateScale(12),
    marginBottom: moderateScale(30),
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

  },
  headerDate2: {
    color: '#000000',
    fontSize: moderateScale(18),

    textAlign:'center',
    fontWeight: 'bold',
    marginLeft:  moderateScale(15),
    marginRight:  moderateScale(10),
    marginBottom: moderateScale(20),
    marginTop:  moderateScale(30),

  },
  containerDetail: {
    backgroundColor: 'white',
    width: scale(320),
    marginTop: moderateScale(10),
    marginLeft: moderateScale(15),

  },

  containerPhoto: {
    backgroundColor: '#EFEFF4',
    width: scale(320),
    marginTop: verticalScale(10),
    marginLeft: scale(15),
    marginBottom:verticalScale(10),
    alignItems: 'center',

  },
  userIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginTop:moderateScale(20),
    marginBottom:moderateScale(20),
  },
  bailifIssue:
  {
    paddingTop: moderateScale(5),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(5),
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginLeft:  moderateScale(15),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(40),
    textAlignVertical:'top',
  },
  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(15),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginLeft:  moderateScale(15),
    marginRight:moderateScale(15),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(150),
    textAlignVertical:'top',
    fontSize: moderateScale(14),

  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(16),
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft:  moderateScale(15),
    marginTop:  moderateScale(20),
    width: scale(320),
  },
  userAttachIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginTop:moderateScale(15),
    marginLeft: scale(150),
  },
});
