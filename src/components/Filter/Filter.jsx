import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

const Filter = ({ searchContactFunc }) => {
  const filterInputId = nanoid();

  return (
    <>
      <label htmlFor={filterInputId} className={css.label}>
        Find contacts by name
      </label>
      <input
        id={filterInputId}
        className={css.input}
        onChange={searchContactFunc}
      />
    </>
  );
};

export default Filter;

Filter.propTypes = {
  searchContactFunc: PropTypes.func.isRequired,
};
