import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ name, id, number, deleteContactFunc }) => {
  return (
    <li className={css.contactItem}>
      {name}: {number}
      <button
        className={css.deleteButton}
        onClick={() => deleteContactFunc(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContactFunc: PropTypes.func.isRequired,
};

export default ContactItem;
