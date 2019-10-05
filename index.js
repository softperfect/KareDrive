/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.useId=''
global.case_id='';
global.userName='';
global.email='';
global.phone='';
global.occupation='';
global.address='';
global.ticket_id=0;
global.camera_ticket_id=0;
global.vehicles=[];
global.notificationList=[];
global.profilePicture='';
global.referralNumber='';
global.userType=''
global.device_id=''
global.notificationCount=0;
global.badgeCount;
global.isPushNotification='false'
global.vehicleTypes=[{
    value:'Hatchback',
},{
    value:'Sedan',
},{
    value:'Truck',
},{
    value:'SUV',
}]

global.isVehicle=false
global.isPeople=false
global.isPolice=false
global.isDamage=false
global.isInsurace=false
global.isDamages=false
global.isDescription=false
global.descriptionData={}
global.vehicleData={}
global.peopleData={}
global.policeData={}
global.insuranceData={}
global.damageData={}
global.isVibrate=false
global.isPush=true
//global.APIURL='http://192.168.137.13:8080/DriveKareAdmin/api.php/'
global.APIURL='http://drivekare.co.uk/admin/api.php/'
AppRegistry.registerComponent(appName, () => App);
