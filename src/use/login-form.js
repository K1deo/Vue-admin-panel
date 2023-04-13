import { computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useLoginForm() {
  const store = useStore();
  const router = useRouter();

  const { handleSubmit, isSubmitting, submitCount } = useForm();

  const PASS_MIN_LEN = 6;
  const SUBMIT_MAX_ATTEMPTS = 5;
  const SUBMIT_TIMEOUT = 5000;

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("*Это обязательное поле")
      .email("*Пожалуйста, введите корректный email")
  );

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("*Это обязательное поле")
      .min(
        PASS_MIN_LEN,
        `*Пароль должен быть некороче ${PASS_MIN_LEN} символов`
      )
  );

  const onSubmit = handleSubmit(async (values) => {
    console.log("Form", values);
    try {
      await store.dispatch("auth/login", values);
      router.push("/");
    } catch (e) {}
  });

  const isSubmitSpam = computed(() => submitCount.value >= SUBMIT_MAX_ATTEMPTS);

  watch(isSubmitSpam, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), SUBMIT_TIMEOUT);
    }
  });

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    isSubmitSpam,
  };
}
