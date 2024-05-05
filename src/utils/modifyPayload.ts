export const modifyPayload = (values: any) => {
  const obj = { ...values };
  console.log(obj);
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  return formData;
};
