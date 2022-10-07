import { useState, useCallback, ChangeEvent } from 'react';

type TargetElement = HTMLInputElement | HTMLTextAreaElement;
type UseInputsOutput<T> = [
  values: T,
  onChange: (e: ChangeEvent<TargetElement>) => void,
  setValues: React.Dispatch<React.SetStateAction<T>>
];

const useInputs = <T>(initialValues: T): UseInputsOutput<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const onChange = useCallback((e: ChangeEvent<TargetElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  return [values, onChange, setValues];
};

export default useInputs;
