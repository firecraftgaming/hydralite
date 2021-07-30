import * as React from "react"

function SvgComponent(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M19.9 8.2C19.5 7 18.3 6.1 17 6.1c-1.7 0-3 1.3-3 3 0 1.2.7 2.3 1.8 2.8-.3.7-1 1.2-1.8 1.2h-4c-.7 0-1.4.2-2 .6V7.9c1.6-.6 2.4-2.3 1.8-3.9C9.3 2.5 7.6 1.7 6 2.2 4.4 2.8 3.6 4.5 4.2 6c.3.9 1 1.5 1.8 1.8v8.4c-1.6.6-2.4 2.3-1.8 3.8.6 1.6 2.3 2.4 3.8 1.8 1.6-.6 2.4-2.3 1.8-3.8-.3-.8-.9-1.4-1.7-1.7.3-.7 1-1.2 1.8-1.2h4c1.9 0 3.5-1.3 3.9-3.2 1.7-.5 2.6-2.2 2.1-3.7z"
      />
    </svg>
  )
}

export default SvgComponent
