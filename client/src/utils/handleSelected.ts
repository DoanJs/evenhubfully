export const handleSelectedFromArr = (arr: any, id: number) => {
  const index = arr.findIndex((item: any) => item.id !== id);
  return `${arr[index].data}`;
};
