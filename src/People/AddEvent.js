//Signup For Each member
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import FormLabel from '@material-ui/core/FormLabel';
import { useState } from "react";
import { events } from "../api/Api";


export default function AddEvent({ data, render, onSave }) {

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const defaultImg = data && data.img;
  const defaultName = data && data.name;
  // Existing ID or random ID
  const id = data && data.id;
  
  //USESTATE
  const [formData, setFormData] = useState({
    event_name: "",
	event_type: "",
	event_location: "",
	start_date: "",
	end_date: "",
	listed_by: "",
	event_status: "",
	other:""
  });

//   const [errors, setErrors] = useState({});

//   //Validating Fields
//   const validateFields = () => {
//     const newErrors = {};

//     // Validate each field and set errors if applicable
//     if (!formData.age) {
//       newErrors.age = "Age is required";
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!formData.mobile_num) {
//       newErrors.mobile_num = "Mobile number is required";
//     } else if (!phoneRegex.test(formData.mobile_num)) {
//       newErrors.mobile_num = "Enter a valid 10-digit mobile number";
//     } if (!formData.whatsapp_num) {
//       newErrors.whatsapp_num= "WhatsApp number is required";
//     } else if (!phoneRegex.test(formData.whatsapp_num)) {
//       newErrors.whatsapp_num = "Enter a valid 10-digit mobile number";
//     }

//     if (!formData.blood_grp) {
//       newErrors.blood_grp = "Enter Blood Group";
//     }

//     if (!formData.diksha_dt) {
//       newErrors.diksha_dt = "Enter Date";
//     }

//     if (!formData.occupation) {
//       newErrors.occupation = "Enter Occupation";
//     }

//     if (!formData.qualification) {
//       newErrors.qualification = "Enter Qualification";
//     }

//     if (!formData.address_linep) {
//       newErrors.address_linep = "Enter proper Address";
//     }

//     if (!formData.state) {
//       newErrors.state = "Enter state";
//     }

//     const pin = /^\d{6}$/;
//     if (!formData.pincode) {
//       newErrors.pincode = "PinCode is required";
//       } else if (!pin.test(formData.pincode)) {
//         newErrors.pincode = "Pincode should be a 6-digit number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }

  // Validate fields when input loses focus
//   const handleBlur = (event) => {
//     validateFields(); 
//   };

  //Handling Onchange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name,value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //On submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // console.log(formData)
        await events(formData); // Using "await" to wait for the promise to resolve
        console.log("Form submitted successfully");
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
          {!data ? "Add" : "Edit"} Event{" "}
        </DialogTitle>
        <DialogContent>
          
  <form onSubmit={handleSubmit}>

       <FormLabel>Event Name</FormLabel><br/>
          <TextField 
               variant="outlined"
               label="Event Name"
               type="text"
               name="event_name"
               placeholder="Enter Event Name"
               value={formData.event_name}
               onChange={handleInputChange}              
            //    onBlur={handleBlur}
            //    error={Boolean(errors.age)}
            //   helperText={errors.age}
          />  <br/><br/>

              <FormLabel>Event Type</FormLabel>
                  <TextField
                     label="Event Type"
                     type="text"
                     placeholder="Enter Event Type"
                     variant="outlined"
                     fullWidth
                     name="event_type"
                     value={formData.event_type}
                     onChange={handleInputChange}                     
                     margin="normal"
                    //  onBlur={handleBlur}
                    //  error={Boolean(errors.mobile_num)}
                    //  helperText={errors.mobile_num}
                   /><br/>

                   <FormLabel>Event Location</FormLabel>
                   <TextField
                     label="Event Location"
                     type="text"
                     placeholder="Enter Event Location"
                     variant="outlined"
                     fullWidth
                     name="event_location"
                     value={formData.event_location}
                     onChange={handleInputChange}
                     margin= "normal"
                    //  onBlur={handleBlur}
                    //  error={Boolean(errors.whatsapp_num)}
                    //  helperText={errors.whatsapp_num}
                   />

<FormLabel>Starting Date of an Event</FormLabel>
     <TextField
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        // onBlur={handleBlur}
        // error={Boolean(errors.blood_grp)}
        // helperText={errors.blood_grp}
      />

      <FormLabel>Last Date of an Event</FormLabel>
      <TextField
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"    
        // onBlur={handleBlur}
        // error={Boolean(errors.diksha_dt)}
        // helperText={errors.diksha_dt}
      />

<FormLabel>Listed By</FormLabel>
      <TextField
        label="Listed by"
        type="text"
        name="listed_by"
        value={formData.listed_by}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"       
        // onBlur={handleBlur}
        // error={Boolean(errors.occupation)}
        // helperText={errors.occupation}
      />

<FormLabel>Event Status</FormLabel>
          <TextField
            variant="outlined"
            margin="margin"
            type="number"
            fullWidth
            name="event_status"
            value={formData.event_status}
            onChange={handleInputChange}
          />

<FormLabel>Other</FormLabel>
      <TextField
        label="other"
        type="text"
        name="other"
        value={formData.other}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"      
        // onBlur={handleBlur}
        // error={Boolean(errors.qualification)}
        // helperText={errors.qualification}
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
