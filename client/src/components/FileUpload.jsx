import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Code, Icon } from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { useController } from "react-hook-form";
import { useRef } from "react";

const FileUpload = ({ name, placeholder, acceptedFileTypes, control, children, isRequired=false, setFormData, formData }) => {
  const inputRef = useRef();
  const {
    field: { ref, onChange, value, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FiImage} />}
        />
        <input
          type='file'
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef}
          {...inputProps}
          inputRef={ref}
          style={{ display: 'none' }}
          onChange={(e) => {
            onChange(e.target.files[0])
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.files[0]
            }))
          }}
        ></input>
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => inputRef.current.click()}
          value={value && value.name || ''}
        />
      </InputGroup>
      {/* <FormErrorMessage>
        {invalid}
      </FormErrorMessage> */}
    </FormControl>
  );
}

export default FileUpload;