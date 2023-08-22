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

  // const [img, setImg] = React.useState(defaultImg);
  // const [name, setName] = React.useState(defaultName);
  
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    // setName(defaultName);
    // setImg(defaultImg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //OLD SAVE METHOD
  // const handleSave = () => {
  //   const action = data ? update : add;
  //   dispatch(action({ name, id: id || nextID(), img }));
  //   onSave && onSave();
  //   handleClose();
  // };

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
        <TextField 
           variant="outlined"
            autoFocus
            margin="dense"
            name="full_name"
            label="Name"
            fullWidth
            value={formData.full_name}
            onChange={handleInputChange}
          /> <br/><br/>
    <FormControl >
        <FormLabel>Gender</FormLabel>
          <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
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
          />  <br/><br/>
                 
      <TextField
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        name="dob"
        value={formData.dob}
        onChange={handleInputChange}
      /><br/>
                  <TextField
                     label="Mobile Number"
                     type="tel"
                     placeholder="Enter your mobile number"
                     variant="outlined"
                     fullWidth
                     name="mobile_num"
                     value={formData.mobile_num}
                     onChange={handleInputChange}
                   /><br/><br/>
                   <TextField
                     label="WhatsApp Number"
                     type="tel"
                     placeholder="Enter your whatsApp number"
                     variant="outlined"
                     fullWidth
                     name="whatsapp_num"
                     value={formData.whatsapp_num}
                     onChange={handleInputChange}
                   />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                 />
                 <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                 />
     <TextField
        label="Blood Group"
        type="text"
        // value={bloodGroup}
        // onChange={(e) => setBloodGroup(e.target.value)}
        name="blood_grp"
        value={formData.blood_grp}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        type="date"
        // value={dikshaDt}
        // onChange={(e) => setDikshaDt(e.target.value)}
        name="diksha_dt"
        value={formData.diksha_dt}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Occupation"
        type="text"
        // value={occupation}
        // onChange={(e) => setOccupation(e.target.value)}
        name="occupation"
        value={formData.occupation}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            label="Image URL"
            fullWidth
            name="user_pic"
            value={formData.user_pic}
            onChange={handleInputChange}
          />
      <TextField
        label="Qualification"
        type="text"
        // value={qualification}
        // onChange={(e) => setQualification(e.target.value)}
        name="qualification"
        value={formData.qualification}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address Line"
        type="text"
        // value={addressLine}
        // onChange={(e) => setAddressLine(e.target.value)}
        name="address_line"
        value={formData.address_line}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Country"
        type="text"
        // value={country}
        // onChange={(e) => setCountry(e.target.value)}
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="State"
        type="text"
        // value={selectedState}
        // onChange={handleStateChange}
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        type="text"
        // value={city}
        // onChange={(e) => setCity(e.target.value)}
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pincode"
        type="text"
        // value={pincode}
        // onChange={(e) => setPincode(e.target.value)}
        name="pincode"
        value={formData.pincode}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
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
