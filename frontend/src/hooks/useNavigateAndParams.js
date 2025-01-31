import { useNavigate, useParams } from 'react-router-dom';

const useNavigateAndParams = () => {
  const navigate = useNavigate();
  const params = useParams();

  const navigateTo = (path, options = {}) => {
    if (options.replace) {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return { navigateTo, params };
};

export default useNavigateAndParams; 