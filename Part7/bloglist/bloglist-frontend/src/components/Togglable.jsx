import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(
  ({ children, buttonLabel1, buttonLabel2 }, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(refs, () => {
      return { toggleVisibility }
    })

    return (
      <>
        <div className='flex flex-col items-center justify-center'>
          <div style={hideWhenVisible}>
            <button
              className='toggleButton bg-slate-800 text-white p-2 rounded-xl mb-3 hover:bg-slate-600 hover:text-slate-800 '
              onClick={toggleVisibility}>
              {buttonLabel1}
            </button>
          </div>

          <div
            className='flex flex-col items-center justify-center'
            style={showWhenVisible}>
            {children}
            <button
              className='toggleButton mt-4 bg-slate-800 text-white p-2 rounded-xl mb-3 hover:bg-slate-600 hover:text-slate-800'
              onClick={toggleVisibility}>
              {buttonLabel2}
            </button>
          </div>
        </div>
      </>
    )
  }
)

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel1: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Togglable
