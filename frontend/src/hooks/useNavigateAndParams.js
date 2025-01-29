import { useHistory, useParams } from 'react-router-dom';

const useNavigateAndParams = () => {
  const history = useHistory();
  const params = useParams();

  const navigate = (path, options = {}) => {
    if (options.replace) {
      history.replace(path);
    } else {
      history.push(path);
    }
  };

  return { navigate, params };
};

export default useNavigateAndParams; 