import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  // console.log(message);
  if (message === null) {
    return ''
  }

  return <div className="error">{message}</div>
}

Notification.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null])])
}

export default Notification
