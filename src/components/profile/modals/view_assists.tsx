const ViewAssistModal = () => {
  return (
    <>
      <form>
        View By{" "}
        <select>
          <option>Select Year</option>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
        </select>
        <select>
          <option>Select Quarter</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <button>Search</button>
        <table border={1}>
          <thead>
            <td>Sr.no</td>
            <td>Assisted</td>
            <td>Assist Topic</td>
            <td>Date</td>
            <td>Status</td>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Helped in GIT</td>
              <td>12 Apr 2024</td>
              <td>Approved</td>
            </tr>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Helped in GIT</td>
              <td>12 Apr 2024</td>
              <td>Approved</td>
            </tr>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Helped in GIT</td>
              <td>12 Apr 2024</td>
              <td>Approved</td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default ViewAssistModal;
