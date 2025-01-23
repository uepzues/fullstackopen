import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef(
  ({ children, buttonLabel1, buttonLabel2 }, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(refs, () => {
      return { toggleVisibility }
    })

    return (
      <>
        <div>
          <span style={hideWhenVisible}>
            <button className="toggleButton" onClick={toggleVisibility}>
              {buttonLabel1}
            </button>
          </span>

          <div style={showWhenVisible}>
            {children}
            <button className="toggleButton" onClick={toggleVisibility}>
              {buttonLabel2}
            </button>
          </div>
        </div>
      </>
    )
  }
)

Togglable.displayName = "Togglable"

export default Togglable
