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
`;

export default { styles };