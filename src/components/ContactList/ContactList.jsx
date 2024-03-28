import Contact from './Contact';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, textFilter, deleteId }) => {
  const arrFilter = contacts.filter(({ name }) =>
    name.toLowerCase().includes(textFilter.toLowerCase())
  );

  return (
    <ul>
      {arrFilter.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
          deleteID={deleteId}
        />
      ))}
    </ul>
  );
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteId: PropTypes.func.isRequired,
};

export default ContactList;
