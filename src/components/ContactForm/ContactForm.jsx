import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;

    this.props.addContactFunc(this.state);

    this.setState({ name: '', number: '' });

    form.reset();
  };

  render() {
    const { form, inputStyled, submitButton } = css;
    const { nameInputId, numberInputId, handleChange } = this;
    const { name, number } = this.state;

    return (
      <form className={form} onSubmit={this.handleSubmit}>
        <label htmlFor={nameInputId}>Name</label>
        <input
          id={nameInputId}
          onChange={handleChange}
          className={inputStyled}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor={numberInputId}>Number</label>
        <input
          id={numberInputId}
          onChange={handleChange}
          className={inputStyled}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={submitButton} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContactFunc: PropTypes.func.isRequired,
};
