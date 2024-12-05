import { css } from "@calpoly/mustang";

const styles = css`
  * {
  margin: 0;
  box-sizing: border-box;
}
body {
  line-height: 1.5;
}
img {
  max-width: 100%;
}

h2, h3, h4, h5, p {
  color: var(--color-small-header);
}

/* Tables */
table {
    background-color: var(--color-table);

    th, td {
        color: var(--color-basic-text);
        padding: var(--padding-medium);
    }
}

.table-container-centered {
    display: flex;
    justify-content: center;
    align-items: center;
}
.table-title {
    padding-bottom: var(--margin-tiny);
    text-align: center;
}

.catch-description {
    padding-top: var(--margin-small);
    padding-bottom: var(--margin-small);
    display: flex;
    justify-content: center;
    align-items: center;
}

.favorite-form-title {
  text-align: center;
}

.favorite-form-container {
    padding: var(--margin-tiny); /* Add spacing inside the container */
    background-color: var(--color-large-header-background); /* Light gray background */
    border-radius: 8px; /* Rounded corners */
    max-width: 500px; /* Optional: constrain width for better appearance */
    margin: var(--margin-small) auto; /* Center the container horizontally and add vertical spacing */

    h3, span {
      color: var(--color-large-header);
    }
}

.favorite-form {
    display: flex;
    flex-direction: column; /* Stack children vertically */
    gap: 0.2em; /* Add space between form fields */
    max-width: 400px; /* Optional: limit the width of the form */
    margin: 0 auto; /* Optional: center the form horizontally */
    margin-bottom: var(--margin-tiny);
}

.favorite-form mu-form.edit {
    display: flex;
    flex-direction: column; /* Stack labels vertically */
    gap: 1em; /* Add space between labels */
}

.favorite-form label {
    display: flex;
    flex-direction: column; /* Stack label text and input vertically */
    gap: 0.5em; /* Add space between text and input */
}

.favorite-form input {
    padding: 0.5em; /* Add padding for a better look */
    border: 1px solid #ccc; /* Add border for inputs */
    border-radius: 4px; /* Rounded corners */
    font-size: 1em; /* Adjust font size */
    width: 100%; /* Make inputs full-width */
    box-sizing: border-box; /* Ensure padding doesn't affect width */
}
`;

export default { styles };