/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { MainBlock } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [arrFilter, setArrFilter] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const arrContacts = localStorage.getItem('contacts');
    if (arrContacts) {
      setContacts(JSON.parse(arrContacts));
    }
  }, []);

  useEffect(() => {
    contacts.length &&
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    if (contacts.length) {
      const textFilter = filter.toLowerCase();
      setArrFilter(
        contacts.filter(({ name }) => name.toLowerCase().includes(textFilter))
      );
    }
  }, [filter, contacts]);

  const addContact = ({ name, number }) => {
    const findContact = contacts.find(el => el.name === name);
    if (findContact) {
      alert(name + ' is already in contacts');
      return;
    }
    const newId = nanoid();
    const newObj = { id: newId, name, number };

    setContacts(contacts =>
      !contacts.length ? [newObj] : [...contacts, newObj]
    );
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
      <ContactList contacts={arrFilter} deleteId={deleteContact} />
    </MainBlock>
  );
};

export default App;
