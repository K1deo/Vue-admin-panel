import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export function useRequestForm(fn) {
  const { isSubmitting, handleSubmit } = useForm();

  const { value: fio, errorMessage: fError, handleBlur: fBlur } = useField(
    "fio",
    yup
      .string()
      .trim()
      .required("Введите ФИО клиента")
      .min(5,"Пожалуйста, введите корректное ФИО")
      .max(60,"Пожалуйста, введите корректное ФИО")
  );

  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    "phone",
    yup
      .string()
      .trim()
      .required("Номер телефона не может быть пустым")
      .min(11,"Пожалуйста, введите корректный номер телефона")
      .max(17,"Пожалуйста, введите корректный номер телефона")
  );
  
  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    "amount",
    yup
      .number()
      .required('Сумма не может быть пустой')
      .min(0, "Сумма не может быть меньше нуля")
  );
  
  const validateSelect= (val) => {
    if(!val){
        return "Требуется присвоение статуса"
    }
    return true
  }
  const { value: status, errorMessage: sError } = useField("status",validateSelect);

  const onSubmit = handleSubmit(fn);
  return {
    status,
    isSubmitting,
    onSubmit,
    fio,
    fError,
    fBlur,
    phone,
    pError,
    pBlur,
    amount,
    aError,
    aBlur,
    sError,
  };
}
