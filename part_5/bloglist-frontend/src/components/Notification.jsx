const Notification = ({ message, code }) => {
    if (message === null) {
      return null
    }
  
    if (code === 1) {
        return (
        <div className="noti">
            {message}
        </div>
        )
    }

    if (code == 2) {
        return (
            <div className = "error">
                {message}
            </div>
        )
    }

  }
  
  export default Notification