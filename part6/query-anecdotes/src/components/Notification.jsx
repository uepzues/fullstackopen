import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const Notification = () => {

  const [notif] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return notif && <div style={style}>{notif}</div>
}

export default Notification
