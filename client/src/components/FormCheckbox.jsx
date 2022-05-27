import React from "react"
import { FormControl, Checkbox } from '@chakra-ui/react'

function FormCheckbox(props) {
  const handleChange = (e) => {
    props.setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked
    }))
  }

  return (
    <FormControl isRequired>
      <Checkbox name={props.name} checked={props.data} onChange={handleChange} size={'sm'} >{props.text}</Checkbox>
    </FormControl>
  )
}

export default FormCheckbox