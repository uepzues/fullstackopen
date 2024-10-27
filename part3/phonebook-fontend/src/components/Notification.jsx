const Notification = ({ message, notification }) => {
  if ( message === null) {
    return null;
  }
  return (
    <>
      <div className={notification}>{message}</div>
    </>
  );
};

export default Notification;
