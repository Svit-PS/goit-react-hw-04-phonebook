/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { MainBlock } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const arrContacts = localStorage.getItem('contacts');
    if (arrContacts) {
      return JSON.parse(arrContacts);
    }
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    contacts && localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts) {
      const findContact = contacts.find(el => el.name === name);
      if (findContact) {
        alert(name + ' is already in contacts');
        return;
      }
    }
    const newId = nanoid();
    const newObj = { id: newId, name, number };

    setContacts(contacts => (!contacts ? [newObj] : [...contacts, newObj]));
    console.log('contacts: ', [newObj]);
  };

  const deleteContact = deleteId =>
    setContacts(prevState => prevState.filter(({ id }) => id !== deleteId));

  const filterChange = filter => setFilter(filter);

  return (
    <MainBlock>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addContact} />

      <h2>Contacts</h2>
      <Filter filterChange={filterChange} filterValue={filter} />
      {contacts && (
        <ContactList
          contacts={contacts}
          textFilter={filter}
          deleteId={deleteContact}
        />
      )}
    </MainBlock>
  );
};

export default App;
