import PropTypes from 'prop-types';

import css from './ContactList.module.css';

import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = ({ contacts, deleteContactFunc }) => {
  return (
    <ul className={css.contactsList}>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContactFunc={deleteContactFunc}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContactFunc: PropTypes.func.isRequired,
};

export default ContactList;
