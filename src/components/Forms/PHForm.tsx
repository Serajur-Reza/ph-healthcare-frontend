import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type Props = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const PHForm = (props: Props) => {
  const { children, onSubmit, resolver, defaultValues } = props;
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;
  const submit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    onSubmit(data);
    reset();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
