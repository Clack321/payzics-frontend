import 'react-phone-number-input/style.css'
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input'

export default function PhoneNumberInput({ value, onChange }) {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={onChange}/>
  )
}