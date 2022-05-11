import { useHistory } from 'react-router-dom';

const GasButton = () =>  {
    function app() {
        let history = useHistory();
      
        const redirect = () => {
          history.push('/your-path')
        }
      
        return (
          <div>
            <button onClick={redirect}>Redirect</button>
          </div>
        )
  }


}

export default GasButton;