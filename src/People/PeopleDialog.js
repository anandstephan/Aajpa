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


export default function PeopleDialog({ data, render, onSave }) {

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const defaultImg = data && data.img;
  const defaultName = data && data.name;
  // Existing ID or random ID
  const id = data && data.id;
  
  //USESTATE
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    dob: "", 
    mobile_num: "",
    whatsapp_num: "",
    email: "",
    password: "",
    blood_grp: "",
    diksha_dt: "",
    occupation: "",
    user_pic: "",
    qualification: "",
    address_line: "",
    country: "",
    state: "",
    city: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  //Validating Fields
  const validateFields = () => {
    const newErrors = {};

    // Validate each field and set errors if applicable
    if (!formData.full_name) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password should be of minimum 8 characters length";
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

    if (!formData.address_line) {
      newErrors.address_line = "Enter proper Address";
    }

    if (!formData.country) {
      newErrors.country = "Enter Country";
    }

    if (!formData.state) {
      newErrors.state = "Enter state";
    }

    if (!formData.city) {
      newErrors.city = "Enter City";
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
      [name]: value,
    }));
  };

  //On submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    try {
      if (validateFields()) {
      const response = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      console.log('API Response:', data);
    }}
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
          
  <form onSubmit={handleSubmit}>
    <div>
    <FormLabel>Full Name</FormLabel>
        <TextField 
           variant="outlined"
            autoFocus
            margin="dense"
            name="full_name"
            label="Name"
            fullWidth
            value={formData.full_name}
            onChange={handleInputChange}
            required
            onBlur={handleBlur}
            error={Boolean(errors.full_name)}
            helperText={errors.full_name}
          /> 

          </div>
          <br/><br/>
    <FormControl >
        <FormLabel>Gender</FormLabel>
          <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              margin="normal"
              onBlur={handleBlur}
              error={Boolean(errors.gender)}
              helperText={errors.gender}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
         </RadioGroup>
     </FormControl> <br/>

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

            <FormLabel>Enter DOB</FormLabel>
      <TextField
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        name="dob"
        value={formData.dob}
        onChange={handleInputChange}
        required
        onBlur={handleBlur}
        error={Boolean(errors.dob)}
        helperText={errors.dob}
      /><br/>

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

            <FormLabel>Enter Email Address</FormLabel>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    onBlur={handleBlur}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                 />

                 <FormLabel>Enter Password</FormLabel>
                 <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    onBlur={handleBlur}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
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
            label="Image URL"
            fullWidth
            name="user_pic"
            value={formData.user_pic}
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
        name="address_line"
        value={formData.address_line}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.address_line)}
        helperText={errors.address_line}
      />

<FormLabel>Enter Country</FormLabel>
      <TextField
        label="Country"
        type="text"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.country)}
        helperText={errors.country}
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

<FormLabel>Enter City</FormLabel>
      <TextField
        label="City"
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        onBlur={handleBlur}
        error={Boolean(errors.city)}
        helperText={errors.city}
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
        <DialogActions>
       
        </DialogActions>
      </Dialog>
      
    </>
  );
}
