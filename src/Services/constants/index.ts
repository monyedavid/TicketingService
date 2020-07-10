export const unprocessible_entity_error = {
  ok: false,
  message: "unprocessible entity",
  status: 422,
};

export const mod_data_error = {
  path: "db",
  message: "error(s) occurred while modifying data",
};

export const inserting_data_error = {
  path: "db",
  message: "an error occurred while inserting data",
};

export const delete_data_error = {
  path: "db",
  message: "error(s) occurred while deleting data",
};

export const success = {
  ok: true,
  message: "success",
  status: 200,
  error: null,
};
