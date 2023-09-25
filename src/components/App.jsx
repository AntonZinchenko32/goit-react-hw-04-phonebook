import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts) this.setState({ contacts: savedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const actualContactList = this.state.contacts;
    const previousContactList = prevState.contacts;

    if (actualContactList !== previousContactList) {
      localStorage.setItem('contacts', JSON.stringify(actualContactList));
    }
  }

  // Додавання контактів із забороною на додавання з однаковими іменами ***************************************************
  addContactFunc = newContact => {
    const { name, number } = newContact;

    // Перевіряємо чи є співпадіння імені серед доданих контактів і імені, що користувач хоче додати
    const gotMatch = this.state.contacts.find(contact => {
      return contact.name === name;
    });

    if (!gotMatch) {
      // Асинхронно додаэмо новий контакт до масиву контактів в стані додатку

      this.setState(({ contacts }) => ({
        contacts: contacts.concat({
          id: nanoid(),
          name,
          number,
        }),
      }));
    } else {
      alert(`${name} already in list`);
    }
  };

  // Фільтрація контактів ***********************************************************************************************
  handleFilter = evt => {
    this.setState({ filter: evt.target.value });
  };
  contactFiltering = () => {
    const { filter, contacts } = this.state;

    if (filter === '') return contacts;
    else {
      const filtredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );

      return filtredContacts;
    }
  };

  // Видалення контактів *************************************************************************************************
  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => {
        return contact.id !== id;
      }),
    }));
  };

  render() {
    const { addContactFunc, handleFilter, contactFiltering, deleteContact } =
      this;

    return (
      <div
        style={{
          margin: '15px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1
          style={{
            margin: '15px 0',
            fontSize: '42px',
          }}
        >
          Phonebook
        </h1>
        <ContactForm addContactFunc={addContactFunc} />

        <h1
          style={{
            margin: '15px 0',
            fontSize: '42px',
          }}
        >
          Contacts
        </h1>

        <Filter searchContactFunc={handleFilter} />
        <ContactList
          contacts={contactFiltering()}
          deleteContactFunc={deleteContact}
        />
      </div>
    );
  }
}
