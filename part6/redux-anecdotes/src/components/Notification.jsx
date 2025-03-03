import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const style = {marginBottom: 10,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
  }
  return notification && <div style={style}>{notification}</div>
}

export default Notification
