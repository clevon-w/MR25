import React from "react";
import {
  RadioGroup,
  Stack,
  Radio,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function FormRadio(props) {
  const handleChange = (e) => {
    props.setFormData((prevState) => ({
      ...prevState,
      [props.name]: e,
    }));
  };

  return (
    <FormControl>
      <FormLabel fontWeight={600} fontSize={"sm"}>
        {props.question}
      </FormLabel>
      <RadioGroup onChange={handleChange} value={props.data}>
        <Stack direction={props.direction}>
          {Object.keys(props.radioOption).map((key) => (
            <Radio value={key} key={key} size={"sm"}>
              {props.radioOption[key]}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}

export default FormRadio;
