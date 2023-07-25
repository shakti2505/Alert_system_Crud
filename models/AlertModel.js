import mongoose, { set } from "mongoose";
const AlertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true,
    },
    timeInput: {
        type: String,
        required: true,
        trim: true,
        set:setTimeTo12HourFormat

    },
    AlertDate:{
        type:String,
        required:true,
        trim:true
    },
    AlertType: {
        type: String,
        required: true,
        trim: true
    }
});

function setTimeTo12HourFormat(time){
    const [hours, minutes] = time.split(':');
    let suffix = 'AM';

    let hoursIn12HrFormat = parseInt(hours, 10)
    if(hoursIn12HrFormat>=12){
        suffix = "PM";
        hoursIn12HrFormat -= 12
    }
    if(hoursIn12HrFormat===0){
        hoursIn12HrFormat=12;
    }
    return `${hoursIn12HrFormat}:${minutes} ${suffix}`;
    
}
const AlertModel = mongoose.model('alert', AlertSchema);
export default AlertModel;