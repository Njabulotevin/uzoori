import React, { useState } from 'react'

export default function useInputError() {
    const [isError, setError] = useState(false);
    const [inputError, setInputError] = useState({name: "", error: ""});

  return {isError, setError, inputError, setInputError}
}
