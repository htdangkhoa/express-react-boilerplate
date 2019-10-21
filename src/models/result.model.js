export const resultModel = ({
  code = 200,
  data = null,
  error = { message: null },
}) => ({
  code,
  data,
  error,
});
