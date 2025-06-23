import useNotificationStore from '../notificationStore'

const Notification = () => {
  const { error, info } = useNotificationStore()

  return (
    <div>
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
      {info && (
        <div>
          <h2>{info}</h2>
        </div>
      )}
    </div>
  )
}

export default Notification
