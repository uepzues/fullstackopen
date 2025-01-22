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
          <div style={hideWhenVisible} className="togButParent">
            <button className="toggleButton" onClick={toggleVisibility}>
              {buttonLabel1}
            </button>
          </div>

          <div style={showWhenVisible} className="togButParent">
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
