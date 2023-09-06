//Signup For Each member
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, update } from "../ReduxTable/peopleSlice";
import { useDispatch } from "react-redux";
import { nextID } from "../ReduxTable/peopleSlice";
import FormControl from "@material-ui/core/FormControl";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { useState } from "react";
import { updateProfile, userPic } from "../api/Api";
import { format } from "date-fns";


export default function PeopleDialog({ data, render, onSave }) {

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const defaultImg = data && data.img;
  const defaultName = data && data.name;
  // Existing ID or random ID
  const id = data && data.id;
  
  //USESTATE
  const [formData, setFormData] = useState({
    age: "",
    mobile_num: "",
    whatsapp_num: "",
    blood_grp: "",
    diksha_dt: "",
    occupation: "",
    file: "",
    qualification: "",
    address_linep: "",
    state: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  //Validating Fields
  const validateFields = () => {
    const newErrors = {};

    // Validate each field and set errors if applicable
    if (!formData.age) {
      newErrors.age = "Age is required";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.mobile_num) {
      newErrors.mobile_num = "Mobile number is required";
    } else if (!phoneRegex.test(formData.mobile_num)) {
      newErrors.mobile_num = "Enter a valid 10-digit mobile number";
    } if (!formData.whatsapp_num) {
      newErrors.whatsapp_num= "WhatsApp number is required";
    } else if (!phoneRegex.test(formData.whatsapp_num)) {
      newErrors.whatsapp_num = "Enter a valid 10-digit mobile number";
    }

    if (!formData.blood_grp) {
      newErrors.blood_grp = "Enter Blood Group";
    }

    if (!formData.diksha_dt) {
      newErrors.diksha_dt = "Enter Date";
    }

    if (!formData.occupation) {
      newErrors.occupation = "Enter Occupation";
    }

    if (!formData.qualification) {
      newErrors.qualification = "Enter Qualification";
    }

    if (!formData.address_linep) {
      newErrors.address_linep = "Enter proper Address";
    }

    if (!formData.state) {
      newErrors.state = "Enter state";
    }

    const pin = /^\d{6}$/;
    if (!formData.pincode) {
      newErrors.pincode = "PinCode is required";
      } else if (!pin.test(formData.pincode)) {
        newErrors.pincode = "Pincode should be a 6-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Validate fields when input loses focus
  const handleBlur = (event) => {
    validateFields(); 
  };

  //Handling Onchange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'file' ?event.target.files[0]: value,
    }));
  };

  //On submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(data => form.append(data,formData[data]))
    console.log(formData,form)
    try {
        userPic(form)
      }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
     
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {data ? "Edit" : "Add"} Signup{" "}
        </DialogTitle>
        <DialogContent>
          
  <form onSubmit={handleSubmit} encType="multipart/form-data">

       <FormLabel>Enter Age</FormLabel><br/>
          <TextField 
               variant="outlined"
               label="Age"
               type="number"
               name="age"
               inputProps={{ min: 0 }} // Optional: Set minimum value
               value={formData.age}
               onChange={handleInputChange}
               required
               onBlur={handleBlur}
               error={Boolean(errors.age)}
              helperText={errors.age}
          />  <br/><br/>

              <FormLabel>Mobile Number</FormLabel>
                  <TextField
                     label="Mobile Number"
                     type="tel"
                     placeholder="Enter your mobile number"
                     variant="outlined"
                     fullWidth
                     name="mobile_num"
                     value={formData.mobile_num}
                     onChange={handleInputChange}
                     required
                     margin="normal"
                     onBlur={handleBlur}
                     error={Boolean(errors.mobile_num)}
                     helperText={errors.mobile_num}
                   /><br/>

                   <FormLabel>WhatsApp Number</FormLabel>
                   <TextField
                     label="WhatsApp Number"
                     type="tel"
                     placeholder="Enter your whatsApp number"
                     variant="outlined"
                     fullWidth
                     name="whatsapp_num"
                     value={formData.whatsapp_num}
                     onChange={handleInputChange}
                     required
                     margin= "normal"
                     onBlur={handleBlur}
                     error={Boolean(errors.whatsapp_num)}
                     helperText={errors.whatsapp_num}
                   />

<FormLabel>Enter Blood Group</FormLabel>
     <TextField
        label="Blood Group"
        type="text"
        name="blood_grp"
        value={formData.blood_grp}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.blood_grp)}
        helperText={errors.blood_grp}
      />

      <FormLabel>Enter Diksha Date</FormLabel>
      <TextField
        type="date"
        name="diksha_dt"
        value={formData.diksha_dt}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.diksha_dt)}
        helperText={errors.diksha_dt}
      />

<FormLabel>Enter Occupation</FormLabel>
      <TextField
        label="Occupation"
        type="text"
        name="occupation"
        value={formData.occupation}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.occupation)}
        helperText={errors.occupation}
      />

<FormLabel>Upload an Image</FormLabel>
          <TextField
            variant="outlined"
            margin="dense"
            type="file"
            fullWidth
            name="file"
            // value={formData.file}
            onChange={handleInputChange}
          />

<FormLabel>Enter Qualification</FormLabel>
      <TextField
        label="Qualification"
        type="text"
        name="qualification"
        value={formData.qualification}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.qualification)}
        helperText={errors.qualification}
      />

<FormLabel>Enter address Line</FormLabel>
      <TextField
        label="Address Line"
        type="text"
        name="address_linep"
        value={formData.address_linep}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.address_linep)}
        helperText={errors.address_linep}
      />

<FormLabel>Enter State</FormLabel>
      <TextField
        label="State"
        type="text"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.state)}
        helperText={errors.state}
      />

<FormLabel>Enter PinCode</FormLabel>
      <TextField
        label="Pincode"
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.pincode)}
        helperText={errors.pincode}
      /> 
         <Button type="submit" variant="contained" color="primary" >
            Save
          </Button> <br/><br/>
          <Button onClick={handleClose}  variant="contained" color="primary">
            Cancel
          </Button>
          </form>
        </DialogContent>
      </Dialog>
      
    </>
  );
}
