import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormSt, Label } from './ContactForm.styled';

const ContactForm = ({ onSubmitForm }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('Opps');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmitForm({
      name,
      number,
    });
    setName('');
    setNumber('');
  };

  return (
    <>
      <FormSt onSubmit={handleSubmit}>
        <Label htmlFor="nameId">
          Name
          <input
            type="text"
            name="name"
            id="nameId"
            required
            onChange={handleChange}
            value={name}
            placeholder="Name Surname"
          />
        </Label>
        <Label htmlFor="numberId">
          Number
          <input
            type="tel"
            name="number"
            id="numberId"
            required
            onChange={handleChange}
            value={number}
            placeholder="999-99-99"
          />
        </Label>
        <button type="submit">Add contact</button>
      </FormSt>
    </>
  );
};

ContactForm.prototype = {
  onSubmitForm: PropTypes.func.isRequired,
};
export default ContactForm;
