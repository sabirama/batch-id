export default function updateFieldName(e, label, fieldIndex, fields, objects) {
  const newFieldName = e.target.value.trim();
  const oldFieldName = fields[fieldIndex];

  // Handle invalid or unchanged field names
  if (newFieldName === "" || newFieldName === oldFieldName) {
    label.style.display = "inline-block";
    e.target.remove(); // Remove the input element
    return;
  }

  // Ensure the new field name does not already exist in the fields array
  if (fields.includes(newFieldName)) {
    alert("Field name already exists.");
    e.target.value = oldFieldName; // Reset the input to the old value
    return;
  }

  // Update fields array
  fields[fieldIndex] = newFieldName;

  // Update object
  const { [oldFieldName]: oldValue, ...rest } = object; // Extract old value and rest of the object
  object = {
    ...rest,
    [newFieldName]: oldValue || "", // Set new field name
  };

  // Save changes
  SessionData.set("fields", fields);
  SessionData.set("current_object", object);

  console.log(newFieldName)
  // Update the label and cleanup
  label.value = newFieldName;
  label.style.display = "inline-block";
  e.target.remove();
}
